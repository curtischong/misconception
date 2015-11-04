<?php
$filename = $_POST["filename"];
$answerp = $_POST["answerp"];
$username = $_POST["username"];
$answerp = str_replace("\n","\\-n",$answerp);
$lines = file($filename);//file into an array


for($currentanswer = 10; $currentanswer < count($lines);$currentanswer++){
 $individualparts = preg_split("/(!n!)/", $lines[$currentanswer],-1,PREG_SPLIT_DELIM_CAPTURE);
        if($individualparts[6] == $username){
            $individualparts[8] = $answerp;
              $lines[$currentanswer] = implode($individualparts);
            file_put_contents( $filename , $lines);
        }
    $filename = substr($filename,0,strlen($filename)-4);
    echo "/misconception/questions/".$filename.".php";
}





?>