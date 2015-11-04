<?php
$filename = $_POST["filename"];
$username = $_POST["username"];
$nthcomment = $_POST["nthcomment"];
$idofcontainer = $_POST["idofcontainer"];
$nthreply = $_POST["nthreply"];
include '../config.php';
$con = new PDO('mysql:host='. DB_HOST .';dbname='. DB_NAME .'', DB_USER,DB_PASSWORD);
$lines = file($filename);//file into an array


//all the imploding can be dried up


//check if nth comment and nth reply exists
//if(count($individualcomments) >= $nthcomment*8-1){}




$nthcomment = $nthcomment+1;
$nthcomment = $nthcomment*7+$nthcomment-2;//nth comment now replresents commentp and where the replies are
//$nthreply = $nthreply+1;
$nthreply = $nthreply*8-4;//where tehe usernames for replies are stored
//loopthrough each line and check if the id = to container id
if($idofcontainer == "questioncommentbox"){
    $partsoftheanswer= preg_split("/(!n!)/", $lines[9],-1,PREG_SPLIT_DELIM_CAPTURE);
    $individualcomments = preg_split("/(!c!)/", $partsoftheanswer[2],-1,PREG_SPLIT_DELIM_CAPTURE);
    //echo count($individualcomments);
    //echo $nthcomment+1;
    if(count($individualcomments) >= $nthcomment+1){
        $individualreplies = preg_split("/(!r!)/", $individualcomments[$nthcomment],-1,PREG_SPLIT_DELIM_CAPTURE);
        //echo count($individualreplies)-3;
        //echo $nthreply+4;
        if($individualreplies[$nthreply+2] == $username){
        }else{
            if(count($individualreplies)-3 >= $nthreply+4){
                if(strpos($individualreplies[$nthreply],"~".$username."~") !== false){//if the username is found
                    $individualreplies[$nthreply] = str_replace("~".$username."~","",$individualreplies[$nthreply]);
                    $individualreplies[$nthreply-2] = $individualreplies[$nthreply-2]-1;//this is changing the reply reputation
                    $individualcomments[$nthcomment] = implode($individualreplies);
                    $partsoftheanswer[2] = implode($individualcomments);
                    $lines[9] = implode($partsoftheanswer);
                    file_put_contents( $filename , $lines);
                    echo "removed username";

                    //update reputation for reply creator
                    $questionowner = $individualreplies[$nthreply+2];
                    $query = $con->prepare("SELECT * FROM accounts where username = :questionowner");
                    $query->bindParam(':questionowner',$questionowner);
                    $query->execute();
                    $data = $query->fetch(PDO::FETCH_ASSOC);
                    $newrep = $data['reputation'];
                    $newrep = $newrep - 5;
                    $sql = "UPDATE accounts SET reputation=:newrep WHERE username=:questionowner";
                    $stmt = $con->prepare($sql);
                    $stmt->bindParam(':questionowner',$questionowner);
                    $stmt->bindParam(':newrep',$newrep);
                    $stmt->execute();


                }else{
                    $individualreplies[$nthreply] = "~".$username."~".$individualreplies[$nthreply];
                    $individualreplies[$nthreply-2] = $individualreplies[$nthreply-2]+1;
                    $individualcomments[$nthcomment] = implode($individualreplies);
                    $partsoftheanswer[2] = implode($individualcomments);
                    $lines[9] = implode($partsoftheanswer);
                    file_put_contents( $filename , $lines);
                    echo "inserted username";

                    //update reputation for reply creator
                    $questionowner = $individualreplies[$nthreply+2];
                    $query = $con->prepare("SELECT * FROM accounts where username = :questionowner");
                    $query->bindParam(':questionowner',$questionowner);
                    $query->execute();
                    $data = $query->fetch(PDO::FETCH_ASSOC);
                    $newrep = $data['reputation'];
                    $newrep = $newrep + 5;
                    $sql = "UPDATE accounts SET reputation=:newrep WHERE username=:questionowner";
                    $stmt = $con->prepare($sql);
                    $stmt->bindParam(':questionowner',$questionowner);
                    $stmt->bindParam(':newrep',$newrep);
                    $stmt->execute();
                }
            }
        }
    }
    
    
}else{
    for($currentline = 10; $currentline < count($lines); $currentline++){
        $partsoftheanswer= preg_split("/(!n!)/", $lines[$currentline],-1,PREG_SPLIT_DELIM_CAPTURE);
        if($partsoftheanswer[6] == $idofcontainer){
            $individualcomments = preg_split("/(!c!)/", $partsoftheanswer[10],-1,PREG_SPLIT_DELIM_CAPTURE);
            $individualreplies = preg_split("/(!r!)/", $individualcomments[$nthcomment],-1,PREG_SPLIT_DELIM_CAPTURE);
            if(count($individualcomments) >= $nthcomment+1){
                if(count($individualreplies)-3 >= $nthreply+4){
                //echo $individualreplies[$nthreply];
                   if($individualreplies[$nthreply+2] == $username){
                   }else{
                        if(strpos($individualreplies[$nthreply],"~".$username."~") !== false){//if the username is found
                            $individualreplies[$nthreply] = str_replace("~".$username."~","",$individualreplies[$nthreply]);
                            $individualreplies[$nthreply-2] = $individualreplies[$nthreply-2]-1;
                            $individualcomments[$nthcomment] = implode($individualreplies);
                            $partsoftheanswer[10] = implode($individualcomments);
                            $lines[$currentline] = implode($partsoftheanswer);
                            file_put_contents( $filename , $lines);
                            echo "removed username";

                            //update reputation for reply creator
                            $questionowner = $individualreplies[$nthreply+2];
                            $query = $con->prepare("SELECT * FROM accounts where username = :questionowner");
                            $query->bindParam(':questionowner',$questionowner);
                            $query->execute();
                            $data = $query->fetch(PDO::FETCH_ASSOC);
                            $newrep = $data['reputation'];
                            $newrep = $newrep - 5;
                            $sql = "UPDATE accounts SET reputation=:newrep WHERE username=:questionowner";
                            $stmt = $con->prepare($sql);
                            $stmt->bindParam(':questionowner',$questionowner);
                            $stmt->bindParam(':newrep',$newrep);
                            $stmt->execute();

                        }else{
                            $individualreplies[$nthreply] = "~".$username."~".$individualreplies[$nthreply];
                            $individualreplies[$nthreply-2] = $individualreplies[$nthreply-2]+1;
                            $individualcomments[$nthcomment] = implode($individualreplies);
                            $partsoftheanswer[10] = implode($individualcomments);
                            $lines[$currentline] = implode($partsoftheanswer);
                            file_put_contents( $filename , $lines);
                            echo "inserted username";

                            //update reputation for reply creator
                            $questionowner = $individualreplies[$nthreply+2];
                            $query = $con->prepare("SELECT * FROM accounts where username = :questionowner");
                            $query->bindParam(':questionowner',$questionowner);
                            $query->execute();
                            $data = $query->fetch(PDO::FETCH_ASSOC);
                            $newrep = $data['reputation'];
                            $newrep = $newrep + 5;
                            $sql = "UPDATE accounts SET reputation=:newrep WHERE username=:questionowner";
                            $stmt = $con->prepare($sql);
                            $stmt->bindParam(':questionowner',$questionowner);
                            $stmt->bindParam(':newrep',$newrep);
                            $stmt->execute();
                        }
                   }
                }
            }
            //find the individualreply part where you store who upvoted. then if they'd already upvoted send a reply saying they've already upvoted
            //if they didn't upvote yet
            //say you didn't upvote yet
            //add their name to the spot where they didn't upvote yet
            //increase reply rep by one
            //increase the reply's owner rep by one
            
            
            
            //this is the most complicated code i've ever messed with 
        }  
    }
}
?>