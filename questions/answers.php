<?php
//for building the structure of the answers and to send the data to the txt file
$filename = $_POST["filename"];
$username = $_POST["username"];
$submittedanswer = $_POST["submittedanswer"];
$lines = file($filename);

function decodeURIComponent($str) { $str = preg_replace("/%u([0-9a-f]{3,4})/i","&#x\\1;",urldecode($str)); return html_entity_decode($str,null,'UTF-8'); };








//doesn't work
function autolink($content){
    $re = '/(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/';    
    $content = preg_replace($re, '<a href="$0" rel="nofollow">$0</a>', $content);

    return $content;
}

$submittedanswer = autolink($submittedanswer);











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

array_push($lines,"\n"."0!n!.!f!.!n!.!n!".$username."!n!".$submittedanswer);
file_put_contents( $filename , $lines);


$filename = substr($filename,0, strlen($filename)-4);
$title = $filename;
$title = $title.".php";
echo "/misconception/questions/".$title;
$title = decodeURIComponent($title);
$contentoffile = file_get_contents($title);



//removed <addanswer> in index.php for testing




$contentoffile = str_replace("<addanswer></addanswer>",'<div class="solutionsdiv"><pre class="answer" id='.$username.'></pre><?php include "answer-structure.php"; ?><addanswer></addanswer>',$contentoffile);
file_put_contents( $title , $contentoffile);
?>