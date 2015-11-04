<?php
session_start();
?>
<!DOCTYPE HTML>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=Windows-1252" />
</head>
<html>
	<link rel="stylesheet" type="text/css" href="accountsettings-stylesheet.css"/>
    	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
	<script type='text/javascript' src='accountsettings-script.js'></script>
    
<?php include "../topbar.php"; ?>
    
<div id="htmlpage" class="center">
    <div id="topbar"></div>
    <div id="profile">
    <!--do the photo link for people that don't have a pic-->
        <div id="profiledata">
            <div id="name"></div>
            <div id="reputation">...reputation</div>
            <div id="rank"></div>
        </div>
    </div>
        <div id="yourstats">
            <hr id="stathr">
            <table id="stattable">
            <thead>
                <tr><th colspan="4">Your Statistics</th></tr>
            </thead>
            <tr>
                <td class="statbox">Member since</td>    
                <td class="statbox" id="membersince"></td>
                <td class="statbox">you've made</td> 
                <td class="statbox" id="upvotesyoumade">upvotes</td>
            </tr>
            <tr>
                <td class="statbox">you've bookmarked</td>    
                <td class="statbox" id="bookmarksyoumade">pages</td>
                <td class="statbox">you've answered</td>
                <td class="statbox" id="answersyoumade">questions</td>
            </tr>
            <tr>
                <td class="statbox">you've made</td>    
                <td class="statbox" id="questionsyoumade">questions</td>
                <td class="statbox">you've made</td>
                <td class="statbox" id="commentsyoumade">comments</td>
            </tr>
            <tr>
                <td class="statbox">you've made</td>    
                <td class="statbox">edits</td>
                <td class="statbox">you've flagged</td>
                <td class="statbox">0 pages</td>
            </tr>
            </table>
            
            <!--<p id="statistics">Statistics</p>
            <p id="membersince">Member since</p>
            <p id="membersince">Content Liked:</p><!--500pgs-->
            <!--<p id="membersince">Content Downloaded:</p>
            <div id="milestoneawards"></div>-->
        </div>
        <div id="personalinfo">
            <!--get rid of backgorund color-->
        <p class="unchangeinfo">Username:
		<?php if (isset($_SESSION["username"])){echo $_SESSION['username'];}?>
		</p>
        <p class="unchangeinfo">Reset Password</p>
        <p class="unchangeinfo">E-mail:
		<?php //if (isset($_SESSION["username"])){echo $_SESSION['email'];}?>
		</p>
            <div>
                <textarea maxlength="400" id="yourinterests" class="write" placeholder="What do you like?"></textarea>
                <div class="edit" title="click me to edit"> Your Interests:</div>
            </div>
            <div>
                <textarea maxlength="400" id="aboutyou" class="write" placeholder="tell us a bit of yourself"></textarea>
                <div id="aboutyoupar" class="edit" title="click me to edit">About You:</div>
            </div>
            <button id="savechanges">Save Changes</button>
            <button id="cancelchangeinfo">Cancel</button>
        </div>
        <div id="detailedinfocon">
            <h2 id="yourquestionsp">Your Questions</h2>
            <div id="yourquestions" class="detailedinfo">
                <!--<div class="questionrepresentation">
                    <p class="detailedtitle" title="hey">Hey my name is curtis and this is a really long title</p>
                    <div class="detailedtagcon">
                        <div class="tag">hi</div>
                        <div class="tag">supasad</div>
                        <div class="tag">sup</div>
                        <div class="tag">sup</div>
                        <div class="tag">sup</div>
                        <div class="tag">sup</div>
                        <div class="tagconbottom"></div>
                    </div>
                    <div class="detailednumbers">
                        <div class="detailedquestionreputation">0</div>
                        <div class="detailedquestionreputationp">Rep</div>
                        <div class="detailedtotalrepofanswers">123</div>
                        <div class="detailedtotalrepofanswersp">Ans Rep</div>
                        <div class="detailednumberofviews">6543</div>
                        <div class="detailednumberofviewsp">Views</div>
                    </div>
                </div>-->
                <hr class="hratbottom">
                <div id="yourquestionsright" class="rightquestion"></div>
                <div id="yourquestionsleft" class="leftquestion"></div>
            </div>
            <h2 id="yourbookmarksp">Your Bookmarks</h2>
            <div id="yourbookmarks" class="detailedinfo">
            <hr class="hratbottom">
            <div id="yourbookmarksright" class="rightquestion"></div>
            <div id="yourbookmarksleft" class="leftquestion"></div>
            </div>
            <h2 id="youranswersp">Your Answers</h2>
            <div id="youranswers" class="detailedinfo">
            <div id="youranswersright" class="rightquestion"></div>
            <div id="youranswersleft" class="leftquestion"></div>
            </div>
        </div>
    </div>
</body>
</html>