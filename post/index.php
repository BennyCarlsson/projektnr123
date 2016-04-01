<?php
require_once "../getDBStuff.php";
$dbStuff = new GetDBStuff();
$type = $dbStuff->getType();
$url = $dbStuff->getUrl();
$description = $dbStuff->getDescription();
$title = $dbStuff->getTitle();
 ?>
 <!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Studentens Bekännelser</title>
    <meta name="description" content="Läs studenters bekännelser från alla universitet"/>
    <meta name="keywords" content="Studentens bekännelser, student, universitet, högskola, hemligheter" />
    <meta name="application-name" content="Studentens Bekännelser" />
    <meta name="apple-mobile-web-app-title" content="Studentens Bekännelser">
    <meta property="og:site_name" content="http://studentensbekännelser.se"/>

	<meta property="og:type" content="<?php echo $type ?>"/>
	<meta property="og:url" content="<?php echo $url; ?>"/>
	<meta property="og:description" content="<?php echo $description;?>"/>
    <meta property="og:title" content="<?php echo $title;?>"/>

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
    <!--Import Google Icon Font-->
    <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href='https://fonts.googleapis.com/css?family=Roboto:400,300,500' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="../css/style.css" type="text/css" />
    <link rel="stylesheet" media="only screen
      and (min-device-width : 320px)
      and (max-device-width : 480px) and (max-width: 480)" type="text/css" href="../css/mobileStyle.css">
  <link rel="stylesheet" media="screen and (max-width: 800px)" href="../css/mobileStyle.css" />
  </head>
  <body>
      <div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/sv_SE/sdk.js#xfbml=1&version=v2.5&appId=1175910025770696";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>
    <div id="content">
      <h1>Laddar..</h1>
    </div>

    <script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
    <script type="text/javascript" src="../bundle.js"></script>
  </body>
</html>
