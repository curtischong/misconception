<?php
$misconceptiontitle = $_POST["misconceptionname"];
$whatyouthinkyouknow = $_POST["whatyouthinkyouknow"];
$username = $_POST["username"];
$tagarray = $_POST["tagarray"];



$misconceptiontitle = str_replace('\\','',$misconceptiontitle);
$misconceptiontitle = str_replace('/','',$misconceptiontitle);
$misconceptiontitle = str_replace(':','',$misconceptiontitle);
$misconceptiontitle = str_replace('*','',$misconceptiontitle);
$misconceptiontitle = str_replace('?','',$misconceptiontitle);
$misconceptiontitle = str_replace('"','',$misconceptiontitle);
$misconceptiontitle = str_replace('<','',$misconceptiontitle);
$misconceptiontitle = str_replace('>','',$misconceptiontitle);
$misconceptiontitle = str_replace('|','',$misconceptiontitle);

/*
function encodeURIComponent($misconceptiontitle){
    $misconceptiontitle = str_replace("%","(p)",$misconceptiontitle);
    $misconceptiontitle = str_replace('?','(q)',$misconceptiontitle);
    $misconceptiontitle = str_replace('#','(h)',$misconceptiontitle);
    $misconceptiontitle = str_replace('/','(f)',$misconceptiontitle);
    $misconceptiontitle = str_replace('\\','(b)',$misconceptiontitle);
    $misconceptiontitle = str_replace('^','(u)',$misconceptiontitle);
    $misconceptiontitle = str_replace('*','(a)',$misconceptiontitle);
    $misconceptiontitle = str_replace(' ','!-',$misconceptiontitle);
    $misconceptiontitle = str_replace('&','(an)',$misconceptiontitle);
    return $misconceptiontitle;
};
function decodeURIComponent($misconceptiontitle){
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


function encodeURIComponent($str) {
    $revert = array('%21'=>'!', '%2A'=>'*', '%27'=>"'", '%28'=>'(', '%29'=>')');
    return strtr(rawurlencode($str), $revert);
};
function decodeURIComponent($str) { $str = preg_replace("/%u([0-9a-f]{3,4})/i","&#x\\1;",urldecode($str)); return html_entity_decode($str,null,'UTF-8'); };
//http://stackoverflow.com/questions/1734250/what-is-the-equivalent-of-javascripts-encodeuricomponent-in-php
//http://stackoverflow.com/questions/3896591/what-is-the-equivalent-of-javascripts-decodeuricomponent-in-php

//echo $misconceptiontitle;
// % = (p)
// ? = (q)
// # = (h)
// / = (f)
// \ = (b)
// ^ = (u)
// * = (a)
//   = !-
//
//
//SECURITY FLAWWW something like:
//!c!n!!  will leave !c! behind
//actually i'm not suo sure... i'll figure this out later
//
//

$whatyouthinkyouknow = str_replace("\n",'\-n',$whatyouthinkyouknow);
$whatyouthinkyouknow = strip_tags($whatyouthinkyouknow);
$whatyouthinkyouknow = str_replace("!n!",'',$whatyouthinkyouknow);
$whatyouthinkyouknow = str_replace("!c!",'',$whatyouthinkyouknow);

$misconceptiontitle = encodeURIComponent($misconceptiontitle);


$misconceptiontitle = str_replace('.php','',$misconceptiontitle);
$misconceptiontitle = str_replace('.txt','',$misconceptiontitle);
$misconceptiontitle = str_replace('.css','',$misconceptiontitle);
$misconceptiontitle = str_replace('.js','',$misconceptiontitle);
$misconceptiontitle = str_replace('.html','',$misconceptiontitle);
$checkquestion = glob("../questions/*.php");
if(in_array("../questions/".$misconceptiontitle.".php", $checkquestion)){
 exit("sorry, you must chose a different title!");  
}
//<div class="tagbox" title="Mathematics">Mathematics</div>
//$tagarray = explode(",",$tagarray);
$tagvariable = "<replacetaghere></replacetaghere>";
for($tagnumber = 0;$tagnumber<count($tagarray);$tagnumber++){
    $tagarray[$tagnumber] = str_replace(" ",'',$tagarray[$tagnumber]);
    $tagarray[$tagnumber] = str_replace(",",'',$tagarray[$tagnumber]);
    
    $tagvariable = str_replace('<replacetaghere></replacetaghere>','<div class="tagbox" title='.$tagarray[$tagnumber].'>'.$tagarray[$tagnumber].'</div><replacetaghere></replacetaghere>',$tagvariable);
}

$username = $_POST["username"];
//$todaydate=getdate();
//print_r($todaydate["year"]);
//make the actual php page
$misconceptiontitle = decodeURIComponent($misconceptiontitle);
$fp = fopen($_SERVER['DOCUMENT_ROOT'] . "/misconception/questions/". $misconceptiontitle.".php","wb");
fwrite($fp,'<?php include "question-structure-one.php"; ?>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=Windows-1252" />
</head>
<h1 id="questiontitle">'.$misconceptiontitle.'</h1>
<?php include "question-structure-two.php"; ?><div id="questionaskedby">Question Asked By</div>
                    <div class="profileinformation">
                        <div class="name">'.$username.'</div>
                        <div class="creatorreputation"></div>
                        <div class="rank"></div>
                    </div>
                </div>
                <div id="questionadditionalbuttons">
                    <div id="flaganswer">Flag Question</div>
                    <div id="sharequestion">Share Question</div>
                </div>
                <div id="tags">'.$tagvariable.'</div>
                <div id="bookmarkquestion">Bookmark This</div>
                <div id="editquestion">Edit Question</div>
            </div>
            <div id="answerquestioninstruction">
                Thanks for helping us out!
                <br>
                Remember when answering the question, please provide a clean answer.
                <br>
                Try to include details but try not to overcomplicate things
                <br>
                answers in point form are powerful don\'t forget that!
                <br>
                one more thing. please don\'t make someone feel bad. everyone was once a beginner!
                <div id="submitanswer">Submit Your Answer</div>
            </div>
        </div>
        <div id="solutionsdivcon"><addanswer></addanswer></div>
        <div id="answerquestiondiv">
            <textarea id="answerquestionarea" placeholder="Know the answer? Help us out my answering it!"></textarea>
        </div>
    </div>
</body>




</html>');
fclose($fp);

//make the txt file that holds the info
$misconceptiontitle = encodeURIComponent($misconceptiontitle);
$fm = fopen($_SERVER['DOCUMENT_ROOT'] . "/misconception/questions/". $misconceptiontitle.".txt","wb");
fwrite($fm,'0'."\n"."\n"."\n".'0!n!~undefined~'."\n". date("M")." ".date("j").','. date("Y")."\n". date("M")." ".date("j").','. date("Y")."!n!"."\n".'0'."!n!"."~undefined~"."\n".',undefined,'."\n".$username."\n".$whatyouthinkyouknow."!n!" );
fclose($fm);



$ratingval = 0;
include '../config.php';
$con = new PDO('mysql:host='. DB_HOST .';dbname='. DB_NAME .'', DB_USER,DB_PASSWORD);

$tagsinstring = implode(',', $tagarray);
$misconceptiontitle = decodeURIComponent($misconceptiontitle);
                        $query = $con->prepare("INSERT INTO srating (title, rating, tags) VALUES (:title,:rating,:tags) ");
							
						//bind parameters
						$query->bindParam(':title',$misconceptiontitle);
						$query->bindParam(':rating',$ratingval);// for everytag that a thing has, give it an increased rating by one
						$query->bindParam(':tags',$tagsinstring);
                        $query->execute();

                        //update user rep cause htey'd asked a question
                        $uquery = $con->prepare("SELECT * FROM accounts where username = :questionowner");
                        $uquery->bindParam(':questionowner',$username);
                        $uquery->execute();
                        $data = $uquery->fetch(PDO::FETCH_ASSOC);
                        $newrep = $data['reputation'];
                        $newrep = $newrep + 5;
                        $stmt = $con->prepare("UPDATE accounts SET reputation=:newrep WHERE username=:questionowner");
                        $stmt->bindParam(':questionowner',$username);
                        $stmt->bindParam(':newrep',$newrep);
                        $stmt->execute();

$misconceptiontitle = encodeURIComponent($misconceptiontitle);
echo "/misconception/questions/".$misconceptiontitle.".php";


//there's a bug where if php echos you must chose a dif title js thinks that it's a link nad send you to that place



//header("Location: ../ask_misconception_page/ask-index.php");
?>