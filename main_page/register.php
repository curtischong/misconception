
		<?php
			session_start();
			//Connection Config
			include '../config.php';

			$con = new PDO('mysql:host='. DB_HOST .';dbname='. DB_NAME .'', DB_USER,DB_PASSWORD);
		    $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			//Registration
					$username = $_POST['regusername'];
					$email = $_POST['regemail'];
					$password = $_POST['regpassword'];
					$cpassword = $_POST['regpasswordcon'];
					$firstname = $_POST['regfirstname'];
					$lastname = $_POST['reglastname'];
					//check username for weird symbols

                if($username != "" && $email != "" && $password != "" && $cpassword != "" && $firstname != "" && $lastname != ""){
					if (preg_match('/[\'^£$%&*()}{@#~?><>,|=_+¬-]/', $username)){
						// one or more of the 'special characters' found in string
						//header("Location: /register.php");
						echo "Your username should only contain letters and numbers";
						exit;
					}
					
					
					//check if username is taken
					$check = $con->prepare("SELECT * FROM accounts WHERE username=:user");
					$check->bindParam(':user',$username);
					$check->execute();
					$result = $check->fetch(PDO::FETCH_ASSOC);
					
					if(!empty($result)){
						//header("Location: /register-page.php"); //direct browser back to sign in
						echo "User is already taken";
						exit;
					}else{ //otherwise proceed to register new user
						
						//Hashing of password
						$hpassword = password_hash($password, PASSWORD_DEFAULT);
						$startingrank = "Learner";
						//Prepared statements for SQL injection prevention
						$query = $con->prepare("INSERT INTO accounts (username, password, email, firstname, lastname, rank) VALUES (:name,:hpassword,:email,:fname,:lname,:rank) ");
							
						//bind parameters
						$query->bindParam(':name',$username);
						$query->bindParam(':hpassword',$hpassword);
						$query->bindParam(':email',$email);
						$query->bindParam(':fname',$firstname);
						$query->bindParam(':lname',$lastname);
                        $query->bindParam(':rank',$startingrank);
						$query->execute();
                    
                        
                        $_SESSION['username'] = $username;
                        $_SESSION['reputation'] = 0;
                        $_SESSION['rank'] = "learner";
                        //header("Location: ../home_page/homepage-index.php");
                        
                        //make the txt file to store user info
                        
                        
                        
                        
                        
                        $fm = fopen($_SERVER['DOCUMENT_ROOT'] . "/misconception/users/". $username.".txt","wb");
                        fwrite($fm,$email."\n"./*aboutme*/"\n"./*member since*/date("M")." ".date("j").date("S").','. date("Y")."\n"/*how many upvotes*/.'0'."\n"/*how many bookmarks*/.'0!n!'."\n"/*how many answers*/.'0!n!'."\n"./*how many questions*/'0!n!'."\n"/*how many comments*/.'0'."\n"/*milestones*/."\n"/*youractivity*/."\n0"/*your rank number*/."\n0"/*how many flags*/);
                        fclose($fm);
                        
                        echo "success";
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
                        //your rank number(the higher the number the higher the rank)
                        
                        //learner 0-49 rep
                        //contributor 50-149 rep
                        //helper 150-399 rep
                        //assistant 400-999
                        //teacher 1000+rep
                        
                        //how many flags you've made
                        
                        
                        
                        
						/*if($query->execute()){
							//Query successful
							echo "User has been created successfully";
							//create folder for user
							$dir = "../Users/" . $username;
							if(is_dir($dir) == false){
								mkdir($dir);
							}
			
							//direct user to another page
						}else{
							echo "Error creating the user";
							$_SESSION['error'] = "Error creating user. Please try again.";
							header("Location: ../main_page/mainpage-index.php");
						}*/
                        
                        
                        
                        
					}
			
                }
			//if(isset($_POST['regusername'])){
				//echo "Registration php is running";
			//}
	?>



