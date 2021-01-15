var url = "https://internatnyportalxyz.xyz:5000/";

function pridajInzerat() {
  if(FB.getAuthResponse() != null) {
    window.location.href = "inzerat.html";
  } else {
    $("#pridajModal").modal();
  }
}

function prihlasSa() {
  $("#loginModal").modal();
}

function addAd() {
	var nazov = document.getElementById('nazov').value;
	var cena =  document.getElementById('cena').value;
	var typ =  document.getElementById('typ').value;
	var kategoria =  document.getElementById('kategoria').value;
	var popis = document.getElementById('popis').value;
	var hashtagy = document.getElementById('hashtagy').value;
	var tmp = 'nazov=' + nazov + '&cena=' + cena + '&typ=' + typ + '&kategoria=' + kategoria + '&popis=' + popis + '&hashtag=' + hashtagy + '&uzivatel=' + sessionStorage.getItem('email');
	insertAdIntoDatabase(tmp);
	if (typ == 1 || typ == 2) {
		window.open('produkty.html', "_self", function(){("#inzeratModal").modal("show");});
	}
	else if (typ == 4 || typ == 3) {
		window.open('sluzby.html',"_self", function(){("#inzeratModal").modal("show");});
	}
	else {
		window.open('aktivity.html', "_self", function(){("#inzeratModal").modal("show");});
	}
}

function addAd_activity() {
	var nazov = document.getElementById('nazov_podujatia').value;
	var datum_1=  document.getElementById('datepicker').value;
	var time_1 =  document.getElementById('timepicker').value;
	var datum_2 =  document.getElementById('datepicker2').value;
	var time_2 = document.getElementById('timepicker2').value;
	var typ_udalosti = document.getElementById('typ_udalosti').value;
	var lokalita = document.getElementById('lokalita').value;
	var pocet_ludi = document.getElementById('pocet_ludi').value;
	var pocet_ludi2 = document.getElementById('pocet_ludi2').value;
	var popis = document.getElementById('popis').value;
	var tmp =
	'owner' + sessionStorage.getItem('email') +   
	'&nazov=' + nazov + 
	'&popis=' + popis + 
	'&datefrom=' + datum_1 + 
	'&dateto=' + datum_2 + 
	'&casod=' + time_1 + 
	'&casdo=' + time_2 + 
	'&pocet=' + pocet_ludi2 +
	'&lokalita=' + lokalita +
	'&opakuje=' + typ_udalosti +
	'&dni=' + "?,?,?" +
	'&min_pocet=' + pocet_ludi;
	insertAdIntoDatabase_activity(tmp);
}

function insertAdIntoDatabase_activity(tmp) {
	var xmlhttp = new XMLHttpRequest();
	var url = "https://internatnyportalxyz.xyz:5000/";
	url = url + "pridajaktivitu";
	
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		}
	}
	xmlhttp.open("POST", url, false);
	xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlhttp.send(tmp);
	return false;
}


function insertAdIntoDatabase(tmp) {
	var xmlhttp = new XMLHttpRequest();
	var url = "https://internatnyportalxyz.xyz:5000/";
	url = url + "insert";
	
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		}
	}
	xmlhttp.open("POST", url, false);
	xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlhttp.send(tmp);
	return false;
}

function showLatestAd(typ, kategoria, urln=0) {
	var dul = window.localStorage.getItem("everything");
	if (dul != null) {
		var xmlhttp = new XMLHttpRequest();
		var url = "https://internatnyportalxyz.xyz:5000/allin";
		var tmp = 'nazov='+dul;
		window.localStorage.removeItem("everything");
		
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var data = JSON.parse(this.responseText);
				JsonAndContent(data);
			}
		}
		console.log(tmp);
		xmlhttp.open("POST", url, false);
		xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xmlhttp.send(tmp);
		return false;	
	}
	else {
		var tmp = '';
		if (typ != 0) {
			tmp += 'typ=' + typ;
		}
		else if (kategoria != 0) {
			if (typ) {
				tmp += '&kategoria=' + kategoria; 
			}
			else {
				tmp += 'kategoria=' + kategoria;
			}
		}

		if (!tmp) {
			tmp = null;
		}
		
		
		var xmlhttp = new XMLHttpRequest();
		var url = "https://internatnyportalxyz.xyz:5000/";
		if (urln == 0){
			url = url + "nove";
		}
		else {
			url = url + "vsetky";	
		}
		
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var data = JSON.parse(this.responseText);
				JsonAndContent(data);
			}
		}
		xmlhttp.open("POST", url, false);
		xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xmlhttp.send(tmp);
		return false;	
	}
}

function findInDatabase(stranka){
	var tmp = null;
	if (stranka == 'aktivity') {
		datepicker = document.getElementById('datepicker').value.split(' - ');
		date = "";

		nazov = document.getElementById('hashtag').value;
		datefrom = datepicker[0];
		dateto = datepicker[1];
		casod = document.getElementById('timepicker').value;
		casdo = document.getElementById('timepicker2').value;

		array = ["den-PO","den-UT","den-ST", "den-ŠT","den-PI","den-SO","den-NE"];
		for (let index = 0; index < array.length; index++) {
			var checkBox = document.getElementById(array[index]);
			if (checkBox.checked == true){
				date = checkBox.value + ",";
				date.pop();
			} 
		}
		tmp = "nazov=" + nazov + "&datefrom=" + datefrom + "&dateto=" + dateto + "&casod=" + casod + "&casdo=" + casdo + "&dni=" + dni; 
		
	}
	else {
		kategoria = document.getElementById('kategoria').value;
		typ = document.getElementById('typ').value;
		hashtag = document.getElementById('hashtag').value;
		tmp = "kategoria=" + kategoria +"&typ=" + typ;
		if (hashtag){
			tmp += "&nazov=" + hashtag;
		}
	}

	databaseConnector(tmp,stranka);

	return false;
}

function databaseConnector(tmp, stranka="kategoria"){
	var xmlhttp = new XMLHttpRequest();
	var url = "https://internatnyportalxyz.xyz:5000/";
	if (stranka == "aktivity"){
		url += "searchakivit";
	}
	else {
		url += "kategoria";
	}
	
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var data = JSON.parse(this.responseText);
			JsonAndContent(data, stranka);
		}
	}
	xmlhttp.open("POST", url, false);
	xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlhttp.send(tmp);
	return false;
}

function JsonAndContent(data, stranka="kategoria") {
	var content = '';
	if (data.length > 0) {
		for (var i  = 0; i < data.length; i++){
			var diel = data[i];
			console.log(diel);
			/*content += 	"<article id='karta' class='card'>"+
							"<div class='card-body'>" +
								"<div class='row'>" +
									"<div class='col'>" +
										"<h2 class='card-title'>" + diel["nazov"] +"</h2>" + 
									"</div>" +
									"<div class='col'>" +
										"<p class='card-text'>Cena: "+ diel["cena"] +"</p>" + 
									"</div>" +
								"</div>" +
								"<p class='card-text'>"+ diel["popis"] +"</p>" + 
								"<p class='card-text'>"+ diel["hashtag"] +"</p>" + 
								"<a href='https://www.facebook.com/tomas.koso.kosec' class='btn btn-primary float-right' target='_blank'>Kontaktuj predajcu cez Facebook</a>" +
							"</div>"+
						"</article>"*/
		}
	}
	else {
		var content = "<h2>Sorry, nič také som nenašiel :(</h2>";
	}
	
	document.getElementById('content').innerHTML = content;
}

function vyberKategoriu(){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const kat = urlParams.get('kat')
  if (kat != null){
    document.getElementById('kategoria').value=kat;
    findInDatabase();
  }
}

function findEverything() {
	hashtag = document.getElementById('hashtag').value;
	window.localStorage.setItem("everything", hashtag);
	window.location.href="https://internatnyportalxyz.xyz/vsetko.html";
}
       
function nacitajMojeInzeraty() {
  var tmp = '';
  tmp = 'user=' + sessionStorage.getItem('email');
  var xmlhttp = new XMLHttpRequest();
	var url = "https://internatnyportalxyz.xyz:5000/";
	url = url + "inzeratyuzivatela";
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var data = JSON.parse(this.responseText);
			spracujInzeraty(data);
		}
	}
	xmlhttp.open("POST", url, false);
	xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlhttp.send(tmp);
	return false;
}

function spracujInzeraty(data) {
  var s = '';
  if (data.length != 0) {
    s += '<table style="width:100%"> <tr>     <th style="width:60%">Moje inzeráty</th>     <th></th>    <th></th>   </tr> ';
    for (var i  = 0; i < data.length; i++){
      var diel = data[i];
      var inzerat = 'i';
      if (diel['dni'] != null) inzerat = 'a';
      s += '<tr><td>' + diel['nazov'] + '</td>';
      s +='<th><button class="btn btn-warning btn-rounded" onclick="upravInzerat(\'' + diel['id'] + '\',\'' + inzerat + '\')">Uprav inzerát</button></th>'; //TODO uprav inzerat asi idckodon, alebo tak
      s +='<th><button class="btn btn-warning btn-rounded" onclick="vymazInzerat(\'' + diel['id'] + '\',\'' + inzerat + '\')">Vymaž inzerát</button></th></tr>'; //TODO uprav inzerat asi idckodon, alebo tak
    }
    s += '</table>';
  } else {
    s = '<table style="width:100%"> <tr><th>Moje inzeráty</th></tr>  <tr><td> Nemáš vytvorené žiadne inzeráty :( </td></tr> </table>';
  }
  document.getElementById('moje_inzeraty').innerHTML = s;
}

function upravInzerat(id, inzerat) {
  var urlParams = '?idInz=' + id + '&inz=' + inzerat;
  window.location.href = 'inzerat_uprav.html' + urlParams;
}

function vymazInzerat(id, inzerat) {
  var tmp = '';
  tmp = 'id=' + id;
  var xmlhttp = new XMLHttpRequest();
  var url = "https://internatnyportalxyz.xyz:5000/";
  if (inzerat == 'i') {
    url = url + "odstranprodukt";
  } else {
    url = url + "odstrankivitu";
  }
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      location.reload();
    }
  }
  xmlhttp.open("POST", url, false);
  xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xmlhttp.send(tmp);
  return false;
}

function nacitajMojeAktivity() {
  var tmp = '';
  tmp = 'owner=' + sessionStorage.getItem('email');
  var xmlhttp = new XMLHttpRequest();
  var url = "https://internatnyportalxyz.xyz:5000/";
  url = url + "selectprihlaseneaktivity";
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);
      spracujAktivity(data);
    }
  }
  xmlhttp.open("POST", url, false);
  xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xmlhttp.send(tmp);
  return false;
}

function spracujAktivity(data) {
  var s = '';
  if (data.length != 0) {
    s += '<table style="width:100%"> <tr>     <th style="width:70%">Aktivity, kde som prihlásený</th>     <th></th>   </tr> ';
    for (var i  = 0; i < data.length; i++){
      var diel = data[i];
      s += '<tr><td>' + diel['nazov'];
      s +='</td><th><button class="btn btn-warning btn-rounded" onclick="odhlasZAktivity(\'' + diel['id'] + '\')">Odhlás</button></th></tr>'; //TODO uprav inzerat asi idckodon, alebo tak
    }
    s += '</table>';
  } else {
    s = '<table style="width:100%"> <tr><th>Aktivity, kde som prihlásený</th></tr>  <tr><td> Nie si prihlásený na žiadne akvitiy :( </td></tr> </table>';
  }
  document.getElementById('moje_aktivity').innerHTML = s;
}

function odhlasZAktivity(id) {
    var tmp = '';
    tmp = 'id=' + id;
    tmp += '&uzivatel=' + sessionStorage.getItem('email');
    var xmlhttp = new XMLHttpRequest();
    var url = "https://internatnyportalxyz.xyz:5000/";
    url = url + "odhlaszaktivity";
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        location.reload();
      }
    }
    xmlhttp.open("POST", url, false);
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send(tmp);
    return false;
}

function loadData() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('idInz');
  const i = urlParams.get('inz');
  if (id != null){
    inzeratAktivitaPodlaID(id, i);
  }
}

function inzeratAktivitaPodlaID(id, inz) {
  var tmp = '';
  tmp = 'id=' + id;
  var xmlhttp = new XMLHttpRequest();
	var url = "https://internatnyportalxyz.xyz:5000/";
  if (inz == 'i') {
  	url = url + "selectjedenprodukt";
  } else {
    url = url + "selectjednuaktivitu";
  }
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var data = JSON.parse(this.responseText);
			fillForm(data, id, i);
		}
	}
	xmlhttp.open("POST", url, false);
	xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlhttp.send(tmp);
	return false;
}


function fillForm(data, id, inz) {
  if (inz == 'i'){
    document.getElementById('kategoria').value = data[0]['kategoria'];
    document.getElementById('cena').value = data[0]['cena'];
    document.getElementById('hashtagy').value = data[0]['hashtag'];
  } else {
    // TODO vyplnenie formularu aktivit pri jej uprave
    document.getElementById('nazov podujatia').value =
    document.getElementById('datepicker').value = data[0]['datefrom'];
    document.getElementById('timepicker').value = data[0]['timefrom'];
    document.getElementById('pridaj_datum_cas').value =
    document.getElementById('datepicker2').value = data[0]['dateto'];
    document.getElementById('timepicker2').value = data[0]['timeto'];
    document.getElementById('typ_udalosti').value = data[0]['opakuje'];
    document.getElementById('dni').value = data[0]['dni'];
    document.getElementById('lokalita').value = data[0]['lokalita'];
    document.getElementById('pocet_ludi').value = data[0]['max'];
  }
  document.getElementById('nazov').value = data[0]['nazov'];
  document.getElementById('typ').value = data[0]['typ'];
  document.getElementById('popis').value = data[0]['popis'];
}

function aktualizujInzerat() {
  updateAd();
}

function updateAd (){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('idInz');
  var nazov = document.getElementById('nazov').value;
  var cena =  document.getElementById('cena').value;
  var typ =  document.getElementById('typ').value;
  var kategoria =  document.getElementById('kategoria').value;
  var popis = document.getElementById('popis').value;
  var hashtagy = document.getElementById('hashtagy').value;
  var tmp = 'id=' + id + '&nazov=' + nazov + '&cena=' + cena + '&typ=' + typ + '&kategoria=' + kategoria + '&popis=' + popis + '&hashtag=' + hashtagy + '&uzivatel=' + sessionStorage.getItem('email');
  var xmlhttp = new XMLHttpRequest();
  var url = "https://internatnyportalxyz.xyz:5000/";
  url = url + "upravprodukt";
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      window.location.href = 'moj_profil.html';
    }
  }
  xmlhttp.open("POST", url, false);
  xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xmlhttp.send(tmp);
  return false;
}

function updateActivity() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('idInz');

	var nazov = document.getElementById('nazov podujatia').value;
	var datum_zaciatku =  document.getElementById('datepicker').value;
	var cas_zaciatku =  document.getElementById('timepicker').value;
	var kategoria =  document.getElementById('pridaj_datum_cas').value;
	var datum_konca = document.getElementById('datepicker2').value;
	var cas_konca = document.getElementById('timepicker2').value;
	var typ_udalosti = document.getElementById('typ_udalosti').value;
	var dni = document.getElementById('dni').value;
	var lokalita = document.getElementById('lokalita').value;
	var pocet_ludi = document.getElementById('pocet_ludi').value;
	var popis = document.getElementById('popis').value;

	var tmp = 'id=' + id + '&nazov=' + nazov + '&popis=' + popis + '&datefrom=' + datum_zaciatku + '&dateto=' + datum_konca + '&casod=' + cas_zaciatku + '&casdo=' + cas_konca + '&pocet=' + pocet +'&lokalita=' + lokalita +'&opakuje=' + typ_udalosti +'&dni=' + dni;
  	var xmlhttp = new XMLHttpRequest();
	var url = "https://internatnyportalxyz.xyz:5000/";
	url = url + "upravakivity";
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
      console.log('upravAktivitu');
		}
	}
	xmlhttp.open("POST", url, false);
	xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlhttp.send(tmp);
	return false;
}

function pridajAktivitu(){
	if(FB.getAuthResponse() != null) {
		window.location.href = "pridaj_aktivitu.html";
	  } else {
		$("#pridajModal").modal();
	  }
}

function zvolDni(id){
	document.getElementById("den-kedykolvek").checked = false;
	r = "";
	pole = ["PO","UT","ST","ŠT","PI","SO","NE"];
	values = ["pon","uto","str","stv","pia","sob", "ned"];	
	for (i = 0; i < 7; i++){
		r += pole[i]+"<input type='checkbox' id='den-"+va[i]+"' value='"+ values[i] + "'>";
	}
	document.getElementById(id).innerHTML = r; 
}