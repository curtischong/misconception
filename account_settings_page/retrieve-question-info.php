<?php
$questions = $_POST["questions"];

$questions = preg_split("/(!n!)/", $questions,-1,PREG_SPLIT_DELIM_CAPTURE);
include '../config.php';
$con = new PDO('mysql:host='. DB_HOST .';dbname='. DB_NAME .'', DB_USER,DB_PASSWORD);


//$questions[0] = $questions[0];
$useranswers = explode("~~",$questions[0]);
//if i explode at ~~ then I have to make sure no title has ~~
//change it here add a new fake uqestion so sql takes the time to do that

//rule if it doesn't exist don't output anyhting

//$questions[2] = $questions[2];
$userbookmarks = explode("~~",$questions[2]);
//$questions[4] = $questions[4];
$userquestions = explode("~~",$questions[4]);

/*function rawurldecode($misconceptiontitle){
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
};
function rawurlencode($misconceptiontitle){
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
};*/

//echo 0;
$questiondata="";
//echo $useranswers[0];
//print_r($useranswers);
$answer = $useranswers[0];
$answer = str_replace("\n",'',$answer);
//if(strpos($answer,'~')==-1){
if($answer === "0"){
}else{
    for($currentuseranswer = 0;$currentuseranswer < count($useranswers);$currentuseranswer++){
        //echo $useranswers[$currentuseranswer];
        $useranswers[$currentuseranswer] = str_replace("~","",$useranswers[$currentuseranswer]);
        $useranswers[$currentuseranswer] = rawurldecode($useranswers[$currentuseranswer]);
        //echo $useranswers[$currentuseranswer];
        $questiontitle = $useranswers[$currentuseranswer];
        $currenttitle= $questiontitle;
        $query = $con->prepare("SELECT * FROM srating where title = :questiontitle");
        $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                    $query->bindParam(':questiontitle',$currenttitle);
                    $query->execute();
                    $data = $query->fetch(PDO::FETCH_ASSOC);
                    if($currentuseranswer > 0){
                        $questiondata = $questiondata ."!n!";
                    }
            $title = $data['title'];
            $tags = $data['tags'];
            $repofanswers = $data['repofanswers'];
            $questionrep = $data['questionrep'];
            $views = $data['views'];
                    //remember to remove the !n! in the js at the start of every query
                //echo    $title."!q!".$tags . "!q!". $questionrep."!q!".$repfanswers."!q!".$views;
        //echo $repofanswers;
        $therep = $repofanswers;
        $questiondata = $questiondata. $title."!q!".$tags . "!q!". $questionrep."!q!".$therep."!q!".$views;
    }
}
$questiondata =$questiondata."!x!";
//print_r($userbookmarks[0]);
$bookmark =$userbookmarks[0];
$bookmark = str_replace("\n",'',$bookmark);
//if(strpos($bookmark,'~')==-1){
if($bookmark === "0"){
}else{
    for($currentbookmark = 0;$currentbookmark < count($userbookmarks);$currentbookmark++){
        $userbookmarks[$currentbookmark] = str_replace("~","",$userbookmarks[$currentbookmark]);
        $userbookmarks[$currentbookmark] = rawurldecode($userbookmarks[$currentbookmark]);
        $questiontitle = $userbookmarks[$currentbookmark];
        $currenttitle= $questiontitle;

        $query = $con->prepare("SELECT * FROM srating where title = :questiontitle");
                    $query->bindParam(':questiontitle',$currenttitle);
                    $query->execute();
                    $data = $query->fetch(PDO::FETCH_ASSOC);
                    if($currentbookmark > 0){
                        $questiondata = $questiondata ."!n!";
                    }
                    //remember to remove the !n! in the js at the start of every query
                    $questiondata = $questiondata . $data['title']."!q!".$data['tags'] . "!q!". $data['questionrep']."!q!".$data['repofanswers']."!q!".$data['views'];
    }
}

$questiondata =$questiondata."!x!";
//echo $userquestions[0];
//print_r($userquestions[0]);
$question = $userquestions[0];
$question = str_replace("\n",'',$question);
//if(strpos($question,'~')==-1){
if($question === "0"){
}else{
    for($currentquestion = 0;$currentquestion <  count($userquestions);$currentquestion++){
        $userquestions[$currentquestion] = str_replace("~","",$userquestions[$currentquestion]);
        $userquestions[$currentquestion] = rawurldecode($userquestions[$currentquestion]);
        $questiontitle = $userquestions[$currentquestion];
        $currenttitle= $questiontitle;

        $query = $con->prepare("SELECT * FROM srating where title = :questiontitle");
                    $query->bindParam(':questiontitle',$currenttitle);
                    $query->execute();
                    $data = $query->fetch(PDO::FETCH_ASSOC);
                    if($currentquestion > 0){
                        $questiondata = $questiondata ."!n!";
                    }
                    //remember to remove the !n! in the js at the start of every query
                    $questiondata = $questiondata . $data['title']."!q!".$data['tags'] . "!q!". $data['questionrep']."!q!".$data['repofanswers']."!q!".$data['views'];
    }
}


   echo $questiondata;
//$userbookmarks = 
//$userquestions = 
    
    //take each question and split it by ~~ (explode maybe)
    //loop through each question and remove all instances of ~~ of "\n"
    //take the string and search for it in the database
    //return the reults in this form
    //question title!q!question tags tag,tag,tag!q!questionrep!q!answersrep!q!views!n!again for all titles in the answers section then !x! next set of questions for htis section
    
    
    
    
?>