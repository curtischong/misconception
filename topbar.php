<body>
        <div id="navbar"></div>
    <div id="navbarinfo">

    <!--<input id="generalsearch" type="text" placeholder="search" style="padding-left: 5%;" title="browse for courses, lessons, and resources">-->
        <div id="hyperlinkbuttons">
            <div id="homepagelink" onclick="location.href = '../home_page/homepage-index.php';">Home Page</div>
            <div id="ask" onclick="location.href = '../ask_misconception_page/ask-index.php';">Ask Misconception </div>
            <div id="forum">Suggestions</div>
            <div id="topbarhelp" onclick="location.href = '../question-tutorial/Do plants give off carbon dioxide.php';" style="position: absolute; background-color: #0074BD; border-radius: 10px; height: 18px; width: 18px; top: 12px; left: 400px; cursor: pointer;"><p id="helpquestionmark" style="position: absolute; top: -16px; left: 5px; cursor: pointer;">?</p></div>
        </div>
        
        
            <div id="navprofile">
                <?php 
                if (isset($_SESSION["username"])){
                echo "<div id='sessionusername'>".$_SESSION['username']."</div>";
				}else{
                    echo "<div id='faillogindiv'>Don't have an account?<div id='loginorregister'>Login or Register!</div></div>";
                }
				?>
				<div id="repandrankcon">
				<?php
				if (isset($_SESSION["username"])){
					echo "<div id='sessionreputation'>".$_SESSION['reputation']." rep</div>";
					echo "<div id='sessionrank'>".$_SESSION['rank']."</div>";
				}
					?>
				</div>
                <!--<img src="../Gear3.png" width="20" height="20" style="position: absolute; top: 2px; left: 178px;">-->
                </div>
                <div id="profilesettingcon">
                    <div id="accountsettings">My Profile</div>
                    <div id="logout" onclick="location.href = '../Login_Registration/logout.php';">logout</div>
                </div>
    </div>