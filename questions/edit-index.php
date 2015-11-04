<?php
 session_start();   
?>

<!DOCTYPE HTML>
<html>
    <link rel="stylesheet" type="text/css" href="edit-stylesheet.css"/>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
	<script type='text/javascript' src='edit-script.js'></script>
    <?php include "../topbar.php"; ?>
    <script type="text/javascript">
        var usernames = "<?php echo $_SESSION['username']; ?>";
        </script>
    <div id="htmlpage" class="center">
    <div id="misconceptiontitle"></div>
    <textarea id="whatyouthinkyouknow"></textarea>
        <div id="submitedit">Submit Changes</div>
    </div>
    </body>
</html>