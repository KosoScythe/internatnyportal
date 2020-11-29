<!DOCTYPE html>

<html lang="sk">
	<head>
		<meta charset="utf-8">
		<title> Internátny portál </title>
		<link rel="shortcut icon" type="png" href= "img/icon.png" >
		<link rel="stylesheet" href="css.css">
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
		<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>
		<link href="fontawesome-free-5.15.1-web/css/all.css" rel="stylesheet">
		<script src="scripts.js"></script>
		<script src="fb.js"></script>
	</head>
	
	<body onload = "setUserOnLoad();">
		<nav class="navbar fixed-top navbar-dark bg-primary">
			<div class = "navbar-left">
				<div class = "navbar-brand">
					<a href = "index.php"> <img src = "img/icon2.png" > </a>
				</div>
				<a id = "navBarButton" class="navbar-brand" href="produkty.html">Produkty</a>
				<a id = "navBarButton" class="navbar-brand" href="sluzby.html">Služby</a>
				<a id = "navBarButton" class="navbar-brand" href="aktivity.html">Aktivity</a>
				<a id = "navBarButton" class="navbar-brand" href="#" data-toggle="modal" data-target="#helpModal"><img src="img/question.png" style="height: 3vh;"></a>
			</div>
			<div class = "navbar-right" id="mnBt">
        <button class='btn bg-warning btn-rounded' onclick = 'pridajInzerat();'>Pridať inzerát</button>
        <button class='btn bg-warning btn-rounded' onclick = 'prihlasSa()'>Prihlásiť sa</button>
        <!--
        <button class='btn bg-warning btn-rounded' onclick = 'force_click()'>Prihlásiť sa</button>
				<fb:login-button class='btn bg-warning btn-rounded' id="fbb" scope='public_profile,email' onlogin='checkLoginState();'></fb:login-button> 
        -->
			</div>
			
		</nav>
		<div class = "container">
			<div style="background-color: blue;">
		    <div class="polozky"><img class="obrazok" src="img/elektro.svg" /><small>Elektronika</small></div>
				<div class="polozky"><img class="obrazok" src="img/coffee.svg" /><small>Potraviny</small></div>
				<div class="polozky"><img class="obrazok" src="img/boardgame.svg" /><small>Stolové hry</small></div>
				<div class="polozky"><img class="obrazok" src="img/sport.svg" /><small>Šport</small></div>
				<div class="polozky"><img class="obrazok" src="img/coffee.svg" /><small>Iné veci</small></div>
				<div class="polozky"><img class="obrazok" src="img/coffee.svg" /><small>Ešte inšie</small></div>
				<div class="polozky"><img class="obrazok" src="img/coffee.svg" /><small>Úplne iné</small></div>
			</div>
		</div>
		<footer class="page-footer font-small bg-primary pt-4 d-flex flex-column" id = "footer">
			<div class="container-fluid text-center text-md-left bg-primary">
				<div class="row">
					<div class="col-md-6 mt-md-0 mt-3">
						<h5 class="text-uppercase">Internátny portál</h5>
						<p>Zlepšujeme život študentom na Mlynoch</p>
					</div>
					<hr class="clearfix w-100 d-md-none pb-3">
					<div class="col-md-3 mb-md-0 mb-3">
						<h5 class="text-uppercase">O portáli</h5>
						<ul class="list-unstyled">
							<li>
								<a id = "footerLink" href="portal.html">O nás</a>
							</li>
							<li>
								<a id = "footerLink" href="#!">Podmienky používania</a>
							</li>
							<li>
								<a id = "footerLink" href="#!">Ochrana osobných údajov</a>
							</li>
						</ul>
					</div>
					<div class="col-md-3 mb-md-0 mb-3">
						<h5 class="text-uppercase">Užitočné odkazy</h5>
						<ul class="list-unstyled">
						<li>
						<a id ="footerLink" href="https://mlyny.uniba.sk/">Mlyny</a>
						</li>
						<li>
						<a id = "footerLink" href="https://uniba.sk/">Uniba</a>
						</li>
						<li>
						<a id = "footerLink" href="https://www.stuba.sk/">STU</a>
						</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="footer-copyright text-center py-3">© 2020 Copyright: Filip Eliaš, Zuzana Hlávková, Tomáš Kosec, Maroš Malý
			</div>
		</footer>
		
		<!-- Modal HELP -->
			<div class="modal fade" id="helpModal" tabindex="-1" aria-labelledby="helpModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
				  <div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel">Nápoveda</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					  <span aria-hidden="true">&times;</span>
					</button>
				  </div>
				  <div class="modal-body">
					<div class="d-flex w-100 justify-content-between">
						<h5 class="mb-1">Vyhľadávanie inzerátov</h5>
					</div>
					<p class="mb-1">Pokiaľ chcete vyhľadávať produkty/služby/aktivity prejdite na príslušnú podstránku. Prvým krokom je výber, či hľadáme ponuky, dopyt alebo oboje. 
					Po vybratí zadáme do vyhľadávacieho pola pojmy, ktoré cheme hľadať. Pred každý pojem dávame hashtag (#).<br>
					Napríklad chceme vyhľadať a kúpiť USB-C nabíjačku, z pravého okna si vyberieme možnosť ponuky a do vyhľadávacieho poľa zadáme - #nabíjačka #usbc</p>
					<br>
          
					<div class="d-flex w-100 justify-content-between">
						<h5 class="mb-1">Pridávanie inzerátov</h5>
					</div>
					<p class="mb-1">Pre pridávanie inzerátov je potrebné sa najprv prihlásiť. Po prihlásení je možné pridať inzerát - užívateľ vyplní príslušné polia a následne potvrdí pridanie inzerátu. </p>
					<br>
          <b>PROSTE SA PRIHLÁS TY MARHA! -></b><fb:login-button scope='public_profile,email' onlogin='checkLoginState();'></fb:login-button>
				  </div>
				  <div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-dismiss="modal">Zatvoriť</button>
				  </div>
				</div>
			  </div>
			</div>
      
    <!-- Modal Pridaj -->
			<div class="modal fade" id="pridajModal" tabindex="-1" aria-labelledby="helpModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
				  <div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel">Nápoveda</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					  <span aria-hidden="true">&times;</span>
					</button>
				  </div>
				  <div class="modal-body">
          
					<div class="d-flex w-100 justify-content-between">
						<h5 class="mb-1">Pridávanie inzerátov</h5>
					</div>
					<p class="mb-1">Pre pridávanie inzerátov je potrebné sa najprv prihlásiť. Po prihlásení je možné pridať inzerát - užívateľ vyplní príslušné polia a následne potvrdí pridanie inzerátu. </p>
					<br>
          <b>PROSTE SA PRIHLÁS TY MARHA! -></b><fb:login-button scope='public_profile,email' onlogin='checkLoginState();'></fb:login-button>
				  </div>
				  <div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-dismiss="modal">Zatvoriť</button>
				  </div>
				</div>
			  </div>
			</div>
      
       <!-- Modal Prihlas -->
			<div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="helpModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
				  <div class="modal-header">					
          <b>PROSTE SA PRIHLÁS TY MARHA! -></b><fb:login-button scope='public_profile,email' onlogin='checkLoginState();'></fb:login-button>
				  </div>
				  <div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-dismiss="modal">Zatvoriť</button>
				  </div>
				</div>
			  </div>
			</div>
      
      
      
      
	</body>
</html>