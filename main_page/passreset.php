<?php
    //Connection Config
    include '../config.php';

    $con = new PDO('mysql:host='. DB_HOST .';dbname='. DB_NAME .'', DB_USER,DB_PASSWORD);
    //$con2 = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
            $user = $_POST['user'];
            $pass = $_POST['newpass'];
            $confpass = $_POST['confirmpass'];
            $key = $_POST['code'];
        if(!empty($_POST['user']) && !empty($_POST['newpass']) && !empty($_POST['confirmpass']) && !empty($_POST['code'])){
            //purge expired reset keys
            
            //seems inneficiant as everytime someone forgets their pass, the database searches through ALL of the queries
            $purge = $con->prepare("UPDATE accounts SET resetkey = NULL WHERE expire < NOW()");
            $purge->execute();
            $purgeexpire = $con->prepare("UPDATE accounts SET expire = NULL WHERE expire < NOW()");
            $purgeexpire->execute();
            if($pass == $confpass){
                //$dbunames = mysqli_query($con,"SELECT * FROM UserName WHERE userName='$user'");
                $query = $con->prepare("SELECT * FROM accounts WHERE username = :user");
                $query->bindParam(':user',$user);
                $query->execute();
                $result = $query->fetch(PDO::FETCH_ASSOC);

                if(!empty($result)){
                    if($result['resetkey'] == $key){ //check if token is correct


                        //RESET PASSWORD
                        //check for password length
                        if(strlen($pass) > 5){
                            //Hashing of password
                            $hpassword = password_hash($pass, PASSWORD_DEFAULT);

                            //Prepared statements for SQL injection prevention
                            $query3 = $con->prepare("UPDATE accounts SET password = :hpassword WHERE username = :user");

                            //bind parameters
                            $query3->bindParam(':user', $user);
                            $query3->bindParam(':hpassword',$hpassword);

                            if($query3->execute()){
                                //Query successful
                                echo "Password has been updated successfully";
                                
                                
                                
                                //set reset key and expire to null
                                $query2 = $con->prepare("UPDATE accounts SET resetkey = NULL WHERE username = :user");
                                $query2->bindParam(':user',$user);
                                $query2->execute();
                                
                                $query5 = $con->prepare("UPDATE accounts SET expire = NULL WHERE username = :user");
                                $query5->bindParam(':user',$user);
                                $query5->execute();
                                //direct user to another page
                            }else{
                                echo "Error1";
                            }
                        }else{
                            echo "Password should be longer than 5 characters";
                            exit;
                        }
                    }else{
                        echo "No such reset key exists.";
                    }
                }else{
                    echo "No such username exist";
                }

            }else{
                echo "The two passwords don't match. Please reconfirm";
            }
        }

    //if(isset($_POST['submit'])){
    //    passReset($con);
    //}
?>