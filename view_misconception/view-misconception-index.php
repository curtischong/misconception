<?php
 session_start();   
?>

<!DOCTYPE HTML>
<html>
    
    <link rel="stylesheet" type="text/css" href="view-misconception-stylesheet.css"/>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
	<script type='text/javascript' src='view-misconception-script.js'></script>
    
    <?php include "../topbar.php"; ?>
    
    <div id="htmlpage" class="center">
        <div id="questiontitle">Does Increasing Volume Increase Battery Use?</div>
        <div id="whatithinkiknow">
            <pre id="whatithinkiknowp">
Hia, my name is Curtis and I have a problem. My friends keep telling me that if they make their speaker volume higher, then it'll drain their battery faster. However I've heard that Transformers inside the device don't increase battery usage. Halp
            </pre>
        </div>
        <div id="questioncommentbox">
            <div id="questioncommentinputdiv">
                <input id="createcommenttoanswer" type="text" placeholder="Add a comment">
            </div>
            <div id="questioncommentcon">
                <div class="directcommenttoquestion">
                    <div class="commentupvotedownvotecon">
                    <div class="commentupvote"></div>
                    <div class="commentrep">5</div>
                    <div class="commentdownvote"></div>
                    <img class="commentflag" src="flag_comment.PNG">
                    </div>
                    <div class=commentusername>Splacorn</div>
                    <div class="commentp">you gorgot a period after the halp</div>
                </div>
                <div class="directcommenttoquestion">
                    <div class="commentupvotedownvotecon">
                    <div class="commentupvote"></div>
                    <div class="commentrep">5</div>
                    <div class="commentdownvote"></div>
                    <img class="commentflag" src="flag_comment.PNG">
                    </div>
                    <div class=commentusername>Splacorn</div>
                    <div class="commentp">i believe that halp isn't a wird</div>
                </div>
            </div>
        </div>
        <div id="helpdiv">
            <div id="questioninfo">
                <div id="questionstatistic">
                    <div class="reputationdiv">
                        <div class="uptriangle"></div>
                        <div class="questionreputation">100</div>
                        <div class="downtriangle"></div>
                    </div>
                    <div id="questionstatistics">
                        <div id="numberofviews">Has 5000 views</div>
                        <div id="dateasked">Asked on September 30th 2014</div>
                        <div id="lastactive">Last active 2 years ago</div>
                        <div id="numberofbookmarks">Has 58 bookmarks</div>
                    </div>
                </div>
                <div id="tags"></div>
                <div class="profile">
                    <div id="questionaskedby">Question Asked By</div>
                    <div class="profileinformation">
                        <div class="name">Splacorn</div>
                        <div class="creatorreputation">10,000 reputation</div>
                        <!--rank consists of how many times they've visited the site, how many comments made, reputation, statis (staff or not) it is a way to determine how experienced they are with the community-->
                        <div class="rank">Founder</div>
                    </div>
                </div>
                <div id="questionadditionalbuttons">
                    <div id="flaganswer">Flag Answer</div>
                    <div id="sharequestion">Share Question</div>
                </div>
            </div>
            <div id="answerquestioninstruction">
                Thanks for helping us out!
                <br>
                Remember when answering the question, please explain why you're correct.
                <br>
                The better the answer, the more reputation you might score.
                <br>
                Try to include details but don't overcomplicate things
                <br>
                one more thing. please don't make someone feel bad. everyone was once a beginner!
            </div>
        </div>
        <div class="solutionsdiv">
            <pre class="answer" id="splacorn">HI okay first of all, you need to work on your grammer ("halp isn't a word").anyways it is true that turning up the volume increases battery usage. THis is because it requires more energy to make it louder. However, it uses so much that there is basically "no increase in battery usage" Hope this helps!</pre>
            <div class="solutioninfodiv">
                <div class="reputationdiv">
                    <div class="uptriangle"></div>
                    <div class="questionreputation">100</div>
                    <div class="downtriangle"></div>
                </div>
                <div class="answeradditionalbuttons">
                    <div class="addcomment">Add a Comment</div>
                    <div class="flaganswer">Flag Answer</div>
                    <div class="sharequestion">Share Question</div>
                </div>
                <div class="profile">
                    <div class="answeredby">Answered By</div>
                    <div class="profileinformation">
                        <div class="name">Splacorn</div>
                        <div class="creatorreputation">10,000 reputation</div>
                        <!--rank consists of how many times they've visited the site, how many comments made, reputation, statis (staff or not) it is a way to determine how experienced they are with the community-->
                        <div class="rank">Founder</div>
                    </div>
                </div>
            </div>
            <hr class="hrbeforecomments">
            <div class="commenttoanswerdiv">
                <input class="commenttoanswer">
            </div>
                <div class="commentofanswer">
                    <div class="directcommenttoquestion">
                        <div class="commentupvotedownvotecon">
                        <div class="commentupvote"></div>
                        <div class="commentrep">0</div>
                        <div class="commentdownvote"></div>
                        <img class="commentflag" src="flag_comment.PNG">
                        </div>
                        <div class=commentusername>Splacorn</div>
                        <div class="commentp">DERP!</div>
                    </div>
                    
                </div>
        </div>
        
        <div id="answerquestiondiv">
            <textarea id="answerquestionarea" placeholder="Know the answer? Help us out my answering it!"></textarea>
        </div>
    </div>
</body>




</html>