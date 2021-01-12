<!DOCTYPE html>

<html lang="sk">
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta charset="utf-8">
		<title> Internátny portál </title>
		<link rel="shortcut icon" type="png" href= "img/icon.png" >
		
		<link rel="stylesheet" media="screen and (min-width: 900px)" href="css.css">
		<link rel="stylesheet" media="screen and (max-width: 899px)" href="mobil.css">			
		
		<link rel="stylesheet" media="screen" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
		<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>
		<link href="fontawesome-free-5.15.1-web/css/all.css" rel="stylesheet">
		<script src="scripts.js"></script>
		<script src="fb.js"></script>
	</head>
	
	<body onload = "vyberKategoriu();">
		<nav class="navbar fixed-top navbar-dark bg-primary row">
			<div class = "navbar-left">
				<div class = "navbar-brand">
					<a href = "https://internatnyportalxyz.xyz/"> <img class = "icon_ip" src = "img/icon2.png" alt="Logo"> </a>
				</div>
				<a id = "navBarButton" class="navbar-brand rounded" href="vsetko.html">Všetko</a>
				<a id = "navBarButton" class="navbar-brand rounded" href="produkty.html">Produkty</a>
				<a id = "navBarButton" class="navbar-brand" href="sluzby.html">Služby</a>
				<a id = "navBarButton"  class="navbar-brand" href="aktivity.html">Aktivity</a>
				<a id = "navBarButton" class="navbar-brand" href="#" data-toggle="modal" data-target="#helpModal"><img src="img/question.png" alt="Nápoveda" style="height: 3vh;"></a>
			</div>
			<div class = "navbar-right" id="mnBt">

			</div>
		</nav>
		
		<section id="page-container">
			<main class = "container w-75 border-right-1 border-left-1 text shadow-lg">
			<form class="form-inline md-form mr-auto mb-4 bg-info" action="javascript:;" onsubmit="findEverything()">
					<div class="row w-100">
						<h3 class="align-self-center">Čo hľadáte?</h3>
						<div id="vyrazy_box">
							<input id ="hashtag" class="form-control mr-sm-3" type="text" placeholder="Hľadané výrazy" aria-label="Hľadané výrazy">
							<button class="btn btn-warning btn-rounded" type="submit" >Hľadať</button><br>
						</div>
					</div>
				</form>
				<div style="background-color: blue;">
					<div style="cursor: pointer;" onclick = 'location.href="vsetko.html"' class="polozky"><img class="obrazok" src="img/all.svg" /><p>Všetko</p></div>
					<div style="cursor: pointer;" onclick = 'location.href="produkty.html?kat=1"' class="polozky"><img class="obrazok" src="img/elektro.svg" alt="Elektro" /><p>Elektronika</p></div>
					<div style="cursor: pointer;" onclick = 'location.href="produkty.html?kat=2"' class="polozky"><img class="obrazok" src="img/drogeria.svg" alt="Drogéria" /><p>Drogéria</p></div>
					<div style="cursor: pointer;" onclick = 'location.href="produkty.html?kat=3"' class="polozky"><img class="obrazok" src="img/jedlo.svg" alt="Jedlo" /><p>Potraviny</p></div>
					<div style="cursor: pointer;" onclick = 'location.href="produkty.html?kat=4"' class="polozky"><img class="obrazok" src="img/books.svg" alt="Knihy" /><p>Knihy</p></div>
					<div style="cursor: pointer;" onclick = 'location.href="produkty.html?kat=5"' class="polozky"><img class="obrazok" src="img/s_books.svg" alt="Študijné materiály" /><p>Študijné materiály</p></div>
					<div style="cursor: pointer;" onclick = 'location.href="produkty.html?kat=6"' class="polozky"><img class="obrazok" src="img/oblecenie.svg" alt="Oblečenie" /><p>Oblečenie</p></div>
					<div style="cursor: pointer;" onclick = 'location.href="produkty.html?kat=7"' class="polozky"><img class="obrazok" src="img/alkohol.svg" alt="Alkohol" /><p>Alkohol</p></div>
					<div style="cursor: pointer;" onclick = 'location.href="produkty.html?kat=8"' class="polozky"><img class="obrazok" src="img/ine.svg" alt="Iné" /><p>Iné</p></div>
					<div class="polozky"><img class="obrazok" src="img/sport.svg" alt="Šport" /><p>Šport</p></div>
				</div>
			</main>
			<footer id="indexFooter" class="page-footer font-small bg-primary pt-4 d-flex flex-column" id = "footer">
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
</section>
		<!-- Modal HELP -->
		<div class="modal fade" id="helpModal" tabindex="-1" aria-labelledby="helpModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLabel">NÁPOVEDA</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<div class="d-flex w-100 justify-content-between">
							<h5 class="mb-1">Vyhľadávanie inzerátov</h5>
						</div>
						<p class="mb-1">Pokiaľ chcete vyhľadávať produkty/služby/aktivity prejdite na príslušnú podstránku. Následne vyberieme typ a kategóriu, ktorú chceme prehľadávať.
							Po vybratí zadáme do vyhľadávacieho pola pojmy, ktoré cheme hľadať.
						<div class="d-flex w-100 justify-content-between">
							<h5 class="mb-1">Pridávanie inzerátov</h5>
						</div>
						<p class="mb-1">Pre pridávanie inzerátov je potrebné sa najprv prihlásiť. 
							Po prihlásení je možné pridať inzerát - užívateľ vyplní príslušné polia a následne potvrdí pridanie inzerátu.</p>
						<br>
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
						<b>Prihláste sa prosím.</b><fb:login-button scope='public_profile,email' onlogin='checkLoginState();'></fb:login-button>
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
						<h5 class="modal-title" id="exampleModalLabel">Prihláste sa</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<div class="d-flex w-100 justify-content-between">
							<h5 class="mb-1">Sposoby prihlásenia</h5>
						</div>
						<fb:login-button scope='public_profile,email' onlogin='checkLoginState();'></fb:login-button>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-dismiss="modal">Zatvoriť</button>
					</div>
				</div>
			</div>
		</div>
	</body>
</html>
