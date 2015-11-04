<?php
$user = $_POST["user"];
include 'config.php';
$con = new PDO('mysql:host='. DB_HOST .';dbname='. DB_NAME .'', DB_USER,DB_PASSWORD);
$query = $con->prepare("SELECT * FROM accounts where username = :user");
            $query->bindParam(':user',$user);
            $query->execute();
            $data = $query->fetch(PDO::FETCH_ASSOC);
$userrep = $data['reputation'];
$userrank = $data['rank'];
$userinfo = $userrep."~".$userrank."~".$user;
echo $userinfo;
?>