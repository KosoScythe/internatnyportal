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

// This is called with the results from from FB.getLoginStatus().
      function statusChangeCallback(response) {
      console.log('statusChangeCallback');
      console.log(response);
      // The response object is returned with a status field that lets the
      // app know the current login status of the person.
      // Full docs on the response object can be found in the documentation
      // for FB.getLoginStatus().
      if (response.status === 'connected') {
      // Logged into your app and Facebook.
      testAPI();
      } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      //document.getElementById('status').innerHTML = 'Login with Facebook ';
      } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      //document.getElementById('status').innerHTML = 'Login with Facebook ';
      }
      }
      // This function is called when someone finishes with the Login
      // Button. See the onlogin handler attached to it in the sample
      // code below.
      function checkLoginState() {
      FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
      });
      }
      window.fbAsyncInit = function() {
      FB.init({
      appId : '2779146055678575',
      cookie : true, // enable cookies to allow the server to access
      // the session
      xfbml : true, // parse social plugins on this page
      version : 'v2.2' // use version 2.2
      });
      // Now that we've initialized the JavaScript SDK, we call
      // FB.getLoginStatus(). This function gets the state of the
      // person visiting this page and can return one of three states to
      // the callback you provide. They can be:
      //
      // 1. Logged into your app ('connected')
      // 2. Logged into Facebook, but not your app ('not_authorized')
      // 3. Not logged into Facebook and can't tell if they are logged into
      // your app or not.
      //
      // These three cases are handled in the callback function.
      
      FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
      });
      };
      // Load the SDK asynchronously
      (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
      
      var mail = '';

      function testAPI() {
        console.log('Welcome! Fetching your information.... ');
        FB.api('/me?fields=name,email', function(response) {
        console.log('Successful login for: ' + response.name);

       mail = response.email;
        
        var h = document.getElementById('mnBt').innerHTML;
        h = "<button id='rightUserButtons' class='btn btn-warning btn-rounded' onclick = 'pridajInzerat();'>Pridať inzerát</button>"
        h +="<button id='rightUserButtons' class='btn btn-warning btn-rounded' onclick = 'logOut();' >Odhlásiť sa</button>";
        document.getElementById('mnBt').innerHTML = h;
        
        $("#helpModal").modal('hide');
        $("#pridajModal").modal('hide');
        $("#loginModal").modal('hide');
     
      });
      }
     
       function logOut(){
        FB.logout();
        window.location.reload();

        var h = document.getElementById('mnBt').innerHTML;
        h = "<fb:login-button class='btn bg-warning btn-rounded' scope='public_profile,email' onlogin='checkLoginState();'></fb:login-button>";
        document.getElementById('mnBt').innerHTML = h;

       }
       
