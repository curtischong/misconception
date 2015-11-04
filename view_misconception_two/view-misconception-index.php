<?php
 session_start();   
?>

<!DOCTYPE HTML>
<html>
    
    <link rel="stylesheet" type="text/css" href="view-misconception-stylesheet.css"/>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
	<script type='text/javascript' src='view-misconception-script.js'></script>
    
    <?php include "../topbar.php"; ?>
    
        <script type="text/javascript">
        var usernames = "<?php echo $_SESSION['username']; ?>";
        </script>
    
    <div id="htmlpage" class="center">
        <div id="questiontitle">Does Increasing Volume Increase Battery Use?</div><!--generated on php script generation not txt file-->
        <div id="whatithinkiknow">
            <pre id="whatithinkiknowp">
            </pre>
        </div>
        <div id="questionhiddencomments"></div>
        <div id="questioncommentbox">
            <div id="questioncommentinputdiv">
                <input id="createcommenttoanswer" type="text" placeholder="Add a comment">
            </div>
            <div id="questioncommentcon">
                <!--<div class="directcommenttoquestion">
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
                </div>-->
            </div>
        </div>
        <div id="helpdiv">
            <div id="questioninfo">
                <div id="questionstatistic">
                    <div class="reputationdiv">
                        <div class="uptriangle"></div>
                        <div class="questionreputation"></div>
                        <div class="downtriangle"></div>
                        <!--<div class="questionupvotes"></div>
                        <div class="questiondownvotes"></div>-->
                    </div>
                    <div id="questionstatistics">
                        <div id="numberofviews"></div>
                        <div id="dateasked"></div>
                        <div id="lastactive"></div>
                        <div id="numberofbookmarks"></div>
                    </div>
                </div>
                <div class="profile">
                    <div id="questionaskedby">Question Asked By</div>
                    <div class="profileinformation">
                        <div class="name">Splacorn</div>
                        <div class="creatorreputation"></div>
                        <!--rank consists of how many times they've visited the site, how many comments made, reputation, statis (staff or not) it is a way to determine how experienced they are with the community-->
                        <div class="rank"></div>
                    </div>
                </div>
                <div id="questionadditionalbuttons">
                    <div id="flaganswer">Flag Question</div>
                    <div id="sharequestion">Share Question</div>
                </div>
                <div id="tags"><div class="tagbox" title="Mathematics">Mathematics</div></div>
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
                <div id="submitanswer">Submit Your Answer</div>
            </div>
        </div>
        <div id="solutionsdivcon">
            <div class="solutionsdiv">
                <pre class="answer" id="splacorne"></pre>
                <div class="outsiderep" title="The answer's reputation"></div>
                <div class="hiddencomments"></div>
                <div class="solutioninfodiv">
                    <div class="reputationdiv">
                        <div class="uptriangle" title="Reasons to upvote: helped you out, answers question, accurate information"></div>
                        <div class="questionreputation" title="The answer's reputation"></div>
                        <div class="downtriangle" title="Reasons to downvote: doesn't answer question, innacurate information"></div>
                        <!--<div class="questionupvotes"></div>
                        <div class="questiondownvotes"></div>-->
                    </div>
                    <div class="answeradditionalbuttons">
                        <div class="addcomment">Add a Comment</div>
                        <div class="flaganswer" title="Reasons to flag: spam, should not be on Misconception, isn't helpful">Flag Answer</div>
                        <div class="sharequestion">Share Question</div>
                    </div>
                    <div class="profile">
                        <div class="answeredby">Answered By</div>
                        <div class="profileinformation">
                            <!--use ajax to fill info inlater-->
                            <div class="name"></div>
                            <div class="creatorreputation"></div>
                            <!--rank consists of how many times they've visited the site, how many comments made, reputation, statis (staff or not) it is a way to determine how experienced they are with the community-->
                            <div class="rank"></div>
                        </div>
                    </div>
                </div>
                <hr class="hrbeforecomments">
                <div class="commenttoanswerdiv">
                    <input class="commenttoanswer">
                </div>
                <div class="commentofanswer">
                </div>
            </div>
<addanswer></addanswer>
        </div>
        <div id="answerquestiondiv">
            <textarea id="answerquestionarea" placeholder="Know the answer? Help us out my answering it!"></textarea>
        </div>
    </div>
</body>




</html>