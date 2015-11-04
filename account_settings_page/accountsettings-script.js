var toggleshowprofile = false;
$(document).ready(function(){
    //navbar js
    $("#navprofile").on("click",function(){
        if(toggleshowprofile==true){
            $("#profilesettingcon").animate({left: "+=200px"});
            toggleshowprofile=false;
        }
        else{
            $("#profilesettingcon").animate({left: "-=200px"});
            toggleshowprofile = true;
        }
    });
    
    
    $("#createpopupbox").hide();
    /*$("#create").on("click",function(){
        $("#htmlpage").fadeTo(500,0.5);
        $("#navbar").fadeTo(500,0.5);
        $("#navbarinfo").fadeTo(500,0.5);
        $("#htmlpage").css("top","-208px");
        $("#navbarinfo").css("top","-208px")
        $("#createpopupbox").fadeIn();
        $("#htmlpage").css("z-index","-1");
        $("#navbar").css("z-index","-1");
        $("#navbarinfo").css("z-index","-1");
        //$('html, body').animate({ scrollTop: 0 }, 'fast');
    });
    $("#closecreate").on("click",function(){
        $("#htmlpage").fadeTo(500,1);
        $("#navbar").fadeTo(500,1);
        $("#navbarinfo").fadeTo(500,1);
        $("#createpopupbox").fadeOut(function(){
            $("#htmlpage").css("top","-8px");
            $("#navbarinfo").css("top","-8px");
            $("#htmlpage").css("z-index","0");
            $("#navbar").css("z-index","1");
            $("#navbarinfo").css("z-index","1");
        });
    });*/
    //end of navbar js
    //open animation
    
            //animation for the info bars
    $("#yourquestionsp").animate({left: "20px"}, { duration: 500, queue: false });
    $("#yourquestionsp").fadeIn(300);
    $("#yourquestions").animate({top: "0px"}, { duration: 500, queue: false });
    $("#yourquestions").fadeIn(300,function(){
        $("#yourbookmarksp").animate({left: "20px"}, { duration: 300, queue: false });
        $("#yourbookmarksp").fadeIn(300);
        $("#yourbookmarks").animate({top: "175px"}, { duration: 300, queue: false });
        $("#yourbookmarks").fadeIn(300,function(){
            $("#youranswersp").animate({left: "20px"}, { duration: 300, queue: false });
            $("#youranswersp").fadeIn(300);
            $("#youranswers").animate({top: "350px"}, { duration: 300, queue: false });
            $("#youranswers").fadeIn(300);
        });
    });
    


    
    
    
    $("#profile").hide();
    $("#personalinfo").hide();
    $("#yourstats").hide();
    $("#featuredlessonsandcourses").hide();
    $("#profile").fadeIn(600);
    $("#personalinfo").fadeIn(1300);
    $("#featuredlessonsandcourses").fadeIn(1000);
    $("#yourstats").fadeIn(1000);
    $("#yourstats").animate({top: "90px"}, { duration: 1000, queue: false });
    $('#youruploads').hide();
    $("#youractivity").hide();
    $("#addachapter").hide();
    //end of open animation
    //edit personal info
    $(".write").hide();
    var hideeditbuttons = function(){
        $("#cancelchangeinfo").hide();
        $("#savechanges").hide();
    };
    hideeditbuttons();
    var resetchangeinfo = function(){
        $(".write").hide();
        $('.edit').show();
    };
    var resetchangecomple = function(){
        resetchangeinfo();
        hideeditbuttons();
    };
    //outline: none;
    var ele;
    $('.edit').on("click",function(event){
        resetchangeinfo();
        ele = event.target;
        $(ele).hide();
        $(ele).siblings(".write").show();
        $("#cancelchangeinfo").show();
        $("#savechanges").show();
        $(ele).siblings(".personaldata").hide();
        var replacepertext = $(ele).siblings(".personaldata");
        if($(ele).siblings(".write").val()==0){
        $(ele).siblings(".write").val(replacepertext.html());
        }
    });
    
    $("#savechanges").on("click",function(){
        $(ele).siblings(".personaldata").remove();
		var perdata = $(ele).siblings(".write").val();
        $(ele).after('<div class="personaldata">'+perdata+'</div>');
    $('#yourinterests, #aboutyou').val("");
        resetchangecomple();
        $(".personaldata").show();
    });
    $("#cancelchangeinfo").on("click",function(){
            resetchangecomple();
        $(".personaldata").show();
        $('#yourinterests, #aboutyou').val("");
    });
    //end of personal info js
    
    /*$(document).mouseup(function(e){
        var container = $(".write, #personalinfo, .unchangeinfo");
        if (!container.is(e.target)){
            $(".write").hide();
            $(".edit").show();
        }
    });*/
    
    //javascript:document.body.contentEditable='true';
    
    
    function getQueryVariable(variable){
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
    }
    var user = getQueryVariable("user");
    $("#name").html(user);
    
    
    $.ajax({
            type:'POST',
            url: "../return-user-info.php",
            data:{
                "user": user
            },
            success: function(response){
                var userinfo = response.split("~");
                $("#reputation").html(userinfo[0]+" reputation")
                $("#rank").html(userinfo[1]);
            }
        });
    
                var pluralchecker = function(number){
                    number = parseInt(number);
                 if(number == 1){
                    return "";   
                 }else{
                    return "s";   
                 }
                };
    
    
    $.ajax({
            type:'POST',
            url: "retrieve-user-stat.php",
            data:{
                "user": user
            },
            success: function(userstats){
                
                
                
                // if i want to retrieve something like the titles of the questions, I can ust replace all insnatances of ~~ and \n using php
                
                var statarray = JSON.parse(userstats);
                $("#membersince").html(statarray[2]);
                $("#upvotesyoumade").html(statarray[3] + " upvote" + pluralchecker(statarray[3]));
                var individualbookmarks = statarray[4].split("!n!");
                $("#bookmarksyoumade").html(individualbookmarks[0] + " page" +pluralchecker(individualbookmarks[0]));
                //$("#answersyoumade").html()
                $("#commentsyoumade").html(statarray[7] + "comment" + pluralchecker(statarray[7]));
                var individualanswers = statarray[5].split("!n!");
                $("#answersyoumade").html(individualanswers[0] + " question" + pluralchecker(individualanswers[0]));
                var individualquestions = statarray[6].split("!n!");
                $("#questionsyoumade").html(individualquestions[0] + " question" + pluralchecker(individualquestions[0]));
                $("#upvotesyoumade").html(statarray[3] + "upvote" + pluralchecker(statarray[3]));
                
                var questions = individualanswers[1]+"0!n!0"+individualbookmarks[1]+"!n!0"+individualquestions[1];
                alert(questions);
                var questionstart = 1;
                var bookmarkstart = 1;
                var answerstart = 1;
                
                var retrievedquestions;
                
                
                $.ajax({
                    type:'POST',
                    url: "retrieve-question-info.php",
                    data:{
                        "questions": questions
                    },
                    success: function(response){
                        var individualparts = response.split("!x!");
                        
                        var wheretoappend = function(place,number,whichsetoffour){
                        var currentarray = individualparts[number].split("!n!");
                           for(var currentquestion = whichsetoffour; currentquestion < whichsetoffour+4;currentquestion++){
                               
                            if(typeof currentarray[currentquestion] == "undefined") {
                            }else{
                               
                               var individualquestion = currentarray[currentquestion].split("!q!");
                               var title = individualquestion[0];
                               var tags = individualquestion[1];
                               //alert(tags);
                               var individualtags = tags.split(",");

                               var questionrep = individualquestion[2];
                               var repofanswers = individualquestion[3];
                               var views = individualquestion[4];
                               
                               var tagsforquestion = "";
                               
                               for(var currenttag = 0; currenttag < individualtags.length; currenttag++){
                                   tagsforquestion = tagsforquestion + '<div class="tag">'+individualtags[currenttag]+'</div>';
                               }
                               
                               
                               
                               place.append('<div class="questionrepresentation"><p class="detailedtitle" title="'+title+'">'+title+'</p><div class="detailedtagcon">'+tagsforquestion+'<div class="tagconbottom"></div></div><div class="detailednumbers"><div class="detailedquestionreputation">'+questionrep+'</div><div class="detailedquestionreputationp">Rep</div><div class="detailedtotalrepofanswers">'+repofanswers+'</div><div class="detailedtotalrepofanswersp">Ans Rep</div><div class="detailednumberofviews">'+views+'</div><div class="detailednumberofviewsp">Views</div></div></div>');
                            }
                               
                           }
                        };
                        
                        wheretoappend($("#yourquestions"),2,questionstart);
                        wheretoappend($("#yourbookmarks"),1,bookmarkstart);
                        wheretoappend($("#youranswers"),0,answerstart);
                        $(".questionrepresentation").fadeIn();
                        
                        retrievedquestions = individualparts;
                        //alert(response);
                    }
                });
                
                var wheretoappende = function(place,number,whichsetoffour){
                    var currentarray = retrievedquestions[number].split("!n!");
                    if(whichsetoffour <= currentarray.length ){
                    place.html("");
                        //alert(retrievedquestions);
                        //alert(currentarray);
                           for(var currentquestion = whichsetoffour; currentquestion < whichsetoffour+4;currentquestion++){
                               //alert(currentarray[currentquestion]);
                            if(typeof currentarray[currentquestion] == "undefined") {
                            }else{
                               var individualquestion = currentarray[currentquestion].split("!q!");
                               var title = individualquestion[0];
                               var tags = individualquestion[1];
                               //alert(tags);
                               var individualtags = tags.split(",");

                               var questionrep = individualquestion[2];
                               var repofanswers = individualquestion[3];
                               var views = individualquestion[4];
                               
                               var tagsforquestion = "";
                               
                               for(var currenttag = 0; currenttag < individualtags.length; currenttag++){
                                   tagsforquestion = tagsforquestion + '<div class="tag">'+individualtags[currenttag]+'</div>';
                               }
                               //alert(tagsforquestion);
                               //place.css("background-color", "yellow");
                               //place.append("hi")
                                //everything works except for the append
                               place.append('<div class="questionrepresentation"><p class="detailedtitle" title="'+title+'">'+title+'</p><div class="detailedtagcon">'+tagsforquestion+'<div class="tagconbottom"></div></div><div class="detailednumbers"><div class="detailedquestionreputation">'+questionrep+'</div><div class="detailedquestionreputationp">Rep</div><div class="detailedtotalrepofanswers">'+repofanswers+'</div><div class="detailedtotalrepofanswersp">Ans Rep</div><div class="detailednumberofviews">'+views+'</div><div class="detailednumberofviewsp">Views</div></div></div>');
                            }
                               
                           }
                    $(".questionrepresentation").show();
                    }
                        };
                
                
                
                
                    $(document).on({
    mouseenter: function () {
        //$(".commentrep").stop().fadeOut();
        $(this).children(".rightquestion").stop().fadeIn("fast");
        $(this).children(".leftquestion").stop().fadeIn("fast");
    },
    mouseleave: function () {
        $(this).children(".rightquestion").stop().fadeOut("fast");
        $(this).children(".leftquestion").stop().fadeOut("fast");
    }
}, "#yourquestions");
$(document).on({
    mouseenter: function () {
        //$(".commentrep").stop().fadeOut();
        $(this).children(".rightquestion").stop().fadeIn("fast");
        $(this).children(".leftquestion").stop().fadeIn("fast");
    },
    mouseleave: function () {
        $(this).children(".rightquestion").stop().fadeOut("fast");
        $(this).children(".leftquestion").stop().fadeOut("fast");
    }
}, "#yourbookmarks");
$(document).on({
    mouseenter: function () {
        //$(".commentrep").stop().fadeOut();
        $(this).children(".rightquestion").stop().fadeIn("fast");
        $(this).children(".leftquestion").stop().fadeIn("fast");
    },
    mouseleave: function () {
        $(this).children(".rightquestion").stop().fadeOut("fast");
        $(this).children(".leftquestion").stop().fadeOut("fast");
    }
}, "#youranswers");
                
                
                
                
                $("#htmlpage").on("click",'#yourquestionsright',function(){
                       var currentarrays = retrievedquestions[2].split("!n!");
                    if(questionstart+4 <= currentarrays.length){
                        questionstart = questionstart+4;
                    wheretoappende($('#yourquestions'),2,questionstart);
                    $("#yourquestions").append('<hr class="hratbottom"><div id="yourquestionsright" class="rightquestion"></div><div id="yourquestionsleft" class="leftquestion"></div>');                      }
                    
                });
                $("#htmlpage").on("click",'#yourquestionsleft',function(){
                    if(questionstart-4 >=1){
                        questionstart = questionstart-4;
                        //alert(questionstart);
                        wheretoappende($('#yourquestions'),2,questionstart);
                        $("#yourquestions").append('<hr class="hratbottom"><div id="yourquestionsright" class="rightquestion"></div><div id="yourquestionsleft" class="leftquestion"></div>');                      
                    }
                });
                
                $("#htmlpage").on("click",'#yourbookmarksright',function(){
                       var currentarrays = retrievedquestions[1].split("!n!");
                    if(bookmarkstart+4 <= currentarrays.length){
                        bookmarkstart = bookmarkstart+4;
                    wheretoappende($('#yourbookmarks'),1,bookmarkstart);
                    $("#yourbookmarks").append('<hr class="hratbottom"><div id="yourbookmarksright" class="rightquestion"></div><div id="yourbookmarksleft" class="leftquestion"></div>');                      }
                    
                });
                $("#htmlpage").on("click",'#yourbookmarksleft',function(){
                    if(bookmarkstart-4 >=1){
                        bookmarkstart = bookmarkstart-4;
                        wheretoappende($('#yourbookmarks'),1,bookmarkstart);
                        $("#yourbookmarks").append('<hr class="hratbottom"><div id="yourbookmarksright" class="rightquestion"></div><div id="yourbookmarksleft" class="leftquestion"></div>');                      
                    }
                });
                
                $("#htmlpage").on("click",'#youranswersright',function(){
                       var currentarrays = retrievedquestions[0].split("!n!");
                    if(answerstart+4 <= currentarrays.length){
                        answerstart = answerstart+4;
                    wheretoappende($('#youranswers'),0,answerstart);
                    $("#youranswers").append('<hr class="hratbottom"><div id="youranswersright" class="rightquestion"></div><div id="youranswersleft" class="leftquestion"></div>');                      }
                    
                });
                $("#htmlpage").on("click",'#youranswersleft',function(){
                    if(answerstart-4 >=1){
                        answerstart = answerstart-4;
                        wheretoappende($('#youranswers'),0,answerstart);
                        $("#youranswers").append('<hr class="hratbottom"><div id="youranswersright" class="rightquestion"></div><div id="youranswersleft" class="leftquestion"></div>');                      
                    }
                });
                
                
                
                
                //use a function (where to append) so there's only one for loop and the loops point todiffferent boxes each time
                /*for(var currentquestion){
                    
                }
                for(var curentbookmark; currentbookmark < .length){
                    
                }
                for(var currentanswer){
                    
                }*/
                
                
                
            }
        });
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
});