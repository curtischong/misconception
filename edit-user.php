<?php
$whattodo = $_POST["whattodo"];
$username = $_POST["username"];
$whattodo = preg_split("/(!n!)/", $whattodo,-1,PREG_SPLIT_DELIM_CAPTURE);

//increase questionfilename is already decoded


$lines = file("users/".$username.".txt");


include 'config.php';
$con = new PDO('mysql:host='. DB_HOST .';dbname='. DB_NAME .'', DB_USER,DB_PASSWORD);

//email(not seen by public)
//about me
//membersince
//how many upvotes you upvoted
//how many bookmarks you made
//how many answers you made
//how many questions you made
//how many comments you made

//your milestones(periods willl be used to seperate milestones that havn't been compleated yet)
//your activity(most recent is in the beginning of the line seperated by !n!)


print_r($whattodo);





switch ($whattodo[0]){
    case "increaseupvote":
        $lines[3] = $lines[3]+1;
        $lines[3] = $lines[3]."\n";
    
        //increase contribution. increase by one because it's really easy to do

        $lines[10] = $lines[10]+2;
        //ranktest($lines[10]);
    
    
        $query = $con->prepare("SELECT * FROM accounts where username = :username");
        $query->bindParam(':username',$username);
        $query->execute();
        $data = $query->fetch(PDO::FETCH_ASSOC);
    
        $ranknumber= $lines[10];
            
            $reputation = $data['reputation'];
            $oldrank = $data['rank'];
            $rank = $ranknumber/3 + $reputation;
            $newrank = "";

            if($rank < 50){
                $newrank = "Learner"; 
            }else if($rank < 150){
                $newrank = "Contributor"; 
            }else if($rank < 400){
                $newrank = "Helper";
            }else if($rank < 1000){
                $newrank = "Assistant";
            }else if($rank > 999){
                $newrank = "Teacher";
            }

            if($newrank !== $oldrank){//if it changed
                    $stmt = $con->prepare("UPDATE accounts SET rank=:newrank WHERE username=:username");
                    $stmt->bindParam(':username',$username);
                    $stmt->bindParam(':newrank',$newrank);
                    $stmt->execute();

            }

        $lines[10] = $lines[10]."\n";
        file_put_contents( "users/".$username.".txt" , $lines);
    break;
    case "decreaseupvote":
        $lines[3] = $lines[3]-1;
        $lines[3] = $lines[3]."\n";

        $lines[10] = $lines[10]-2;
        //ranktest($lines[10]);

        
    
        $query = $con->prepare("SELECT * FROM accounts where username = :username");
        $query->bindParam(':username',$username);
        $query->execute();
        $data = $query->fetch(PDO::FETCH_ASSOC);
        
        $ranknumber= $lines[10];
            
            $reputation = $data['reputation'];
            $oldrank = $data['rank'];
            $rank = $ranknumber/3 + $reputation;
            $newrank = "";

            if($rank < 50){
                $newrank = "Learner"; 
            }else if($rank < 150){
                $newrank = "Contributor"; 
            }else if($rank < 400){
                $newrank = "Helper";
            }else if($rank < 1000){
                $newrank = "Assistant";
            }else if($rank > 999){
                $newrank = "Teacher";
            }

            if($newrank !== $oldrank){//if it changed
                    $stmt = $con->prepare("UPDATE accounts SET rank=:newrank WHERE username=:username");
                    $stmt->bindParam(':username',$username);
                    $stmt->bindParam(':newrank',$newrank);
                    $stmt->execute();

            }
    
            $lines[10] = $lines[10]."\n";
            file_put_contents( "users/".$username.".txt" , $lines);
    
    break;
    case "increasebookmark":
        //plus 5 because bookmarks 
        $individualparts = preg_split("/(!n!)/", $lines[4],-1,PREG_SPLIT_DELIM_CAPTURE);
        $individualparts[0] = $individualparts[0]+1;
        //$whattodo[2] = rawurlencode($whattodo[2]);
        $individualparts[2] = "~".$whattodo[2]."~" . $individualparts[2];
        $lines[4] = implode($individualparts);

        $lines[10] = $lines[10]+5;
        //ranktest($lines[10]);
        
    
    
        $query = $con->prepare("SELECT * FROM accounts where username = :username");
        $query->bindParam(':username',$username);
        $query->execute();
        $data = $query->fetch(PDO::FETCH_ASSOC);
    
        $ranknumber= $lines[10];
            
            $reputation = $data['reputation'];
            $oldrank = $data['rank'];
            $rank = $ranknumber/3 + $reputation;
            $newrank = "";

            if($rank < 50){
                $newrank = "Learner"; 
            }else if($rank < 150){
                $newrank = "Contributor"; 
            }else if($rank < 400){
                $newrank = "Helper";
            }else if($rank < 1000){
                $newrank = "Assistant";
            }else if($rank > 999){
                $newrank = "Teacher";
            }

            if($newrank !== $oldrank){//if it changed
                    $stmt = $con->prepare("UPDATE accounts SET rank=:newrank WHERE username=:username");
                    $stmt->bindParam(':username',$username);
                    $stmt->bindParam(':newrank',$newrank);
                    $stmt->execute();

            }
    
            $lines[10] = $lines[10]."\n";
            file_put_contents( "users/".$username.".txt" , $lines);
        
    break;
    case "removebookmark":
        $individualparts = preg_split("/(!n!)/", $lines[4],-1,PREG_SPLIT_DELIM_CAPTURE);
        $individualparts[0] = $individualparts[0]-1;
        $individualparts[2] = str_replace("~".$whattodo[2]."~","",$individualparts[2]);
        $lines[4] = implode($individualparts);
        $lines[10] = $lines[10]-5;
        //ranktest($lines[10]);
        
    
    
        $query = $con->prepare("SELECT * FROM accounts where username = :username");
        $query->bindParam(':username',$username);
        $query->execute();
        $data = $query->fetch(PDO::FETCH_ASSOC);
    
        $ranknumber= $lines[10];
            
            $reputation = $data['reputation'];
            $oldrank = $data['rank'];
            $rank = $ranknumber/3 + $reputation;
            $newrank = "";

            if($rank < 50){
                $newrank = "Learner"; 
            }else if($rank < 150){
                $newrank = "Contributor"; 
            }else if($rank < 400){
                $newrank = "Helper";
            }else if($rank < 1000){
                $newrank = "Assistant";
            }else if($rank > 999){
                $newrank = "Teacher";
            }

            if($newrank !== $oldrank){//if it changed
                    $stmt = $con->prepare("UPDATE accounts SET rank=:newrank WHERE username=:username");
                    $stmt->bindParam(':username',$username);
                    $stmt->bindParam(':newrank',$newrank);
                    $stmt->execute();

            }
    
            $lines[10] = $lines[10]."\n";
            file_put_contents( "users/".$username.".txt" , $lines);
    break;
    case "increaseanswer":
        $individualparts = preg_split("/(!n!)/", $lines[5],-1,PREG_SPLIT_DELIM_CAPTURE);
        $individualparts[0] = $individualparts[0]+1;
        //$whattodo[2] = rawurlencode($whattodo[2]);
        $individualparts[2] = "~".$whattodo[2]."~" . $individualparts[2];
        $lines[5] = implode($individualparts);
        $lines[10] = $lines[10]+20;
        //ranktest($lines[10]);
    
        
        $query = $con->prepare("SELECT * FROM accounts where username = :username");
        $query->bindParam(':username',$username);
        $query->execute();
        $data = $query->fetch(PDO::FETCH_ASSOC);
    
        $ranknumber= $lines[10];
            
            $reputation = $data['reputation'];
            $oldrank = $data['rank'];
            $rank = $ranknumber/3 + $reputation;
            $newrank = "";

            if($rank < 50){
                $newrank = "Learner"; 
            }else if($rank < 150){
                $newrank = "Contributor"; 
            }else if($rank < 400){
                $newrank = "Helper";
            }else if($rank < 1000){
                $newrank = "Assistant";
            }else if($rank > 999){
                $newrank = "Teacher";
            }

            if($newrank !== $oldrank){//if it changed
                    $stmt = $con->prepare("UPDATE accounts SET rank=:newrank WHERE username=:username");
                    $stmt->bindParam(':username',$username);
                    $stmt->bindParam(':newrank',$newrank);
                    $stmt->execute();

            }
    
        $lines[10] = $lines[10]."\n";
        file_put_contents( "users/".$username.".txt" , $lines);
    break;
    case "increasequestion":
        $individualparts = preg_split("/(!n!)/", $lines[6],-1,PREG_SPLIT_DELIM_CAPTURE);
        $individualparts[0] = $individualparts[0]+1;
        //print_r($individualparts); 
        //$individualparts[2] = rawurlencode($individualparts[2]);
        //$whattodo[2] = rawurlencode($whattodo[2]);
        $individualparts[2] = "~".$whattodo[2]."~" . $individualparts[2];
        $lines[6] = implode($individualparts);
        $lines[10] = $lines[10]+14;
        //ranktest($lines[10]);
    
            $query = $con->prepare("SELECT * FROM accounts where username = :username");
            $query->bindParam(':username',$username);
            $query->execute();
            $data = $query->fetch(PDO::FETCH_ASSOC);
            //$userrankval = $lines[10];
            //ranktest($userrankval);
            $ranknumber= $lines[10];
            
            $reputation = $data['reputation'];
            $oldrank = $data['rank'];
            $rank = $ranknumber/3 + $reputation;
            $newrank = "";

            if($rank < 50){
                $newrank = "Learner"; 
            }else if($rank < 150){
                $newrank = "Contributor"; 
            }else if($rank < 400){
                $newrank = "Helper";
            }else if($rank < 1000){
                $newrank = "Assistant";
            }else if($rank > 999){
                $newrank = "Teacher";
            }

            if($newrank !== $oldrank){//if it changed
                    $stmt = $con->prepare("UPDATE accounts SET rank=:newrank WHERE username=:username");
                    $stmt->bindParam(':username',$username);
                    $stmt->bindParam(':newrank',$newrank);
                    $stmt->execute();

            }
    
    
        $lines[10] = $lines[10]."\n";
        file_put_contents( "users/".$username.".txt" , $lines);
    break;
    case "increasecomment":
        $lines[7] = $lines[7]+1;
        $lines[7] = $lines[7]."\n";
        $lines[10] = $lines[10]+6;
    
    
        $ranknumber= $lines[10];
        
        $query = $con->prepare("SELECT * FROM accounts where username = :username");
        $query->bindParam(':username',$username);
        $query->execute();
        $data = $query->fetch(PDO::FETCH_ASSOC);
        //$userrankval = $lines[10];
        //ranktest($userrankval);
    
        $reputation = $data['reputation'];
        $oldrank = $data['rank'];
        $rank = $ranknumber/3 + $reputation;
        $newrank = "";

        if($rank < 50){
            $newrank = "Learner"; 
        }else if($rank < 150){
            $newrank = "Contributor"; 
        }else if($rank < 400){
            $newrank = "Helper";
        }else if($rank < 1000){
            $newrank = "Assistant";
        }else if($rank > 999){
            $newrank = "Teacher";
        }

        if($newrank !== $oldrank){//if it changed
                $stmt = $con->prepare("UPDATE accounts SET rank=:newrank WHERE username=:username");
                $stmt->bindParam(':username',$username);
                $stmt->bindParam(':newrank',$newrank);
                $stmt->execute();

        }
    
        $lines[10] = $lines[10]."\n";
        file_put_contents( "users/".$username.".txt" , $lines);
        
        break;
        case "decreasecomment":
        $lines[7] = $lines[7]-1;
        $lines[7] = $lines[7]."\n";
        $lines[10] = $lines[10]-6;
    
    
        $ranknumber= $lines[10];
        
        $query = $con->prepare("SELECT * FROM accounts where username = :username");
        $query->bindParam(':username',$username);
        $query->execute();
        $data = $query->fetch(PDO::FETCH_ASSOC);
        //$userrankval = $lines[10];
        //ranktest($userrankval);
    
        $reputation = $data['reputation'];
        $oldrank = $data['rank'];
        $rank = $ranknumber/3 + $reputation;
        $newrank = "";

        if($rank < 50){
            $newrank = "Learner"; 
        }else if($rank < 150){
            $newrank = "Contributor"; 
        }else if($rank < 400){
            $newrank = "Helper";
        }else if($rank < 1000){
            $newrank = "Assistant";
        }else if($rank > 999){
            $newrank = "Teacher";
        }

        if($newrank !== $oldrank){//if it changed
                $stmt = $con->prepare("UPDATE accounts SET rank=:newrank WHERE username=:username");
                $stmt->bindParam(':username',$username);
                $stmt->bindParam(':newrank',$newrank);
                $stmt->execute();

        }
    
        $lines[10] = $lines[10]."\n";
        file_put_contents( "users/".$username.".txt" , $lines);
        
        break;
}





//$con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

/*function ranktest($ranknumber){
    //echo $ranknumber;
    $user = $username;
    $query = $con->prepare("SELECT * FROM accounts where username = :username");
    $query->bindParam(':username',$user);
    $query->execute();
    $data = $query->fetch(PDO::FETCH_ASSOC);
    //print_r($data);
    echo "hi";
    
    
    $reputation = $data['reputation'];
    $oldrank = $data['rank'];
    $rank = $ranknumber/3 + reputation;
    $newrank = "";
    
    if($rank < 50){
        $newrank = "Learner"; 
    }else if($rank < 150){
        $newrank = "Contributor"; 
    }else if($rank < 400){
        $newrank = "Helper";
    }else if($rank < 1000){
        $newrank = "Assistant";
    }else if($rank > 999){
        $newrank = "Teacher";
    }
    
    echo "function triggered";
    echo $newrank;
    if($newrank !== $oldrank){//if it changed
            $stmt = $con->prepare("UPDATE accounts SET rank=:newrank WHERE username=:username");
            $stmt->bindParam(':username',$username);
            $stmt->bindParam(':newrank',$newrank);
            $stmt->execute();
        
        echo "changed rank";
    }
};*/

/*if($whattodo[0] == "increaseupvote"){
    $lines[3] = $lines[3]+1;
    $lines[3] = $lines[3]."\n";
    
    //increase contribution. increase by one because it's really easy to do
    
    $lines[10] = $lines[10]+2;
    //ranktest($lines[10]);
    
    $lines[10] = $lines[10]."\n";
    file_put_contents( "users/".$username.".txt" , $lines);
}else if($whattodo[0] == "decreaseupvote"){
    $lines[3] = $lines[3]-1;
    $lines[3] = $lines[3]."\n";
    
    $lines[10] = $lines[10]-2;
    //ranktest($lines[10]);
    
    $lines[10] = $lines[10]."\n";
    file_put_contents( "users/".$username.".txt" , $lines);
}else if($whattodo[0] == "increasebookmark"){
    //plus 5 because bookmarks 
    $individualparts = preg_split("/(!n!)/", $lines[4],-1,PREG_SPLIT_DELIM_CAPTURE);
    $individualparts[0] = $individualparts[0]+1;
    $individualparts[2] = "~".$whattodo[2]."~" . $individualparts[2];
    $lines[4] = implode($individualparts);
    
    $lines[10] = $lines[10]+5;
    //ranktest($lines[10]);
    
    $lines[10] = $lines[10]."\n";
    
    file_put_contents( "users/".$username.".txt" , $lines);
}else if($whattodo[0] == "removebookmark"){
    $individualparts = preg_split("/(!n!)/", $lines[4],-1,PREG_SPLIT_DELIM_CAPTURE);
    $individualparts[0] = $individualparts[0]-1;
    $individualparts[2] = str_replace("~".$whattodo[2]."~","",$individualparts[2]);
    $lines[4] = implode($individualparts);
    
    $lines[10] = $lines[10]-5;
    //ranktest($lines[10]);
    
    $lines[10] = $lines[10]."\n";
    
    file_put_contents( "users/".$username.".txt" , $lines);
}else if($whattodo[0] == "increaseanswer"){
    $individualparts = preg_split("/(!n!)/", $lines[5],-1,PREG_SPLIT_DELIM_CAPTURE);
    $individualparts[0] = $individualparts[0]+1;
    $individualparts[2] = "~".$whattodo[2]."~" . $individualparts[2];
    $lines[5] = implode($individualparts);
    
    $lines[10] = $lines[10]+20;
    //ranktest($lines[10]);
    
    $lines[10] = $lines[10]."\n";
    
    file_put_contents( "users/".$username.".txt" , $lines);
}else if($whattodo[0] == "increasequestion"){
    $individualparts = preg_split("/(!n!)/", $lines[6],-1,PREG_SPLIT_DELIM_CAPTURE);
    $individualparts[0] = $individualparts[0]+1;
    //print_r($individualparts); 
    $individualparts[2] = rawurlencode($individualparts[2]);
    $individualparts[2] = "~".$whattodo[2]."~" . $individualparts[2];
    $lines[6] = implode($individualparts);
    
    $lines[10] = $lines[10]+14;
    //ranktest($lines[10]);
    
    $lines[10] = $lines[10]."\n";
    
    file_put_contents( "users/".$username.".txt" , $lines);
}else if($whattodo[0] == "increasecomment"){
    $lines[7] = $lines[7]+1;
    $lines[7] = $lines[7]."\n";
    $lines[10] = $lines[10]+6;
    ranktest($lines[10]);
    $lines[10] = $lines[10]."\n";
    file_put_contents( "users/".$username.".txt" , $lines);
}*/


//searchfor user again and check to see if they've increased in rank    OR   for each condition have an if statement stating if they'd increased it by this amount will they be good after the modification

//to do move php scripts out of the questions folder nad make everything compatible




?>