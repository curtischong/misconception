<?php
//order
//1.reputation
//2.who clicked rep up
//3.who clicked rep down
//4.views
//5.when it was asked
//6.last active
//7.number of bookmarkes
//8.who bookmarked
//9.who asked the question
//10.text in whatithinkiknowp
//
//
//1. rep 2. who upvoted 3. who downvoted 4. who made the answer 5. answerp 6+ commentrep !c! who upvoted !c! who made comment !c! commentp
//
//
//
$filename = $_POST["filename"];
$lines = file($filename);//file in to an array
echo json_encode(array_values($lines));
//echo $lines[0];

?>