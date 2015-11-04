/*function fpass() {
    alert("fpass function");
		$.ajax({
		   type: "POST",
		   url: 'forgotpass.php',
		   data: form.serialize()
		   success: function(data){
				//data returned from php
				console.log(data);
		   }
		});
}*/



















function isValid(str){ //check a string for special characters
 return !/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(str);
}
$(document).ready(function() {
    $("#logintab").hide();
    $("#registrationtab").hide();
	$("#incorrectpassoruser").hide();
    
    var incorrectdisplay = function(){
        $("#incorrectpassoruser").show();
        $("#remember-background").css("top","110px");
        $("#remember-backtop").css("top","70px");
    };
    
    
    function getQueryVariable(variable){
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
};
var reason = getQueryVariable("reason");
reason = decodeURIComponent(reason);
if(reason !== "false"){
    $("#forgotpass").html(reason);
    $("#forgotpass").fadeOut(150,function(){
        $("#forgotpass").fadeIn(150,function(){
            $("#forgotpass").fadeOut(150,function(){
                $("#forgotpass").fadeIn(150,function(){
                    $("#forgotpass").fadeOut(5000,function(){
                        $("#forgotpass").html("forgot your password?");
                        $("#forgotpass").fadeIn("500");
                    });
                });
            });      
        });
    });
    $("#logintab").show();
    $("#logintab").css("top","300px");
    $("#register").hide();
}
    
    
    
    
    
	//forgot password
	$("#forgotpass").on('click', function(){
		var username = $('#username').val();
		if(username != ""){
			console.log("forgotpass function is running");
			$.ajax({
			   type: "POST",
			   url: 'forgotpass.php',
			   data: { name: username},
			   success: function(data){
					alert("Please check your e-mail where you'll recieve furthur instructions");
			   }
			});
            
            //alert("an email has been sent to the email you've registered with. You;ll be prompt with more instructions there.")
            
		}else{
			alert("Enter username first");
		}
    })
    
    var replacealert = function(whattosay){
        $("#regbackground").html(whattosay);
        $("#regbackground").fadeTo(500,0.5,function(){
             $("#regbackground").fadeTo(500,1);
        })
    }
    
    
	$('#regaccount').on("click",function(){
        
			console.log("registration function is running");
			var username = $('#regusername').val();
			var password = $('#regpassword').val();
			var passwordcon = $('#regpasswordcon').val();
			var email = $('#regemail').val();
			var fname = $('#regfirstname').val();
			var lname = $('#reglastname').val();
			if(username != "" && password != "" && passwordcon != "" && email != "" && fname != "" && lname != ""){
                
                
				if(isValid(username)){
					if(password == passwordcon){
						console.log("password verified");
						$.ajax({
						   type: "POST",
						   url: 'register.php',
						  data: { "regusername": username, 
                                  "regpassword": password,
                                  "regpasswordcon": passwordcon,
                                  "regemail": email, 
                                  "regfirstname": fname, 
                                  "reglastname": lname 
                                 },
                            success: function(data){
                               //if(data == "success"){
                               //    alert("hi");
                               //     location.href = "/misconception/homepage/homepage-index.php"; 
                               //}
								$("#regbackground").html(data);
                                //alert(data);
                                var response = data;
                                if(response == "success"){
                                    //alert("hi");
                                    location.href = "/misconception/home_page/homepage-index.php"; 
                                }
                                //if(data == "success"){
                                //  alert("hi");
                                    //location.href = "/misconception/homepage/homepage-index.php"; 
                               //}
						   }
						});
					}else{
						replacealert("Passwords dont match try again");
					}
				}else{
					replacealert("Your username shouldn't contain special characters");
				}
                
			}else{
                
				replacealert("Some queries arn't filled");
			}
		
        
        
    });
	
    /*$("#SigninButton").on("click",function(){
        var username = $("#username").val();
        var password = $("#password").val();
       $.ajax({
           type: "POST",
           url: '../Login_Registration/login.php',
            data:{
                    "username": username, 
                    "password": password
                 },
            success: function(data){
                //$("#regbackground").html(data);
                alert(data);
                var response = data;
           }
        });              
    });*/
    
    
    
    
    $("#openlogin").on("click",function(){
        $("#openlogin").animate({ top: '+=100px'}, { duration: 500, queue: false });
        $("#openlogin").fadeTo(500, 0);
        $("#logintab").animate({ top: '+=200px'}, { duration: 500, queue: false });
        $("#logintab").fadeTo(500, 1);
        $("#register").hide();
    });
    
        $("#register").on("click",function(){
        $("#register").animate({ top: '+=100px'}, { duration: 500, queue: false });
        $("#register").fadeTo(500, 0);
        $("#registrationtab").animate({ top: '+=200px'}, { duration: 500, queue: false });
        $("#registrationtab").fadeTo(500, 1);
        $("#openlogin").fadeTo(500, 0);
    });
    $("#closetablog").on("click",function(){
        $("#logintab").animate({ top: '+100px' }, { duration: 500, queue: false });
        $("#logintab").fadeTo(500, 0,function(){
        $("#logintab").hide();
        });
        $("#openlogin").animate({ top: '+400px' }, { duration: 500, queue: false });
        $("#openlogin").fadeTo(500, 1,function(){
            $("#register").fadeTo(500, 1);
        });
    });
    $("#closetabreg").on("click",function(){
        $("#registrationtab").animate({ top: '+100px'}, { duration: 500, queue: false });
        $("#registrationtab").fadeTo(500, 0,function(){
        $("#registrationtab").hide();
        });
        $("#register").animate({ top: '+440px'}, { duration: 500, queue: false });
        $("#register").fadeTo(500, 1,function(){
        $("#openlogin").fadeTo(500, 1);
        });
    });
    
    
    
    
});