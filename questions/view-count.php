<?php
$filename = $_POST["filename"];
$username = $_POST["username"];
$lines = file($filename);
$individualparts = preg_split("/(!n!)/", $lines[3],-1,PREG_SPLIT_DELIM_CAPTURE);
$individualparts[2] ="~".$username."~".$individualparts[2];
$individualparts[0] = $individualparts[0]+1;
$lines[3] = implode($individualparts);
file_put_contents( $filename , $lines);
//make file name the file you would see in the database

function decodeURIComponent($str) { $str = preg_replace("/%u([0-9a-f]{3,4})/i","&#x\\1;",urldecode($str)); return html_entity_decode($str,null,'UTF-8'); };
$filename = decodeURIComponent($filename);


$filename = substr($filename,0,strlen($filename)-4);
// update the database
include '../config.php';
$con = new PDO('mysql:host='. DB_HOST .';dbname='. DB_NAME .'', DB_USER,DB_PASSWORD);

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
        $newrating = $newrating + 1;
        $updaterating = "UPDATE srating SET rating=:newrating WHERE title=:filename";
        $preparerating = $con->prepare($updaterating);
        $preparerating->bindParam(':filename',$filename);
        $preparerating->bindParam(':newrating',$newrating);
        $preparerating->execute();
?>