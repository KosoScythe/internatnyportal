var url = "http://68.183.71.15:5000/"

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

function menuButton() {
	var h = document.getElementById('mnBt').innerHTML;
	if (loggedUser()) {
		h = '<p>Prihlásený ako: ' + localStorage.getItem('user') + '</p>' + h;
		h += "<button class='btn bg-warning btn-rounded' onclick = 'logOut()';' >Odhlásiť sa</button>";
		document.getElementById('mnBt').innerHTML = h;
	}
	else {
		h += "<fb:login-button class='btn btn-info btn-rounded' id='M-btn-prihlas' scope='public_profile,email' onlogin='checkLoginState();'></fb:login-button>";
		document.getElementById('mnBt').innerHTML = h;
	}
}

function pridajInzerat() {
	if (loggedUser()) {
		window.location.href = "inzerat.html";
	}
	else {
		window.location.href = "facebook-login.html";
	}
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
		document.getElementById('semPridaj').innerHTML = "";
		document.getElementById('semPridaj').innerHTML = "<a href='#' class='list-group-item list-group-item-action flex-column align-items-start bg-light rounded'><div class='d-flex w-100 justify-content-between'><h5 class='mb-1'>" + localStorage.getItem('nazov') + "</h5><h5 class='mb-1'><b>Cena: " + localStorage.getItem('cena') + "</b></h5><small>dnes</small></div><p class='mb-1'>" + localStorage.getItem('popis') + "</p></a>";
	}
}
function findInDatabase(stranka='n'){
	/*if (stranka == 'aktivity') {
		hashtag = document.getElementById('hashtag').value;
	}
	else {
		kategoria = document.getElementById('kategoria').value;
		typ = document.getElementById('typ').value;
		hashtag = document.getElementById('hashtag').value;
		console.log(kategoria,typ, hashtag);
	}
	
	return false;*/
	console.log("Leeeeeeeeeeroy");
	var xmlhttp = new XMLHttpRequest();
	var url = url + "kategoria";
	
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var data2 = JSON.parse(this.responseText);
			vypisLog(data2);
		}
	}
	xmlhttp.open("POST", url, true);
	xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	var tmp = "?kategoria=1";
	xmlhttp.send(tmp);
	return false;
}

function checkWords(res) {
	for (var i = 0; i < res.length; i++){
		if (res[i] == "elektro" || res[i] == "nabijacka" || res[i] == "charger"|| res[i] == "usbc" || res[i] == "usbc nabijacka" || res[i] == "nabijacka usbc" || res[i] == "usb-c nabijacka") {
			return true;
		}
	}
	return false;
}