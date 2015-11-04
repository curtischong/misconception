<?php
$filename = $_POST["filename"];
$username = $_POST["username"];
$submittedcomment = $_POST["submittedcomment"];
$idofanswer = $_POST["idofanswer"];


$lines = file($filename);//file into an array
$lineslength = count($lines);

$submittedcomment = strip_tags($submittedcomment);
$submittedcomment = str_replace("!n!",'',$submittedcomment);
$submittedcomment = str_replace("!c!",'',$submittedcomment);

if($username=="undefined"){
}else{

//don't touch the top part
    if($idofanswer == "createcommenttoanswer"){
        if(strpos($lines[9],'!c!') == false){
            //$individualparts[3] = str_replace("\n","",$individualparts[2]);
            //$individualparts = substr($individualparts,0,strlen($individualparts)-2);
            if(count($lines)>10){
                $lines[9] = substr($lines[9],0,strlen($lines[9])-1);
            }
            $lines[9] = $lines[9]."0!c!.!f!.!c!".$username."!c!".$submittedcomment."!r!";
            if(count($lines)>10){
                $lines[9] = $lines[9]."\n";
            }
            file_put_contents( $filename , $lines);
        }else{
            //$individualparts[2] = str_replace("\n","",$individualparts[2]);
            if(count($lines)>10){
                $lines[9] = substr($lines[9],0,strlen($lines[9])-1);
            }
            $lines[9] = $lines[9]."!c!0!c!.!f!.!c!".$username."!c!".$submittedcomment."!r!";
            if(count($lines)>10){
                $lines[9] = $lines[9]."\n";
            }
            file_put_contents( $filename , $lines);
        }
    }else{
        for($currentanswer = 10; $currentanswer < $lineslength; $currentanswer++){
            $individualparts = preg_split("/(!n!)/", $lines[$currentanswer],-1,PREG_SPLIT_DELIM_CAPTURE);
            if($individualparts[6] == $idofanswer){
                    //turn it back to string
                if(count($individualparts) == 9){
                    $individualparts = implode($individualparts);
                    if($currentanswer+1 !== $lineslength){
                        $individualparts = substr($individualparts,0,strlen($individualparts)-1);
                    }
                    //$individualparts = substr($individualparts,0,strlen($individualparts)-2);
                    $individualparts = $individualparts."!n!0!c!.!f!.!c!".$username."!c!".$submittedcomment."!r!";
                    if($currentanswer+1 !== $lineslength){
                        $individualparts = $individualparts."\n";
                    }
                    $lines[$currentanswer] = $individualparts;
                    file_put_contents( $filename , $lines);

                }else{
                    $individualparts = implode($individualparts);
                    if($currentanswer+1 !== $lineslength){
                        $individualparts = substr($individualparts,0,strlen($individualparts)-1);
                    }
                   // $individualparts = substr($individualparts,0,strlen($individualparts)-2);
                    $individualparts = $individualparts."!c!0!c!.!f!.!c!".$username."!c!".$submittedcomment."!r!";
                    if($currentanswer+1 !== $lineslength){
                        $individualparts = $individualparts."\n";
                    }
                    $lines[$currentanswer] = $individualparts;
                    file_put_contents( $filename , $lines);
                }
            }
        }
    }
}



//go look into each array to see if the title is the div id
//if they are, insert the comment at that spot

?>