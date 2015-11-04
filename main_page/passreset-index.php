<?php
session_start();
?>
<!DOCTYPE HTML>
<html>
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=Windows-1252" />
</head>
	<link rel="stylesheet" type="text/css" href="passreset.css"/>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
	<script type='text/javascript' src='passreset-script.js'></script>
    
<?php include "../topbar.php"; ?>
    <div id="htmlpage" class="center">
    
    
    <input type="text" id="username" size="40" placeholder="username"><br>
    <input type="text" id="code" size="40" placeholder="code"><br>
    <input type="password" id="newpass" size="40" placeholder="your new password"><br>
    <input type="password" id="confirmpass" size="40" placeholder="confirm password"><br>
    <div id="submit">Submit</div>
    
    
    
    
    
    </div>
    </body>
</html>