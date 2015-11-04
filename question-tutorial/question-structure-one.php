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
    <div id="spiritofthesite" class="center">    
    <div id="intro"> 



Hi our site is dedicated to clearing any misconceptions you may have
        <br>

If you arn't sure about something ex: a subject regarding an upcomming exam, 
just ask for any common misconceptions and we'll answer
<br>
you can also ask to clarify things
<br>
Rember we're a communty so try not to piss anyone off  :)--- Happy mythbusting!
        <br>
<!--Below is an example of a question-->
</div>
<div id="repexplain">
Our site has something called a reputation system
        your reputation changes when:
    <br>
            you create a question   +5
    <br>
            your question gets upvoted     +3
    <br>
            your answer gets upvoted     +6
    <br>
            your comment/reply gets upvoted     +5
    <br>
            your answer gets downvoted     -3
    <br>
            you put out something that gets deleted     -50
            
    <br>
            
            Aside from your own reputation, each question and answer also has its own reputation. This is a source of crowdfunding for information. Every single upvote is a source saying yes this answer is correct. If 20 people upvote an answer, that means that 20 different sources approve of what's being shown to you.
This is what a question will look like:
</div>
<div id="rankexplain">
You might notice that you have something known as a rank under your username
a rank is a way to show how much you have <u>contributed</u> to our cocmmunity.
    <br>here are the ranks in ascending order:
<br>Learner
<br>contributor
<br>helper
<br>assistant
<br>teacher
</div>
    </div>
    <div id="htmlpage" class="center">