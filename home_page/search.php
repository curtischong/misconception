<?php
$searchquery = $_POST["searchquery"];
$searchqueryarray = explode(" ",$searchquery);
    include '../config.php';
$con = new PDO('mysql:host='. DB_HOST .';dbname='. DB_NAME .'', DB_USER,DB_PASSWORD);
    
/*$query = $con->prepare("INSERT INTO srating (title, rating, tags) VALUES (:title,:rating,:tags) ");
							
						//bind parameters
						$query->bindParam(':title',$misconceptiontitle);
						$query->bindParam(':rating',$ratingval);// for everytag that a thing has, give it an increased rating by one
						$query->bindParam(':tags',$tagsinstring);
                        $query->execute();*/    

      /*$questionowner = $commentarray[$whoupvotedincommentarray + 2];
        $query = $con->prepare("SELECT * FROM accounts where username = :questionowner");
        $query->bindParam(':questionowner',$questionowner);
        $query->execute();
        $data = $query->fetch(PDO::FETCH_ASSOC);
        $newrep = $data['reputation'];
        $newrep = $newrep - 1;
        $sql = "UPDATE accounts SET reputation=:newrep WHERE username=:questionowner";
        $stmt = $con->prepare($sql);
        $stmt->bindParam(':questionowner',$questionowner);
        $stmt->bindParam(':newrep',$newrep);
        $stmt->execute();*/
$firstsearcharray = array();

/*function encodeURIComponent($misconceptiontitle){
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








//loop through the titles
$arrayofalltitles = glob('../questions/*.php');
//loop through the tokens
//echo "hi";

$fixedfilepath = array();
for($numberoftitles = 0;$numberoftitles < count($arrayofalltitles); $numberoftitles++){
    array_push($fixedfilepath,basename($arrayofalltitles[$numberoftitles],".php"));
}
//print_r($fixedfilepath);

for($currenttitle = 0;$currenttitle < count($fixedfilepath); $currenttitle++){
    $numberofmatchedtokens = 0;
    for($currenttoken = 0;$currenttoken < count($searchqueryarray);$currenttoken++){
        /*$fixedfilepath[$currenttitle] = preg_replace("/[\'^£$%&*()}{@#~?><>,|=_+¬-]/", "", $fixedfilepath[$currenttitle]);*/
        $matchedtoken = substr_count($fixedfilepath[$currenttitle],$searchqueryarray[$currenttoken]);
        //die();
        //echo $fixedfilepath[$currenttitle];
        $numberofmatchedtokens = $numberofmatchedtokens + $matchedtoken;
    }
    if(strpos($fixedfilepath[$currenttitle]," ") != false){//if it is found meaning that it isn't a question
        if($numberofmatchedtokens > 1){
            //echo $fixedfilepath[$currenttitle];
            array_push($firstsearcharray,$fixedfilepath[$currenttitle]);
        }
    }
    //echo $numberofmatchedtokens;
}

//print_r($firstsearcharray);





/*$query = $con->prepare("SELECT title,srating, match( srating ) AGAINST ( '+harpoon +article' IN NATURAL LANGUAGE MODE) AS relevance FROM testproduct ORDER BY relevance DESC");
        $query->bindParam(':$searchqueryarray',$searchqueryarray);
        $query->execute();
        $data = $query->fetch(PDO::FETCH_ASSOC);*/
/*for($tokennumber = 0;$tokennumber<count($searchqueryarray);$tokennumber++){
    $currenttoken = $searchqueryarray[$tokennumber];//currenttoken is the current word that we're searching in the titles
    
    $query = "SELECT * FROM srating WHERE title LIKE ?";
    $stmt = $query->prepare($query);
    $stmt->execute("%$currenttoken%");
    
    echo $stmt;
    
    $currentquery = $stmt; // currentquery is the entire title
    array_push($firstsearcharray,$currentquery);
}*/
//remove instances of ~ and , in query or else everything will be so innacurate

//take user input
//search titles to see if it matches any keywords of the user input
//return title names



//search each title for it's token
//everytime there's a match with a token and the title, give the title a score +1
//select the top 50 that has a rank higher than 0;








//search each result
for($keynumber = 0;$keynumber<count($firstsearcharray);$keynumber++){
    $currentkey = $firstsearcharray[$keynumber];
    $currentkey = encodeURIComponent($currentkey);
    $contentofquery = file("../questions/".$currentkey.".txt");
    $contentofquery = implode("\n",$contentofquery);
   //search each token
    $keyrank =0;
    for($tokennumber = 0; $tokennumber < count($searchqueryarray); $tokennumber++){
       $currentcount = substr_count($contentofquery,$searchqueryarray[$tokennumber]);
        //multiply by five so it is just barely less than an upvote
        $currentcount = $currentcount*5;
        $keyrank = $keyrank + $currentcount;
    }
    
    //search for usergivenrank
    //$filename = str_replace('!-',' ',$filename);
    //$filename = substr($filename,0,strlen($filename)-4); //$currentkey is the filename or the 'title' for the row
    $currentkey = decodeURIComponent($currentkey);
    $query = $con->prepare("SELECT * FROM srating where title = :currentkey");
            $query->bindParam(':currentkey',$currentkey);
            $query->execute();
            $data = $query->fetch(PDO::FETCH_ASSOC);
            $usergivenrank = $data['rating'];
            $tagsinquestion = $data['tags'];
            $tagsinquestion = str_replace(',',' ',$tagsinquestion);
    //adding up the rating generated by query and user rating
    
    //put the tags in a string and just count the number of matches for each token
    //each tag = *8
    for($tagtokennumber = 0; $tagtokennumber < count($searchqueryarray); $tagtokennumber++){
        $tagcount = substr_count($tagsinquestion,$searchqueryarray[$tagtokennumber]);
        $tagcount = $tagcount*8;
        $keyrank = $keyrank + $tagcount;
    }
    
    
    $keyrank = $keyrank + $usergivenrank;
    //echo $keyrank;
    $firstsearcharray[$keynumber] = $keyrank."~!~".$firstsearcharray[$keynumber];
}
//echo json_encodeURIComponent(array_values($firstsearcharray));


$orderedarray = Array();

for($currenttitle = 0; $currenttitle< count($firstsearcharray); $currenttitle++){
    $individualparts = explode("~!~",$firstsearcharray[$currenttitle]);
    array_push($orderedarray,$individualparts[0]);
}
rsort($orderedarray);
//print_r($orderedarray);
$searchquerydata = array();

for($querynumber = 0; $querynumber < count($orderedarray); $querynumber++){
    $currentquery = $orderedarray[$querynumber];
    for($unorderedquery = 0; $unorderedquery < count($orderedarray);$unorderedquery++){
        $individualparts = explode("~!~",$firstsearcharray[$unorderedquery]);
        if($individualparts[0] == $currentquery){
                $individualparts[1] = decodeURIComponent($individualparts[1]);

        $query = $con->prepare("SELECT * FROM srating WHERE title = :misconceptionname");
        $query->bindParam(':misconceptionname',$individualparts[1]);
        $query->execute();
        $data = $query->fetch(PDO::FETCH_ASSOC);
        $repofanswers = $data['repofanswers'];
        $views = $data['views'];
        $tags = $data['tags'];
        $individualparts[1] = encodeURIComponent($individualparts[1]);
        $lines = file("../questions/".$individualparts[1].".txt");
            // turn it back to spaces for client side
        $individualparts[1] = decodeURIComponent($individualparts[1]);
        $questionrep = $lines[0];
        $whatithinkiknow = preg_split("/(!n!)/", $lines[9],-1,PREG_SPLIT_DELIM_CAPTURE);
        //$questionrep = data['questionrep'];
        $compiledinfo = $repofanswers."~!~".$views."~!~".$tags."~!~".$questionrep."~!~".$individualparts[1]."~!~".$whatithinkiknow[0];
            $compiledinfo = str_replace("\n","",$compiledinfo);
        array_push($searchquerydata,$compiledinfo);    
        }       
    }   
}
echo json_encode(array_values($searchquerydata));

    //push $current query into firstsearcharray
    //once we do that we look into the relavent titles (first search array) and see the number of accurances does our token show up
    //for loop
    //loop through every single key in first search array and count the number of accurances with substr_count() basically search for the tokens and cout them
    //    we add up the counts of the words to give it our "search rank"(we should multiply this number by 4 so each accurance of a word is less than an upvote)
    //    then we add up the search rank with its user given rank determined by the amount of bookmarks, views, upvotes etc.
    //the rank we eventually end up with will go in another array
    //the other array's struccture will be like:
    //   rank!n!title
    //we send this array to hompage and hoomepage decodeURIComponents its and orders it
        
        
        
        //loop through the first individual part and append it to a new array called ordered array
                    //this array will be ordered numerically highest to lowest
                    //have abig for loop encasing a smaller for loop 
                    //the big loop will look at the query number
                    //the smaller loop will check each first segment to see if it matches the value of the ordered array
                    //the resulting array key is sent to be appended
                    //the big loop jumps to the next search query in the ordered array
        
        
        //current bug: if there are two querires with the same ranking then the for loop will search for them twice and it'll be displatyed twice. solution go to js and have an array that stores the titles of appended queries. if the results are already in that array don't append the result
        
        
        
        
        
        
    /*$query = $database->prepare('SELECT * FROM table WHERE column LIKE "?%"');

$query->execute(array('value'));
 
while ($results = $query->fetch()) 
{
    echo $results['column'];
}*/


?>