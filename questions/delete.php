<?php
$filename = $_POST["filename"];
$username = $_POST["username"];
$typeofdelete = $_POST["typeofdelete"];
$lines = file($filename);//file into an array

//remember to impliment if(count($individualcomments) >= $nthcomment+1){  in the flaggin system and this 
$individualtypes = preg_split("/(!n!)/", $typeofdelete,-1,PREG_SPLIT_DELIM_CAPTURE);
if($individualtypes[0] == "question"){
    $individualparts = preg_split("/(!n!)/", $lines[9],-1,PREG_SPLIT_DELIM_CAPTURE);
    $individualcomments = preg_split("/(!c!)/", $individualparts[2],-1,PREG_SPLIT_DELIM_CAPTURE);
    
    $nthcomment = $individualtypes[4];
    
    if($individualtypes[2] == "comment"){
        $nthcomment = $nthcomment+1;
        $nthcomment = $nthcomment*8-4; //comment creator
        if($individualcomments[$nthcomment] == $username){  
            $ifcommentisfirstcomment;
            if($nthcomment-4 == 0){
                $ifcommentisfirstcomment = 9;
            }else{
                $ifcommentisfirstcomment = 8;
            }
            //echo $ifcommentisfirstcomment;
            //array_splice($individualcomments,$nthcomment-5,$ifcommentisfirstcomment);
            $lastcomment = 0;
            if(count($individualcomments) == $nthcomment+3){
                $lastcomment = 1;
            }
            for($i=0;$i < $ifcommentisfirstcomment;$i++){
                unset($individualcomments[$nthcomment-5+$i]);
            }
            $individualcomments = array_values($individualcomments);
            
            $individualparts[2] = implode($individualcomments);
            $lines[9] = implode($individualparts);
            if($lastcomment == 1 && count($lines)>10){
                $lines[9] = $lines[9]."\n"; 
            }
            file_put_contents( $filename , $lines);
        }
        //if there is only one comment then remove 0-6
        //if it's the first comment but there's another comment after it remove 8
        //if it is not the first comment remove 8
        //if it is the last one then remove 8
        //however unset doesn't really unset it it removes the stuff
    }else{
        //it's a reply      
        $nthcomment = $nthcomment+1;
        $nthcomment = $nthcomment*7+$nthcomment-2; // nth comment is now where the p is stored
        $individualreplies = preg_split("/(!r!)/", $individualcomments[$nthcomment],-1,PREG_SPLIT_DELIM_CAPTURE);       
        $nthreply = $individualtypes[6]-1;
            $nthreply = $nthreply*8+2;
        //echo $nthreply;
        //print_r($individualreplies);
        if($individualreplies[$nthreply+4] == $username){
            for($i=0;$i < 8;$i++){
                    unset($individualreplies[$nthreply+$i]);
            }
            $individualreplies = array_values($individualreplies);
            $individualcomments[$nthcomment] = implode($individualreplies);
            $individualparts[2] = implode($individualcomments);
            $lines[9] = implode($individualparts);
            file_put_contents( $filename , $lines);
        }
    } 
}else if($individualtypes[0] == "answer"){
    $nthcomment = $individualtypes[6];
    if($individualtypes[2] == "comment"){
        $individualtypes[4] = $individualtypes[4]+9;
        $individualparts = preg_split("/(!n!)/", $lines[$individualtypes[4]],-1,PREG_SPLIT_DELIM_CAPTURE);
                $individualcomments = preg_split("/(!c!)/", $individualparts[10],-1,PREG_SPLIT_DELIM_CAPTURE);
                $nthcomment = $nthcomment+1;
                $nthcomment = $nthcomment*8-4; //comment creator
                if($individualcomments[$nthcomment] == $username){
                    //if there is only one comment then remove 7
                    //if there is more than one comment then remove 8
                    //print_r($individualcomments);
                    
                    
                    $ifcommentisfirstcomment;
                    if($nthcomment-4 == 0){
                        $ifcommentisfirstcomment = 9;
                    }else{
                        $ifcommentisfirstcomment = 8;
                    }
                    
                    $lastcomment = 0;
                    if(count($individualcomments) == $nthcomment+3){
                        $lastcomment = 1;
                    }
                    //echo count($individualcomments);
                    if(count($individualcomments) == 7){
                        unset($individualparts[9]);
                    }
                    
                    
                    
                    
                    
                    
                    
                    for($i=0;$i < $ifcommentisfirstcomment;$i++){
                        unset($individualcomments[$nthcomment-5+$i]);
                    }
                    $individualcomments = array_values($individualcomments);
                    
                    $individualparts[10] = implode($individualcomments);
                    $lines[$individualtypes[4]] = implode($individualparts);
                    if($lastcomment == 1 && count($lines)>10){
                        $lines[$individualtypes[4]] = $lines[$individualtypes[4]]."\n"; 
                    }
                    file_put_contents( $filename , $lines);
                    
                }
    }else{//it's a reply
        
        $individualtypes[4] = $individualtypes[4]+9;
        $individualparts = preg_split("/(!n!)/", $lines[$individualtypes[4]],-1,PREG_SPLIT_DELIM_CAPTURE);
        $individualcomments = preg_split("/(!c!)/", $individualparts[10],-1,PREG_SPLIT_DELIM_CAPTURE);
        
        
        
        $nthcomment = $nthcomment+1;
        $nthcomment = $nthcomment*7+$nthcomment-2; // nth comment is now where the p is stored
        $individualreplies = preg_split("/(!r!)/", $individualcomments[$nthcomment],-1,PREG_SPLIT_DELIM_CAPTURE);       
        $nthreply = $individualtypes[8]-1;
            $nthreply = $nthreply*8+2;
        //print_r($individualreplies);
        if($individualreplies[$nthreply+4] == $username){
            for($i=0;$i < 8;$i++){
                    unset($individualreplies[$nthreply+$i]);
            }
            $individualreplies = array_values($individualreplies);
            $individualcomments[$nthcomment] = implode($individualreplies);
            $individualparts[10] = implode($individualcomments);
            $lines[$individualtypes[4]] = implode($individualparts);
            file_put_contents( $filename , $lines);
        }
        
    }
    
    
    
}
?>