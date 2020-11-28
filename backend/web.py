import psycopg2
from flask import Flask, request
import json
import psycopg2.extras
def connectpg():
        return psycopg2.connect(host="db-postgresql-fra1-54507-do-user-8314748-0.b.db.ondigitalocean.com",database="internatnyportal", user="doadmin", password="ms9axdl0dx93krdb", port = "25060")


app = Flask(__name__)

@app.route("/kategoria" , methods=['POST'])
def kat():
    parametre= request.form
    kategoria = parametre.get('kategoria')
    typ = parametre.get('typ')
    nazov = parametre.get('nazov')
    popis = parametre.get('popis') 
    hashtag = parametre.get('hashtag')
    hashtag = hashtag.strip().split('#')
    if(len(hashtag)>1):
            hashtag = hashtag[1::]
    a = connectpg()
    c = a.cursor(cursor_factory=psycopg2.extras.DictCursor)
    query = 'select * from portal where'
    to_filter = []

    if kategoria:
        query += ' kategoria = %s AND'
        to_filter.append(kategoria)
    if typ:
        query += ' typ = %s AND'
        to_filter.append(typ)
    if nazov:
        query += ' nazov like \'%%\'||%s||\'%%\' OR'
        to_filter.append(nazov)
    if popis:
        query += ' popis like \'%%\'||%s||\'%%\' OR'
        to_filter.append(popis)
    if len(hashtag) >= 1:
        for i in hashtag:
                query += ' hashtag like \'%%\'||%s||\'%%\' OR'
                to_filter.append(i)
                query += ' nazov like \'%%\'||%s||\'%%\' OR'
                to_filter.append(i)
                query += ' popis like \'%%\'||%s||\'%%\' OR'
                to_filter.append(i)
    if query[-1] == 'R':
        query = query[:-3]
    else:
        query = query[:-4] 
    if not (kategoria or typ or nazov or popis or hashtag):
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

if __name__ == "__main__":
    app.run(host='0.0.0.0')

def get_dict_resultset(sql):
    conn = psycopg2.connect("dbname=pem host=localhost user=postgres password=Drupal#1008")
    cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
    cur.execute (sql)
    ans =cur.fetchall()
    dict_result = []
    for row in ans:
        dict_result.append(dict(row))
    return dict_result

