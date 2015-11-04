var toggleshowprofile = false;
$(document).ready(function(){
//navbar js
    $("#navprofile").on("click",function(){
        if($('#navprofile').children("#sessionusername").length == 1){
            if(toggleshowprofile==true){
                $("#profilesettingcon").animate({left: "+=200px"});
                toggleshowprofile=false;
            }
            else{
                $("#profilesettingcon").animate({left: "-=200px"});
                toggleshowprofile = true;
            }
        }
    });
var username;
 if (typeof usernames == "undefined"){
     username = "undefined";
 }else{
     username = usernames;
 }
    
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
        $(this).children().stop().fadeIn();
    },
    mouseleave: function () {
        $(this).children().stop().fadeOut();
        $(".commentrep").stop().fadeIn();
    }
}, ".commentupvotedownvotecon"); //pass the element as an argument to .on
    
    

    //when user clicks on whatithinkiknow
    $("#whatithinkiknow").on("click",function(){
        $("#helpdiv").stop();
        $(".hiddencomments").hide();
        $("#questionhiddencomments").hide();
        $(".solutioninfodiv").hide();
        $("#answerquestioninstruction").fadeOut();
        $("#questioninfo").fadeIn();
        $("#helpdiv").animate({top: "100px"},{queue: false});
        $("#helpdiv").animate({height: "500px"},{queue: false});
    });
    
    //when user clicks on an answer
        $("#solutionsdivcon").on("click",".answer",function(){
        $("#helpdiv").stop();
        $(".hiddencomments").hide();
        $("#questionhiddencomments").hide();
        $("#helpdiv").css("opacity","1");
        $(".solutioninfodiv").hide();
        $("#questioninfo").fadeOut();
        $("#answerquestioninstruction").fadeOut();
            var answerid = $(this).closest(".solutionsdiv").children(".answer").attr("id");
            var whereanswertoquestionis = $("#"+answerid).offset();
        //var whereanswertoquestionis = $(this).closest(".solutionsdiv").offset();
            whereanswertoquestionis = whereanswertoquestionis.top - 45;
            $("#helpdiv").animate({top: whereanswertoquestionis}, function(){
                //$(this).closest(".solutionsdiv").children(".solutioninfodiv").fadeIn();
                $("#"+answerid).siblings(".solutioninfodiv").fadeIn();
            });
        $("#helpdiv").animate({height: "190px"},{queue: false});
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
                $("#helpdiv").stop();
                $(".hiddencomments").hide();
                $("#questionhiddencomments").hide();
                $("#helpdiv").css("opacity","1");
                $(".solutioninfodiv").hide();
                $("#questioninfo").fadeOut();
                $("#answerquestioninstruction").fadeIn();
                $("#helpdiv").animate({height: "300px"},{queue: false});
                var whereanswerdivis = $("#answerquestiondiv").offset();
                whereanswerdivis = whereanswerdivis.top - 40;
                $("#helpdiv").animate({top: whereanswerdivis }, "slow" );
            }
        }  
    });
    //when user clicks on create comment
    
    
    $("#htmlpage").on("click",'.addcomment',function(){
        if (username == "undefined"){
            alert("sorry, you have to be logged in to comment");
        }else{
                if($(this).closest(".solutionsdiv").children(".commenttoanswerdiv").is(":hidden")){
                    $(this).closest(".solutionsdiv").children(".commenttoanswerdiv").slideDown();
                    $(this).closest(".solutionsdiv").animate({height: $(this).closest(".solutionsdiv").height() + 33 + "px"}, "slow" ,function(){
                        resetheight();
                        $("#answerquestiondiv").animate({top:  whatithinkiknowheight + questioncommentboxheight + solutionsdivconheight + 140 + "px"},"fast");
                    });
                }
                else if($(this).closest(".solutionsdiv").children(".commenttoanswerdiv").is(":visible")){
                    $(this).closest(".solutionsdiv").children(".commenttoanswerdiv").slideUp();
                    $(this).closest(".solutionsdiv").animate({height: $(this).closest(".solutionsdiv").height() - 33 + "px"}, "slow" ,function(){
                        resetheight();
                        $("#answerquestiondiv").animate({top:  whatithinkiknowheight + questioncommentboxheight + solutionsdivconheight + 140 + "px"},"fast");
                    });
                    //$("#answerquestiondiv").animate({"top": $("#answerquestiondiv").offset().top -33 - 8},"slow");
            }
        }
    });
    
    //when user clicks on view more comments
    $("#htmlpage").on("click",'.viewmorecommentsb',function(event){
        $("#helpdiv").stop();
        $(".hiddencomments").hide();
        $("#questionhiddencomments").hide();
        $("#helpdiv").css("opacity","1");
        $(".solutioninfodiv").hide();
        $("#questioninfo").fadeOut();
        $("#answerquestioninstruction").fadeOut();
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
        $("#helpdiv").stop();
        $(".hiddencomments").hide();
        $("#helpdiv").css("opacity","1");
        $(".solutioninfodiv").hide();
        $("#questioninfo").fadeOut();
        $("#answerquestioninstruction").fadeOut();
        $("#helpdiv").animate({top: "100px"}, function(){
            $("#questionhiddencomments").fadeIn("fast");
        });
        $("#helpdiv").animate({height: "500px"},{queue: false});
    });
    
    
    
    
    
    $("#htmlpage").hide();
    
        var pathname = document.URL;
        var filename = pathname.replace(/^.*[\\\/]/, '');
        filename = filename.substring(0, filename.length - 3);
        filename = filename+"txt";
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
                $("#numberofviews").append("Has "+numofviews[0]+" views");
                $("#dateasked").append("Asked on "+docinfoparsed[4]);
                $("#lastactive").append("Last active on "+docinfoparsed[5]);
                $("#numberofbookmarks").append("Has " + docinfoparsed[6] + " bookmarks");
                docinfoparsed[9] = docinfoparsed[9].replace(/(\r\n|\n|\r)/gm,"");
                var questioncomments = docinfoparsed[9].split("!n!");
                //turning \-n into linebreaks for html
                questioncomments[0] = questioncomments[0].replace(/\\-n/g,"<br>");
                $("#whatithinkiknowp").append(questioncomments[0]);
                //error here test to see if question has any comments first
                var questioncommentssegments =  questioncomments[1].split("!c!");
                var questioncommentslength = questioncommentssegments.length;
                if(questioncommentslength > 1){
                    var numofquestioncomments = 0;
                questioncommentslength = questioncommentslength/4;
                    var q = 0;
                for(q; q < questioncommentslength && numofquestioncomments < 5; q++){
                $("#questioncommentcon").append('<div class="directcommenttoquestion"><div class="commentupvotedownvotecon"><div class="commentupvote"></div><div class="commentrep">' +questioncommentssegments[q*4] +'</div><img class="commentflag" title="Reasons to flag: threatning, spam, should not be on Misconception, un-ethical" src="flag_comment.PNG"></div><div class="whoupvotedcomment">' + questioncommentssegments[q*4+1] + '</div><div class=commentusername>'+questioncommentssegments[q*4+2]+'</div><div class="commentp">'+questioncommentssegments[q*4+3]+'</div></div>');
                    //when creating comments remember to insert the period so that array lengths are equal
                    var whoupvotedquestioncomment = $("#questioncommentcon").children(".directcommenttoquestion").last().children(".whoupvotedcomment").text();
                    if(whoupvotedquestioncomment.indexOf("~"+username+"~") > -1 ){ $("#questioncommentcon").children(".directcommenttoquestion").last().children(".commentupvotedownvotecon").children(".commentupvote").css("border-bottom-color","orange");
                    }
                    numofquestioncomments = numofquestioncomments +1;
                }
                    if(questioncommentslength>5){
                    $("#questioncommentcon").append("<div id='viewmorecommentsb'>View more Comments</div>");
                    for(q; q < questioncommentslength; q++){
                $("#questionhiddencomments").append('<div class="directcommenttoquestion" style="width:270px;"><div class="commentupvotedownvotecon"><div class="commentupvote" title="Reasons to upvote: should be an answer, helped you out, good argument"></div><div class="commentrep" title="comment reputation">' +questioncommentssegments[q*4] +'</div><img class="commentflag" title="Reasons to flag: threatning, spam, should not be on Misconception, un-ethical" src="flag_comment.PNG"></div><div class="whoupvotedcomment">' + questioncommentssegments[q*4+1] + '</div><div class=commentusername>'+questioncommentssegments[q*4+2]+'</div><div class="commentp">'+questioncommentssegments[q*4+3]+'</div></div>');
//see if you've upvoted before
                var whoupvotedquestioncomment = $("#questionhiddencomments").children(".directcommenttoquestion").last().children(".whoupvotedcomment").text();
                    if(whoupvotedquestioncomment.indexOf("~"+username+"~") > -1 ){ $("#questionhiddencomments").children(".directcommenttoquestion").last().children(".commentupvotedownvotecon").children(".commentupvote").css("border-bottom-color","orange");
                    }
            }
                }
                    
                    
                    
            }
                
                //check if user has already upvoted before
                if(docinfoparsed[1].indexOf(","+username+",") > -1){
                    $("#questionstatistic").children(".reputationdiv").children(".uptriangle").css("border-bottom-color","orange");
                }
                //check if user has already downvoted before
                if(docinfoparsed[2].indexOf(","+username+",") > -1){
                    $("#questionstatistic").children(".reputationdiv").children(".downtriangle").css("border-top-color","orange");
                }
            
    
                //inserts the info into the answer divs
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
            //get data about answer creator
                var user = individualparts[3];
            $.ajax({
                    type:'POST',
                    url: "/misconception/return-user-info.php",
                    data:{
                    "user": user
                    },
                success: function(response){
                    var userinfo = response.split(",");
                    //in the future make the username's first letter capitalized
$("#"+individualparts[3]).parent(".solutionsdiv").children(".solutioninfodiv").children(".profile").children(".profileinformation").children(".name").html(individualparts[3]);
$("#"+individualparts[3]).parent(".solutionsdiv").children(".solutioninfodiv").children(".profile").children(".profileinformation").children(".creatorreputation").html(userinfo[0] + " reputation");
$("#"+individualparts[3]).parent(".solutionsdiv").children(".solutioninfodiv").children(".profile").children(".profileinformation").children(".rank").html(userinfo[1]);
                }
            });
            
            
            
            if(individualparts.length==6){
            //check to see if user upvoted
            if(individualparts[1].indexOf("~"+username+"~") > -1){
                $("#"+individualparts[3]).parent(".solutionsdiv").children(".solutioninfodiv").children(".reputationdiv").children(".uptriangle").css("border-bottom-color","orange");
            }
            if(individualparts[2].indexOf("~"+username+"~") > -1){
                $("#"+individualparts[3]).parent(".solutionsdiv").children(".solutioninfodiv").children(".reputationdiv").children(".downtriangle").css("border-top-color","orange");
            }
            //append comments
            individualparts[5] = individualparts[5].replace(/(\r\n|\n|\r)/gm,"");
            var commentarray = individualparts[5].split("!c!");
            var commentarraylength = commentarray.length;
            //alert(commentarraylength);
            var numofcomments = 0
            commentarraylength = commentarraylength/4;
                var p = 0;
            for(p; p < commentarraylength && numofcomments<5; p++){
                $("#"+individualparts[3]).parent(".solutionsdiv").children(".commentofanswer").append('<div class="directcommenttoquestion"><div class="commentupvotedownvotecon"><div class="commentupvote" title="Reasons to upvote: should be an answer, helped you out, good argument"></div><div class="commentrep" title="comment reputation">' +commentarray[p*4] +'</div><img class="commentflag" title="Reasons to flag: threatning, spam, should not be on Misconception, un-ethical" src="flag_comment.PNG"></div><div class="whoupvotedcomment">' + commentarray[p*4+1] + '</div><div class=commentusername>'+commentarray[p*4+2]+'</div><div class="commentp">'+commentarray[p*4+3]+'</div></div>');
//see if you've upvoted before
                var commentwhoupvoted = $("#"+individualparts[3]).parent(".solutionsdiv").children(".commentofanswer").children(".directcommenttoquestion").last().children(".whoupvotedcomment").text();
                if(commentwhoupvoted.indexOf("~"+username+"~") > -1 ){ $("#"+individualparts[3]).parent(".solutionsdiv").children(".commentofanswer").children(".directcommenttoquestion").last().children(".commentupvotedownvotecon").children(".commentupvote").css("border-bottom-color","orange");
                }
                numofcomments = numofcomments+1;
            }
                if(commentarraylength>5){
                    $("#"+individualparts[3]).parent(".solutionsdiv").children(".commentofanswer").append("<div class='viewmorecommentsb'>View more Comments</div>");
                    
                    for(p; p < commentarraylength; p++){
                $("#"+individualparts[3]).parent(".solutionsdiv").children(".hiddencomments").append('<div class="directcommenttoquestion" style="width:270px;"><div class="commentupvotedownvotecon"><div class="commentupvote" title="Reasons to upvote: should be an answer, helped you out, good argument"></div><div class="commentrep" title="comment reputation">' +commentarray[p*4] +'</div><img class="commentflag" title="Reasons to flag: threatning, spam, should not be on Misconception, un-ethical" src="flag_comment.PNG"></div><div class="whoupvotedcomment">' + commentarray[p*4+1] + '</div><div class=commentusername>'+commentarray[p*4+2]+'</div><div class="commentp">'+commentarray[p*4+3]+'</div></div>');
//see if you've upvoted before
                var commentwhoupvoted = $("#"+individualparts[3]).parent(".solutionsdiv").children(".hiddencomments").children(".directcommenttoquestion").last().children(".whoupvotedcomment").text();
                if(commentwhoupvoted.indexOf("~"+username+"~") > -1 ){ $("#"+individualparts[3]).parent(".solutionsdiv").children(".hiddencomments").children(".directcommenttoquestion").last().children(".commentupvotedownvotecon").children(".commentupvote").css("border-bottom-color","orange");
                }
            }
                }
        }
        }
                
                
                
                
                
                
                
                
                
                
    
    
    $("#htmlpage").show();
        //setup page div height
    //$("#helpdiv").css({"height": ($("#whatithinkiknow").height()+'px')});
    $("#helpdiv").animate({top: "100px"},{ duration: 1000, queue: false });
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
    $("#questioncommentbox").css("top", whatithinkiknowheight+ 100+"px");
    $("#solutionsdivcon").css("top",  whatithinkiknowheight + questioncommentboxheight + 120 + "px");
    $("#answerquestiondiv").css("top",  whatithinkiknowheight + questioncommentboxheight + solutionsdivconheight + 140 + "px");
    $("#htmlpage").css("height", whatithinkiknowheight + questioncommentboxheight + solutionsdivconheight + 200 + 300+ "px");
    
    
    
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
                    var userinfo = response.split(",");
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
                    if (username == "undefined"){
                        alert("sorry, you have to be logged in to upvote");
                    }else{
                        //$("#questionstatistic").children(".reputationdiv").children(".uptriangle").css("border-bottom-color","orange");
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
                                    if(response === "you haven't upvoted yet"){
                                        $("#questionstatistic").children(".reputationdiv").children(".uptriangle").css("border-bottom-color","orange");
                                        getquestionrep();
                                        questionrep = questionrep+1;
                                        $("#questionstatistic").children(".reputationdiv").children(".questionreputation").html(questionrep);
                                    }
                                    else if(response == "removed username"){
                                        $("#questionstatistic").children(".reputationdiv").children(".uptriangle").css("border-bottom-color","red");
                                        getquestionrep();
                                        questionrep = questionrep-1;
                                        $("#questionstatistic").children(".reputationdiv").children(".questionreputation").html(questionrep);
                                    }
                                    else if(response == "you can't upvote when you've downvoted"){
                                     alert(response);
                                    }
                                }
                                       
                            });
                    }
                }
                if($(event.target).is(".downtriangle")){
                    if (username == "undefined"){
                    alert("sorry, you have to be logged in to downvote");
                    }else{
                        //$("#questionstatistic").children(".reputationdiv").children(".uptriangle").css("border-bottom-color","orange");
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
                                    //alert(response);
                                    if(response == "you haven't downvoted yet"){
                                        $("#questionstatistic").children(".reputationdiv").children(".downtriangle").css("border-top-color","orange");
                                        getquestionrep();
                                        questionrep = questionrep-1;
                                        $("#questionstatistic").children(".reputationdiv").children(".questionreputation").html(questionrep);
                                    }
                                    else if(response == "removed username"){
                                        $("#questionstatistic").children(".reputationdiv").children(".downtriangle").css("border-top-color","red");
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
                    $(event.target).closest(".solutionsdiv").children(".solutioninfodiv").children(".reputationdiv").children(".uptriangle").css("border-bottom-color","orange");
                    getanswerrep();
                        answerrep = answerrep+1;
                        $(event.target).closest(".solutionsdiv").children(".solutioninfodiv").children(".reputationdiv").children(".questionreputation").html(answerrep);
                        $(event.target).closest(".solutionsdiv").children(".outsiderep").html(answerrep);
                    }else if(response == "removed username"){
                    $(event.target).closest(".solutionsdiv").children(".solutioninfodiv").children(".reputationdiv").children(".uptriangle").css("border-bottom-color","red");
                        getanswerrep();
                        answerrep = answerrep-1;
                        $(event.target).closest(".solutionsdiv").children(".solutioninfodiv").children(".reputationdiv").children(".questionreputation").html(answerrep);
                        $(event.target).closest(".solutionsdiv").children(".outsiderep").html(answerrep);
                    }else if(response == "you can't upvote when you've downvoted"){
                        alert(response);   
                    }
                }
                });
            }
        }
        if($(event.target).is(".downtriangle")){
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
                    $(event.target).closest(".solutionsdiv").children(".solutioninfodiv").children(".reputationdiv").children(".downtriangle").css("border-top-color","orange");
                       getanswerrep();
                        answerrep = answerrep-1;
                        $(event.target).closest(".solutionsdiv").children(".solutioninfodiv").children(".reputationdiv").children(".questionreputation").html(answerrep);
                        $(event.target).closest(".solutionsdiv").children(".outsiderep").html(answerrep);
                        
                    }else if(response == "removed username"){
                    $(event.target).closest(".solutionsdiv").children(".solutioninfodiv").children(".reputationdiv").children(".downtriangle").css("border-top-color","red");
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
    });
    //$("#htmlpage").on("click",".commentofanswer",function(){
    //  alert($(this).attr("class")); 
    //});
    
    
    //reputation for comments in answer
    
    
    $("#htmlpage").on("click",".directcommenttoquestion",function(event){
        if($(event.target).is(".commentupvote")){
            if (username == "undefined"){
            alert("sorry, you have to be logged in to upvote");
            }else{
                //for checking to make sure that comment being upvoted isn't in the main question
                if($(event.target).parent().parent().parent().is("#questionhiddencomments")){
                }else{
                    if($(event.target).parent().parent().parent().is("#questioncommentcon")){   
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
                                $(event.target).css("border-bottom-color","red");
                                getcommentrep();
                                commentrep = commentrep-1;
                                $(event.target).closest(".commentupvotedownvotecon").children(".commentrep").html(commentrep);
                            }else{
                                $(event.target).css("border-bottom-color","orange");
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
    });
    //reputation for comments in question
    
    $("#questioncommentcon, #questionhiddencomments").on("click",function(event){
        if($(event.target).is(".commentupvote")){
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
                            $(event.target).css("border-bottom-color","red");
                            getcommentrep();
                            commentrep = commentrep-1;
                            $(event.target).closest(".commentupvotedownvotecon").children(".commentrep").html(commentrep);
                        }else{
                            $(event.target).css("border-bottom-color","orange");
                            getcommentrep();
                            commentrep = commentrep+1;
                            $(event.target).closest(".commentupvotedownvotecon").children(".commentrep").html(commentrep);
                        }
                    }
                });
            }
        }
    });

    //when someone hits submit answer
    $("#submitanswer").on("click",function(){
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
                        $.ajax({
                            type:'POST',
                            url: "answers.php",
                            data:{
                                "filename": filename,
                                "username": username,
                                "submittedanswer": submittedanswer
                            },
                            success: function(docinfo){
                                alert(docinfo);
                            }

                        });
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
    
    
    });
    
    
    
    
    
    
    
    
    //in the future make the logic for commenting on the answer itself
    //restrict people from entering backshash - n in answers
});