<?php
$filename = $_POST["filename"];
$username = $_POST["username"];
$lines = file($filename);
$individualparts = preg_split("/(!n!)/", $lines[3],-1,PREG_SPLIT_DELIM_CAPTURE);
$individualparts[2] ="~".$username."~".$individualparts[2];
$individualparts[0] = $individualparts[0]+1;
$lines[3] = implode($individualparts);
file_put_contents( $filename , $lines);
?>