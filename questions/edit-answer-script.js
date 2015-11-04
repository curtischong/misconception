$(document).ready(function(){
    

   //add in the navbar animation for log and logout later (the js)
    var searchquery = window.location.search.substring(7);

    
    function getQueryVariable(variable){
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}
    
        var username;
 if (typeof usernames == "undefined"){
     username = "undefined";
 }else{
     username = usernames;
 }
    
    
    var title = getQueryVariable("title");
    var nthanswer = getQueryVariable("nthanswer");
    nthanswer = parseInt(nthanswer);
    var filename = title+".txt";
    title = decodeURIComponent(title);
    $("#misconceptiontitle").html(title);
    $.ajax({
            type:'POST',
            url: "handle-editable.php",
            data:{
                "filename": filename
            },
            success: function(docinfo){
                var docinfoparsed = JSON.parse(docinfo);
                //alert(docinfoparsed);
                
                //for(var currentanswer = 10; currentanswer < docinfoparsed.length; currentanswer++){
                //alert(docinfoparsed[9+1]);
                    var whatithinkiknow = docinfoparsed[9+nthanswer].split("!n!");
                var answerp = whatithinkiknow[4];
                answerp = answerp.replace(/\\-n/g, "\n");
                    $("#whatyouthinkyouknow").val(answerp);
                //}
            }
     });
    
    
    
    
    //var result= Array();
    /*$.ajax({
            type:'POST',
            url: "edit-answer-check.php",
            data:{
            "title": title,
            "nthanswer": nthanswer,
            "username": username
            },
            success: function(response){
                //alert(response);
                if(response.indexOf("!n!") == -1 ){//it's not found\
                    location.href = response;
                }
                
                
                result = response.split("!n!");
                $("#misconceptiontitle").html(result[0]);
    
                $("#whatyouthinkyouknow").val(result[1]);
                
            }
        });*/
    //alert(filename);
    $("#submitedit").on("click",function(){
        var answerp = $("#whatyouthinkyouknow").val();
        $.ajax({
            type:'POST',
            url: "edit-answer.php",
            data:{
            "filename": filename,
            "answerp": answerp,
            "username": username
            },
            success: function(response){
                location.href = response;
            }
        });
    });
    
    
    
    
    
/*    

answer = decode(answer);
    var originaltitle = title;
   // title = decode(title);
    
    alert(answer);
    alert(title);
    
    var username;
 if (typeof usernames == "undefined"){
     username = "undefined";
 }else{
     username = usernames;
 }
  
$("#misconceptiontitle").html(title);
    
$("#whatyouthinkyouknow").val(answer);
    
    
    $("#submitedit").on("click",function(){
        var answerp = $("#whatyouthinkyouknow").val();
        whatithinkiknowp = encode(whatithinkiknowp);
        $.ajax({
            type:'POST',
            url: "edit.php",
            data:{
            "title": originaltitle,
            "whatithinkiknow": answerp,
            "username": username
            },
            success: function(response){
                location.href = response;
            }
        });
    });
    
    
    
    */
    
    
    
    
});