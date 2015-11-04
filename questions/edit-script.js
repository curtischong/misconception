$(document).ready(function(){
   
    //var searchquery = window.location.search.substring(7);

    
    function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}
    var title = getQueryVariable("title");
    var filename = title+".txt";
    title = decodeURIComponent(title);
    //var whatithinkiknow = getQueryVariable("whatithinkiknow");
    
    /*var encode = function(variable){
        variable = variable.replace(/\%/g, "(p)");
        variable = variable.replace(/\?/g, "(q)");
        variable = variable.replace(/\#/g, "(h)");
        variable = variable.replace(/\//g, "(f)");
        variable = variable.replace(/\\/g, "(b)");
        variable = variable.replace(/\^/g, "(u)");
        variable = variable.replace(/\/g, "(a)");
        variable = variable.replace(/ /g, "!-");
        variable = variable.replace(/\&/g, "(an)");
        variable = variable.replace(/\n/g, "\\-n");
        return variable;
    };
    var decode = function(variable){
        variable = variable.replace(/\(p\)/g, "%");
        variable = variable.replace(/\(q\)/g, "?");
        variable = variable.replace(/\(h\)/g, "#");
        variable = variable.replace(/\(f\)/g, "/");
        variable = variable.replace(/\(b\)/g, "\\");
        variable = variable.replace(/\(u\)/g, "^");
        variable = variable.replace(/\(a\)/g, "*");
        variable = variable.replace(/!-/g, " ");
        variable = variable.replace(/\(an\)/g, "&");
        variable = variable.replace(/\\-n/g, "\n");
        return variable;
    };*/
    
    //alert(whatithinkiknow);
    //alert(title);
    
    //whatithinkiknow = decode(whatithinkiknow);
    //var originaltitle = title;
    //title = decode(title);
    
    var username;
 if (typeof usernames == "undefined"){
     username = "undefined";
 }else{
     username = usernames;
 }
//title = filename.substring(0, filename.length - 4);
  //  title = unescape(title);
$("#misconceptiontitle").html(title);
    
     $.ajax({
            type:'POST',
            url: "handle-editable.php",
            data:{
                "filename": filename
            },
            success: function(docinfo){
                var docinfoparsed = JSON.parse(docinfo);
                var whatithinkiknow = docinfoparsed[9].split("!n!");
                //whatithinkiknow = whatithinkiknow.substring(0, whatithinkiknow.length - 1);
                whatithinkiknow[0] = whatithinkiknow[0].replace(/\\-n/g, "\n");
                $("#whatyouthinkyouknow").val(whatithinkiknow[0]);
            }
     });
    
    
    
    
    

    
    
    $("#submitedit").on("click",function(){
        var whatithinkiknowp = $("#whatyouthinkyouknow").val();
        //whatithinkiknowp = encode(whatithinkiknowp);
        $.ajax({
            type:'POST',
            url: "edit.php",
            data:{
            "filename": filename,
            "whatithinkiknow": whatithinkiknowp,
            "username": username
            },
            success: function(response){
                //alert(response);
                location.href = response;
            }
        });
    });
    
    
    
    
    
    
    
    
});