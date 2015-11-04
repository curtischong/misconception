<?php
//turns filenames into array
$misconceptiontitle = $_POST["misconceptionname"];
$checkquestion = glob("*.php");
$misconceptiontitle = $misconceptiontitle . ".php";
$misconceptiontitle = str_replace(' ','!%!',$misconceptiontitle);
//$misconceptiontitle = strtolower($misconceptiontitle);
//$checkquestion = strtolower($checkquestion);
if (in_array($misconceptiontitle,$checkquestion)){
	echo "this title already is in use";
}
?>