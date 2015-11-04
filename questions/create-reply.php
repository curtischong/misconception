<?php
$filename = $_POST["filename"];
$username = $_POST["username"];
$idofanswer = $_POST["idofcontainer"];
$nthcomment = $_POST["nthcomment"];
$submittedreply = $_POST["submittedreply"];
$lines = file($filename);//file into an array

$lineslength = count($lines);

$submittedreply = strip_tags($submittedreply);
$submittedreply = str_replace("!n!",'',$submittedreply);
$submittedreply = str_replace("!c!",'',$submittedreply);

$nthcomment = $nthcomment+1;
    $commenttext = $nthcomment*7+$nthcomment-2;



if($idofanswer == "createcommenttoanswer"){
    $individualparts = preg_split("/(!n!)/", $lines[9],-1,PREG_SPLIT_DELIM_CAPTURE);
    $individualcommentsparts = preg_split("/(!c!)/", $individualparts[2],-1,PREG_SPLIT_DELIM_CAPTURE);
    
    //don't need to check if answer exists because if it doesn't exist then nothing will happen
    if(count($individualcommentsparts) >= $nthcomment*8-1){

        //if there is an answer and if it is the last comment
        if(count($individualcommentsparts) == $commenttext+1 && count($lines)>10){
            $individualparts[2] = substr($individualparts[2],0,strlen($individualparts[2])-1);  
        }

        $individualcomments = preg_split("/(!c!)/", $individualparts[2],-1,PREG_SPLIT_DELIM_CAPTURE);



        $individualcomments[$commenttext] = $individualcomments[$commenttext]."0!r!.!f!.!r!".$username."!r!".$submittedreply."!r!";

        if(count($individualcommentsparts) == $commenttext+1 && count($lines)>10){
            $individualcomments[$commenttext] = $individualcomments[$commenttext]."\n"; 
        }

        $individualparts[2] = $individualcomments;
                $individualparts[2] = implode($individualparts[2]);
                $lines[9] = $individualparts;
                $lines[9] = implode($lines[9]);
                file_put_contents( $filename , $lines);
        //print_r($lines);
            /*if(count($lines)>10){
                $lines[9] = substr($lines[9],0,strlen($lines[9])-1);
            }
            $lines[9] = $lines[9]."0!c!.!c!".$username."!c!".$submittedcomment."!r!";
            if(count($lines)>10){
                $lines[9] = $lines[9]."\n";
            }
            file_put_contents( $filename , $lines);*/

    }
    
    
}else{
 for($currentanswer = 10; $currentanswer < $lineslength; $currentanswer++){
        $individualparts = preg_split("/(!n!)/", $lines[$currentanswer],-1,PREG_SPLIT_DELIM_CAPTURE);
        //selects the current answer container
        if($individualparts[6] == $idofanswer){
                //turn it back to string
            $individualcommentsparts = preg_split("/(!n!)/", $lines[$currentanswer],-1,PREG_SPLIT_DELIM_CAPTURE);
            $individualcomments = preg_split("/(!c!)/", $individualcommentsparts[10],-1,PREG_SPLIT_DELIM_CAPTURE);
            if(count($individualcomments) >= $nthcomment*8-1){
                    //if the nth comment is the last comment and make sure that there is another line
                if($currentanswer+1 !== $lineslength && count($individualcomments) == $commenttext+1){
                                $individualparts[10] = substr($individualparts[10],0,strlen($individualparts[10])-1);
                }
                $individualcomments = preg_split("/(!c!)/", $individualparts[10],-1,PREG_SPLIT_DELIM_CAPTURE);

                //gotta make sure that nth comment is the last comment and make sure that there is another line

                $individualcomments[$commenttext] = $individualcomments[$commenttext]."0!r!.!f!.!r!".$username."!r!".$submittedreply."!r!";

                if($currentanswer+1 !== $lineslength && count($individualcomments) == $commenttext+1){
                        $individualcomments[$commenttext] = $individualcomments[$commenttext]."\n";
                }

                $individualparts[10] = $individualcomments;
                $individualparts[10] = implode($individualparts[10]);
                $lines[$currentanswer] = $individualparts;
                $lines[$currentanswer] = implode($lines[$currentanswer]);
                file_put_contents( $filename , $lines);
            }
        }
    }
}

?>