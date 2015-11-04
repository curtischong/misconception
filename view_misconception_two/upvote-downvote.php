<?php
include '../config.php';
$con = new PDO('mysql:host='. DB_HOST .';dbname='. DB_NAME .'', DB_USER,DB_PASSWORD);
$filename = $_POST["filename"];
$username = $_POST["username"];
$upvotetruedownvotefalse = $_POST["upvotetruedownvotefalse"];
$idofdiv = $_POST["idofdiv"];
$lines = file($filename);//file into an array
if (strtolower($upvotetruedownvotefalse) === 'false') {
    $upvotetruedownvotefalse = false;
}
//group the database calls in a function
if($idofdiv == "questionstatistic"){
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
            $newrep = $newrep + 1;
            $sql = "UPDATE accounts SET reputation=:newrep WHERE username=:questionowner";
            $stmt = $con->prepare($sql);
            $stmt->bindParam(':questionowner',$questionowner);
            $stmt->bindParam(':newrep',$newrep);
            $stmt->execute();
            
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
            $newrep = $newrep - 1;
            $sql = "UPDATE accounts SET reputation=:newrep WHERE username=:questionowner";
            $stmt = $con->prepare($sql);
            $stmt->bindParam(':questionowner',$questionowner);
            $stmt->bindParam(':newrep',$newrep);
            $stmt->execute();
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
            $newrep = $newrep - 1;
            $sql = "UPDATE accounts SET reputation=:newrep WHERE username=:questionowner";
            $stmt = $con->prepare($sql);
            $stmt->bindParam(':questionowner',$questionowner);
            $stmt->bindParam(':newrep',$newrep);
            $stmt->execute();
            
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
            $newrep = $newrep + 1;
            $sql = "UPDATE accounts SET reputation=:newrep WHERE username=:questionowner";
            $stmt = $con->prepare($sql);
            $stmt->bindParam(':questionowner',$questionowner);
            $stmt->bindParam(':newrep',$newrep);
            $stmt->execute();
            
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
                    $newrep = $newrep + 1;
                    $sql = "UPDATE accounts SET reputation=:newrep WHERE username=:questionowner";
                    $stmt = $con->prepare($sql);
                    $stmt->bindParam(':questionowner',$questionowner);
                    $stmt->bindParam(':newrep',$newrep);
                    $stmt->execute();
                    
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
                    $newrep = $newrep - 1;
                    $sql = "UPDATE accounts SET reputation=:newrep WHERE username=:questionowner";
                    $stmt = $con->prepare($sql);
                    $stmt->bindParam(':questionowner',$questionowner);
                    $stmt->bindParam(':newrep',$newrep);
                    $stmt->execute();
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
                    $newrep = $newrep - 1;
                    $sql = "UPDATE accounts SET reputation=:newrep WHERE username=:questionowner";
                    $stmt = $con->prepare($sql);
                    $stmt->bindParam(':questionowner',$questionowner);
                    $stmt->bindParam(':newrep',$newrep);
                    $stmt->execute();
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
                    $newrep = $newrep + 1;
                    $sql = "UPDATE accounts SET reputation=:newrep WHERE username=:questionowner";
                    $stmt = $con->prepare($sql);
                    $stmt->bindParam(':questionowner',$questionowner);
                    $stmt->bindParam(':newrep',$newrep);
                    $stmt->execute();
                }
            }
        }
    }
}
?>