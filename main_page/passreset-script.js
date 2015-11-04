$(document).ready(function() {
    
    
    $("#submit").on("click",function(){
    var user = $("#username").val();
    var code = $("#code").val();
    var newpass = $("#newpass").val();
    var confirmpass = $("#confirmpass").val();
    $.ajax({
            type:'POST',
            url: "passreset.php",
            data:{
                "user": user,
                "code": code,
                "newpass": newpass,
                "confirmpass": confirmpass
            },
            success: function(response){
                alert(response);
                if(response == "Password has been updated successfully"){
                 location.href = "/misconception/main_page/mainpage-index.php";   
                }
            }
        });
    });
    
});