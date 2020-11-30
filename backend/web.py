import psycopg2
from flask import Flask, request
from flask_cors import CORS
import json
import psycopg2.extras
import re
from OpenSSL import SSL


def connectpg():
    return psycopg2.connect(host="db-postgresql-fra1-54507-do-user-8314748-0.b.db.ondigitalocean.com",database="internatnyportal", user="doadmin", password="ms9axdl0dx93krdb", port = "25060")


app = Flask(__name__)
CORS(app)

@app.route("/kategoria" , methods=['POST'])
def kat():
    parametre= request.form
    kategoria = parametre.get('kategoria')
    typ = parametre.get('typ')
    nazov = parametre.get('nazov')
    hladane_vyrazy = []
    if nazov:
        hladane_vyrazy = [i.strip() for i in re.split('[, #]', nazov) if i.strip() != '']
    a = connectpg()
    c = a.cursor(cursor_factory=psycopg2.extras.DictCursor)
    query = 'select nazov,cena,kategoria,typ,popis,hashtag,inserted_at::text,uzivatel from portal where'
    to_filter = []
    if kategoria:
        query += ' kategoria = %s AND'
        to_filter.append(kategoria)
    if typ:
        query += ' typ = %s AND'
        to_filter.append(typ)
    if len(hladane_vyrazy) != 0:
        query += ' (('
        for i in hladane_vyrazy:            
            query += ' unaccent(lower(nazov)) like \'%%\'||unaccent(lower(%s))||\'%%\' AND'
            to_filter.append(i)
        query = query[:-4]    
        query += ') OR ('
        for i in hladane_vyrazy:
            query += ' unaccent(lower(hashtag)) like \'%%\'||unaccent(lower(%s))||\'%%\' AND'
            to_filter.append(i)
        query = query[:-4]
        query += ') OR ('
        for i in hladane_vyrazy:    
            query += ' unaccent(lower(popis)) like \'%%\'||unaccent(lower(%s))||\'%%\' AND'
            to_filter.append(i)
        query = query[:-4]
        query += '))'
    
    if query[-1] == 'D':
        query = query[:-4]
    if not (kategoria or typ or nazov or hashtag):
        query = 'select * from portal'
    c.execute(query, to_filter)
    t = c.fetchall()
    c.close()
    a.close()
    dict_result = []
    for row in t:
        dict_result.append(dict(row))
    js = json.dumps(dict_result, ensure_ascii=False).encode('utf8')
    return js.decode()


@app.route("/insert" , methods=['POST'])
def ins():
    parametre= request.form
    kategoria = parametre.get('kategoria')
    typ = parametre.get('typ')
    nazov = parametre.get('nazov')
    popis = parametre.get('popis') 
    hashtag = parametre.get('hashtag')
    uzivatel = parametre.get('uzivatel')
    cena = parametre.get('cena')
    a = connectpg()
    c = a.cursor(cursor_factory=psycopg2.extras.DictCursor)
    query = 'INSERT INTO portal (nazov,cena,kategoria,typ,popis,hashtag,uzivatel) VALUES (%s,%s,%s,%s,%s,%s,%s);'
    to_filter = [nazov,cena,int(kategoria),int(typ),popis,hashtag,uzivatel]
    c.execute(query, to_filter)
    a.commit()
    c.close()
    a.close()
    return ''

@app.route("/nove" , methods=['POST'])
def nove():
    parametre= request.form
    typ = parametre.get('typ')
    if typ:
            typ = typ.strip().split(',')
    a = connectpg()
    c = a.cursor(cursor_factory=psycopg2.extras.DictCursor)
    query = 'Select nazov,cena,kategoria,typ,popis,hashtag,inserted_at::text,uzivatel from portal Where '
    to_filter = []
    if typ:
        if len(typ) >= 1:
            for i in typ:
                query += 'typ = %s OR '
                to_filter.append(i)
    query = query[:-3]
    query += ' ORDER BY inserted_at DESC LIMIT 5'
    c.execute(query, to_filter)
    t = c.fetchall()
    c.close()
    a.close()
    dict_result = []
    for row in t:
        dict_result.append(dict(row))
    js = json.dumps(dict_result, ensure_ascii=False).encode('utf8')
    return js.decode()


if __name__ == "__main__":
    app.run(host='0.0.0.0', ssl_context=('/etc/letsencrypt/live/internatnyportalxyz.xyz/cert.pem','/etc/letsencrypt/live/internatnyportalxyz.xyz/privkey.pem'))

#app.run('0.0.0.0', debug=True, port=8100, ssl_context='adhoc')
def get_dict_resultset(sql):
    conn = psycopg2.connect("dbname=pem host=localhost user=postgres password=Drupal#1008")
    cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
    cur.execute (sql)
    ans =cur.fetchall()
    dict_result = []
    for row in ans:
        dict_result.append(dict(row))
    return dict_result

