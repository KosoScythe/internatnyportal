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
	var tmp = 'nazov=' + nazov + '&cena=' + cena + '&typ=' + typ + '&kategoria=' + kategoria + '&popis=' + popis + '&hashtag=' + hashtagy + '&uzivatel=' + response.email;
	insertAdIntoDatabase(tmp);
}

function insertAdIntoDatabase(tmp) {
	var xmlhttp = new XMLHttpRequest();
	var url = "https://internatnyportalxyz.xyz:5000/";
	url = url + "insert";
	
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		}
	}
	xmlhttp.open("POST", url, true);
	xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlhttp.send(tmp);
	return false;
}

function showLatestAd(typ, kategoria) {
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
	url = url + "nove";
	
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var data = JSON.parse(this.responseText);
			JsonAndContent(data);
		}
	}
	xmlhttp.open("POST", url, true);
	xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlhttp.send(tmp);
	return false;
}

function findInDatabase(stranka){
	var tmp = null;
	if (stranka == 'aktivity') {
		console.log('a');
		hashtag = document.getElementById('hashtag').value;
		tmp = 'typ=5'
		if (hashtag) {
			tmp += "&nazov=" + hashtag;
		}
	}
	else {
		console.log('b');
		kategoria = document.getElementById('kategoria').value;
		typ = document.getElementById('typ').value;
		hashtag = document.getElementById('hashtag').value;
		tmp = "kategoria=" + kategoria +"&typ=" + typ;
		if (hashtag){
			tmp += "&nazov=" + hashtag;
		}
	}

	databaseConnector(tmp);

	return false;
}

function databaseConnector(tmp){
	var xmlhttp = new XMLHttpRequest();
	var url = "https://internatnyportalxyz.xyz:5000/";
	url = url + "kategoria";
	
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var data = JSON.parse(this.responseText);
			JsonAndContent(data);
		}
	}
	xmlhttp.open("POST", url, true);
	xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	console.log(tmp);
	xmlhttp.send(tmp);
	return false;
}

function JsonAndContent(data) {
	console.log(data);
	var content = '';
	if (data.length > 0) {
		for (var i  = 0; i < data.length; i++){
			var diel = data[i];
			content += 	"<div class='card'>"+
							"<div class='card-body'>" +
								"<div class='row'>" +
									"<div class='col'>" +
										"<h5 class='card-title'>" + diel["nazov"] +"</h5>" + 
									"</div>" +
									"<div class='col'>" +
										"<p class='card-text'>Cena: "+ diel["cena"] +"</p>" + 
									"</div>" +
								"</div>" +
								"<p class='card-text'>"+ diel["popis"] +"</p>" + 
								"<p class='card-text'>"+ diel["hashtag"] +"</p>" + 
								"<a href='https://www.facebook.com/tomas.koso.kosec' class='btn btn-primary float-right' target='_blank'>Kontaktuj predajcu cez Facebook</a>" +
							"</div>"+
						"</div>"
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
