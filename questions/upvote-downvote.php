<?php
include '../config.php';
$con = new PDO('mysql:host='. DB_HOST .';dbname='. DB_NAME .'', DB_USER,DB_PASSWORD);
$con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$filename = $_POST["filename"];
$username = $_POST["username"];
$upvotetruedownvotefalse = $_POST["upvotetruedownvotefalse"];
$idofdiv = $_POST["idofdiv"];
$lines = file($filename);//file into an array
if (strtolower($upvotetruedownvotefalse) === 'false') {
    $upvotetruedownvotefalse = false;
}

function decodeURIComponent($str) { $str = preg_replace("/%u([0-9a-f]{3,4})/i","&#x\\1;",urldecode($str)); return html_entity_decode($str,null,'UTF-8'); };


/*function newreputation($upordown){//up means increase questionrep and rep of answers up = 1 down = 0 if it is an answer up = 3 down = 2
    $filename = str_replace('!-',' ',$filename);
    $filename = substr($filename,0,strlen($filename)-4);
            
    $query = $con->prepare("SELECT * FROM srating where title = :filename");
    $query->bindParam(':filename',$filename);
    $query->execute();
    $data = $query->fetch(PDO::FETCH_ASSOC);
    $newview = $data['views'];
    $newview = $newview + 1;
    $sql = "UPDATE srating SET views=:newview WHERE title=:filename";
    $stmt = $con->prepare($sql);
    $stmt->bindParam(':filename',$filename);
    $stmt->bindParam(':newview',$newview);
    $stmt->execute();
    $newrating = $data['rating'];
    if($upordown == 1 || $upordown == 3){
        $newrating = $newrating + 6;
    }else if($upordown == 0 || $upordown == 2){
        $newrating = $newrating -6;
    }
    $updaterating = "UPDATE srating SET rating=:newrating WHERE title=:filename";
    $preparerating = $con->prepare($updaterating);
    $preparerating->bindParam(':filename',$filename);
    $preparerating->bindParam(':newrating',$newrating);
    $preparerating->execute();
    
    $newanswersrep = $data['repofanswers'];
    if($upordown == 3){
        $newanswersrep = $newanswersrep + 1;
    } else if($upordown == 2){
        $newanswersrep = $newanswersrep - 1;
    }
    
    $updateanswerrep = "UPDATE srating SET rating=:newanswersrep WHERE title=:filename";
    $prepareansrating = $con->prepare($updateanswerrep);
    $prepareansrating->bindParam(':filename',$filename);
    $prepareansrating->bindParam(':newanswersrep',$newanswersrep);
    $prepareansrating->execute();
    echo "hi";
};*/






//group the database calls in a function
if($idofdiv == "questionstatistic"){
    if($lines[8]==$username){   
    }else{
            if($upvotetruedownvotefalse == false){
            if(strpos($lines[2],",".$username.",") !== false){
                $lines[2] = str_replace(",".$username.",","",$lines[2]);
                $lines[0] = $lines[0]+1 . "\n";
                file_put_contents( $filename , $lines);
                echo "removed username";
                //update reputation for question creator
                $questionowner = $lines[8];
                $questionowner = substr($questionowner,0, strlen($questionowner)-2);
                $query = $con->prepare("SELECT * FROM accounts where username = :questionowner");
                $query->bindParam(':questionowner',$questionowner);
                $query->execute();
                $data = $query->fetch(PDO::FETCH_ASSOC);
                $newrep = $data['reputation'];
                $newrep = $newrep + 3;
                $stmt = $con->prepare("UPDATE accounts SET reputation=:newrep WHERE username=:questionowner");
                $stmt->bindParam(':questionowner',$questionowner);
                $stmt->bindParam(':newrep',$newrep);
                $stmt->execute();
                //newreputation(1);



                $filename = decodeURIComponent($filename);
                $filename = substr($filename,0,strlen($filename)-4);

                $qquery = $con->prepare("SELECT * FROM srating where title = :filename");
                $qquery->bindParam(':filename',$filename);
                $qquery->execute();
                $data = $qquery->fetch(PDO::FETCH_ASSOC);
                $newrating = $data['rating'];
                $newrating = $newrating + 6;
                $newquestionrep = $data['questionrep'];
                $newquestionrep = $newquestionrep + 1;

                $preparerating = $con->prepare("UPDATE srating SET rating=:newrating, questionrep=:newquestionrep WHERE title=:filename");
                $preparerating->bindParam(':filename',$filename);
                $preparerating->bindParam(':newrating',$newrating);
                $preparerating->bindParam(':newquestionrep',$newquestionrep);
                $preparerating->execute();

                //$updaterating = "UPDATE srating SET questionrep=:newquestionrep WHERE title=:filename";
                //$preparerating = $con->prepare($updaterating);
                //$preparerating->bindParam(':filename',$filename);
                //$preparerating->bindParam(':newquestionrep',$newquestionrep);
                //$preparerating->execute();


            }else if(strpos($lines[1],",".$username.",") !== false){
                echo "you can't downvote when you've upvoted";
            }
            else{
                echo "you haven't downvoted yet";
                    $lines[2] = ",".$username.",".$lines[2];
                    $lines[0] = $lines[0]-1 . "\n";
                    file_put_contents( $filename , $lines);
                //update reputation for question creator
                $questionowner = $lines[8];
                $questionowner = substr($questionowner,0, strlen($questionowner)-2);
                $query = $con->prepare("SELECT * FROM accounts where username = :questionowner");
                $query->bindParam(':questionowner',$questionowner);
                $query->execute();
                $data = $query->fetch(PDO::FETCH_ASSOC);
                $newrep = $data['reputation'];
                $newrep = $newrep - 3;
                $stmt = $con->prepare("UPDATE accounts SET reputation=:newrep WHERE username=:questionowner");
                $stmt->bindParam(':questionowner',$questionowner);
                $stmt->bindParam(':newrep',$newrep);
                $stmt->execute();

                //newreputation(0);

                $filename = decodeURIComponent($filename);
                $filename = substr($filename,0,strlen($filename)-4);

                $qquery = $con->prepare("SELECT * FROM srating where title = :filename");
                $qquery->bindParam(':filename',$filename);
                $qquery->execute();
                $data = $qquery->fetch(PDO::FETCH_ASSOC);
                $newrating = $data['rating'];
                $newrating = $newrating - 6;
                $newquestionrep = $data['questionrep'];
                $newquestionrep = $newquestionrep - 1;

                $preparerating = $con->prepare("UPDATE srating SET rating=:newrating, questionrep=:newquestionrep WHERE title=:filename");
                $preparerating->bindParam(':filename',$filename);
                $preparerating->bindParam(':newrating',$newrating);
                $preparerating->bindParam(':newquestionrep',$newquestionrep);
                $preparerating->execute();
            }
        }
            if($upvotetruedownvotefalse == true){
            if(strpos($lines[1],",".$username.",") !== false){
                $lines[1] = str_replace(",".$username.",","",$lines[1]);
                $lines[0] = $lines[0]-1 . "\n";
                file_put_contents( $filename , $lines);
                echo "removed username";
                //update reputation for question creator
                $questionowner = $lines[8];
                $questionowner = substr($questionowner,0, strlen($questionowner)-2);
                $query = $con->prepare("SELECT * FROM accounts where username = :questionowner");
                $query->bindParam(':questionowner',$questionowner);
                $query->execute();
                $data = $query->fetch(PDO::FETCH_ASSOC);
                $newrep = $data['reputation'];
                $newrep = $newrep - 3;
                $stmt = $con->prepare("UPDATE accounts SET reputation=:newrep WHERE username=:questionowner");
                $stmt->bindParam(':questionowner',$questionowner);
                $stmt->bindParam(':newrep',$newrep);
                $stmt->execute();

                //newreputation(0);

                $filename = decodeURIComponent($filename);
                $filename = substr($filename,0,strlen($filename)-4);

                $qquery = $con->prepare("SELECT * FROM srating where title = :filename");
                $qquery->bindParam(':filename',$filename);
                $qquery->execute();
                $data = $qquery->fetch(PDO::FETCH_ASSOC);
                $newrating = $data['rating'];
                $newrating = $newrating - 6;
                $newquestionrep = $data['questionrep'];
                $newquestionrep = $newquestionrep - 1;

                $preparerating = $con->prepare("UPDATE srating SET rating=:newrating, questionrep=:newquestionrep WHERE title=:filename");
                $preparerating->bindParam(':filename',$filename);
                $preparerating->bindParam(':newrating',$newrating);
                $preparerating->bindParam(':newquestionrep',$newquestionrep);
                $preparerating->execute();

            }else if(strpos($lines[2],",".$username.",") !== false){
                echo "you can't upvote when you've downvoted";
            }
            else{
                echo "you haven't upvoted yet";
                    $lines[1] = ",".$username.",".$lines[1];
                    $lines[0] = $lines[0]+1 . "\n";
                    file_put_contents( $filename , $lines);
                //update reputation for question creator
                $questionowner = $lines[8];
                $questionowner = substr($questionowner,0, strlen($questionowner)-2);
                $query = $con->prepare("SELECT * FROM accounts where username = :questionowner");
                $query->bindParam(':questionowner',$questionowner);
                $query->execute();
                $data = $query->fetch(PDO::FETCH_ASSOC);
                $newrep = $data['reputation'];
                $newrep = $newrep + 3;
                $stmt = $con->prepare("UPDATE accounts SET reputation=:newrep WHERE username=:questionowner");
                $stmt->bindParam(':questionowner',$questionowner);
                $stmt->bindParam(':newrep',$newrep);
                $stmt->execute();

                //newreputation(1);

                $filename = decodeURIComponent($filename);
                $filename = substr($filename,0,strlen($filename)-4);

                $qquery = $con->prepare("SELECT * FROM srating where title = :filename");
                $qquery->bindParam(':filename',$filename);
                $qquery->execute();
                $data = $qquery->fetch(PDO::FETCH_ASSOC);
                $newrating = $data['rating'];
                $newrating = $newrating + 6;
                $newquestionrep = $data['questionrep'];
                $newquestionrep = $newquestionrep + 1;

                $preparerating = $con->prepare("UPDATE srating SET rating=:newrating, questionrep=:newquestionrep WHERE title=:filename");
                $preparerating->bindParam(':filename',$filename);
                $preparerating->bindParam(':newrating',$newrating);
                $preparerating->bindParam(':newquestionrep',$newquestionrep);
                $preparerating->execute();
            }

        }
    }
}
else{
    //select array keys past the normal ones
    //loop through each one to test to see which one has the id in the [3] slot
    //if so, do all the stuff above
    $arraylength = count($lines);
    //echo $arraylength;
    for ($i = 10; $i < $arraylength; $i++){
       //$individualparts = explode('!n!',$lines[$i]);
        $individualparts = preg_split("/(!n!)/", $lines[$i],-1,PREG_SPLIT_DELIM_CAPTURE);
        //print_r($individualparts);
       if($individualparts[6] === $idofdiv){
           if($individualparts[6] == $username){   
           }else{
                if($upvotetruedownvotefalse == false){
                    if(strpos($individualparts[4],"~".$username."~") !== false){
                        $individualparts[4] = str_replace("~".$username."~","",$individualparts[4]); 
                        $individualparts[0] = $individualparts[0]+1;
                        $lines[$i] = implode($individualparts);
                        file_put_contents( $filename , $lines);
                        echo "removed username";
                        //update reputation for answer creator
                        $questionowner = $individualparts[6];
                        $query = $con->prepare("SELECT * FROM accounts where username = :questionowner");
                        $query->bindParam(':questionowner',$questionowner);
                        $query->execute();
                        $data = $query->fetch(PDO::FETCH_ASSOC);
                        $newrep = $data['reputation'];
                        $newrep = $newrep + 6;
                        $stmt = $con->prepare("UPDATE accounts SET reputation=:newrep WHERE username=:questionowner");
                        $stmt->bindParam(':questionowner',$questionowner);
                        $stmt->bindParam(':newrep',$newrep);
                        $stmt->execute();

                        //newreputation(3);

                        $filename = decodeURIComponent($filename);
                        $filename = substr($filename,0,strlen($filename)-4);

                        $query = $con->prepare("SELECT * FROM srating where title = :filename");
                        $query->bindParam(':filename',$filename);
                        $query->execute();
                        $data = $query->fetch(PDO::FETCH_ASSOC);
                        $newrating = $data['rating'];
                        $newrating = $newrating + 6;
                        $newanswersrep = $data['repofanswers'];
                        $newanswersrep = $newanswersrep + 1;

                        $preparerating = $con->prepare("UPDATE srating SET rating=:newrating, repofanswers=:newanswersrep WHERE title=:filename");
                        $preparerating->bindParam(':filename',$filename);
                        $preparerating->bindParam(':newrating',$newrating);
                        $preparerating->bindParam(':newanswersrep',$newanswersrep);
                        $preparerating->execute();



                    }else if(strpos($individualparts[2],"~".$username."~") !== false){
                        echo "you can't downvote when you've upvoted";
                    }else{
                        echo "you haven't downvoted yet";
                        $individualparts[4] = "~".$username."~".$individualparts[4];
                        $individualparts[0] = $individualparts[0]-1;
                        $lines[$i] = implode($individualparts);
                        file_put_contents( $filename , $lines);
                        //update reputation for answer creator
                        $questionowner = $individualparts[6];
                        $query = $con->prepare("SELECT * FROM accounts where username = :questionowner");
                        $query->bindParam(':questionowner',$questionowner);
                        $query->execute();
                        $data = $query->fetch(PDO::FETCH_ASSOC);
                        $newrep = $data['reputation'];
                        $newrep = $newrep - 6;
                        $stmt = $con->prepare("UPDATE accounts SET reputation=:newrep WHERE username=:questionowner");
                        $stmt->bindParam(':questionowner',$questionowner);
                        $stmt->bindParam(':newrep',$newrep);
                        $stmt->execute();

                        //newreputation(2);

                        $filename = decodeURIComponent($filename);
                        $filename = substr($filename,0,strlen($filename)-4);

                        $query = $con->prepare("SELECT * FROM srating where title = :filename");
                        $query->bindParam(':filename',$filename);
                        $query->execute();
                        $data = $query->fetch(PDO::FETCH_ASSOC);
                        $newrating = $data['rating'];
                        $newrating = $newrating - 6;
                        $newanswersrep = $data['repofanswers'];
                        $newanswersrep = $newanswersrep - 1;

                        $preparerating = $con->prepare("UPDATE srating SET rating=:newrating, repofanswers=:newanswersrep WHERE title=:filename");
                        $preparerating->bindParam(':filename',$filename);
                        $preparerating->bindParam(':newrating',$newrating);
                        $preparerating->bindParam(':newanswersrep',$newanswersrep);
                        $preparerating->execute();
                    }    
                }
               if($upvotetruedownvotefalse == true){
                   if(strpos($individualparts[2],"~".$username."~") !== false){
                        $individualparts[2] = str_replace("~".$username."~","",$individualparts[2]); 
                        $individualparts[0] = $individualparts[0]-1;
                        $lines[$i] = implode($individualparts);
                        file_put_contents( $filename , $lines);
                        echo "removed username";
                        //update reputation for answer creator
                        $questionowner = $individualparts[6];
                        $query = $con->prepare("SELECT * FROM accounts where username = :questionowner");
                        $query->bindParam(':questionowner',$questionowner);
                        $query->execute();
                        $data = $query->fetch(PDO::FETCH_ASSOC);
                        $newrep = $data['reputation'];
                        $newrep = $newrep - 6;
                        $stmt = $con->prepare("UPDATE accounts SET reputation=:newrep WHERE username=:questionowner");
                        $stmt->bindParam(':questionowner',$questionowner);
                        $stmt->bindParam(':newrep',$newrep);
                        $stmt->execute();

                        //newreputation(2);

                       $filename = decodeURIComponent($filename);
                        $filename = substr($filename,0,strlen($filename)-4);

                        $query = $con->prepare("SELECT * FROM srating where title = :filename");
                        $query->bindParam(':filename',$filename);
                        $query->execute();
                        $data = $query->fetch(PDO::FETCH_ASSOC);
                        $newrating = $data['rating'];
                        $newrating = $newrating - 6;                  
                        $newanswersrep = $data['repofanswers'];
                        $newanswersrep = $newanswersrep - 1;

                        $preparerating = $con->prepare("UPDATE srating SET rating=:newrating, repofanswers=:newanswersrep WHERE title=:filename");
                        $preparerating->bindParam(':filename',$filename);
                        $preparerating->bindParam(':newrating',$newrating);
                        $preparerating->bindParam(':newanswersrep',$newanswersrep);
                        $preparerating->execute();

                    }else if(strpos($individualparts[4],"~".$username."~") !== false){
                        echo "you can't upvote when you've downvoted";
                    }else{
                    echo "you haven't upvoted yet";
                        $individualparts[2] = "~".$username."~".$individualparts[2];
                        $individualparts[0] = $individualparts[0]+1;
                        $lines[$i] = implode($individualparts);
                        file_put_contents( $filename , $lines);
                        //update reputation for answer creator
                        $questionowner = $individualparts[6];
                        $query = $con->prepare("SELECT * FROM accounts where username = :questionowner");
                        $query->bindParam(':questionowner',$questionowner);
                        $query->execute();
                        $data = $query->fetch(PDO::FETCH_ASSOC);
                        $newrep = $data['reputation'];
                        $newrep = $newrep + 6;
                        $stmt = $con->prepare("UPDATE accounts SET reputation=:newrep WHERE username=:questionowner");
                        $stmt->bindParam(':questionowner',$questionowner);
                        $stmt->bindParam(':newrep',$newrep);
                        $stmt->execute();

                        //newreputation(3);

                       $filename = decodeURIComponent($filename);
                        $filename = substr($filename,0,strlen($filename)-4);

                        $query = $con->prepare("SELECT * FROM srating where title = :filename");
                        $query->bindParam(':filename',$filename);
                        $query->execute();
                        $data = $query->fetch(PDO::FETCH_ASSOC);
                        $newrating = $data['rating'];
                        $newrating = $newrating + 6;
                        $newanswersrep = $data['repofanswers'];
                        $newanswersrep = $newanswersrep + 1;

                        $preparerating = $con->prepare("UPDATE srating SET rating=:newrating, repofanswers=:newanswersrep WHERE title=:filename");
                        $preparerating->bindParam(':filename',$filename);
                        $preparerating->bindParam(':newrating',$newrating);
                        $preparerating->bindParam(':newanswersrep',$newanswersrep);
                        $preparerating->execute();
                    }
                }
           }
        }
    }
}
?>