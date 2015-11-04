<?php
$filename = $_POST["filename"];
$username = $_POST["username"];
$submittedcomment = $_POST["submittedcomment"];
$idofanswer = $_POST["idofanswer"];


$lines = file($filename);//file into an array
$lineslength = count($lines);

$submittedcomment = strip_tags($submittedanswer);
$submittedcomment = str_replace("!n!",'',$submittedanswer);
$submittedcomment = str_replace("!c!",'',$submittedanswer);



if($idofanswer == "createcommenttoanswer"){
    $individualparts = preg_split("/(!n!)/", $lines[9],-1,PREG_SPLIT_DELIM_CAPTURE);
    if(count($individualparts) == 3){
        $individualparts = implode($individualparts);
        //$individualparts[3] = str_replace("\n","",$individualparts[2]);
        $individualparts = substr($individualparts,0,strlen($individualparts)-2);
        $lines[9] = $individualparts."0!c!.!c!".$username."!c!".$submittedcomment."\n";
        file_put_contents( $filename , $lines);
    }else{
        $individualparts[2] = str_replace("\n","",$individualparts[2]);
        $individualparts = implode($individualparts);
        $lines[9] = $individualparts."!c!0!c!.!c!".$username."!c!".$submittedcomment."\n";
        file_put_contents( $filename , $lines);
    }
}else{

    
    for($currentanswer = 10; $currentanswer < $lineslength; $currentanswer++){
        $individualparts = preg_split("/(!n!)/", $lines[$currentanswer],-1,PREG_SPLIT_DELIM_CAPTURE);
        if($individualparts[6] == $idofanswer){
                //turn it back to string
            if(count($individualparts) == 9){
                $individualparts = implode($individualparts);
                $individualparts = $individualparts."!n!0!c!.!c!".$username."!c!".$submittedcomment;
                $lines[$currentanswer] = $individualparts;
                file_put_contents( $filename , $lines);
                
            }else{
                $individualparts = implode($individualparts);
                $individualparts = $individualparts."!c!0!c!.!c!".$username."!c!".$submittedcomment;
                $lines[$currentanswer] = $individualparts;
                file_put_contents( $filename , $lines);
            }
        }
    }
}
//go look into each array to see if the title is the div id
//if they are, insert the comment at that spot

?>