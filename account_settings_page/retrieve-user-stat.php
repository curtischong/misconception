<?php
$user = $_POST["user"];





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







$lines = file("../users/".$user.".txt");
echo json_encode(array_values($lines));

?>