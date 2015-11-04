<?php
 session_start();   
?>

<!DOCTYPE HTML>
<html>
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=Windows-1252" />
</head>
    <link rel="stylesheet" type="text/css" href="homepage-stylesheet.css"/>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
	<script type='text/javascript' src='homepage-script.js'></script>
    
<?php include "../topbar.php"; ?>
    
    <div id="htmlpage" class="center">
        <input id="searchmisconception" type="text" placeholder="search for a misunderstood topic">
        <div id="holdsearchresults">
            <div class="searchresult">
                <div style="position: absolute; top: 20px; left: 190px;color: white;">type into the box to search for misconceptions ^</div>
                
            </div>
            <!--<div class="searchresult">
            <div class="maininfo">
                <div class="misconceptiontitle">does water cause death?</div>
            </div>    
            <div class="specificinfo">
                <div class="tagbox">
                    <div class="tag" title=Water>Water</div>
                    <div class="tag" title=Death>Death</div>
                </div>
                <div class="numbers">
                    <div class="questionreputation">40</div>
                    <div class="questionreputationp" title="the reputation of the question">Rep</div>
                    <div class="totalrepofanswers">250</div>
                    <div class="totalrepofanswersp" title="all of the reputation of the answers combined">Rep of Ans</div>
                    <div class="numberofviews">2783</div>
                    <div class="numberofviewsp" title="number of accounts that have visited the page">Views</div>
                </div>
            </div>
            </div>-->

        
        </div>
    </div>
</body>




</html>