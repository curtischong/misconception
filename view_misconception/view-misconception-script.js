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
    
    
    
    //setup page div height
    //$("#helpdiv").css({"height": ($("#whatithinkiknow").height()+'px')});
    $("#helpdiv").animate({top: "125px"},{ duration: 1000, queue: false });
    //determining height of elements
    $("#whatithinkiknow").css({"height": ($("#whatithinkiknowp").height()+45+'px')});
    
    $(".solutionsdiv").each(function(){
        $(this).css({"height": ($(this).children(".answer").height()+$(this).children(".commentofanswer").height()+25+'px')});
    });
    

    
    
    
    $("#answerquestioninstruction").hide();
    $(".solutioninfodiv").hide();
    //page animation
    $("#helpdiv").hide();
    $("#questiontitle").hide();
    $("#whatithinkiknow").hide();
    $("#questioncommentbox").hide();
    $(".solutionsdiv").hide();
    $("#answerquestiondiv").hide();
    
    $("#helpdiv").fadeIn(1000);
    $("#questiontitle").fadeIn(700);
    $("#whatithinkiknow").fadeIn(800);
    $("#questioncommentbox").fadeIn(800);
    $(".solutionsdiv").fadeIn(900);
    $("#answerquestiondiv").fadeIn(1200)
    $("#questiontitle").animate({left: "20px"},{ duration: 450, queue: false });
    
    //while($(".answer").outerHeight() < $(".answer").scrollHeight + parseFloat($(".answer").css("borderTopWidth")) + parseFloat($(".answer").css("borderBottomWidth"))) {
    //            $(".answer").closest(".solutionsdiv").height($(".answer").closest(".solutionsdiv").height()+1);
    //};
    //$(".solutionsdiv").css({"height": ($(".answer").height()+'px')});
    
    //comment show rep divs
    $(".commentupvote, .commentdownvote, .commentflag").hide();
    $(".commentupvotedownvotecon").hover(function(target){
        //i could instead z-index 1 it but it didn't look too well
        $(".commentrep").stop().fadeOut();
        $(this).children(/*".commentupvote, .commentdownvote, .commentflag"*/).stop().fadeIn();
    },
                                       
    function(){
        $(this).children(/*".commentupvote, .commentdownvote, .commentflag"*/).stop().fadeOut();
        $(".commentrep").stop().fadeIn();
    });

    //when user clicks on whatithinkiknow
    $("#whatithinkiknow, #questioncommentbox").on("click",function(){
        $("#helpdiv").stop();
        $(".solutioninfodiv").hide();
        $("#answerquestioninstruction").fadeOut();
        $("#questioninfo").fadeIn();
        $("#helpdiv").animate({top: "125px"},{queue: false});
        $("#helpdiv").animate({height: "500px"},{queue: false});
    });
    
    //when user clicks on an answer
    $(".answer").on("click",function(){
    $("#helpdiv").stop();
     $(".solutioninfodiv").hide();
     $("#questioninfo").fadeOut();
     $("#answerquestioninstruction").fadeOut();
        var answerid = $(this).attr("id");
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
        $("#helpdiv").stop();
        $(".solutioninfodiv").hide();
        $("#questioninfo").fadeOut();
        $("#answerquestioninstruction").fadeIn();
        $("#helpdiv").animate({height: "300px"},{queue: false});
        var whereanswerdivis = $("#answerquestiondiv").offset();
        whereanswerdivis = whereanswerdivis.top - 40;
        $("#helpdiv").animate({top: whereanswerdivis }, "slow" );
        
        //var answerval = $("#answerquestionarea").val();
        //$(".answer").append(answerval);
    });
        /*$("#answerquestionarea").keyup(function(e) {
            while($(this).outerHeight() < this.scrollHeight + parseFloat($(this).css("borderTopWidth")) + parseFloat($(this).css("borderBottomWidth"))) {
                $(this).height($(this).height()+1);
                var answerquestiondivheight = $("#answerquestiondiv").height();
                $("#answerquestiondiv").css("height",answerquestiondivheight+1);
            };
            
        });*/
    //when user clicks on create comment
    $(".addcomment").on("click",function(){
        if($(this).closest(".solutionsdiv").children(".commenttoanswerdiv").is(":hidden")){
            $(this).closest(".solutionsdiv").children(".commenttoanswerdiv").slideDown();
            $(this).closest(".solutionsdiv").animate({height: $(this).closest(".solutionsdiv").height() + 33 + "px"}, "slow" );
        }
        else if($(this).closest(".solutionsdiv").children(".commenttoanswerdiv").is(":visible")){
            $(this).closest(".solutionsdiv").children(".commenttoanswerdiv").slideUp();
            $(this).closest(".solutionsdiv").animate({height: $(this).closest(".solutionsdiv").height() - 33 + "px"}, "slow" );
        }
        
        
    });
    
    
});