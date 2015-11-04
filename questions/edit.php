<?php
$filename = $_POST["filename"];
$whatithinkiknow = $_POST["whatithinkiknow"];
$username = $_POST["username"];
$whatithinkiknow = str_replace("\n","\\-n",$whatithinkiknow);
$lines = file($filename);//file into an array

$individualparts = preg_split("/(!n!)/", $lines[9],-1,PREG_SPLIT_DELIM_CAPTURE);
if($lines[8] === $username."\n"){
    $individualparts[0] = $whatithinkiknow;
    $lines[9] = implode($individualparts);
    file_put_contents( $filename , $lines);
}
//$filename = rawurldecode($filename);
$filename = substr($filename,0,strlen($filename)-4);
echo "/misconception/questions/".$filename.".php";
?>