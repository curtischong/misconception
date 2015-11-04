
	<?php
		//Connection Config
		include '../config.php';
		
		$con = new PDO('mysql:host='. DB_HOST .';dbname='. DB_NAME .'', DB_USER,DB_PASSWORD);
		//$con = new PDO('mysql:host=localhost;dbname=test','root','');
		//$con2 = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
		function passReset($con){
			
				$username = $_POST['name'];
				
				$query = $con->prepare("SELECT * FROM accounts WHERE username = :user");
				$query->bindParam(':user',$username);
				
				$query->execute();
				$result = $query->fetch(PDO::FETCH_ASSOC);
				$useremail = $result['email'];
				
				if(!empty($result)){ //if the user exists
					
					//TODO: get the email from the selected row(because we no longer have an email input field)
					
					//generate unique password reset token
					$key = uniqid(mt_rand(), true);
					$token = md5($result['email'].$key);
					
					
					//store token into the table in user's row and set it to expire in 48 hours
					
                    
                    
                    
                    $qquery = $con->prepare("SELECT * FROM accounts where username = :username");
                    $qquery->bindParam(':username',$filename);
                    $qquery->execute();
                    $data = $qquery->fetch(PDO::FETCH_ASSOC);
                    $newrating = $data['rating'];
					//TODO: send email to the email retrieved from the first query
					//TODO: give user the link to the password reset page
					
						//send user password reset email
						/*require '../phpmailer/PHPMailerAutoload.php';

						$mail = new PHPMailer();

						$mail->SMTPDebug = 2;                               // Enable verbose debug output

						$mail->isSMTP();                                      // Set mailer to use SMTP
						$mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers    smtp.gmail.com
						$mail->SMTPAuth = true;                               // Enable SMTP authentication
						$mail->Username = 'curtischong5@gmail.com';                 // SMTP username
						$mail->Password = 'bacon2000';                           // SMTP password
						$mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
						$mail->Port = 587;                                    // TCP port to connect to

						$mail->From = 'curtischong5@gmail.com';
						$mail->FromName = 'Curtis Chong';
						//$mail->addAddress('joe@example.net', 'Joe User');     // Add a recipient
						$mail->addAddress('curtischong5@yahoo.com');               // Name is optional
						$mail->addReplyTo('curtischong5@gmail.com');
						//$mail->addCC('cc@example.com');
						//$mail->addBCC('bcc@example.com');

						//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
						//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
						$mail->isHTML(true);                                  // Set email format to HTML

						$mail->Subject = 'misconception Password Reset';
						$mail->Body    = "Your reset key is: " . $token;
						$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

						if(!$mail->send()) {
							echo 'Message could not be sent.';
							echo 'Mailer Error: ' . $mail->ErrorInfo;
						} else {
							echo 'Message has been sent';
						}*/
                    
				
                    require '../phpmailer/PHPMailerAutoload.php';

//Create a new PHPMailer instance
$mail = new PHPMailer;

//Tell PHPMailer to use SMTP
$mail->isSMTP();

//Enable SMTP debugging
// 0 = off (for production use)
// 1 = client messages
// 2 = client and server messages
$mail->SMTPDebug = 2;

//Ask for HTML-friendly debug output
$mail->Debugoutput = 'html';

//Set the hostname of the mail server
$mail->Host = 'smtp.gmail.com';
// use
// $mail->Host = gethostbyname('smtp.gmail.com');
// if your network does not support SMTP over IPv6

//Set the SMTP port number - 587 for authenticated TLS, a.k.a. RFC4409 SMTP submission
$mail->Port = 587;

//Set the encryption system to use - ssl (deprecated) or tls
$mail->SMTPSecure = 'tls';

//Whether to use SMTP authentication
$mail->SMTPAuth = true;

//Username to use for SMTP authentication - use full email address for gmail
$mail->Username = "curtischong5@gmail.com";

//Password to use for SMTP authentication
$mail->Password = "bacon2000";

//Set who the message is to be sent from
$mail->setFrom('curtischong5@gmail.com', 'Misconceptions Team');

//Set an alternative reply-to address
//$mail->addReplyTo('curtischong5@gmail.com', 'First Last');

//Set who the message is to be sent to
$mail->addAddress($useremail, 'John Doe');

//Set the subject line
$mail->Subject = 'Misconceptions - Password Reset';

//Read an HTML message body from an external file, convert referenced images to embedded,
//convert HTML into a basic plain-text alternative body
$mail->msgHTML(file_get_contents('forgotpass-email'));
                    
$mail->Body    = "Your reset key is: " . $token."<br>Just put your key <a href='localhost/misconception/main_page/passreset-index.php'> here</a> and type in a new password. Your key will expire in 48 hours";

//Replace the plain text body with one created manually
$mail->AltBody = 'This is a plain-text message body';


//send the message, check for errors
if (!$mail->send()) {
    echo "Mailer Error: " . $mail->ErrorInfo;
} else {
    echo "Message sent!";
}
                    
                    
                    
			}
		}
		
		if(isset($_POST['name'])){
			echo "this function works";
			passReset($con);
		}
		
	?>
