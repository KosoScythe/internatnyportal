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
        neprihlaseny();
      // The person is logged into Facebook, but not your app.
      //document.getElementById('status').innerHTML = 'Login with Facebook ';
      } else {
        neprihlaseny();
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
      appId : '2820959324850465', //internatnyportalxyz.xyz
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
        //console.log('Welcome! Fetching your information.... ');
        FB.api('/me?fields=name,email', function(response) {
        //console.log('Successful login for: ' + response.name);

        sessionStorage.setItem('email', response.email);
        
        //h = "<button id='rightUserButtons' class='btn btn-warning btn-rounded' onclick = 'pridajInzerat();'>Pridať inzerát</button>";
        //h +="<button id='rightUserButtons' class='btn btn-warning btn-rounded' onclick = 'logOut();' >Odhlásiť sa</button>";
        //h += "<img id ='profileImage' src='' width='50' height='50' class=profilepic onclick='mojProfil()'>";
        //document.getElementById('mnBt').innerHTML = h;
        h = "<button id='pridaj_aktivitu' style='margin-right:1em' class='btn btn-warning btn-rounded' onclick = 'pridajAktivitu();'>Pridať aktivitu</button>";
        h += "<button id='btn-pridaj_inzerat' style='margin-right:1em' class='btn btn-warning btn-rounded' onclick = 'pridajInzerat();'>Pridať inzerát</button>";
				h += "<button id='btn-odhlas_sa' style='margin-right:1em' class='btn btn-warning btn-rounded' onclick = 'logOut();' >Odhlásiť sa</button>";
        h += "<img id ='btn-moj_profil'  src='' width='50' height='50' class='profilepic' onclick='mojProfil()'></img>";
        document.getElementById('mnBt').innerHTML = h;

        var im = document.getElementById("btn-moj_profil").setAttribute("src", "http://graph.facebook.com/" + response.id + "/picture?type=normal");
        
        $("#helpModal").modal('hide');
        $("#pridajModal").modal('hide');
        $("#loginModal").modal('hide');

        localStorage.setItem('prihlaseny', 'ANO');
     
      });
      }

      function neprihlaseny(){
        h = "<button id='pridaj_aktivitu' style='margin-right:1em' class='btn btn-warning btn-rounded' onclick = 'pridajAktivitu();'>Pridať aktivitu</button>";
        h += "<button id='btn-pridaj_inzerat' style='margin-right:1em' class='btn btn-warning btn-rounded' onclick = 'pridajInzerat();'>Pridať inzerát</button>";
			  h += "<button style='margin-right:1em' id='btn-prihlas_sa' class='btn btn-warning btn-rounded' onclick = 'prihlasSa()'>Prihlásiť sa</button>";
        document.getElementById('mnBt').innerHTML = h;
        
        localStorage.setItem('prihlaseny', 'NIE');
      }

       function mojProfil(){
         window.location.href = 'moj_profil.html';
       }
     
       function logOut(){
        FB.logout();

        window.location.reload();

        var h = document.getElementById('mnBt').innerHTML;
        h = "<fb:login-button class='btn bg-warning btn-rounded' scope='public_profile,email' onlogin='checkLoginState();'></fb:login-button>";
        document.getElementById('mnBt').innerHTML = h;

       }
       
