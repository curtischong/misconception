<?php
//for building the structure of the answers and to send the data to the txt file
$filename = $_POST["filename"];
$username = $_POST["username"];
$submittedanswer = $_POST["submittedanswer"];
$lines = file($filename);
$submittedanswer = str_replace("\n",'\-n',$submittedanswer);
for($seeifalreadyanswered = 10; $seeifalreadyanswered < count($lines); $seeifalreadyanswered++){
    $individualparts = preg_split("/(!n!)/", $lines[$seeifalreadyanswered],-1,PREG_SPLIT_DELIM_CAPTURE);
    if($individualparts[6] == $username){
        exit("You've already answered!");
    }
}


$submittedanswer = strip_tags($submittedanswer);
$submittedanswer = str_replace("!n!",'',$submittedanswer);
$submittedanswer = str_replace("!c!",'',$submittedanswer);
//sanitaze stuff here

array_push($lines,"\n"."0!n!.!n!.!n!".$username."!n!".$submittedanswer);
file_put_contents( $filename , $lines);


$filename = substr($filename,0, strlen($filename)-3);
$filename = $filename."php";
$contentoffile = file_get_contents($filename);



//removed <addanswer> in index.php for testing




$contentoffile = str_replace("<addanswer></addanswer>",'<div class="solutionsdiv"><pre class="answer" id='.$username.'></pre><?php include "answer-structure.php"; ?><addanswer></addanswer>',$contentoffile);
file_put_contents( $filename , $contentoffile);
echo "success";
?>