<?php
 session_start();   
?>

<!DOCTYPE HTML>

<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=Windows-1252" />
</head>
    <script type="text/javascript">
        var username = "<?php echo $_SESSION['username']; ?>";
    </script>
    
    <link rel="stylesheet" type="text/css" href="ask-stylesheet.css"/>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
	<script type='text/javascript' src='ask-script.js'></script>
    
    <?php include "../topbar.php"; ?>

    <div id="htmlpage" class="center">
        <input id="askmisconception" type="text" placeholder="ask a misconception">
        <textarea id="whatyouthinkyouknow" placeholder="put down what you think you know about the topic"></textarea>
        <input id="taginput" type="text" placeholder="add tags">
        <div id="tagcon">
            <div id="tags">
            </div>
            <div id="submitmisconception" name="submitmisconception" type="submit">Submit</div>
        </div>
        <div id="helpdiv">
            <p id="titlehelp">
                When creating a title please be specific. You must create one that has a minimum of 2 words ex: do plants give off carbon dioxide?<br><br><span style="font-size: 13px;">Note: due to the way files are stored, your title can't contain the following characters: \ / : * ? " < > |</span>
            </p>
            <p id="whatithinkiknowhelp">
                Welcome to the "what I think I know" box. People can clear up and improve your understanding of a topic by giving them what you <u>think</u> you know.This is also a place for you give more detail in specific situations. <div id="showwhatithinkiknowex">ex:</div> <p id="whatithinkiknowex">I've heard that plants take in carbon dioxide to make food. But I've also heard that they "exhale" it too??? can someone please clear this up?</p> <div id="whatithinkiknowback">back</div>
            </p> 
            <p id="taghelp">
                Tags help search results and generally helps catagorize your question. use hyphens for multi-word tags
            </p>
        
        </div>
    </div>
    
</body>




</html>