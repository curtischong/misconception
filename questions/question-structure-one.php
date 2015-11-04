<?php
 session_start();   
?>

<!DOCTYPE HTML>
<html>
    <link rel="stylesheet" type="text/css" href="view-misconception-stylesheet.css"/>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
	<script type='text/javascript' src='view-misconception-script.js'></script>
    <script type="text/javascript">
        var usernames = "<?php echo $_SESSION['username']; ?>";
        </script>
    
    <?php 
    //update user session

include '../config.php';
$con = new PDO('mysql:host='. DB_HOST .';dbname='. DB_NAME .'', DB_USER,DB_PASSWORD);

$query = $con->prepare("SELECT * FROM accounts where username = :user");
		$query->bindParam(':user',$_SESSION['username']);
		$query->execute();
        $data = $query->fetch(PDO::FETCH_ASSOC);

        //resumes previous session
        //session_unset();
        //session_destroy();
        //starts new session  
        //session_start();
        $_SESSION['username'] = $data['username'];
        $_SESSION['reputation'] = $data['reputation'];
        $_SESSION['rank'] = $data['rank'];





    include "../topbar.php"; 
    ?>
    <div id="hiddenreplies" class="center"></div>
    <div id="flagquestionbox" class="center"><div class="closerepliescircle"><div class="closerepliesx">x</div></div>
        <div id="idofflaggeddiv"></div><div id="typeofflag"></div><!--question, comment, reply-->
    </div>
    <div id="htmlpage" class="center">