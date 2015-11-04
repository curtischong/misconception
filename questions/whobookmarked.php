<?php
$filename = $_POST["filename"];
$username = $_POST["username"];

$lines = file($filename);
$individualparts = preg_split("/(!n!)/", $lines[6],-1,PREG_SPLIT_DELIM_CAPTURE);

include '../config.php';
$con = new PDO('mysql:host='. DB_HOST .';dbname='. DB_NAME .'', DB_USER,DB_PASSWORD);


/*function decode($misconceptiontitle){
    $misconceptiontitle = str_replace('(p)','%',$misconceptiontitle);
    $misconceptiontitle = str_replace('(q)','?',$misconceptiontitle);
    $misconceptiontitle = str_replace('(h)','#',$misconceptiontitle);
    $misconceptiontitle = str_replace('(b)','/',$misconceptiontitle);
    $misconceptiontitle = str_replace('(f)','\\',$misconceptiontitle);
    $misconceptiontitle = str_replace('(u)','^',$misconceptiontitle);
    $misconceptiontitle = str_replace('(a)','*',$misconceptiontitle);
    $misconceptiontitle = str_replace('!-',' ',$misconceptiontitle);
    $misconceptiontitle = str_replace('(an)','&',$misconceptiontitle);
    return $misconceptiontitle;
};*/
function decodeURIComponent($str) { $str = preg_replace("/%u([0-9a-f]{3,4})/i","&#x\\1;",urldecode($str)); return html_entity_decode($str,null,'UTF-8'); };




// in the future make this affect search queries

if(strpos($individualparts[2],"~".$username."~") !== false){//it's found
    $individualparts[0] = $individualparts[0] - 1;
    $individualparts[2] = str_replace("~".$username."~","",$individualparts[2]);
    $lines[6] = implode($individualparts);
    file_put_contents( $filename, $lines);
    echo "removed username";
    
    $filename = substr($filename, 0, -4);
    $filename = decodeURIComponent($filename);
    
    

    $query = $con->prepare("SELECT * FROM srating where title = :questiontitle");
    $query->bindParam(':questiontitle',$filename);
    $query->execute();
    $data = $query->fetch(PDO::FETCH_ASSOC);
    $newrating = $data['rating'];
    $newrating = $newrating - 8;
    $sql = "UPDATE srating SET rating=:newrating WHERE title=:questiontitle";
    $stmt = $con->prepare($sql);
    $stmt->bindParam(':questiontitle',$filename);
    $stmt->bindParam(':newrating',$newrating);
    $stmt->execute();
}else{
    $individualparts[0] = $individualparts[0] + 1;
    $individualparts[2] = "~".$username."~".$individualparts[2];
    $lines[6] = implode($individualparts);
    file_put_contents( $filename, $lines);
    echo "inserted username";
    
    $filename = substr($filename, 0, -4);
    $filename = decodeURIComponent($filename);
    
    

    $query = $con->prepare("SELECT * FROM srating where title = :questiontitle");
    $query->bindParam(':questiontitle',$filename);
    $query->execute();
    $data = $query->fetch(PDO::FETCH_ASSOC);
    $newrating = $data['rating'];
    $newrating = $newrating + 8;
    $sql = "UPDATE srating SET rating=:newrating WHERE title=:questiontitle";
    $stmt = $con->prepare($sql);
    $stmt->bindParam(':questiontitle',$filename);
    $stmt->bindParam(':newrating',$newrating);
    $stmt->execute();
    
    
    
}
?>