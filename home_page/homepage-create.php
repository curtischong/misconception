<?php
$misconceptiontitle = $_POST["misconceptionname"];
$content = "some text here";
$fp = fopen($_SERVER['DOCUMENT_ROOT'] . "/misconception/questions/". $misconceptiontitle. ".html","wb");
fwrite($fp,$content);
fclose($fp);
?>