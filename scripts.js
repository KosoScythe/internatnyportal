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
function dummy(){
	console.log('User: ' + localStorage.getItem('user'));
	var option = document.getElementById('inputGroupSelect01').value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
	var res = document.getElementById('dummyInput').value.split("#");
	
	if (checkWords(res)) {
		if (option == "Ponuky"){
			document.getElementById('semPridaj').innerHTML = "";
			document.getElementById('semPridaj').innerHTML = '<a href="#" class="list-group-item list-group-item-action flex-column align-items-start bg-light rounded" data-toggle="modal" data-target="#exampleModal"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">Predám USB-C nabíjačku</h5><h5 class="mb-1"><b>Cena: </b>6€</h5><small>pred 4 dňami</small></div><p class="mb-1">Predám USB - C nabíjačku. Bývam na Šturáku na izbe VBA 906.</p></a>';
			
		}
		else if (option == "Dopyt") {
			document.getElementById('semPridaj').innerHTML = "";
			document.getElementById('semPridaj').innerHTML += '<a href="#" class="list-group-item list-group-item-action flex-column align-items-start bg-light rounded"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">Kúpim USB-C nabíjačku</h5><small>pred 1 dňom</small></div><p class="mb-1">Kúpim USB - C nabíjačku. ASAP plz.</p></a>';
			document.getElementById('semPridaj').innerHTML += '<a href="#" class="list-group-item list-group-item-action flex-column align-items-start bg-light rounded"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">Nabíjačka na iPhone</h5><small>pred 1 dňom</small></div><p class="mb-1">Potrebujem nabíjačku na iPhone.</p></a>';
			document.getElementById('semPridaj').innerHTML += '<a href="#" class="list-group-item list-group-item-action flex-column align-items-start bg-light rounded"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">Niekto usb c naijacku?</h5><small>pred 2 dňami</small></div><p class="mb-1">Niekto podarovat nabijacku usb c ? zaplatim palenkov abo pivkom</p></a>';
		}
		else if (option == "Oboje"){
			document.getElementById('semPridaj').innerHTML = "";
			document.getElementById('semPridaj').innerHTML += '<a href="#" class="list-group-item list-group-item-action flex-column align-items-start bg-light rounded" data-toggle="modal" data-target="#exampleModal"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">Predám USB-C nabíjačku</h5><h5 class="mb-1"><b>Cena: </b>6€</h5><small>pred 4 dňami</small></div><p class="mb-1">Predám USB - C nabíjačku. Bývam na Šturáku na izbe VBA 906.</p></a>';
			document.getElementById('semPridaj').innerHTML += '<a href="#" class="list-group-item list-group-item-action flex-column align-items-start bg-light rounded"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">Kúpim USB-C nabíjačku</h5><small>pred 1 dňom</small></div><p class="mb-1">Kúpim USB - C nabíjačku. ASAP plz.</p></a>';
			document.getElementById('semPridaj').innerHTML += '<a href="#" class="list-group-item list-group-item-action flex-column align-items-start bg-light rounded"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">Nabíjačka na iPhone</h5><small>pred 1 dňom</small></div><p class="mb-1">Potrebujem nabíjačku na iPhone.</p></a>';
			document.getElementById('semPridaj').innerHTML += '<a href="#" class="list-group-item list-group-item-action flex-column align-items-start bg-light rounded"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">Niekto usb c naijacku?</h5><small>pred 2 dňami</small></div><p class="mb-1">Niekto podarovat nabijacku usb c ? zaplatim palenkov abo pivkom</p></a>';
		}
	}
	else {
		if (option == "Ponuky"){
			document.getElementById('semPridaj').innerHTML = "";
			document.getElementById('semPridaj').innerHTML += '<a href="#" class="list-group-item list-group-item-action flex-column align-items-start bg-light rounded"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">Predám spinkovačku</h5><h5 class="mb-1"><b>Cena: </b>1€</h5><small>pred 2 dňami</small></div><p class="mb-1">Predám spinkovačku aj s 500 spinkami</p></a>';
			document.getElementById('semPridaj').innerHTML += '<a href="#" class="list-group-item list-group-item-action flex-column align-items-start bg-light rounded"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">Predám kaktus</h5><h5 class="mb-1"><b>Cena: </b>Zdarma</h5><small>pred 10 dňami</small></div><p class="mb-1">Predám kaktus s menom Jožko. Verný spoločník pri depresiách</p></a>';
			document.getElementById('semPridaj').innerHTML += '<a href="#" class="list-group-item list-group-item-action flex-column align-items-start bg-light rounded"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">ALKOHOL</h5><h5 class="mb-1"><b>Cena: </b>10€</h5><small>pred 1 dňom</small></div><p class="mb-1">Predám domácu slivovicu, viac info správa</p></a>';
			document.getElementById('semPridaj').innerHTML += '<a href="#" class="list-group-item list-group-item-action flex-column align-items-start bg-light rounded" data-toggle="modal" data-target="#exampleModal"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">Predám USB-C nabíjačku</h5><h5 class="mb-1"><b>Cena: </b>6€</h5><small>pred 4 dňami</small></div><p class="mb-1">Predám USB - C nabíjačku. Bývam na Šturáku na izbe VBA 906.</p></a>';
		}
		else if (option == "Dopyt") {
			document.getElementById('semPridaj').innerHTML = "";
			document.getElementById('semPridaj').innerHTML += '<a href="#" class="list-group-item list-group-item-action flex-column align-items-start bg-light rounded"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">Kúpim USB-C nabíjačku</h5><small>pred 1 dňom</small></div><p class="mb-1">Kúpim USB - C nabíjačku. ASAP plz.</p></a>';
			document.getElementById('semPridaj').innerHTML += '<a href="#" class="list-group-item list-group-item-action flex-column align-items-start bg-light rounded"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">Nabíjačka na iPhone</h5><small>pred 1 dňom</small></div><p class="mb-1">Potrebujem nabíjačku na iPhone.</p></a>';
			document.getElementById('semPridaj').innerHTML += '<a href="#" class="list-group-item list-group-item-action flex-column align-items-start bg-light rounded"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">Niekto usb c naijacku?</h5><small>pred 2 dňami</small></div><p class="mb-1">Niekto podarovat nabijacku usb c ? zaplatim palenkov abo pivkom</p></a>';
			document.getElementById('semPridaj').innerHTML += '<a href="#" class="list-group-item list-group-item-action flex-column align-items-start bg-light rounded"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">Dezinfekcia</h5><small>pred 1 dňom</small></div><p class="mb-1">Kúpim akúkoľvek dezinfekciu na ruky</p></a>';
			document.getElementById('semPridaj').innerHTML += '<a href="#" class="list-group-item list-group-item-action flex-column align-items-start bg-light rounded"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">Niekto sušiak na prádlo?</h5><small>pred 1 dňom</small></div><p class="mb-1">Kúpim sušiak na prádlo, aj starší, diky.</p></a>';
			document.getElementById('semPridaj').innerHTML += '<a href="#" class="list-group-item list-group-item-action flex-column align-items-start bg-light rounded"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">Kúpim domácu</h5><small>pred 3 dňami</small></div><p class="mb-1"><p class="mb-1">Kúpim akúkoľvek domácu, VBA906</p></a>';
		}
		else if (option == "Oboje"){
			document.getElementById('semPridaj').innerHTML = "";
			document.getElementById('semPridaj').innerHTML += '<a href="#" class="list-group-item list-group-item-action flex-column align-items-start bg-light rounded"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">Kúpim USB-C nabíjačku</h5><small>pred 1 dňom</small></div><p class="mb-1">Kúpim USB - C nabíjačku. ASAP plz.</p></a>';
			document.getElementById('semPridaj').innerHTML += '<a href="#" class="list-group-item list-group-item-action flex-column align-items-start bg-light rounded"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">Nabíjačka na iPhone</h5><small>pred 1 dňom</small></div><p class="mb-1">Potrebujem nabíjačku na iPhone.</p></a>';
			document.getElementById('semPridaj').innerHTML += '<a href="#" class="list-group-item list-group-item-action flex-column align-items-start bg-light rounded"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">Niekto usb c naijacku?</h5><small>pred 2 dňami</small></div><p class="mb-1">Niekto podarovat nabijacku usb c ? zaplatim palenkov abo pivkom</p></a>';
			document.getElementById('semPridaj').innerHTML += '<a href="#" class="list-group-item list-group-item-action flex-column align-items-start bg-light rounded"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">Dezinfekcia</h5><small>pred 1 dňom</small></div><p class="mb-1">Kúpim akúkoľvek dezinfekciu na ruky</p></a>';
			document.getElementById('semPridaj').innerHTML += '<a href="#" class="list-group-item list-group-item-action flex-column align-items-start bg-light rounded"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">Niekto sušiak na prádlo?</h5><small>pred 1 dňom</small></div><p class="mb-1">Kúpim sušiak na prádlo, aj starší, diky.</p></a>';
			document.getElementById('semPridaj').innerHTML += '<a href="#" class="list-group-item list-group-item-action flex-column align-items-start bg-light rounded"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">Kúpim domácu</h5><small>pred 3 dňami</small></div><p class="mb-1"><p class="mb-1">Kúpim akúkoľvek domácu, VBA906</p></a>';
			document.getElementById('semPridaj').innerHTML += '<a href="#" class="list-group-item list-group-item-action flex-column align-items-start bg-light rounded"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">Predám spinkovačku</h5><h5 class="mb-1"><b>Cena: </b>1€</h5><small>pred 2 dňami</small></div><p class="mb-1">Predám spinkovačku aj s 500 spinkami</p></a>';
			document.getElementById('semPridaj').innerHTML += '<a href="#" class="list-group-item list-group-item-action flex-column align-items-start bg-light rounded"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">Predám kaktus</h5><h5 class="mb-1"><b>Cena: </b>Zdarma</h5><small>pred 10 dňami</small></div><p class="mb-1">Predám kaktus s menom Jožko. Verný spoločník pri depresiách</p></a>';
			document.getElementById('semPridaj').innerHTML += '<a href="#" class="list-group-item list-group-item-action flex-column align-items-start bg-light rounded"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">ALKOHOL</h5><h5 class="mb-1"><b>Cena: </b>10€</h5><small>pred 1 dňom</small></div><p class="mb-1">Predám domácu slivovicu, viac info správa</p></a>';
			document.getElementById('semPridaj').innerHTML += '<a href="#" class="list-group-item list-group-item-action flex-column align-items-start bg-light rounded" data-toggle="modal" data-target="#exampleModal"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">Predám USB-C nabíjačku</h5><h5 class="mb-1"><b>Cena: </b>6€</h5><small>pred 4 dňami</small></div><p class="mb-1">Predám USB - C nabíjačku. Bývam na Šturáku na izbe VBA 906.</p></a>';
		}
	}
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