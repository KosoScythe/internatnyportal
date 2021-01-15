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
    if not (kategoria or typ or nazov):
        query = 'select nazov,cena,kategoria,typ,popis,hashtag,inserted_at::text,uzivatel from portal'
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
        else:
            query += 'typ = %s OR '
            to_filter.append(typ[0])
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

@app.route("/vsetky" , methods=['POST'])
def vsetky():
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
        else:
            query += 'typ = %s OR '
            to_filter.append(typ[0])
    query = query[:-3]
    c.execute(query, to_filter)
    t = c.fetchall()
    c.close()
    a.close()
    dict_result = []
    for row in t:
        dict_result.append(dict(row))
    js = json.dumps(dict_result, ensure_ascii=False).encode('utf8')
    return js.decode()

@app.route("/allin" , methods=['POST'])
def allin():
    parametre= request.form
    nazov = parametre.get('nazov')
    hladane_vyrazy = []
    if nazov:
        hladane_vyrazy = [i.strip() for i in re.split('[, #]', nazov) if i.strip() != '']
    a = connectpg()
    c = a.cursor(cursor_factory=psycopg2.extras.DictCursor)
    query = 'Select nazov,cena,kategoria,typ,popis,hashtag,inserted_at::text,uzivatel from portal Where '
    to_filter = []
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

    c.execute(query, to_filter)
    t = c.fetchall()
    c.close()
    a.close()
    dict_result = []
    for row in t:
        dict_result.append(dict(row))

    a = connectpg()
    c = a.cursor(cursor_factory=psycopg2.extras.DictCursor)
    query = 'Select nazov,popis,dni,aktivity.datefrom::text, aktivity.dateto::text, aktivity.casod::text, aktivity.casDo::text,min, max, ciselnik_uzivatelia.email, lokalita, opakuje, (Select count(*) from aktivity_prihlaseny where id_aktivity = aktivity.id) as pocet_prihlasenych from aktivity join ciselnik_uzivatelia on (owner = ciselnik_uzivatelia.id) Where '
    to_filter = []
    if len(hladane_vyrazy) != 0:
        query += ' (('
        for i in hladane_vyrazy:            
            query += ' unaccent(lower(nazov)) like \'%%\'||unaccent(lower(%s))||\'%%\' AND'
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

    c.execute(query, to_filter)
    t = c.fetchall()
    c.close()
    a.close()
   
    for row in t:
        dict_result.append(dict(row))
    
    js = json.dumps(dict_result, ensure_ascii=False).encode('utf8')
    return js.decode()

@app.route("/inzeratyuzivatela" , methods=['POST'])
def inzeratyuzivatela():
    parametre= request.form
    user = parametre.get('user')
    a = connectpg()
    c = a.cursor(cursor_factory=psycopg2.extras.DictCursor)
    query = 'Select id,nazov,cena,kategoria,typ,popis,hashtag,inserted_at::text,uzivatel from portal Where uzivatel = %s'
    to_filter = []
    to_filter.append(user)
    c.execute(query, to_filter)
    t = c.fetchall()
    c.close()
    a.close()
    dict_result = []
    for row in t:
        dict_result.append(dict(row))

    a = connectpg()
    c = a.cursor(cursor_factory=psycopg2.extras.DictCursor)
    query = 'Select aktivity.id,nazov,popis,dni,aktivity.datefrom::text, aktivity.dateto::text, aktivity.casod::text, aktivity.casdo::text,min, max, ciselnik_uzivatelia.email, lokalita, opakuje, (Select count(*) from aktivity_prihlaseny where id_aktivity = aktivity.id) as pocet_prihlasenych from aktivity join ciselnik_uzivatelia on (owner = ciselnik_uzivatelia.id) Where owner = (Select ciselnik_uzivatelia.id from ciselnik_uzivatelia where email = %s)'
    to_filter = []
    to_filter.append(user)
    c.execute(query, to_filter)
    t = c.fetchall()
    c.close()
    a.close()  
    for row in t:
        dict_result.append(dict(row))
    
    js = json.dumps(dict_result, ensure_ascii=False).encode('utf8')
    return js.decode()

@app.route("/upravprodukt" , methods=['POST'])
def upravprodukt():
    parametre= request.form
    idcko = parametre.get('id')
    kategoria = parametre.get('kategoria')
    typ = parametre.get('typ')
    nazov = parametre.get('nazov')
    popis = parametre.get('popis') 
    hashtag = parametre.get('hashtag')
    uzivatel = parametre.get('uzivatel')
    cena = parametre.get('cena')
    a = connectpg()
    c = a.cursor(cursor_factory=psycopg2.extras.DictCursor)
    query = 'Update portal set nazov = %s,cena = %s,kategoria = %s,typ = %s,popis = %s,hashtag= %s,uzivatel=%s where id = %s;'
    to_filter = [nazov,cena,int(kategoria),int(typ),popis,hashtag,uzivatel, int(idcko)]
    c.execute(query, to_filter)
    a.commit()
    c.close()
    a.close()
    return ''

@app.route("/upravakivity" , methods=['POST'])
def upravakivity():
    parametre= request.form
    idcko = parametre.get('id')
    nazov = parametre.get('nazov')
    popis = parametre.get('popis') 
    datefrom = parametre.get('datefrom')
    dateto = parametre.get('dateto')
    casod = parametre.get('casod')
    casdo = parametre.get('casdo')
    pocet = parametre.get('pocet')
    lokalita = parametre.get('lokalita')
    opakuje = parametre.get('opakuje')
    dni = parametre.get('dni')
    min_pocet = parametre.get('min')
    a = connectpg()
    c = a.cursor(cursor_factory=psycopg2.extras.DictCursor)
    query = 'Update aktivity set nazov = %s, popis = %s, datefrom = %s, dateto = %s, casod = %s, casdo = %s, max = %s, lokalita = %s, opakuje = %s, dni = %s, min = %s where id = %s;'
    to_filter = [nazov,popis,datefrom,dateto,casod,casdo,int(pocet),lokalita,opakuje,dni, int(min_pocet), int(idcko)]
    c.execute(query, to_filter)
    a.commit()
    c.close()
    a.close()
    return ''

@app.route("/odstranprodukt" , methods=['POST'])
def odstranprodukt():
    parametre= request.form
    idcko = parametre.get('id')
    a = connectpg()
    c = a.cursor(cursor_factory=psycopg2.extras.DictCursor)
    query = 'Delete from portal where id = %s;'
    to_filter = [int(idcko)]
    c.execute(query, to_filter)
    a.commit()
    c.close()
    a.close()
    return ''

@app.route("/odstrankivitu" , methods=['POST'])
def odstranaktivitu():
    parametre= request.form
    idcko = parametre.get('id')
    a = connectpg()
    c = a.cursor(cursor_factory=psycopg2.extras.DictCursor)
    query = 'Delete from aktivity where id = %s;'
    to_filter = [int(idcko)]
    c.execute(query, to_filter)
    a.commit()
    query = 'Delete from aktivity_prihlaseny where id_aktivity = %s;'
    c.execute(query, to_filter)
    a.commit()
    c.close()
    a.close()
    return ''



@app.route("/selectjedenprodukt" , methods=['POST'])
def selectjeden():
    parametre= request.form
    idcko = parametre.get('id')
    a = connectpg()
    c = a.cursor(cursor_factory=psycopg2.extras.DictCursor)
    query = 'Select id,nazov,cena,kategoria,typ,popis,hashtag,inserted_at::text,uzivatel from portal Where id = %s'
    to_filter = []
    to_filter.append(idcko)
    c.execute(query, to_filter)
    t = c.fetchall()
    c.close()
    a.close()
    dict_result = []
    for row in t:
        dict_result.append(dict(row))
    js = json.dumps(dict_result, ensure_ascii=False).encode('utf8')
    return js.decode()

@app.route("/selectjednuaktivitu" , methods=['POST'])
def selectjednuaktivitu():
    parametre= request.form
    idcko = parametre.get('id')
    a = connectpg()
    c = a.cursor(cursor_factory=psycopg2.extras.DictCursor)
    query = 'Select aktivity.id,nazov,popis,dni,aktivity.datefrom::text, aktivity.dateto::text, aktivity.casod::text, aktivity.casdo::text,min, max, ciselnik_uzivatelia.email, lokalita, opakuje, (Select count(*) from aktivity_prihlaseny where id_aktivity = aktivity.id) as pocet_prihlasenych from aktivity join ciselnik_uzivatelia on (owner = ciselnik_uzivatelia.id) Where aktivity.id = %s'
    to_filter = []
    to_filter.append(idcko)
    c.execute(query, to_filter)
    t = c.fetchall()
    c.close()
    a.close()
    dict_result = []
    for row in t:
        dict_result.append(dict(row))
    js = json.dumps(dict_result, ensure_ascii=False).encode('utf8')
    return js.decode()

@app.route("/selectprihlaseneaktivity" , methods=['POST'])
def selectprihlaseneaktivity():
    parametre= request.form
    user = parametre.get('owner')
    a = connectpg()
    c = a.cursor(cursor_factory=psycopg2.extras.DictCursor)
    query = 'Select aktivity.id,nazov,popis,dni,aktivity.datefrom::text, aktivity.dateto::text, aktivity.casod::text, aktivity.casdo::text,min, max, ciselnik_uzivatelia.email, lokalita, opakuje, (Select count(*) from aktivity_prihlaseny where id_aktivity = aktivity.id) as pocet_prihlasenych from aktivity join ciselnik_uzivatelia on (owner = ciselnik_uzivatelia.id) Where aktivity.id in (Select id_aktivity from aktivity_prihlaseny where id_uzivatel = ( Select ciselnik_uzivatelia.id from ciselnik_uzivatelia where email = %s))'
    to_filter = []
    to_filter.append(user)
    c.execute(query, to_filter)
    t = c.fetchall()
    c.close()
    a.close()
    dict_result = []
    for row in t:
        dict_result.append(dict(row))
    js = json.dumps(dict_result, ensure_ascii=False).encode('utf8')
    return js.decode()

@app.route("/odhlaszaktivity" , methods=['POST'])
def odhlaszaktivity():
    parametre= request.form
    idcko = parametre.get('id')
    user = parametre.get('uzivatel')
    a = connectpg()
    c = a.cursor(cursor_factory=psycopg2.extras.DictCursor)
    query = 'Delete from aktivity_prihlaseny where id_aktivity = %s and id_uzivatel = (Select ciselnik_uzivatelia.id from ciselnik_uzivatelia where email = %s);'
    to_filter = [int(idcko),user]
    c.execute(query, to_filter)
    a.commit()
    c.close()
    a.close()
    return ''

@app.route("/searchakivit" , methods=['POST'])
def searchakivit():
    parametre= request.form
    nazov = parametre.get('nazov')
    datefrom = parametre.get('datefrom')
    dateto = parametre.get('dateto')
    casod = parametre.get('casod')
    casdo = parametre.get('casdo')
    dni = parametre.get('dni')
    hladane_vyrazy = []
    if nazov:
        hladane_vyrazy = [i.strip() for i in re.split('[, ]', nazov) if i.strip() != '']
    a = connectpg()
    c = a.cursor(cursor_factory=psycopg2.extras.DictCursor)
    query = 'Select aktivity.id,nazov,popis,dni,aktivity.datefrom::text, aktivity.dateto::text, aktivity.casod::text, aktivity.casdo::text,min, max, ciselnik_uzivatelia.email,lokalita, opakuje, (Select count(*) from aktivity_prihlaseny where id_aktivity = aktivity.id) as pocet_prihlasenych from aktivity join ciselnik_uzivatelia on (owner = ciselnik_uzivatelia.id) WHERE'
    to_filter = []
    if len(hladane_vyrazy) != 0:
        query += ' (('
        for i in hladane_vyrazy:            
            query += ' unaccent(lower(nazov)) like \'%%\'||unaccent(lower(%s))||\'%%\' AND'
            to_filter.append(i)
        query = query[:-4]    
        query += ') OR ('
        for i in hladane_vyrazy:    
            query += ' unaccent(lower(popis)) like \'%%\'||unaccent(lower(%s))||\'%%\' AND'
            to_filter.append(i)
        query = query[:-4]
        query += ')) AND'
    if dni:
        query += ' dni && %s AND'
        dni = [i.strip() for i in re.split(',', dni) if i.strip() != '']
        to_filter.append(dni)
    if datefrom and dateto :
        query += ' (%s between datefrom and dateto ) OR (%s between datefrom and dateto )AND'
        to_filter.append(datefrom)
        to_filter.append(dateto)
    if casod:
        query += ' (%s between casod and casdo ) AND'
        to_filter.append(casod)
    if casdo:
        if casod:
            query = query[:-3]
            query += ' OR '
        query += ' (%s between casod and casdo ) AND'
        to_filter.append(casdo)
    if query[-1] == 'D':
        query = query[:-3]
    if not (nazov or datefrom or dateto or casod or casdo or dni) or query[-1] == 'E':
        query = 'Select aktivity.id,nazov,popis,dni,aktivity.datefrom::text, aktivity.dateto::text, aktivity.casod::text, aktivity.casdo::text,min, max, ciselnik_uzivatelia.email, lokalita, opakuje, (Select count(*) from aktivity_prihlaseny where id_aktivity = aktivity.id) as pocet_prihlasenych from aktivity join ciselnik_uzivatelia on (owner = ciselnik_uzivatelia.id)'
    c.execute(query, to_filter)
    a.commit()
    t = c.fetchall()
    c.close()
    a.close()
    dict_result = []
    for row in t:
        dict_result.append(dict(row))
    js = json.dumps(dict_result, ensure_ascii=False).encode('utf8')
    return js.decode()



@app.route("/pridajakivitu" , methods=['POST'])
def pridajakivitu():
    parametre= request.form
    owner = parametre.get('owner')
    nazov = parametre.get('nazov')
    popis = parametre.get('popis') 
    datefrom = parametre.get('datefrom')
    dateto = parametre.get('dateto')
    casod = parametre.get('casod')
    casdo = parametre.get('casdo')
    pocet = parametre.get('pocet')
    lokalita = parametre.get('lokalita')
    opakuje = parametre.get('opakuje')
    dni = parametre.get('dni')
    min_pocet = parametre.get('min')
    dni = [i.strip() for i in re.split(',', dni) if i.strip() != '']
    if not min_pocet:
        min_pocet = 0
    if not pocet:
        pocet = 0
    if not dateto:
        dateto = datefrom
    a = connectpg()
    c = a.cursor(cursor_factory=psycopg2.extras.DictCursor)
    if casdo:
        query = 'INSERT INTO aktivity (nazov, popis, datefrom, dateto, casod, casdo, max, lokalita , opakuje, dni , min, owner) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s, (Select id from ciselnik_uzivatelia where email = %s) )'
        to_filter = [nazov,popis,datefrom,dateto,casod,casdo,int(pocet),lokalita,opakuje,dni, int(min_pocet), owner]
    else:
        query = 'INSERT INTO aktivity (nazov, popis, datefrom, dateto, casod, casdo, max, lokalita , opakuje, dni , min, owner) VALUES (%s,%s,%s,%s,%s,\'24:00:00\',%s,%s,%s,%s,%s, (Select id from ciselnik_uzivatelia where email = %s) )'
        to_filter = [nazov,popis,datefrom,dateto,casod,int(pocet),lokalita,opakuje,dni, int(min_pocet), owner]
    c.execute(query, to_filter)
    a.commit()
    c.close()
    a.close()
    return ''

if __name__ == "__main__":
    #app.run(host='0.0.0.0')
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

