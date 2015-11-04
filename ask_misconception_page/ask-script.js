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
    
    
    //should do the same with view-misonception.js
    var hidehelp = function(){
        $("#whatithinkiknowex").hide();
        $("#showwhatithinkiknowex").hide();
        $("#whatithinkiknowhelp").hide();
        $("#titlehelp").hide();
        $("#taghelp").hide();
        $("#helpdiv").stop();
        $("#whatithinkiknowex").hide();
        $("#whatithinkiknowback").hide();
    };
    
    
    //open animation
    $("#helpdiv").fadeIn(800);
    $("#helpdiv").animate({top: "100px"},{duration: 1000, queue: false});
    
    
    
    $("#askmisconception").on("click",function(){
        hidehelp();
        $("#titlehelp").fadeIn();
        $("#helpdiv").animate({top: "100px"},{queue: false},"fast");
        $("#helpdiv").animate({height: "150px"},{queue: false},"fast");
        $("#helpdiv").css("opacity","1");
    });
    $("#whatyouthinkyouknow").on("click",function(){
        hidehelp();
        $("#whatithinkiknowhelp").fadeIn();
        $("#showwhatithinkiknowex").fadeIn();
        $("#helpdiv").animate({top: "170px"},{queue: false},"fast");
        $("#helpdiv").animate({height: "200px"},{queue: false},"fast");
        $("#helpdiv").css("opacity","1");
    });
    $("#taginput").on("click",function(){
        hidehelp();
        $("#taghelp").fadeIn();
        $("#helpdiv").animate({top: "400px"},{queue: false},"fast");
        $("#helpdiv").animate({height: "150px"},{queue: false},"fast");
        $("#helpdiv").css("opacity","1");
    });
    $("#showwhatithinkiknowex").on("click",function(){
        $("#whatithinkiknowhelp").fadeOut();
        $("#whatithinkiknowex").fadeIn();
        $("#showwhatithinkiknowex").fadeOut();
        $("#whatithinkiknowback").fadeIn();
    });
    $("#whatithinkiknowback").on("click",function(){
        $("#whatithinkiknowhelp").fadeIn();
        $("#showwhatithinkiknowex").fadeIn();
        $("#whatithinkiknowex").fadeOut();
        $("#whatithinkiknowback").fadeOut();
    });
    
    
    
    
    
    
    
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
    var tagarray = Array();
    $("#taginput").on("keypress",function(event) {
        if(tagarray.length < 7){
            if(event.which == 32) {//use the or ||
                //i cna't really seem to get it to fade in
                var taginputval = $(event.target).val();
                tagarray.push(taginputval);
                $("#tags").append('<div class="tagbox"><div class="deletetag"><div class="deletetagp">x</div></div>'+taginputval+'</div>');
                $("#taginput").val('');
            }
            else if(event.which == 13){
                var taginputval = $(event.target).val();
                tagarray.push(taginputval);
                $("#tags").append('<div class="tagbox"><div class="deletetag"><div class="deletetagp">x</div></div>'+taginputval+'</div>');
                //$("#taginput").remove();
                //$("#whatyouthinkyouknow").after('<input id="taginput" type="text" placeholder="add tags">');
                $("#taginput").val('');
            }else if(event.which == 44){
                var taginputval = $(event.target).val();
                tagarray.push(taginputval);
                $("#tags").append('<div class="tagbox"><div class="deletetag"><div class="deletetagp">x</div></div>'+taginputval+'</div>');
                $("#taginput").val('');
            }
        }else{
            alert("sorry you can only have 7 tags");   
        }
    });
    
    $("#htmlpage").on("click",'.tagbox',function(event){
        var deletedkey = $(event.target).closest(".tagbox").text();
        deletedkey = deletedkey.substr(1);
        var index = tagarray.indexOf(deletedkey);
        if (index > -1) {
            tagarray.splice(index, 1);
        }
         $(event.target).closest(".tagbox").remove();
    });
    
    
    
    
    
    
    var iftitleisused = false;
    
    $("#askmisconception").blur(function() {
            var askmisconception = $("#askmisconception").val();
        //alert(decodeURIComponent(askmisconception));
        $.ajax({
            type:'POST',
            url: "/misconception/questions/question-check.php",
            data:{ "misconceptionname": askmisconception },
            success: function(iftitleisgood){
                if(iftitleisgood == "this title already is in use"){
                    alert(iftitleisgood);
                    iftitleisused = true;   
                }else{
                    iftitleisused = false;   
                }
            }
        });
             
    });
    
    
    
         $('#submitmisconception').on("click", function() {
                var askmisconception = $("#askmisconception").val();
                var whatyouthinkyouknow = $("#whatyouthinkyouknow").val();
        if(iftitleisused == false){
            if(!$.trim($("#askmisconception").val())){
                alert("sorry, you can't leave your title blank");
            }else{
                if(!$.trim($("#whatyouthinkyouknow").val())){
                    alert("sorry, you can't leave your description blank");   
                }else{
                    if(whatyouthinkyouknow.indexOf("!n!") > -1){
                        alert("sorry, you can't put instances of !n! in your answer");
                    }else{
                        if(whatyouthinkyouknow.indexOf("!c!") > -1){
                            alert("sorry, you can't put instances of !c! in your answer");
                        }else{
                            if(whatyouthinkyouknow.indexOf("\\-n") > -1){
                                alert("Sorry, you can't put instances of \\-n in your answer");
                            }else{
                                if(tagarray.length==0){
                                    alert("Sorry, you need at least one tag");   
                                }else{
                                    tagarray.toString();
                                    
                                    //var title = filename.substring(0, filename.length - 4);
                                    var urltitle = encodeURIComponent(askmisconception);
                                            var whattodo = "increasequestion!n!" + urltitle;
                                            $.ajax({
                                                type:'POST',
                                                url: "../edit-user.php",
                                                data:{
                                                    "whattodo": whattodo,
                                                    "username": username
                                                }                                
                                            });
                                    
                                    
                                    $.ajax({
                                        type:'POST',
                                        url: "ask-create.php",
                                        data:{ "misconceptionname": askmisconception,
                                                "whatyouthinkyouknow": whatyouthinkyouknow,
                                                "username": username,
                                                "tagarray": tagarray
                                            },
                                        success: function(response){
                                            //alert(response);
                                            location.href = response;
                                        }
                                    });
                                //location.href = '/misconception/home_page/homepage-index.php';
                                }
                            }
                        }
                    }
                }
            }
        }else{
         alert("sorry, this title has already been used and you must change it.");
        }
    });
});