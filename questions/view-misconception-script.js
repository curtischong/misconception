var toggleshowprofile = false;
$(document).ready(function(){
//navbar js
    $("#navprofile").on("click",function(){
        if($('#navprofile').children("#sessionusername").length == 1){
            if(toggleshowprofile==true){
                $("#profilesettingcon").animate({left: "-=200px"});
                $("#hyperlinkbuttons").animate({left: "-=200px"});
                toggleshowprofile=false;
            }
            else{
                $("#profilesettingcon").animate({left: "+=200px"});
                $("#hyperlinkbuttons").animate({left: "+=200px"});
                toggleshowprofile = true;
            }
        }
    });
var username;
 if(usernames == ""){
     username = "undefined";
 }else{
     username = usernames;
 }
    //alert(username);
    $("#accountsettings").on("click",function(){
       window.location.href = "/misconception/account_settings_page/accountsettings-index.php?user="+username;
    });
    
    var w = window.innerWidth;
    var wmid = w/8;
    $("#navprofile").css("left",wmid);
    $("#profilesettingcon").css("left",wmid);
    $("#hyperlinkbuttons").css("left",wmid+200);
    
    $( window ).resize(function() {
        var w = window.innerWidth;
        var wmid = w/8;
        $("#navprofile").css("left",wmid);
        $("#profilesettingcon").css("left",wmid);
        $("#hyperlinkbuttons").css("left",wmid+200);
    });
    
    
    
            var pathname = document.URL;
        var filename = pathname.replace(/^.*[\\\/]/, '');
        filename = filename.substring(0, filename.length - 3);
        filename = filename+"txt";
    var lines;
    
    
    //variable = variable.replace(/\*/g, "(a)");
    /*varencodeURIComponent = function(variable){
        variable = variable.replace(/\%/g, "(p)");
        variable = variable.replace(/\?/g, "(q)");
        variable = variable.replace(/\#/g, "(h)");
        variable = variable.replace(/\//g, "(f)");
        variable = variable.replace(/\\/g, "(b)");
        variable = variable.replace(/\^/g, "(u)");
        variable = variable.replace(/ /g, "!-");
        variable = variable.replace(/\&/g, "(an)");
        variable = variable.replace(/\n/g, "\\-n");
        return variable;
    };
    var decodeURIComponent = function(variable){
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
    
    
    
    
    
    
    
    //can't make username with ~,"undefined"
    //can't comment/answer/ask !n!,!c!
    /*
    things to do: 
    1. find height of whatithinkiknow
        -add heights heights together
        to form questioncommentcon's height
        then add withwhatithinkiknowp's height
        don't forget about createcommenttoanswer's height
        just do relative positioning
    2.


    */    
    
    //while($(".answer").outerHeight() < $(".answer").scrollHeight + parseFloat($(".answer").css("borderTopWidth")) + parseFloat($(".answer").css("borderBottomWidth"))) {
    //            $(".answer").closest(".solutionsdiv").height($(".answer").closest(".solutionsdiv").height()+1);
    //};
    //$(".solutionsdiv").css({"height": ($(".answer").height()+'px')});
    
    //comment show rep divs
    
    var resetheight;
    var whatithinkiknowheight;
    var questioncommentboxheight;
    var solutionsdivconheight;

    $(document).on({
    mouseenter: function () {
        //$(".commentrep").stop().fadeOut();
        $(this).closest(".directcommenttoquestion").children(".commentupvotedownvotecon").children().stop().fadeIn("fast");
    },
    mouseleave: function () {
        $(this).closest(".directcommenttoquestion").children(".commentupvotedownvotecon").children().stop().fadeOut();
        $(".commentrep").stop().fadeIn("fast");
    }
}, ".directcommenttoquestion"); //pass the element as an argument to .on   commentupvotedownvotecon
    
    
        $(document).on({
    mouseenter: function () {
        //$(".commentrep").stop().fadeOut();
        $(this).closest(".replytocommentdiv").children(".commentupvotedownvotecon").children().stop().fadeIn("fast");
    },
    mouseleave: function () {
        $(this).closest(".replytocommentdiv").children(".commentupvotedownvotecon").children().stop().fadeOut();
        $(".commentrep").stop().fadeIn("fast");
    }
}, ".replytocommentdiv"); //pass the element as an argument to .on   commentupvotedownvotecon
    
    
    
    
    
var resethelpdiv = function(){
    $("#helpdiv").stop();
    $(".hiddencomments").hide();
    $("#questionhiddencomments").hide();
    $("#helpdiv").css("opacity","1");
    $(".solutioninfodiv").hide();
    $("#questioninfo").fadeOut("fast");
    $(".showhiddenreplies").hide();
    $("#showhiddenreplies").hide();
    $("#answerquestioninstruction").fadeOut("fast");
    $("#flagreasons").hide();
    $(".flagreasons").hide();
    $("#commentandreplyflags").hide();
    $(".commentandreplyflags").hide();
    //$("#helpdiv").children(".flagreasonuser").remove();
    //$("#helpdiv").children(".flagreasonp").remove();
};
    //when user clicks on whatithinkiknow
    $("#whatithinkiknow, #questioncommentinputdiv, #questioncommentcon, #questionhiddencomments, #showhiddenreplies").on("click",function(event){
        //alert($(event.target).attr("class"));
        if($(event.target).is('.flaggedcommenticon')){
            if(username == "undefined"){
                    alert("sorry, you have to be logged in to upvote");
            }else{
                resethelpdiv();
                $("#helpdiv").animate({top: $("#whatithinkiknow").offset().top-41},{queue: false});
                $("#helpdiv").animate({height: "500px"},function(){

                var commentflagreasonsinfo = $(event.target).parent().children(".flaginfocon").text();
                var commentflagreasons = commentflagreasonsinfo.split("!u!");

                $("#commentandreplyflags").html("");
                for(var currentreason = 0;currentreason < commentflagreasons.length/2-1; currentreason++){
                    $("#commentandreplyflags").append('<div class="flagreasonuser">'+commentflagreasons[currentreason*2].substring(1, commentflagreasons[currentreason*2].length - 1)+'</div><div class="flagreasonp">'+commentflagreasons[currentreason*2+1]+'</div>');
                }
                $("#commentandreplyflags").fadeIn("fast");
                //$(".flagreasonuser, .flagreasonp").hide();
                //$(".flagreasonuser, .flagreasonp").fadeIn("fast");

                });
            }
        }else{
            if($(event.target).is("#viewmorecommentsb")){
            }else if($(event.target).is('#questionhiddencomments')){
            }else if($(event.target).is('.commentupvote')){
            //}else if($(event.target).is('.replycomment')){
            }else if($(event.target).closest(".therearemorereplies").is('.therearemorereplies')){
            }else if($(event.target).closest("#showhiddenreplies").is('#showhiddenreplies')){
            }else{
                resethelpdiv();
                $("#questioninfo").fadeIn("fast");
                $("#helpdiv").animate({top: $("#whatithinkiknow").offset().top-41},{queue: false});
                $("#helpdiv").animate({height: "500px"},{queue: false});
            }
        }
    });
    
    //when user clicks on an answer
    $("#solutionsdivcon").on("click",".solutionsdiv",function(event){
        if($(event.target).closest(".solutioninfodiv").is(".solutioninfodiv")){
        }else if($(event.target).closest(".hiddencomments").is(".hiddencomments")){
        }else if($(event.target).is('.flaggedcommenticon')){
            if(username == "undefined"){
                    alert("sorry, you have to be logged in to upvote");
            }else{
                resethelpdiv();
                var answerid = $(this).closest(".solutionsdiv").children(".answer").attr("id");
                    var whereanswertoquestionis = $("#"+answerid).offset();
                    whereanswertoquestionis = whereanswertoquestionis.top - 45;

                    $("#helpdiv").animate({height: "500px"},{queue: false});
                    $("#helpdiv").animate({top: whereanswertoquestionis}, function(){





                var commentflagreasonsinfo = $(event.target).parent().children(".flaginfocon").text();
                var commentflagreasons = commentflagreasonsinfo.split("!u!");

                $(".commentandreplyflags").html("");
                for(var currentreason = 0;currentreason < commentflagreasons.length/2-1; currentreason++){
                    $(event.target).closest(".solutionsdiv").children(".commentandreplyflags").append('<div class="flagreasonuser">'+commentflagreasons[currentreason*2].substring(1, commentflagreasons[currentreason*2].length - 1)+'</div><div class="flagreasonp">'+commentflagreasons[currentreason*2+1]+'</div>');
                }
                $(event.target).closest(".solutionsdiv").children(".commentandreplyflags").fadeIn("fast");





                    });
            }
        }else if($(event.target).closest(".showhiddenreplies").is(".showhiddenreplies")){
        }else{
                resethelpdiv();
                var answerid = $(this).closest(".solutionsdiv").children(".answer").attr("id");
                var whereanswertoquestionis = $("#"+answerid).offset();
            //var whereanswertoquestionis = $(this).closest(".solutionsdiv").offset();
                whereanswertoquestionis = whereanswertoquestionis.top - 45;
                $("#helpdiv").animate({top: whereanswertoquestionis}, function(){
                    //$(this).closest(".solutionsdiv").children(".solutioninfodiv").fadeIn();
                    $("#"+answerid).siblings(".solutioninfodiv").fadeIn("fast");
                });
            $("#helpdiv").animate({height: "240px"},{queue: false});
        }
    });
    
    //when user clicks on answer question
    $("#answerquestiondiv").on("click",function(){
        if(username == "undefined"){
            alert("sorry, you have to be logged in to answer the question");
        }else{ 
            var whoalreadyanswered = Array();
                var numbofanswers = $('#solutionsdivcon .solutionsdiv').length;
                for(var arraypushcount = 0;arraypushcount <= numbofanswers-1;arraypushcount++){
                    whoalreadyanswered.push($( ".solutionsdiv:eq("+arraypushcount+")" ).children(".answer").attr("id"));
                }
            if(whoalreadyanswered.indexOf(username) > -1){
                alert("sorry, you've already answered. However you can edit your original one");
            }else{
                resethelpdiv();
                $("#answerquestioninstruction").fadeIn("fast");
                $("#helpdiv").animate({height: "300px"},{queue: false});
                var whereanswerdivis = $("#answerquestiondiv").offset();
                whereanswerdivis = whereanswerdivis.top - 40;
                $("#helpdiv").animate({top: whereanswerdivis }, "slow" );
            }
        }  
    });
    //when user clicks on create comment
    
    
    $("#htmlpage").on("click",'.addcomment',function(event){
        if(username == "undefined"){
            alert("sorry, you have to be logged in to comment");
        }else{
            var whatithinkiknowtop = $("#whatithinkiknow").offset().top-41;
            
                if($(this).closest(".solutionsdiv").children(".commenttoanswerdiv").is(":hidden")){
                    $(this).closest(".solutionsdiv").children(".commenttoanswerdiv").slideDown();                   
                    $(this).closest(".solutionsdiv").animate({height: $(this).closest(".solutionsdiv").height() + 33 + "px"}, "slow" ,function(){
                        resetheight();
                        $("#answerquestiondiv").animate({top:  whatithinkiknowheight + questioncommentboxheight + solutionsdivconheight + whatithinkiknowtop + 40 + "px"},"fast");
                    });
                }
                else if($(this).closest(".solutionsdiv").children(".commenttoanswerdiv").is(":visible")){
                    $(this).closest(".solutionsdiv").children(".commenttoanswerdiv").slideUp();
                    $(this).closest(".solutionsdiv").animate({height: $(this).closest(".solutionsdiv").height() - 33 + "px"}, "slow" ,function(){
                        resetheight();
                        $("#answerquestiondiv").animate({top:  whatithinkiknowheight + questioncommentboxheight + solutionsdivconheight + whatithinkiknowtop + 40 + "px"},"fast");
                    });
                    //$("#answerquestiondiv").animate({"top": $("#answerquestiondiv").offset().top -33 - 8},"slow");
            }
        }
    });
    
    //when user clicks on view more comments
    $("#htmlpage").on("click",'.viewmorecommentsb',function(event){
        resethelpdiv();
        var answerid = $(this).closest(".solutionsdiv").children(".answer").attr("id");
            var whereanswertoquestionis = $("#"+answerid).offset();
        //var whereanswertoquestionis = $(this).closest(".solutionsdiv").offset();
            whereanswertoquestionis = whereanswertoquestionis.top - 45;
        $("#helpdiv").animate({top: whereanswertoquestionis}, function(){
            $(event.target).closest(".solutionsdiv").children(".hiddencomments").fadeIn("fast");
        });
        $("#helpdiv").animate({height: "500px"},{queue: false});
    });
    
    //when user clicks on view more comments in the question
    $("#htmlpage").on("click",'#viewmorecommentsb',function(){
        
        resethelpdiv();
        var whatithinkiknowtop = $("#whatithinkiknow").offset().top-41;
        $("#helpdiv").animate({top: whatithinkiknowtop+"px"}, function(){
            $("#questionhiddencomments").fadeIn("fast");
            $("#questionhiddencomments").css("top",whatithinkiknowtop+"px");
        });
        $("#helpdiv").animate({height: "500px"},{queue: false});
    });
    
    
    //when user clicks on reply to comment 
    var replytocontainer;
    $("#htmlpage").on("click",'.replycomment',function(event){
        if(username == "undefined"){
            alert("sorry you have to be logged in to reply");
        }else{
            var commentrepliedto = $(event.target).closest(".directcommenttoquestion").children(".commentusername").html();

    if($(event.target).closest(".directcommenttoquestion").parent().is("#questioncommentcon")||$(event.target).closest(".directcommenttoquestion").parent().is("#questionhiddencomments")){
                replytocontainer = "createcommenttoanswer";
            }else{
                replytocontainer = $(event.target).closest(".solutionsdiv").children(".answer").attr("id");
            }
            var nthcomment = $(event.target).closest(".directcommenttoquestion").index();
                if($(event.target).closest(".directcommenttoquestion").parent().is( ".hiddencomments" )){
                    nthcomment = nthcomment+5;
                }else if($(event.target).closest(".directcommenttoquestion").parent().is("#questionhiddencomments")){
                    nthcomment = nthcomment+5;
                }
            $('htmlpage, body').animate({ scrollTop: 0 }, 'fast');
            $("#htmlpage").fadeTo("fast", 0.5,function(){
                $("#htmlpage").css("top","-51px");
                $("#hiddenreplies").fadeIn("fast");
                $("#hiddenreplies").css("top","100px");
                $("#hiddenreplies").animate({top: "200px"},{ duration: 300, queue: false });
                $("#htmlpage").css("z-index","-1");
            });


            //MAJOR SECURITY ISSUE CAUSE PEOPLE CAN CHANGE HTML OF DIV AND THE USERNAME AND WHEN THE JS CAN'T FIND THE USERNAME IT'LL CRASH
            //won't happen cause php will only input reply if the username is found





            $("#hiddenreplies").html('<div id="nthcomment">'+nthcomment+'</div><div id="commentcontainer">'+replytocontainer+'</div><input id="replytocommentinput" type="text" placeholder="reply to '+commentrepliedto+'\'s comment"><div class="closerepliescircle"><div class="closerepliesx">x</div></div>');
        }
    });
    
    $("#hiddenreplies").on("click",'.closerepliescircle',function(){
        $("#hiddenreplies").animate({top: "300px"},{ duration: 300, queue: false });
            $("#hiddenreplies").fadeOut("fast",function(){
            $("#htmlpage").fadeTo("fast", 1);
            $("#htmlpage").css("top","27px");
            $("#htmlpage").css("z-index","1");
        });
    });
    
    
    //when someone submits reply
    $("#hiddenreplies").on("keypress",'#replytocommentinput',function(event){
        if(event.which == 13) {
            var submittedreply = $(event.target).val();
            var nthcomment = $(event.target).closest("#hiddenreplies").children("#nthcomment").html();
            var idofcontainer = replytocontainer;
            $.ajax({
                    type:'POST',
                    url: "create-reply.php",
                    data:{
                        "nthcomment": nthcomment,
                        "idofcontainer": idofcontainer,
                        "username": username,
                        "filename": filename,
                        "submittedreply": submittedreply
                    },
                success: function(response){
                    $("#hiddenreplies").animate({top: "300px"},{ duration: 300, queue: false });
                        $("#hiddenreplies").fadeOut("fast",function(){
                            $("#htmlpage").css("top","27px");
                            $("#htmlpage").fadeTo("fast", 1,function(){
                                location.reload();   
                            });
                        });
                }
            });
        }
    });
    
    
    //when someone clicks on view replies
    //might be able to dry this up
    
    $("#htmlpage").on("click",'.therearemorereplies',function(event){
        var whatithinkiknowtop = $("#whatithinkiknow").offset().top-41;
    var commentp = $(event.target).closest(".directcommenttoquestion").children(".repliesofcomment").html();
    var individualreplies = commentp.split("!r!");//important this is the array where the replies are stored for hte comment
        var individualreplieslength = individualreplies.length -2;
            individualreplieslength = individualreplieslength/4;
        
        var nthcomment = $(event.target).closest(".directcommenttoquestion").index();
            if($(event.target).closest(".directcommenttoquestion").parent().is( ".hiddencomments" )){
                nthcomment = nthcomment+5;
            }else if($(event.target).closest(".directcommenttoquestion").parent().is("#questionhiddencomments")){
                nthcomment = nthcomment+5;
            }
        
    var loadreplies = function(wheretoappend){
        for(var currentreply = 1; currentreply <individualreplieslength+1;currentreply++){
            
            var flagordelete;
                if(individualreplies[currentreply*4-1] == username){
                    flagordelete = '<div class="deletecircle" style="left: -14px;"><div class="deletex">x</div></div>';
                }else{
                    flagordelete = '<img class="commentflag" style="left: -15px;" title="Reasons to flag: threatning, spam, should not be on Misconception, un-ethical" src="flag_comment.PNG">';
                }
            
            
            wheretoappend.append('<div class="replytocommentdiv"><div class="commentupvotedownvotecon"><div class="commentupvote"></div><div class="commentrep">' +individualreplies[currentreply*4-3] +'</div>'+flagordelete+'</div><div class="whoupvotedcomment">' + individualreplies[currentreply*4-2] + '</div><div class=commentusername style="color: #E8E8E8;">'+individualreplies[currentreply*4-1]+'</div><div class="commentp">'+individualreplies[currentreply*4]+'</div></div>');
            
            var whoupvotedquestionreply = wheretoappend.children(".replytocommentdiv").last().children(".whoupvotedcomment").text();
                    if(whoupvotedquestionreply.indexOf("~"+username+"~") > -1 ){ wheretoappend.children(".replytocommentdiv").last().children(".commentupvotedownvotecon").children(".commentupvote").css("border-bottom-color","#16BA2F");
                    }
            var individualflags = individualreplies[currentreply*4-2].split("!f!");
            if(individualflags[1].indexOf("!u!") > -1){
               wheretoappend.children(".replytocommentdiv").last().append('<div class="flaggedcommentcon"><img class="flaggedcommenticon" title="this comment has been flagged" src="theflagged_comment.PNG"><div class="flaginfocon">'+individualflags[1]+'</div></div>');
            }
        }
    };
        if($(event.target).closest(".directcommenttoquestion").parent().is(".commentofanswer")){
            resethelpdiv();
            $(".showhiddenreplies").html("");
            var answerid = $(this).closest(".solutionsdiv").children(".answer").attr("id");
            var whereanswertoquestionis = $("#"+answerid).offset();
        //var whereanswertoquestionis = $(this).closest(".solutionsdiv").offset();
            whereanswertoquestionis = whereanswertoquestionis.top - 45;
        $("#helpdiv").animate({top: whereanswertoquestionis}, function(){
            $(event.target).closest(".solutionsdiv").children(".showhiddenreplies").fadeIn("fast");
        });
        $("#helpdiv").animate({height: "500px"},{queue: false});
            var originalcommentcreator = $(event.target).closest(".directcommenttoquestion").children(".commentusername").html();
            $(event.target).closest(".solutionsdiv").children(".showhiddenreplies").append('<div class="showoriginalcomment"><div class="commentreplynthcomment">'+nthcomment+'</div><img class="replycommenticon" title="Reply to comment" src="reply_comment.PNG"><div class="commentusername">'+originalcommentcreator+'</div><div class="commentp">'+individualreplies[0]+'</div></div>');
            loadreplies($(event.target).closest(".solutionsdiv").children(".showhiddenreplies"));
            //if the comment is not in the "show more comments div" do the animation. else (the comment is in one of those divs)hide everything and show it without the animation   
        }else if($(event.target).closest(".directcommenttoquestion").parent().is("#questioncommentcon")){
            resethelpdiv();
            $("#showhiddenreplies").html("");
            $("#helpdiv").animate({top: whatithinkiknowtop+"px"}, function(){
            $("#showhiddenreplies").fadeIn("fast");
            $("#showhiddenreplies").css("top",whatithinkiknowtop+"px");
        });
        $("#helpdiv").animate({height: "500px"},{queue: false});
            var originalcommentcreator = $(event.target).closest(".directcommenttoquestion").children(".commentusername").html();
            $("#showhiddenreplies").append('<div class="showoriginalcomment"><div class="commentreplynthcomment">'+nthcomment+'</div><img class="replycommenticon" title="Reply to comment" src="reply_comment.PNG"><div class="commentusername">'+originalcommentcreator+'</div><div class="commentp">'+individualreplies[0]+'</div></div>');
            loadreplies($("#showhiddenreplies"));
        }else if($(event.target).closest(".directcommenttoquestion").parent().is("#questionhiddencomments")){
            $("#showhiddenreplies").html("");
            $("#questionhiddencomments").hide();
            $("#showhiddenreplies").fadeIn("fast");
            $("#showhiddenreplies").css("top",whatithinkiknowtop+"px");
            var originalcommentcreator = $(event.target).closest(".directcommenttoquestion").children(".commentusername").html();
            $("#showhiddenreplies").append('<div class="showoriginalcomment"><div class="commentreplynthcomment">'+nthcomment+'</div><img class="replycommenticon" title="Reply to comment" src="reply_comment.PNG"><div class="commentusername">'+originalcommentcreator+'</div><div class="commentp">'+individualreplies[0]+'</div></div>');
            loadreplies($("#showhiddenreplies"));
            
        }else if($(event.target).closest(".directcommenttoquestion").parent().is(".hiddencomments")){
            $(event.target).closest(".solutionsdiv").children(".showhiddenreplies").html("");
            $(event.target).closest(".directcommenttoquestion").parent().hide();
            $(event.target).closest(".solutionsdiv").children(".showhiddenreplies").fadeIn("fast");
            var originalcommentcreator = $(event.target).closest(".directcommenttoquestion").children(".commentusername").html();
            $(event.target).closest(".solutionsdiv").children(".showhiddenreplies").append('<div class="showoriginalcomment"><div class="commentreplynthcomment">'+nthcomment+'</div><img class="replycommenticon" title="Reply to comment" src="reply_comment.PNG"><div class="commentusername">'+originalcommentcreator+'</div><div class="commentp">'+individualreplies[0]+'</div></div>');
            loadreplies($(event.target).closest(".solutionsdiv").children(".showhiddenreplies"));
        }
    });
    
    
    
    //edit an answer
    $("#htmlpage").on("click",'.editsolutionsdiv',function(event){
    //var title = filename.substring(0, filename.length - 4);
    //title =encodeURIComponent(title);
    //var answer
        //alert(escapeURIComponent(whatithinkiknow));
        for(var currentanswer = 10;currentanswer < lines.length; currentanswer++){
            var individualparts = lines[currentanswer].split("!n!");
            //answer = individualparts[4];
            //answer = answer.replace(/\-n/g, "$-n");
            //answer = answer.replace(/(b)/g, "");
            if(individualparts[3] == username){
                
                var title = filename.substring(0, filename.length - 4);
                var nthanswer = $(event.target).closest(".solutionsdiv").index();
                //alert(nthanswer);
                location.href = "/misconception/questions/edit-answer-index.php?title="+title+"&nthanswer="+nthanswer;//remember to split the !n! off and title = filename
            }
        }
});
    
    
    
    //when user clicks on reply to comment when they're viewing replies
    
    $("#htmlpage").on("click",'.replycommenticon',function(event){
        if(username=="undefined"){
            alert("sorry you have to be logged in to reply");   
        }else{
            var commentrepliedto = $(event.target).closest(".showoriginalcomment").children(".commentusername").html();
        
if($(event.target).closest(".showoriginalcomment").parent().is("#showhiddenreplies")){
            replytocontainer = "createcommenttoanswer";
        }else{
            replytocontainer = $(event.target).closest(".solutionsdiv").children(".answer").attr("id");
        }
        
        var nthcomment = $(event.target).closest(".showoriginalcomment").children(".commentreplynthcomment").html();
        
        $('htmlpage, body').animate({ scrollTop: 0 }, 'fast');
        $("#htmlpage").fadeTo("fast", 0.5,function(){
            $("#htmlpage").css("top","-51px");
            $("#hiddenreplies").fadeIn("fast");
            $("#hiddenreplies").css("top","100px");
            $("#hiddenreplies").animate({top: "200px"},{ duration: 300, queue: false });
            $("#htmlpage").css("z-index","-1");
        });
        
        
        //MAJOR SECURITY ISSUE CAUSE PEOPLE CAN CHANGE HTML OF DIV AND THE USERNAME AND WHEN THE JS CAN'T FIND THE USERNAME IT'LL CRASH
        //won't happen cause php will only input reply if the username is found
        
        
        
        
        
        
        
        $("#hiddenreplies").html('<div id="nthcomment">'+nthcomment+'</div><div id="commentcontainer">'+replytocontainer+'</div><input id="replytocommentinput" type="text" placeholder="reply to '+commentrepliedto+'\'s comment"><div class="closerepliescircle"><div class="closerepliesx">x</div></div>');
    
        }
    });
    
    //when someone clicks on flag question
    $("#flaganswer").on("click",function(){
        if(username == "undefined"){
            alert("sorry, you have to be logged in to upvote");
        }else if(username+"\n" == lines[8]){
            alert("sorry you can't flag your own question (do you hate yourself that much?)");
        }else{
            $('htmlpage, body').animate({ scrollTop: 0 }, 'fast');
            $("#htmlpage").fadeTo("fast", 0.5,function(){
                $("#htmlpage").css("top","-51px");
                $("#flagquestionbox").fadeIn("fast");
                $("#flagquestionbox").css("top","100px");
                $("#flagquestionbox").animate({top: "200px"},{ duration: 300, queue: false });
                $("#idofflaggeddiv").html('questionstatistic');
                $("#typeofflag").html("question");
                $("#htmlpage").css("z-index","-1");
            });
            $("#flagquestionbox").append('<input type="text" id="flagquestioninput" placeholder="please explain why you\'re flagging this question">');
        }
    });
    //when someone clicks on exit flag question
     $("#flagquestionbox").on("click",'.closerepliescircle',function(event){
         $("#flagquestionbox").animate({top: "300px"},{ duration: 300, queue: false });
            $("#flagquestionbox").fadeOut("fast",function(){
            $("#htmlpage").fadeTo("fast", 1);
            $("#htmlpage").css("top","27px");
            $("#htmlpage").css("z-index","1");
        });
         $("#flagquestioninput").remove();
     });
    
    //when someone flags the question
    
    $("#flagquestionbox").on("keypress",function(event){
        if(event.which == 13) {
            var submittedflag = $(event.target).val();
            //var title = filename.substring(0,filename.length-4);
            //alert(title);
            var conid = $("#idofflaggeddiv").text();
            var typeofflag = $("#typeofflag").text();
            $.ajax({
                    type:'POST',
                    url: "flag-question.php",
                    data:{
                        "username": username,
                        "filename": filename,
                        "submittedflag": submittedflag,
                        "conid": conid,
                        "typeofflag": typeofflag
                    },
                    success: function(response){
                        alert(response);
                        $("#flagquestionbox").animate({top: "300px"},{ duration: 300, queue: false });
                            $("#flagquestionbox").fadeOut("fast",function(){
                                $("#htmlpage").css("top","27px");
                                $("#htmlpage").fadeTo("fast", 1,function(){
                                    location.reload();   
                                });
                            });
                    }
            });
        }
    });
    
    //when someone clicks on view why people flagged question
    var flagreasons;
    $("#flagcon").on("click",function(event){
        if($(event.target).is("#flagreasons")){
            //so if the person clicks on the reasons why then no animation will happen
        }else{
            resethelpdiv();
            $("#helpdiv").animate({height: "500px"},{queue: false});
            $("#helpdiv").animate({top: "90px"}, function(){
                $("#flagreasons").fadeIn("fast");
                //append reasons
                $("#flagreasons").html("");
                for(var currentreason = 0;currentreason < flagreasons.length/2-1; currentreason++){
                    $("#flagreasons").append('<div class="flagreasonuser">'+flagreasons[currentreason*2]+'</div><div class="flagreasonp">'+flagreasons[currentreason*2+1]+'</div>');
                } 
            });
        }
    });
    
    //when someone flags an answer
    $("#htmlpage").on("click",'.flaganswer',function(event){
        if(username == "undefined"){
            alert("sorry you have to login to flag");   
        }else if(username == $(event.target).closest(".solutionsdiv").children(".answer").attr("id")){
            alert("sorry you can't flag your own answer (do you hate yourself that much?)");
        }else{
            $('htmlpage, body').animate({ scrollTop: 0 }, 'fast');
            $("#flagquestionbox").append('<input type="text" id="flagquestioninput" placeholder="please explain why you\'re flagging this answer">');
            $("#htmlpage").fadeTo("fast", 0.5,function(){
                $("#htmlpage").css("top","-51px");
                $("#flagquestionbox").fadeIn("fast");
                $("#flagquestionbox").css("top","100px");
                $("#flagquestionbox").animate({top: "200px"},{ duration: 300, queue: false });
                $("#idofflaggeddiv").html($(event.target).closest(".solutionsdiv").children(".answer").attr("id"));
                $("#typeofflag").html("question");
                $("#htmlpage").css("z-index","-1");
            });
        }
    });
    
    
    //when someone clicks on why has this been flagged for an answer
    
    
    $("#htmlpage").on("click",'.whyanswerisflagged',function(event){
        $(".solutioninfodiv").fadeOut("fast");
        $("#helpdiv").animate({height: "500px"},{queue: false});
        $(event.target).closest(".solutionsdiv").children(".flagreasons").fadeIn("fast");
    });
    
    
    //when someone flags a comment
    
    $("#htmlpage").on("click",'.commentflag',function(event){
        if(username=="undefined"){
            alert("sorry you have to be logged in to flag");
        }else{
            if($(event.target).parent().parent().is(".replytocommentdiv")){
                //it's a reply
                $('htmlpage, body').animate({ scrollTop: 0 }, 'fast');
                $("#flagquestionbox").append('<input type="text" id="flagquestioninput" placeholder="please explain why you\'re flagging this reply">');
                var nthcomment = $(event.target).parent().parent().parent().children(".showoriginalcomment").children(".commentreplynthcomment").text();
                var nthreply = $(event.target).closest(".replytocommentdiv").index();
                $("#htmlpage").fadeTo("fast", 0.5,function(){
                    $("#htmlpage").css("top","-51px");
                    $("#flagquestionbox").fadeIn("fast");
                    $("#flagquestionbox").css("top","100px");
                    $("#flagquestionbox").animate({top: "200px"},{ duration: 300, queue: false });
                    $("#htmlpage").css("z-index","-1");
                });
                if($(event.target).closest(".replytocommentdiv").parent().is(".showhiddenreplies")){
                        $("#idofflaggeddiv").html($(event.target).closest(".solutionsdiv").children(".answer").attr("id"));
                        $("#typeofflag").html("reply!n!"+nthcomment+"!n!"+nthreply);
                    }else/* if($(event.target).closest(".replytocommentdiv").parent().is("#showhiddenreplies"))*/{
                        $("#idofflaggeddiv").html("questionstatistic");
                        $("#typeofflag").html("reply!n!"+nthcomment+"!n!"+nthreply);
                    }


            }else{
            //it's a comment
                $('htmlpage, body').animate({ scrollTop: 0 }, 'fast');
                $("#flagquestionbox").append('<input type="text" id="flagquestioninput" placeholder="please explain why you\'re flagging this comment">');
                $("#htmlpage").fadeTo("fast", 0.5,function(){
                    var nthcomment = $(event.target).closest(".directcommenttoquestion").index();
                    $("#htmlpage").css("top","-51px");
                    $("#flagquestionbox").fadeIn("fast");
                    $("#flagquestionbox").css("top","100px");
                    $("#flagquestionbox").animate({top: "200px"},{ duration: 300, queue: false });
                    $("#htmlpage").css("z-index","-1");
                    //$("#idofflaggeddiv").html($(event.target).closest("solutionsdiv").children(".answer").attr("id"));
                    if($(event.target).closest(".directcommenttoquestion").parent().is("#questioncommentcon")){
                        $("#idofflaggeddiv").html("questionstatistic");
                        $("#typeofflag").html("comment!n!"+nthcomment);
                    }else if($(event.target).closest(".directcommenttoquestion").parent().is("#questionhiddencomments")){
                        $("#idofflaggeddiv").html("questionstatistic");
                        nthcomment = nthcomment+5;
                        $("#typeofflag").html("comment!n!"+nthcomment);
                    }else if($(event.target).closest(".directcommenttoquestion").parent().is(".hiddencomments")){
                        $("#idofflaggeddiv").html($(event.target).closest(".solutionsdiv").children(".answer").attr("id"));
                        nthcomment = nthcomment+5;
                        $("#typeofflag").html("comment!n!"+nthcomment);
                    }else{
                        $("#idofflaggeddiv").html($(event.target).closest(".solutionsdiv").children(".answer").attr("id"));
                        $("#typeofflag").html("comment!n!"+nthcomment);
                    }
                });

            }
        }
    });
    
    
    //when someone clicks on why comment is flagged
    /*$("#htmlpage").on("click",'.flaggedcommenticon',function(){
        //can't reset div cause it'll stop the animation
        $(".hiddencomments").hide();
        $("#questionhiddencomments").hide();
        $("#helpdiv").css("opacity","1");
        $(".solutioninfodiv").hide();
        $("#questioninfo").fadeOut();
        $(".showhiddenreplies").hide();
        $("#showhiddenreplies").hide();
        $("#answerquestioninstruction").fadeOut();
        $("#flagreasons").hide();
        $(".flagreasons").hide();
    });*/
        
        
        
    
    $.ajax({
            type:'POST',
            url: "handle-editable.php",
            data:{
                "filename": filename
            },
            success: function(docinfo){
                var docinfoparsed = JSON.parse(docinfo);
                $("#questionstatistic").children(".reputationdiv").children(".questionreputation").append(docinfoparsed[0]);
                var numofviews = docinfoparsed[3].split("!n!");
                
                lines=docinfoparsed;
                
                //check to see if user has viewed page before
                if(numofviews[1].indexOf("~"+username+"~") == -1){
                    $.ajax({
                        type:'POST',
                        url: "view-count.php",
                        data:{  "filename": filename,
                                "username": username
                        }
                                       
                     });
                    numofviews[0] = parseInt(numofviews[0]);
                    numofviews[0] = numofviews[0]+1;
                }

                
                
                
                
                
                
                
                
                
                
                //$("#editquestion").show();
                //alert(docinfoparsed);
                
                
                
                
                
                
                
                
                
                
                $("#editquestion").hide();
                    if(docinfoparsed[8] == username+"\n"){
                   $("#editquestion").show();
                }
                
                
                
                $("#numberofviews").append("Has "+numofviews[0]+" views");
                $("#dateasked").append("Asked on "+docinfoparsed[4]);
                
                var lastactivedate = docinfoparsed[5].split("!n!");
                
                $("#lastactive").append("Last active on "+lastactivedate[0]);
                var individualbookmarks = docinfoparsed[6].split("!n!");
                if(individualbookmarks[1].indexOf("~"+username+"~") > -1){//if found
                    $("#bookmarkquestion").css("color","#F5C964");
                }
                $("#numberofbookmarks").append("Has " + individualbookmarks[0] + " bookmarks");
                docinfoparsed[9] = docinfoparsed[9].replace(/(\r\n|\n|\r)/gm,"");
                var questioncomments = docinfoparsed[9].split("!n!");
                //turning \-n into linebreaks for html
                questioncomments[0] = decodeURIComponent(questioncomments[0]);
                questioncomments[0] = questioncomments[0].replace(/\\-n/g,"<br>");
                $("#whatithinkiknowp").append(questioncomments[0]);
                var questioncommentssegments =  questioncomments[1].split("!c!");
                var questioncommentslength = questioncommentssegments.length;
                if(questioncommentslength > 1){
                    var numofquestioncomments = 0;
                questioncommentslength = questioncommentslength/4;
                    var q = 0;
                for(q; q < questioncommentslength && numofquestioncomments < 5; q++){
                    
                    var commentp = questioncommentssegments[q*4+3];
                var commentp = commentp.split("!r!");
                var iftherearemorereplies = 'style="display: none;"';
                if(commentp.length>2){
                    iftherearemorereplies = "";
                }
                    var flagordelete;
                    if(questioncommentssegments[q*4+2] == username){
                        flagordelete = '<div class="deletecircle" title="delete"><div class="deletex">x</div></div>';
                    }else{
                        flagordelete = '<img class="commentflag" title="Reasons to flag: threatning, spam, should not be on Misconception, un-ethical" src="flag_comment.PNG">';
                    }
                        
                $("#questioncommentcon").append('<div class="directcommenttoquestion"><div class="commentupvotedownvotecon"><div class="commentupvote"></div><div class="commentrep">' +questioncommentssegments[q*4] +'</div>'+flagordelete+'<img class="replycomment" title="Reply to comment" src="reply_comment.PNG"></div><div class="whoupvotedcomment">' + questioncommentssegments[q*4+1] + '</div><div class="therearemorereplies" '+iftherearemorereplies+'><div class="therearemorerepliesone"></div><div class="therearemorerepliestwo"></div><div class="therearemorerepliesthree"></div></div><div class=commentusername>'+questioncommentssegments[q*4+2]+'</div><div class="commentp">'+commentp[0]+'</div><div class="repliesofcomment">'+questioncommentssegments[q*4+3]+'</div></div>');
                    
                    var commentflags = questioncommentssegments[q*4+1].split("!f!");
                    //this contains all the comments but not hte individual ones
                    if(commentflags[1].indexOf("!u!") > -1){//if there are actual flags
                        //var individualcommentflags = commentflags[1].split("!u!");
                        //alert(individualcommentflags);
                        $("#questioncommentcon").children(".directcommenttoquestion").last().append('<div class="flaggedcommentcon"><img class="flaggedcommenticon" title="this comment has been flagged" src="theflagged_comment.PNG"><div class="flaginfocon">'+commentflags[1]+'</div></div>');
                    }
                    
                    
                    
                    //when creating comments remember to insert the period so that array lengths are equal
                    var whoupvotedquestioncomment = $("#questioncommentcon").children(".directcommenttoquestion").last().children(".whoupvotedcomment").text();
                    if(whoupvotedquestioncomment.indexOf("~"+username+"~") > -1 ){ $("#questioncommentcon").children(".directcommenttoquestion").last().children(".commentupvotedownvotecon").children(".commentupvote").css("border-bottom-color","#16BA2F");
                    }
                    numofquestioncomments = numofquestioncomments +1;
                }
                    if(questioncommentslength>5){
                    $("#questioncommentcon").append("<div id='viewmorecommentsb'>View more Comments</div>");
                    for(q; q < questioncommentslength; q++){
                        
                var commentp = questioncommentssegments[q*4+3];
                var commentp = commentp.split("!r!");
                var iftherearemorereplies = 'style="display: none;"';
                if(commentp.length>2){
                    iftherearemorereplies = "";
                }
                     
                var flagordelete;
                if(questioncommentssegments[q*4+2] == username){
                    flagordelete = '<div class="deletecircle" title="delete"><div class="deletex">x</div></div>';
                }else{
                    flagordelete = '<img class="commentflag" title="Reasons to flag: threatning, spam, should not be on Misconception, un-ethical" src="flag_comment.PNG">';
                }
                        
                        
                $("#questionhiddencomments").append('<div class="directcommenttoquestion" style="width:270px;"><div class="commentupvotedownvotecon"><div class="commentupvote" title="Reasons to upvote: should be an answer, helped you out, good argument"></div><div class="commentrep" title="comment reputation">' +questioncommentssegments[q*4] +'</div>'+flagordelete+'<img class="replycomment" title="Reply to comment" src="reply_comment.PNG"></div><div class="whoupvotedcomment">' + questioncommentssegments[q*4+1] + '</div><div class="therearemorereplies" '+iftherearemorereplies+'><div class="therearemorerepliesone" style="background-color: white"></div><div class="therearemorerepliestwo" style="background-color: white"></div><div class="therearemorerepliesthree" style="background-color: white"></div></div><div class=commentusername style="color: #E8E8E8;">'+questioncommentssegments[q*4+2]+'</div><div class="commentp">'+commentp[0]+'</div><div class="repliesofcomment">'+questioncommentssegments[q*4+3]+'</div></div>');
                        
                        var commentflags = questioncommentssegments[q*4+1].split("!f!");
                    //this contains all the comments but not hte individual ones
                    if(commentflags[1].indexOf("!u!") > -1){//if there are actual flags
                        //var individualcommentflags = commentflags[1].split("!u!");
                        //alert(individualcommentflags);
                        $("#questionhiddencomments").children(".directcommenttoquestion").last().append('<div class="flaggedcommentcon"><img class="flaggedcommenticon" title="this comment has been flagged" src="theflagged_comment.PNG"><div class="flaginfocon">'+commentflags[1]+'</div></div>');
                    }
                        
                        
//see if you've upvoted before
                var whoupvotedquestioncomment = $("#questionhiddencomments").children(".directcommenttoquestion").last().children(".whoupvotedcomment").text();
                    if(whoupvotedquestioncomment.indexOf("~"+username+"~") > -1 ){ $("#questionhiddencomments").children(".directcommenttoquestion").last().children(".commentupvotedownvotecon").children(".commentupvote").css("border-bottom-color","#16BA2F");
                    }
            }
                }
                    
                    
                    
            }
                
                //check if user has already upvoted before
                if(docinfoparsed[1].indexOf(","+username+",") > -1){
                    $("#questionstatistic").children(".reputationdiv").children(".uptriangle").css("border-bottom-color","#16BA2F");
                }
                //check if user has already downvoted before
                if(docinfoparsed[2].indexOf(","+username+",") > -1){
                    $("#questionstatistic").children(".reputationdiv").children(".downtriangle").css("border-top-color","#16BA2F");
                }
            
    
                //inserts the info into the answer divs
                
                
                //this is the big for loop that controls all answer divs
        var arrayLength = docinfoparsed.length;
        for (var i = 10; i < arrayLength; i++) {
            var individualparts = docinfoparsed[i].split("!n!");
            //turn newline string into command
            individualparts[4] = individualparts[4].replace(/\\-n/g,"<br>");
            $("#"+individualparts[3]).append(individualparts[4]);
            //append reputation to answer
            $("#"+individualparts[3]).parent(".solutionsdiv").children(".solutioninfodiv").children(".reputationdiv").children(".questionreputation").append(individualparts[0]);
            $("#"+individualparts[3]).parent(".solutionsdiv").children(".outsiderep").append(individualparts[0]);
            $("#"+individualparts[3]).parent(".solutionsdiv").attr("data-percentage",individualparts[0]);
            //check to see if the user is the answer owner
            //individualparts is docinfoparsed but splitted
            
            
            var flagsofquestion = individualparts[1].split("!f!");
            //if this answer has been flagged
            if(flagsofquestion[1].indexOf("!u!") > -1){
            var theflagsofquestion = flagsofquestion[1].split("!u!");
                //alert(theflagsofquestion);
                //alert("hi");
                $("#"+individualparts[3]).parent().css("background-color","pink");
                $("#"+individualparts[3]).parent().children(".hrbeforecomments").css("background","-webkit-gradient(radial, 50% 50%, 0, 50% 50%, 350, from(black), to(pink))");
                $("#"+individualparts[3]).parent().children(".solutioninfodiv").append('<div class="whyanswerisflagged">Why has this been flagged?</div>');
                
                
                for(var currentanswerflag = 0; currentanswerflag < theflagsofquestion.length/2-1; currentanswerflag++){
                    $("#"+individualparts[3]).parent().children(".flagreasons").append('<div class="flagreasonuser">'+theflagsofquestion[currentanswerflag*2].substring(1,theflagsofquestion[currentanswerflag*2].length-1)+     /*to get rid of the commas*/'</div><div class="flagreasonp">'+theflagsofquestion[currentanswerflag*2+1]+'</div>');
                }
            }
            
            
            if(individualparts[3] == username){
                   $("#"+individualparts[3]).parent(".solutionsdiv").children(".solutioninfodiv").children(".editsolutionsdiv").show();
                }
            //get data about answer creator
                var user = individualparts[3];
            $.ajax({
                    type:'POST',
                    url: "/misconception/return-user-info.php",
                    data:{
                    "user": user
                    },
                success: function(response){
                    var userinfo = response.split('~');
                    //in the future make the username's first letter capitalized
$("#"+userinfo[2]).parent(".solutionsdiv").children(".solutioninfodiv").children(".profile").children(".profileinformation").children(".name").html(userinfo[2]);
$("#"+userinfo[2]).parent(".solutionsdiv").children(".solutioninfodiv").children(".profile").children(".profileinformation").children(".creatorreputation").html(userinfo[0] + " reputation");
$("#"+userinfo[2]).parent(".solutionsdiv").children(".solutioninfodiv").children(".profile").children(".profileinformation").children(".rank").html(userinfo[1]);
                }
            });
            
            
            

            //check to see if user upvoted
            if(individualparts[1].indexOf("~"+username+"~") > -1){
                $("#"+individualparts[3]).parent(".solutionsdiv").children(".solutioninfodiv").children(".reputationdiv").children(".uptriangle").css("border-bottom-color","#16BA2F");
            }
            if(individualparts[2].indexOf("~"+username+"~") > -1){
                $("#"+individualparts[3]).parent(".solutionsdiv").children(".solutioninfodiv").children(".reputationdiv").children(".downtriangle").css("border-top-color","#16BA2F");
            }
            //append comments
                if(individualparts.length==6){
                individualparts[5] = individualparts[5].replace(/(\r\n|\n|\r)/gm,"");
                var commentarray = individualparts[5].split("!c!");
                var commentarraylength = commentarray.length;
                //alert(commentarraylength);
                var numofcomments = 0
                commentarraylength = commentarraylength/4;
                    var p = 0;
                for(p; p < commentarraylength && numofcomments<5; p++){
                    var commentp = commentarray[p*4+3];
                    var commentp = commentp.split("!r!");
                    var iftherearemorereplies = 'style="display: none;"';
                    //deals with showing the reply icon
                    if(commentp.length>2){
                        iftherearemorereplies = "";
                    }
                    
                    
                    var flagordelete;
                if(commentarray[p*4+2] == username){
                    flagordelete = '<div class="deletecircle" title="delete"><div class="deletex">x</div></div>';
                }else{
                    flagordelete = '<img class="commentflag" title="Reasons to flag: threatning, spam, should not be on Misconception, un-ethical" src="flag_comment.PNG">';
                }
                    
                    
                    $("#"+individualparts[3]).parent(".solutionsdiv").children(".commentofanswer").append('<div class="directcommenttoquestion"><div class="commentupvotedownvotecon"><div class="commentupvote" title="Reasons to upvote: should be an answer, helped you out, good argument"></div><div class="commentrep" title="comment reputation">' +commentarray[p*4] +'</div>'+flagordelete+'<img class="replycomment" title="Reply to comment" src="reply_comment.PNG"></div><div class="whoupvotedcomment">' + commentarray[p*4+1] + '</div><div class="therearemorereplies" '+iftherearemorereplies+'><div class="therearemorerepliesone"></div><div class="therearemorerepliestwo"></div><div class="therearemorerepliesthree"></div></div><div class=commentusername>'+commentarray[p*4+2]+'</div><div class="commentp">'+commentp[0]+'</div><div class="repliesofcomment">'+commentarray[p*4+3]+'</div></div>');
                    
                    var commentflags = commentarray[p*4+1].split("!f!");
                    //this contains all the comments but not hte individual ones
                    if(commentflags[1].indexOf("!u!") > -1){//if there are actual flags
                        //var individualcommentflags = commentflags[1].split("!u!");
                        //alert(individualcommentflags);
                        $("#"+individualparts[3]).parent(".solutionsdiv").children(".commentofanswer").children(".directcommenttoquestion").last().append('<div class="flaggedcommentcon"><img class="flaggedcommenticon" title="this comment has been flagged" src="theflagged_comment.PNG"><div class="flaginfocon">'+commentflags[1]+'</div></div>');
                    }
                //questionflag[1] holds all of the names and reasons
                    
    //see if you've upvoted before
                    var commentwhoupvoted = $("#"+individualparts[3]).parent(".solutionsdiv").children(".commentofanswer").children(".directcommenttoquestion").last().children(".whoupvotedcomment").text();
                    if(commentwhoupvoted.indexOf("~"+username+"~") > -1 ){ $("#"+individualparts[3]).parent(".solutionsdiv").children(".commentofanswer").children(".directcommenttoquestion").last().children(".commentupvotedownvotecon").children(".commentupvote").css("border-bottom-color","#16BA2F");
                    }
                    numofcomments = numofcomments+1;
                }
                if(commentarraylength>5){
                    $("#"+individualparts[3]).parent(".solutionsdiv").children(".commentofanswer").append("<div class='viewmorecommentsb'>View more Comments</div>");

                    for(p; p < commentarraylength; p++){

                        var commentp = commentarray[p*4+3];
                        var commentp = commentp.split("!r!");
                        var iftherearemorereplies = 'style="display: none;"';
                            if(commentp.length>2){
                                iftherearemorereplies = "";
                            }
                        
                        var flagordelete;
                        if(commentarray[p*4+2] == username){
                            flagordelete = '<div class="deletecircle" title="delete"><div class="deletex">x</div></div>';
                        }else{
                            flagordelete = '<img class="commentflag" title="Reasons to flag: threatning, spam, should not be on Misconception, un-ethical" src="flag_comment.PNG">';
                        }
                        
                        $("#"+individualparts[3]).parent(".solutionsdiv").children(".hiddencomments").append('<div class="directcommenttoquestion" style="width:270px;"><div class="commentupvotedownvotecon"><div class="commentupvote" title="Reasons to upvote: should be an answer, helped you out, good argument"></div><div class="commentrep" title="comment reputation">' +commentarray[p*4] +'</div>'+flagordelete+'<img class="replycomment" title="Reply to comment" src="reply_comment.PNG"></div><div class="whoupvotedcomment">' + commentarray[p*4+1] + '</div><div class="therearemorereplies" '+iftherearemorereplies+'><div class="therearemorerepliesone" style="background-color: white"></div><div class="therearemorerepliestwo" style="background-color: white"></div><div class="therearemorerepliesthree" style="background-color: white"></div></div><div class=commentusername style="color: #E8E8E8;">'+commentarray[p*4+2]+'</div><div class="commentp">'+commentp[0]+'</div><div class="repliesofcomment">'+commentarray[p*4+3]+'</div></div>');
                        var commentflags = commentarray[p*4+1].split("!f!");
                        if(commentflags[1].indexOf("!u!") > -1){//if there are actual flags
                        //var individualcommentflags = commentflags[1].split("!u!");
                        //alert(individualcommentflags);
                       $("#"+individualparts[3]).parent(".solutionsdiv").children(".hiddencomments").children(".directcommenttoquestion").last().append('<div class="flaggedcommentcon"><img class="flaggedcommenticon" title="this comment has been flagged" src="theflagged_comment.PNG"><div class="flaginfocon">'+commentflags[1]+'</div></div>');
                    }
                        
                        
        //see if you've upvoted before
                        var commentwhoupvoted = $("#"+individualparts[3]).parent(".solutionsdiv").children(".hiddencomments").children(".directcommenttoquestion").last().children(".whoupvotedcomment").text();
                        if(commentwhoupvoted.indexOf("~"+username+"~") > -1 ){ $("#"+individualparts[3]).parent(".solutionsdiv").children(".hiddencomments").children(".directcommenttoquestion").last().children(".commentupvotedownvotecon").children(".commentupvote").css("border-bottom-color","#16BA2F");
                        }
                    }
                }
            }
        }
                
                
                
                
                
                
                
                
                
                
    
    
    $("#htmlpage").show();
        //setup page div height
    //$("#helpdiv").css({"height": ($("#whatithinkiknow").height()+'px')});
    //determining height of elements
    $("#whatithinkiknow").css({"height": ($("#whatithinkiknowp").height()+20+'px')});
    
    $(".solutionsdiv").each(function(){
        $(this).css("height", $(this).height() + 20 +"px" );
    });
                
    resetheight = function(){
    whatithinkiknowheight = $("#whatithinkiknow").height();
    questioncommentboxheight = $("#questioncommentbox").height();
    solutionsdivconheight = $("#solutionsdivcon").height();
    };
    
    resetheight();
                var questionflags = docinfoparsed[5].split("!n!");
                //questionflag[1] holds all of the names and reasons
                if(questionflags[1].indexOf("!u!") > -1){
                    $("#whatithinkiknow").css("top","160px");
                    $("#helpdiv").css("top","200px");
                    var tagusernames = "";
                    //alert(questionflags);
                    var individualtags = questionflags[1].split("!u!");
                    flagreasons = individualtags;
                    //alert(individualtags[1*2-2]);
                    for(var currenttag = 0; currenttag < individualtags.length/2-1; currenttag++){
                       //tagusernames = tagusernames + '<a href="/misconception/account_settings_page/accountsettings-index.php?user='+individualtags[currenttag*2]+'>'+individualtags[currenttag*2]+'</a>';
                        var individualtagslength = individualtags.length/2;
                        if(currenttag > individualtagslength-2 && 3 < individualtags.length){
                            tagusernames = tagusernames+"and ";
                        }
                        tagusernames = tagusernames+" "+individualtags[currenttag*2];
                        if(individualtagslength == 2.5){
                            tagusernames = tagusernames+" ";
                        }else if(currenttag < individualtagslength-2){
                            tagusernames = tagusernames+",";
                        }
                        
                   }
                    $("#flagcon").append(tagusernames+' has flagged this question. To see why click on me');
                    $("#flagcon").fadeIn(750);
                }else{
                    $("#flagcon").hide();
                }
                
    var whatithinkiknowtop = $("#whatithinkiknow").offset().top-41;
    $("#questioncommentbox").css("top", whatithinkiknowheight+ whatithinkiknowtop+"px");
    $("#solutionsdivcon").css("top",  whatithinkiknowheight + questioncommentboxheight + whatithinkiknowtop + 20 + "px");
    $("#answerquestiondiv").css("top",  whatithinkiknowheight + questioncommentboxheight + solutionsdivconheight + whatithinkiknowtop + 40 + "px");
                if(whatithinkiknowheight + questioncommentboxheight + solutionsdivconheight + whatithinkiknowtop +100 + 300 > 800){
    $("#htmlpage").css("height", whatithinkiknowheight + questioncommentboxheight + solutionsdivconheight + whatithinkiknowtop + 100 + 300+ "px");
            }
    
    $("#helpdiv").animate({top: "-=40px"},{ duration: 1000, queue: false });
                
                
                
    $("#answerquestioninstruction").hide();
    $(".solutioninfodiv").hide();
    //page animation
    $("#helpdiv").hide();
    $("#questiontitle").hide();
    $("#whatithinkiknow").hide();
    $("#questioncommentbox").hide();
    $("#answerquestiondiv").hide();
    
    $("#helpdiv").fadeIn(1000);
    $("#questiontitle").fadeIn(700);
    $("#whatithinkiknow").fadeIn(800);
    $("#questioncommentbox").fadeIn(800);
    $("#answerquestiondiv").fadeIn(1200)
    $("#questiontitle").animate({left: "20px"},{ duration: 450, queue: false });
                
                
//to order the answers based on reputation
//http://jsfiddle.net/hibbard_eu/C2heg/

                    var $wrapper = $('#solutionsdivcon');

$wrapper.find('.solutionsdiv').sort(function (b, a) {
    return +a.dataset.percentage - +b.dataset.percentage;
})
.appendTo( $wrapper );
                
                
                //append question creator's info
                var questioncreator = $("#questioninfo").children(".profile").children(".profileinformation").children(".name").html()
                $.ajax({
                    type:'POST',
                    url: "/misconception/return-user-info.php",
                    data:{
                    "user": questioncreator
                    },
                success: function(response){
                    var userinfo = response.split("~");
                    //in the future make the username's first letter capitalized
$("#questioninfo").children(".profile").children(".profileinformation").children(".creatorreputation").html(userinfo[0] + " reputation");
$("#questioninfo").children(".profile").children(".profileinformation").children(".rank").html(userinfo[1]);
                }
            });
                
                
                
            }
    });
                
    $('#solutionsdivcon').hide();
    $('#solutionsdivcon').fadeIn(900);
    
    
    
    //test to see if user already upvoted for overall question
            $("#questioninfo").on("click",function(event){
                    var questionrep;
                    var getquestionrep = function(){
                        questionrep = $("#questionstatistic").children(".reputationdiv").children(".questionreputation").html();
                        $("#questionstatistic").children(".reputationdiv").children(".questionreputation").html("");
                        questionrep = parseInt(questionrep); 
                    };
                    if($(event.target).is(".uptriangle")){
                        if(lines[8] == username+"\n"){
                            alert("unfortunately your internet speeds forbid you to upvote on your own question");
                        }else{
                            if (username == "undefined"){
                                alert("sorry, you have to be logged in to upvote");
                            }else{
                                    var upvotetruedownvotefalse = true;
                                    var idofdiv = "questionstatistic";
                                    $.ajax({
                                        type:'POST',
                                        url: "upvote-downvote.php",
                                        data:{ "upvotetruedownvotefalse": upvotetruedownvotefalse,
                                               "idofdiv": idofdiv,
                                               "filename": filename,
                                               "username": username
                                            },
                                        success: function(response){
                                            //alert(response);
                                            if(response === "you haven't upvoted yet"){
                                                $("#questionstatistic").children(".reputationdiv").children(".uptriangle").css("border-bottom-color","#16BA2F");
                                                getquestionrep();
                                                questionrep = questionrep+1;
                                                $("#questionstatistic").children(".reputationdiv").children(".questionreputation").html(questionrep);

                                                var whattodo = "increaseupvote!n!";
                                                $.ajax({
                                                    type:'POST',
                                                    url: "../edit-user.php",
                                                    data:{
                                                    "whattodo": whattodo,
                                                    "username": username
                                                    }
                                                });

                                            }
                                            else if(response == "removed username"){
                                                $("#questionstatistic").children(".reputationdiv").children(".uptriangle").css("border-bottom-color","#E8E8E8");
                                                getquestionrep();
                                                questionrep = questionrep-1;
                                                $("#questionstatistic").children(".reputationdiv").children(".questionreputation").html(questionrep);

                                                var whattodo = "decreaseupvote!n!";
                                                $.ajax({
                                                    type:'POST',
                                                    url: "../edit-user.php",
                                                    data:{
                                                    "whattodo": whattodo,
                                                    "username": username
                                                    }
                                                });
                                            }
                                            else if(response == "you can't upvote when you've downvoted"){
                                             alert(response);
                                            }
                                        }

                                    });
                            }
                        }
                    }
                    if($(event.target).is(".downtriangle")){
                        if(lines[8] == username+"\n"){
                            alert("unfortunately your internet speeds forbid you to downvote on your own question");
                        }else{
                            if (username == "undefined"){
                            alert("sorry, you have to be logged in to downvote");
                            }else{
                                    var upvotetruedownvotefalse = false;
                                    var idofdiv = "questionstatistic";
                                    $.ajax({
                                        type:'POST',
                                        url: "upvote-downvote.php",
                                        data:{ "upvotetruedownvotefalse": upvotetruedownvotefalse,
                                               "idofdiv": idofdiv,
                                               "filename": filename,
                                               "username": username
                                            },
                                        success: function(response){
                                            alert(response);
                                            if(response == "you haven't downvoted yet"){
                                                $("#questionstatistic").children(".reputationdiv").children(".downtriangle").css("border-top-color","#16BA2F");
                                                getquestionrep();
                                                questionrep = questionrep-1;
                                                $("#questionstatistic").children(".reputationdiv").children(".questionreputation").html(questionrep);
                                            }
                                            else if(response == "removed username"){
                                                $("#questionstatistic").children(".reputationdiv").children(".downtriangle").css("border-top-color","#E8E8E8");
                                                getquestionrep();
                                                questionrep = questionrep+1;
                                                $("#questionstatistic").children(".reputationdiv").children(".questionreputation").html(questionrep);
                                            }
                                            else if(response == "you can't downvote when you've upvoted"){
                                             alert(response);   
                                            }
                                        }    
                                    });
                            }
                        }
                    }
            });
    //test to see if user voted for an answer
    $("#htmlpage").on("click",".solutioninfodiv",function(event){
            var answerrep;
            var getanswerrep = function(){
                answerrep = $(event.target).closest(".solutionsdiv").children(".solutioninfodiv").children(".reputationdiv").children(".questionreputation").html();
                        $(event.target).closest(".solutionsdiv").children(".solutioninfodiv").children(".reputationdiv").children(".questionreputation").html("");
                        answerrep = parseInt(answerrep);
            };
            if($(event.target).is(".uptriangle")){
                if($(event.target).closest(".solutionsdiv").children(".answer").attr("id") == username){
                    alert("sorry you cannot upvote your own answer");
                }else{
                    if (username == "undefined"){
                    alert("sorry, you have to be logged in to upvote");
                    }else{
                        var upvotetruedownvotefalse = true;
                        var idofdiv = $(this).closest(".solutionsdiv").children(".answer").attr("id");
                        $.ajax({
                            type:'POST',
                            url: "upvote-downvote.php",
                            data:{
                            "filename": filename,
                            "upvotetruedownvotefalse": upvotetruedownvotefalse,
                            "idofdiv": idofdiv,
                            "username": username
                            },
                        success: function(response){
                            if(response == "you haven't upvoted yet"){
                            $(event.target).closest(".solutionsdiv").children(".solutioninfodiv").children(".reputationdiv").children(".uptriangle").css("border-bottom-color","#16BA2F");
                            getanswerrep();
                                answerrep = answerrep+1;
                                $(event.target).closest(".solutionsdiv").children(".solutioninfodiv").children(".reputationdiv").children(".questionreputation").html(answerrep);
                                $(event.target).closest(".solutionsdiv").children(".outsiderep").html(answerrep);

                                var whattodo = "increaseupvote!n!";
                            $.ajax({
                                type:'POST',
                                url: "../edit-user.php",
                                data:{
                                "whattodo": whattodo,
                                "username": username
                                }
                            });


                            }else if(response == "removed username"){
                            $(event.target).closest(".solutionsdiv").children(".solutioninfodiv").children(".reputationdiv").children(".uptriangle").css("border-bottom-color","#E8E8E8");
                                getanswerrep();
                                answerrep = answerrep-1;
                                $(event.target).closest(".solutionsdiv").children(".solutioninfodiv").children(".reputationdiv").children(".questionreputation").html(answerrep);
                                $(event.target).closest(".solutionsdiv").children(".outsiderep").html(answerrep);

                                var whattodo = "decreaseupvote!n!";
                                    $.ajax({
                                        type:'POST',
                                        url: "../edit-user.php",
                                        data:{
                                        "whattodo": whattodo,
                                        "username": username
                                        }                    
                                    });

                            }else if(response == "you can't upvote when you've downvoted"){
                                alert(response);   
                            }
                        }
                        });
                    }
                }
            }
            if($(event.target).is(".downtriangle")){
                if($(event.target).closest(".solutionsdiv").children(".answer").attr("id")==username){
                    alert("sorry you cannot downvote your own answer");
                }else{
                    if (username == "undefined"){
                    alert("sorry, you have to be logged in to downvote");
                    }else{
                        var upvotetruedownvotefalse = false;
                        var idofdiv = $(this).closest(".solutionsdiv").children(".answer").attr("id");
                        $.ajax({
                            type:'POST',
                            url: "upvote-downvote.php",
                            data:{
                            "filename": filename,
                            "upvotetruedownvotefalse": upvotetruedownvotefalse,
                            "idofdiv": idofdiv,
                            "username": username
                            },
                        success: function(response){
                            if(response == "you haven't downvoted yet"){
                            $(event.target).closest(".solutionsdiv").children(".solutioninfodiv").children(".reputationdiv").children(".downtriangle").css("border-top-color","#16BA2F");
                               getanswerrep();
                                answerrep = answerrep-1;
                                $(event.target).closest(".solutionsdiv").children(".solutioninfodiv").children(".reputationdiv").children(".questionreputation").html(answerrep);
                                $(event.target).closest(".solutionsdiv").children(".outsiderep").html(answerrep);

                            }else if(response == "removed username"){
                            $(event.target).closest(".solutionsdiv").children(".solutioninfodiv").children(".reputationdiv").children(".downtriangle").css("border-top-color","#E8E8E8");
                                getanswerrep();
                                answerrep = answerrep+1;
                                $(event.target).closest(".solutionsdiv").children(".solutioninfodiv").children(".reputationdiv").children(".questionreputation").html(answerrep);
                                $(event.target).closest(".solutionsdiv").children(".outsiderep").html(answerrep);
                            }else if(response == "you can't downvote when you've upvoted"){
                                alert(response);   
                            }
                        }
                        });
                    }
                }
            }
        
    });
    //$("#htmlpage").on("click",".commentofanswer",function(){
    //  alert($(this).attr("class")); 
    //});
    
    
    //reputation for comments in answer
    
    
    $("#htmlpage").on("click",".directcommenttoquestion",function(event){
        if($(event.target).is(".commentupvote")){
                    //for checking to make sure that comment being upvoted isn't in the main question
                    if($(event.target).parent().parent().parent().is("#questionhiddencomments")){
                    }else{
                        if($(event.target).parent().parent().parent().is("#questioncommentcon")){
                        }else{
                            if($(event.target).closest(".directcommenttoquestion").children(".commentusername").html() == username){
                                 alert("sorry, you cannot upvote your own comment");   
                            }else{
                                if (username == "undefined"){
                                    alert("sorry, you have to be logged in to upvote");
                                }else{
                                var idofcontainer = $(this).closest(".solutionsdiv").children(".answer").attr("id");//to determine which row in txt file
                                var nthcomment = $(event.target).closest(".directcommenttoquestion").index();
                                //alert($(event.target).attr("class"));
                                if($(event.target).parent().parent().parent().is( ".hiddencomments" )){
                                    nthcomment = nthcomment+5;   
                                }
                                var commentrep;
                                var getcommentrep = function(){
                                    commentrep = $(event.target).closest(".commentupvotedownvotecon").children(".commentrep").html();
                                    $(event.target).closest(".commentupvotedownvotecon").children(".commentrep").html("");
                                    commentrep = parseInt(commentrep);
                                };

                                $.ajax({
                                    type:'POST',
                                    url: "upvote-comment.php",
                                    data:{
                                    "filename": filename,
                                    "idofcontainer": idofcontainer,
                                    "nthcomment": nthcomment,
                                    "username": username
                                    },
                                success: function(response){
                                    if(response == "removed username"){
                                        $(event.target).css("border-bottom-color","#11A3F2");
                                        getcommentrep();
                                        commentrep = commentrep-1;
                                        $(event.target).closest(".commentupvotedownvotecon").children(".commentrep").html(commentrep);
                                    }else{
                                        $(event.target).css("border-bottom-color","#16BA2F");
                                        getcommentrep();
                                        commentrep = commentrep+1;
                                        $(event.target).closest(".commentupvotedownvotecon").children(".commentrep").html(commentrep);
                                    }
                                }
                                });
                            }
                        }
                    }
                }
        }
    });
    //reputation for comments in question
    
    $("#questioncommentcon, #questionhiddencomments").on("click",function(event){
        if($(event.target).is(".commentupvote")){
                if($(event.target).closest(".directcommenttoquestion").children(".commentusername").html() == username){
                 alert("sorry, you cannot upvote your own comment");   
                }else{
                    if (username == "undefined"){
                    alert("sorry, you have to be logged in to upvote");
                    }else{
                        var idofcontainer = "questioncommentbox";
                        var nthcomment = $(event.target).closest(".directcommenttoquestion").index();
                        if($(event.target).parent().parent().parent().is( "#questionhiddencomments" )){
                                    nthcomment = nthcomment+5;   
                                }
                        var commentrep;
                        var getcommentrep = function(){
                            commentrep = $(event.target).closest(".commentupvotedownvotecon").children(".commentrep").html();
                            $(event.target).closest(".commentupvotedownvotecon").children(".commentrep").html("");
                            commentrep = parseInt(commentrep);
                        };

                        $.ajax({
                                type:'POST',
                                url: "upvote-comment.php",
                                data:{
                                "filename": filename,
                                "idofcontainer": idofcontainer,
                                "nthcomment": nthcomment,
                                "username": username
                                },
                            success: function(response){
                                if(response == "removed username"){
                                    $(event.target).css("border-bottom-color","#11A3F2");
                                    getcommentrep();
                                    commentrep = commentrep-1;
                                    $(event.target).closest(".commentupvotedownvotecon").children(".commentrep").html(commentrep);
                                }else{
                                    $(event.target).css("border-bottom-color","#16BA2F");
                                    getcommentrep();
                                    commentrep = commentrep+1;
                                    $(event.target).closest(".commentupvotedownvotecon").children(".commentrep").html(commentrep);
                                }
                            }
                        });
                    }
                }
        }
    });

    //when someone hits submit answer
    $("#submitanswer").on("click",function(){
        
        var submitinfo = function(){
            $.ajax({
                type:'POST',
                url: "answers.php",
                data:{
                    "filename": filename,
                    "username": username,
                    "submittedanswer": submittedanswer
                },
                success: function(response){
                    location.href = response;
                }

            });

            var title = filename.substring(0, filename.length - 4);     
            var whattodo = "increaseanswer!n!" + title;
            $.ajax({
                type:'POST',
                url: "../edit-user.php",
                data:{
                    "whattodo": whattodo,
                    "username": username
                }
            });
        };
        
        
        var submittedanswer = $("#answerquestionarea").val();
        if(!$.trim($("#answerquestionarea").val())){
            alert("sorry, you can't leave your answer blank");   
        }else{
            if(submittedanswer.indexOf("!n!") > -1){
                alert("sorry, you can't put instances of !n! in your answer");
            }else{
                if(submittedanswer.indexOf("!c!") > -1){
                    alert("sorry, you can't put instances of !c! in your answer");
                }else{
                    if(submittedanswer.indexOf("\\-n") > -1){
                        alert("Sorry, you can't put instances of \\-n in your answer");
                    }else{
                        
                        if(new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?").test(submittedanswer)) {
                            submitinfo();
                        }else{
                            if (confirm('Are you sure you want to submit this answer without an extrenal link? Links provide higher credibility')) {
                                submitinfo();
                            }
                        }
                    }
                }
            }
        }
    });
    
    
    //when creating a new comment
    //var numItems = $('.yourclass').length()
    //id = "dirrectcommenttoquestion" + numItems
    
    
    //creating a comment
    $(".commenttoanswer").keypress(function(e) {
    if(e.which == 13) {
        var valofcomment = $(e.target).val();
        if(!$.trim(valofcomment)){
            alert("Sorry, you can't leave your comment blank");   
        }else{
            if(valofcomment.indexOf("!n!") > -1){
                alert("Sorry, you can't put instances of !n! in your comment");
            }else{
                if(valofcomment.indexOf("!c!") > -1){
                    alert("Sorry, you can't put instances of !c! in your comment");
                }else{
                    var whattodo = "increasecomment!n!";
                            $.ajax({
                                type:'POST',
                                url: "../edit-user.php",
                                data:{
                                "whattodo": whattodo,
                                "username": username
                                }                    
                            });
                    
                    var idofanswer = $(e.target).closest(".solutionsdiv").children(".answer").attr("id");
                    var submittedcomment = valofcomment;
                    $.ajax({
                        type:'POST',
                        url: "create-comment.php",
                        data:{
                            "filename": filename,
                            "username": username,
                            "idofanswer": idofanswer,
                            "submittedcomment": submittedcomment
                        }
                    });
                    location.reload();
                    
                }
            }
        }
    }
});
    $("#createcommenttoanswer").keypress(function(e) {
            if(e.which == 13) {
            var valofcomment = $(e.target).val();
            if(!$.trim(valofcomment)){
                alert("Sorry, you can't leave your comment blank");   
            }else{
                if(valofcomment.indexOf("!n!") > -1){
                    alert("Sorry, you can't put instances of !n! in your comment");
                }else{
                    if(valofcomment.indexOf("!c!") > -1){
                        alert("Sorry, you can't put instances of !c! in your comment");
                    }else{
                        if(username == "undefined"){
                        }else{
                            var whattodo = "increasecomment!n!";
                                $.ajax({
                                    type:'POST',
                                    url: "../edit-user.php",
                                    data:{
                                    "whattodo": whattodo,
                                    "username": username
                                    }
                                });

                            var idofanswer = "createcommenttoanswer";
                            var submittedcomment = valofcomment;
                            $.ajax({
                                type:'POST',
                                url: "create-comment.php",
                                data:{
                                    "filename": filename,
                                    "username": username,
                                    "idofanswer": idofanswer,
                                    "submittedcomment": submittedcomment
                                }
                            });
                            location.reload();
                        }
                    }
                }
            }
        }
    
    
    });
    
    //upvoting a reply
    $("#htmlpage").on("click",'.commentupvote',function(){
        if($(event.target).parent().parent().is(".replytocommentdiv")){
            if (username == "undefined"){
                alert("sorry, you have to be logged in to upvote");
            }else{
                if($(event.target).closest(".replytocommentdiv").children(".commentusername").html() == username){
                 alert("sorry, you cannot upvote your own reply");   
                }else{
                    var idofcontainer;
                    var commentrep;
                    var eventtarget = event.target;
                    var getcommentrep = function(){
                        commentrep = $(eventtarget).closest(".commentupvotedownvotecon").children(".commentrep").html();
                        $(eventtarget).closest(".commentupvotedownvotecon").children(".commentrep").html("");
                        commentrep = parseInt(commentrep);
                    };
                    //if the thing is in the question
                    if($(event.target).closest(".replytocommentdiv").parent().is("#showhiddenreplies")){
                        idofcontainer = "questioncommentbox";

                         var nthcomment = $("#showhiddenreplies").children(".showoriginalcomment").children(".commentreplynthcomment").html();
                        var nthreply = $(event.target).closest(".replytocommentdiv").index();
                         $.ajax({
                            type:'POST',
                            url: "reply-upvote.php",
                            data:{
                            "filename": filename,
                            "idofcontainer": idofcontainer,
                            "nthcomment": nthcomment,
                            "nthreply": nthreply,
                            "username": username
                            },
                            success: function(response){
                                if(response == "removed username"){
                                    $(eventtarget).css("border-bottom-color","#11A3F2");
                                    getcommentrep();
                                    commentrep = commentrep-1;
                                    $(eventtarget).closest(".commentupvotedownvotecon").children(".commentrep").html(commentrep);
                                }else{

                                    $(eventtarget).css("border-bottom-color","#16BA2F");
                                    getcommentrep();
                                    commentrep = commentrep+1;
                                    $(eventtarget).closest(".commentupvotedownvotecon").children(".commentrep").html(commentrep);
                                }
                            }
                        });
                    }else{

                        idofcontainer = $(event.target).closest(".solutionsdiv").children(".answer").attr("id");

                        var nthcomment = $(event.target).closest(".showhiddenreplies").children(".showoriginalcomment").children(".commentreplynthcomment").html();
                        var nthreply = $(event.target).closest(".replytocommentdiv").index();
                         $.ajax({
                            type:'POST',
                            url: "reply-upvote.php",
                            data:{
                            "filename": filename,
                            "idofcontainer": idofcontainer,
                            "nthcomment": nthcomment,
                            "nthreply": nthreply,
                            "username": username
                            },
                            success: function(response){
                                if(response == "removed username"){
                                    $(eventtarget).css("border-bottom-color","#11A3F2");
                                    getcommentrep();
                                    commentrep = commentrep-1;
                                    $(eventtarget).closest(".commentupvotedownvotecon").children(".commentrep").html(commentrep);
                                }else{
                                    $(eventtarget).css("border-bottom-color","#16BA2F");
                                    getcommentrep();
                                    commentrep = commentrep+1;
                                    $(eventtarget).closest(".commentupvotedownvotecon").children(".commentrep").html(commentrep);
                                }
                            }
                        });
                    }
                }
            }
        }
    });
    
    //when the creator of the question wants to edit the question
    //before making the changes make sure that the user is the question owner (in php)
    $("#editquestion").on("click",function(){
        
        //really don't need it cause i'll be checking over it using php
        
        if(lines[8] == username+"\n"){
            //var title = filename.substring(0, filename.length - 4);
            //title =encodeURIComponent(title);
            //var whatithinkiknow = lines[9].split("!n!");
            //whatithinkiknow = whatithinkiknow[0];
            //alert(escapeURIComponent(whatithinkiknow));
            //whatithinkiknow =encodeURIComponent(whatithinkiknow);
var title = filename.substring(0, filename.length - 4);
    //title = decodeURIComponent(title);
            //URL-decodeURIComponent
            //alert(title);
            location.href = "/misconception/questions/edit-index.php?title="+title;//+"&whatithinkiknow="+whatithinkiknow;//remember to split the !n! off and title = filename
        }
    });
    
    

    //restrict people from entering backshash - n in answers
    
    $("#bookmarkquestion").on("click",function(){
        
        var whattodo;
        
        $.ajax({
            type:'POST',
            url: "whobookmarked.php",
            data:{
            "filename": filename,
            "username": username
            },
            success: function(response){
                var title = filename.substring(0, filename.length - 4);     
                if(response == "removed username"){
                    whattodo = "removebookmark!n!" + title;
                    $("#bookmarkquestion").css("color","white");
                }else if(response == "inserted username"){
                    whattodo = "increasebookmark!n!" + title;
                    $("#bookmarkquestion").css("color","#F5C964");
                }
                                      
                
                    $.ajax({
                        type:'POST',
                        url: "../edit-user.php",
                        data:{
                        "whattodo": whattodo,
                        "username": username
                        }
                    });
                }
                
            });
        });
    
    
    $("#htmlpage").on("click",".deletecircle",function(event){
        var typeofdelete;
        
        var submitinfo = function(){
            $.ajax({
                type:'POST',
                url: "delete.php",
                data:{
                    "filename": filename,
                    "username": username,
                    "typeofdelete": typeofdelete
                },
                success: function(response){
                    alert(response);
                    location.reload();
                }
                
            });

        };
        
        
        
        
        //comments in answer
        if($(event.target).closest("#questioncommentcon").is("#questioncommentcon")){
                var nthcomment = $(event.target).closest(".directcommenttoquestion").index();
                typeofdelete ="question!n!comment!n!"+nthcomment;
                
                
                if (confirm('Are you sure you want to delete your comment?')) {
                    var whattodo = "decreasecomment!n!";
                    $.ajax({
                        type:'POST',
                        url: "../edit-user.php",
                        data:{
                        "whattodo": whattodo,
                        "username": username
                        }
                    });
                    submitinfo();
                }
        }else if($(event.target).closest("#questionhiddencomments").is("#questionhiddencomments")){
            var nthcomment = $(event.target).closest(".directcommenttoquestion").index();
            nthcomment = nthcomment+5; 
            typeofdelete ="question!n!comment!n!"+nthcomment;
            
            if (confirm('Are you sure you want to delete your comment?')) {
                var whattodo = "decreasecomment!n!";
                $.ajax({
                    type:'POST',
                    url: "../edit-user.php",
                    data:{
                    "whattodo": whattodo,
                    "username": username
                    }
                });
                    submitinfo();
                }
        }else if($(event.target).closest("#showhiddenreplies").is("#showhiddenreplies")){
            var nthcomment = $(event.target).closest("#showhiddenreplies").children(".showoriginalcomment").children(".commentreplynthcomment").html();
            var nthreply = $(event.target).closest(".replytocommentdiv").index();
            typeofdelete = "question!n!reply!n!"+nthcomment+"!n!"+nthreply;
            
            if (confirm('Are you sure you want to delete your reply?')) {
                    submitinfo();
                }
        }else{
            //questions in solutions div
            var nthanswer = $(event.target).closest(".solutionsdiv").index();

            if($(event.target).closest(".commentupvotedownvotecon").parent().is(".directcommenttoquestion")){

                var nthcomment = $(event.target).closest(".directcommenttoquestion").index();
                if($(event.target).closest(".directcommenttoquestion").parent().is(".hiddencomments")){
                    nthcomment = nthcomment+5;   
                }
                
                
                typeofdelete = "answer!n!comment!n!"+nthanswer+"!n!" +nthcomment;
                
                if (confirm('Are you sure you want to delete your comment?')) {
                    var whattodo = "decreasecomment!n!";
                    $.ajax({
                        type:'POST',
                        url: "../edit-user.php",
                        data:{
                        "whattodo": whattodo,
                        "username": username
                        }
                    });
                    submitinfo();
                }
                
            }else if($(event.target).closest(".commentupvotedownvotecon").parent().is(".replytocommentdiv")){
                
                
                
                var nthcomment = $(event.target).closest(".showhiddenreplies").children(".showoriginalcomment").children(".commentreplynthcomment").html();
                var nthreply = $(event.target).closest(".replytocommentdiv").index();
                typeofdelete = "answer!n!reply!n!"+nthanswer+"!n!"+nthcomment+"!n!"+nthreply;
                
                if (confirm('Are you sure you want to delete your reply?')) {
                    submitinfo();
                }
                
                
            }
        }
    });
    $("#createcommenttoanswer").on("click",function(){
        if(username=="undefined"){
            alert("sorry you have to be logged in to comment");
        }
    });
    
    
    
    
});