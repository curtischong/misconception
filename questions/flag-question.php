<?php
$filename = $_POST['filename'];
$username = $_POST['username'];
$submittedflag = $_POST['submittedflag'];
$conid = $_POST['conid'];
$typeofflag = $_POST['typeofflag'];
$lines = file($filename);




//structure of a comment (flagtype)
//comment!n!nthcomment
//structure of a reply (flagtype)
//reply!n!nthcomment!n!nthreply



include '../config.php';
$con = new PDO('mysql:host='. DB_HOST .';dbname='. DB_NAME .'', DB_USER,DB_PASSWORD);
$query = $con->prepare("SELECT * FROM accounts where username = :user");
            $query->bindParam(':user',$username);
            $query->execute();
            $data = $query->fetch(PDO::FETCH_ASSOC);
$userrep = $data['reputation'];
if($userrep > 9){
    
    if($typeofflag == "question"){
    
        if($conid == "questionstatistic"){
            $individualparts = preg_split("/(!n!)/", $lines[5],-1,PREG_SPLIT_DELIM_CAPTURE);

            $individualparts[2] = $username."!u!".$submittedflag."!u!".$individualparts[2];
            $lines[5] = implode($individualparts);
            file_put_contents( $filename , $lines);
        }else{
            for($currentanswer = 10; $currentanswer < count($lines); $currentanswer++){
                $individualparts = preg_split("/(!n!)/", $lines[$currentanswer],-1,PREG_SPLIT_DELIM_CAPTURE);
                if($conid == $individualparts[6]){
                    //print_r($individualparts);
                    $individualflags = preg_split("/(!f!)/", $individualparts[2],-1,PREG_SPLIT_DELIM_CAPTURE);
                    $individualflags[2] = ",".$username.","."!u!".$submittedflag."!u!".$individualflags[2];
                    $individualparts[2] = implode($individualflags);
                    $lines[$currentanswer] = implode($individualparts);
                    file_put_contents( $filename , $lines);
                }
            } 
        }
    }else{
        //this means that it must be a comment or a reply
        $flagtype = preg_split("/(!n!)/", $typeofflag,-1,PREG_SPLIT_DELIM_CAPTURE);
        if($flagtype[0] == "comment"){
         echo "it's a comment";
            if($conid == "questionstatistic"){
                
                $individualparts = preg_split("/(!n!)/", $lines[9],-1,PREG_SPLIT_DELIM_CAPTURE);
                $individualcomments = preg_split("/(!c!)/", $individualparts[2],-1,PREG_SPLIT_DELIM_CAPTURE);
                $nthcomment = $flagtype[2];
                $nthcomment = $nthcomment+1;
                $upvotesectionforcomment = $nthcomment*7+$nthcomment-6;
                $individualflags = preg_split("/(!f!)/", $individualcomments[$upvotesectionforcomment],-1,PREG_SPLIT_DELIM_CAPTURE);
                $individualflags[2] = ",".$username.","."!u!".$submittedflag."!u!".$individualflags[2];
                $individualcomments[$upvotesectionforcomment] = implode($individualflags);
                $individualparts[2] = implode($individualcomments);
                $lines[9] = implode($individualparts);
                file_put_contents( $filename , $lines);
            }else{
                for($currentanswer = 10; $currentanswer < count($lines); $currentanswer++){
                    $individualparts = preg_split("/(!n!)/", $lines[$currentanswer],-1,PREG_SPLIT_DELIM_CAPTURE);
                        $nthcomment = $flagtype[2];
                        $nthcomment = $nthcomment+1;
                        $upvotesectionforcomment = $nthcomment*7+$nthcomment-6;
                    if($conid == $individualparts[6]){
                        $individualcomments = preg_split("/(!c!)/", $individualparts[10],-1,PREG_SPLIT_DELIM_CAPTURE);
                        //echo $individualcomments[$upvotesectionforcomment];
                        $individualflags = preg_split("/(!f!)/", $individualcomments[$upvotesectionforcomment],-1,PREG_SPLIT_DELIM_CAPTURE);
                        $individualflags[2] = ",".$username.","."!u!".$submittedflag."!u!".$individualflags[2];
                        $individualcomments[$upvotesectionforcomment] = implode($individualflags);
                        $individualparts[10] = implode($individualcomments);
                        $lines[$currentanswer] = implode($individualparts);
                        file_put_contents( $filename , $lines);
                        //now we've located the comment all we haveto do is puut the username and th ereason why and save it

                        //$individualflags = preg_split("/(!f!)/", $individualparts[2],-1,PREG_SPLIT_DELIM_CAPTURE);

                        //make it so that in the who upvoted comments section of a comment there's a !f! at the end of it.
                        //find the ocmmment using maths and do the same above
                    }
                    
                }
            }  
        }else{
            //echo "it's a reply";
            
            $nthcomment = $flagtype[2];
                $nthreply = $flagtype[4];
                $nthcomment = $nthcomment+1;
                $nthcomment = $nthcomment*7+$nthcomment-2;//nth comment now replresents commentp and where the replies are
                $nthreply = $nthreply*8-4;//where tehe usernames for replies are stored
            
            
            if($conid == "questionstatistic"){
                $individualparts = preg_split("/(!n!)/", $lines[9],-1,PREG_SPLIT_DELIM_CAPTURE);
                $individualcomments = preg_split("/(!c!)/", $individualparts[2],-1,PREG_SPLIT_DELIM_CAPTURE);
                $individualreplies = preg_split("/(!r!)/", $individualcomments[$nthcomment],-1,PREG_SPLIT_DELIM_CAPTURE);
                $individualflags = preg_split("/(!f!)/", $individualreplies[$nthreply],-1,PREG_SPLIT_DELIM_CAPTURE);
                $individualflags[2] = ",".$username.","."!u!".$submittedflag."!u!".$individualflags[2];
                $individualreplies[$nthreply] = implode($individualflags);
                $individualcomments[$nthcomment] = implode($individualreplies);
                $individualparts[2] = implode($individualcomments);
                $lines[9] = implode($individualparts);
                file_put_contents( $filename , $lines);
            }else{
                for($currentanswer = 10; $currentanswer < count($lines); $currentanswer++){
                    $individualparts = preg_split("/(!n!)/", $lines[$currentanswer],-1,PREG_SPLIT_DELIM_CAPTURE);
                    if($individualparts[6] == $conid){
                        $individualcomments = preg_split("/(!c!)/", $individualparts[10],-1,PREG_SPLIT_DELIM_CAPTURE);
                        $individualreplies = preg_split("/(!r!)/", $individualcomments[$nthcomment],-1,PREG_SPLIT_DELIM_CAPTURE);
                        $individualflags = preg_split("/(!f!)/", $individualreplies[$nthreply],-1,PREG_SPLIT_DELIM_CAPTURE);
                        $individualflags[2] = ",".$username.","."!u!".$submittedflag."!u!".$individualflags[2];
                        $individualreplies[$nthreply] = implode($individualflags);
                        $individualcomments[$nthcomment] = implode($individualreplies);
                        $individualparts[10] = implode($individualcomments);
                        $lines[$currentanswer] = implode($individualparts);
                        file_put_contents( $filename , $lines);
                    }
                }
            }
        }
    }
}
?>