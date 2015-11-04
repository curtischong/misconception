<?php
include '../config.php';
$con = new PDO('mysql:host='. DB_HOST .';dbname='. DB_NAME .'', DB_USER,DB_PASSWORD);
$filename = $_POST["filename"];
$username = $_POST["username"];
$idofcontainer = $_POST["idofcontainer"];
$nthcomment = $_POST["nthcomment"];
$lines = file($filename);//file into an array
$lineslength = count($lines);
//loopthrough each answer
if($idofcontainer == "questioncommentbox"){
    $questionarray = preg_split("/(!n!)/", $lines[9],-1,PREG_SPLIT_DELIM_CAPTURE);
    $commentarray = preg_split("/(!c!)/", $questionarray[2],-1,PREG_SPLIT_DELIM_CAPTURE);
    $nthcomment = $nthcomment+1;
    $whoupvotedincommentarray = $nthcomment*7+$nthcomment-6;
    
    //if you've already upvoted
    if(strpos($commentarray[$whoupvotedincommentarray],"~".$username."~") !== false){
        $commentarray[$whoupvotedincommentarray] = str_replace("~".$username."~","",$commentarray[$whoupvotedincommentarray]);
        $commentarray[$whoupvotedincommentarray-2] = $commentarray[$whoupvotedincommentarray-2]-1;
        $questionarray[2] = implode($commentarray);
        $lines[9] = implode($questionarray);
        file_put_contents( $filename , $lines);
        echo "removed username";
        
        //update reputation for comment creator
        $questionowner = $commentarray[$whoupvotedincommentarray + 2];
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
        
    }else{
        $commentarray[$whoupvotedincommentarray] = "~".$username."~".$commentarray[$whoupvotedincommentarray];
        $commentarray[$whoupvotedincommentarray-2] = $commentarray[$whoupvotedincommentarray-2]+1;
        $questionarray[2] = implode($commentarray);
        $lines[9] = implode($questionarray);
        file_put_contents( $filename , $lines);
        echo "inserted username";
        
        //update reputation for comment creator
        $questionowner = $commentarray[$whoupvotedincommentarray + 2];
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
}else{
    for($c = 10; $c < $lineslength; $c++){
        //take answer info and split it up
        $answerarray = preg_split("/(!n!)/", $lines[$c],-1,PREG_SPLIT_DELIM_CAPTURE);

        if($answerarray[6] == $idofcontainer){
            //splitup answer info into the comment info
            $commentarray = preg_split("/(!c!)/", $answerarray[10],-1,PREG_SPLIT_DELIM_CAPTURE);
            $nthcomment = $nthcomment+1;
            $whoupvotedincommentarray = $nthcomment*7+$nthcomment-6;//finds which part of comment array is the whoupvoted comment section
            //if it exists remove the username

            if(strpos($commentarray[$whoupvotedincommentarray],"~".$username."~") !== false){
                $commentarray[$whoupvotedincommentarray] = str_replace("~".$username."~","",$commentarray[$whoupvotedincommentarray]);
                $commentarray[$whoupvotedincommentarray-2] = $commentarray[$whoupvotedincommentarray-2]-1;
                $answerarray[10] = implode($commentarray);
                $lines[$c] = implode($answerarray);
                file_put_contents( $filename , $lines);
                echo "removed username";

                //update reputation for comment creator
                $questionowner = $commentarray[$whoupvotedincommentarray + 2];
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

            }else{
                $commentarray[$whoupvotedincommentarray] = "~".$username."~".$commentarray[$whoupvotedincommentarray];
                $commentarray[$whoupvotedincommentarray-2] = $commentarray[$whoupvotedincommentarray-2]+1;
                $answerarray[10] = implode($commentarray);
                $lines[$c] = implode($answerarray);
                file_put_contents( $filename , $lines);
                echo "inserted username";

                //update reputation for comment creator
                $questionowner = $commentarray[$whoupvotedincommentarray + 2];
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




?>