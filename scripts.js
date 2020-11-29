var url = "http://68.183.71.15:5000/";

function logIn() {
	var url = window.location.href;
	url = url.substring(41, url.length);
	localStorage.setItem('location', url);
	window.location.href = "facebook-login.html";
}

function logOut() {
	localStorage.setItem('user', 'none');
	location.reload();
}
			
function setUserOnLoad() {
	if (localStorage.getItem('user') == null) {
		localStorage.setItem('user', 'none');
	}
}

function logUser() {
	localStorage.setItem('user', document.getElementById('exampleInputEmail1').value);
	console.log(localStorage.getItem('user'));
	window.location.href = localStorage.getItem('location');
}

function loggedUser() {
	if (localStorage.getItem('user') == 'none') {
		return false;
	} 
	return true;
}


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


function acceptInz() {
	localStorage.setItem('nazov', document.getElementById('nazov').value);
	localStorage.setItem('cena', document.getElementById('cena').value);
	localStorage.setItem('popis', document.getElementById('popis').value);
	localStorage.setItem('hashtagy', document.getElementById('hashtagy').value);
	window.location.href = "sluzby.html";
}

function showroom() {
	if (localStorage.getItem('cena') != null) {
		document.getElementById('content').innerHTML = "";
		document.getElementById('content').innerHTML = "<a href='#' class='list-group-item list-group-item-action flex-column align-items-start bg-light rounded'><div class='d-flex w-100 justify-content-between'><h5 class='mb-1'>" + localStorage.getItem('nazov') + "</h5><h5 class='mb-1'><b>Cena: " + localStorage.getItem('cena') + "</b></h5><small>dnes</small></div><p class='mb-1'>" + localStorage.getItem('popis') + "</p></a>";
	}
}
function findInDatabase(stranka){
	var tmp = null;
	if (stranka == 'aktivity') {
		hashtag = document.getElementById('hashtag').value;
		if (hashtag) {
			tmp = "hashtag=" + hashtag;
		}
	}
	else {
		kategoria = document.getElementById('kategoria').value;
		typ = document.getElementById('typ').value;
		hashtag = document.getElementById('hashtag').value;
		tmp = "kategoria=" + kategoria +"&typ=" + typ;
		if (hashtag){
			tmp + "&hashtag=" + hashtag;
		}
	}

	databaseConnector(tmp);

	return false;
}

function databaseConnector(tmp){
	var xmlhttp = new XMLHttpRequest();
	var url = "http://68.183.71.15:5000/";
	url = url + "kategoria";
	
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

function JsonAndContent(data) {
	console.log(data);
	if (data.length > 0) {
		for (var i  = 0; i < data.length; i++){
			var diel = data[i];
			var content = "<div class='card'>"+
			"<div class='card-body'>" +
				"<h5 class='card-title'>" + diel["nazov"] +"</h5>" + 
				"<p class='card-text'>"+ diel["popis"] +"</p>" + 
				"<a href='https://www.facebook.com/tomas.koso.kosec' class='btn btn-primary' target='_blank'>Kontaktuj predajcu cez Facebook</a>" +
			"</div>"+
		"</div>"
		}
	}
	else {
		var content = "<h2>Sorry, nič také som nenašiel :(</h2>";
	}
	
	document.getElementById('content').innerHTML = content;
}

function checkWords(res) {
	for (var i = 0; i < res.length; i++){
		if (res[i] == "elektro" || res[i] == "nabijacka" || res[i] == "charger"|| res[i] == "usbc" || res[i] == "usbc nabijacka" || res[i] == "nabijacka usbc" || res[i] == "usb-c nabijacka") {
			return true;
		}
	}
	return false;
}