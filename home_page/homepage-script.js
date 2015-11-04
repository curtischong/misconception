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
    $("#accountsettings").on("click",function(){
       window.location.href = "/misconception/account_settings_page/accountsettings-index.php?user="+username;
    });
    
    
    
    
    
    /*var encodeURIComponent = function(variable){
        variable = variable.replace(/\%/g, "(p)");
        variable = variable.replace(/\?/g, "(q)");
        variable = variable.replace(/\#/g, "(h)");
        variable = variable.replace(/\//g, "(f)");
        variable = variable.replace(/\\/g, "(b)");
        variable = variable.replace(/\^/g, "(u)");
        variable = variable.replace(/\/g, "(a)");
        variable = variable.replace(/ /g, "!-");
        variable = variable.replace(/\&/g, "(an)");
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
        return variable;
    };*/
    
    
    
    
    
    
    
    
    
    
    
    /*$('#submitmisconception').on("click", function() {
        var askmisconception = $("#askmisconception").val();
    $.ajax({
        type:'POST',
        url: "homepage-create.php",
        data:{ misconceptionname: askmisconception },           
    });
      closepopupbox();  
    }); */
    
    //$("#htmlpage").on("click",'.querylink',function(){
        
        
   // });
    var searchquery = window.location.search.substring(7);
    //decodeURIComponent
    /*if(searchquery == ""){
        $("#holdsearchresults").html('<div id="holdsearchresults"><div class="searchresult"><div style="position: absolute; top: 20px; left: 150px;color: white;">type into the box to learn misconceptions ^ </div></div>');
    }*/
    
    searchquery = decodeURIComponent(searchquery);
    $("#searchmisconception").val(searchquery);
    $.ajax({
                type:'POST',
                url: "search.php",
                data:{ searchquery: searchquery },
                success: function(queryarray){
                    //alert(queryarray);
                    var queryarrayparsed = JSON.parse(queryarray);
                    $("#holdsearchresults").html("");
                    
                    var alreadysearchedarray=".";
                    
                    
                    for(var currentquery = 0; currentquery < queryarrayparsed.length; currentquery++){
                        var individualparts = queryarrayparsed[currentquery].split("~!~");
                        if(alreadysearchedarray.indexOf("~"+individualparts[4]+"~") == -1){
                            
                            alreadysearchedarray = alreadysearchedarray+ "~"+individualparts[4]+"~";
                            
                        individualtags = individualparts[2].split(",");
                        var taghtml = "<replacemefortag></replacemefortag>";
                            for(var tagnumber = 0;tagnumber < individualtags.length; tagnumber++){
                                taghtml = taghtml.replace("<replacemefortag></replacemefortag>","<div class='tag' title="+individualtags[tagnumber]+">"+individualtags[tagnumber]+"</div><replacemefortag></replacemefortag>");
                            }

                            //encodeURIComponent
                            var linkform = individualparts[4];
                            linkform = encodeURIComponent(linkform);
                            /*function encodeURIComponent($misconceptiontitle){
        $misconceptiontitle = str_replace("%","(p)",$misconceptiontitle);
        $misconceptiontitle = str_replace('?','(q)',$misconceptiontitle);
        $misconceptiontitle = str_replace('#','(h)',$misconceptiontitle);
        $misconceptiontitle = str_replace('/','(f)',$misconceptiontitle);
        $misconceptiontitle = str_replace('\\','(b)',$misconceptiontitle);
        $misconceptiontitle = str_replace('^','(u)',$misconceptiontitle);
        $misconceptiontitle = str_replace('*','(a)',$misconceptiontitle);
        $misconceptiontitle = str_replace(' ','!-',$misconceptiontitle);
        return $misconceptiontitle;
    };*/




                            $("#holdsearchresults").append('<div class="searchresult"><div class="maininfo"><div class="misconceptiontitle"><a class="querylink" href="/misconception/questions/'+linkform+'.php">'+individualparts[4]+'</a></div><p class="querycontent">'+individualparts[5]+'</p></div><div class="specificinfo"><div class="tagbox">'+taghtml+'</div><div class="numbers"><div class="questionreputation">'+individualparts[3]+'</div><div class="questionreputationp" title="the reputation of the question">Rep</div><div class="totalrepofanswers">'+individualparts[0]+'</div><div class="totalrepofanswersp" title="all of the reputation of the answers combined">Rep of Ans</div><div class="numberofviews">'+individualparts[1]+'</div><div class="numberofviewsp" title="number of accounts that have visited the page">Views</div></div></div></div>');                         
                        }
                    }
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    /*for(var currentquery = 0; currentquery< queryarrayparsed.length; currentquery++){
                        var individualparts = queryarrayparsed[currentquery].split("~!~");
                        orderedarray.push(individualparts[0]);
                    }
                    orderedarray.sort(function (a, b) {
                        return b-a;
                    });
                    for(var querynumber = 0; querynumber < queryarrayparsed.length; querynumber++){
                        var currentquery = orderedarray[querynumber];
                        for(var unorderedquery = 0; unorderedquery < queryarrayparsed.length;unorderedquery++){
                            var individualparts = queryarrayparsed[unorderedquery].split("~!~");
                            if(individualparts[0] == currentquery){
                                //alert(currentquery);
                                //individualparts[1]
                                //alert(individualparts[1]);
                                alert(individualparts[1]);
                                $.ajax({
                                    type:'POST',
                                    url: "return-question-info.php",
                                    data:{ "misconceptionname": individualparts[1] },
                                    success: function(infoarray){
                                        var retrieveddata = infoarray.split("~!~");
                                        alert(retrieveddata);
                                        var individualtags = retrieveddata[2].split(",");
                                        
                                        //for loop for tags
                                        var taghtml = "<replacemefortag></replacemefortag>"
                                        for(var tagnumber = 0;tagnumber < individualtags.length; tagnumber++){
                                            taghtml = taghtml.replace("<replacemefortag></replacemefortag>","<div class='tag' title="+individualtags[tagnumber]+">"+individualtags[tagnumber]+"</div><replacemefortag></replacemefortag>");
                                        }
                                        
                                        $("#holdsearchresults").append('<div class="searchresult"><div class="maininfo"><div class="misconceptiontitle">'+retrieveddata[4]+'</div></div><div class="specificinfo"><div class="tagbox">'+taghtml+'</div><div class="numbers"><div class="questionreputation">'+retrieveddata[3]+'</div><div class="questionreputationp" title="the reputation of the question">Rep</div><div class="totalrepofanswers">'+retrieveddata[0]+'</div><div class="totalrepofanswersp" title="all of the reputation of the answers combined">Rep of Ans</div><div class="numberofviews">'+retrieveddata[1]+'</div><div class="numberofviewsp" title="number of accounts that have visited the page">Views</div></div></div></div>');
                                        
                                        
                                    }
                                });

                            }
                        }
                    }
                    //loop through the first individual part and append it to a new array called ordered array
                    //this array will be ordered numerically highest to lowest
                    //have abig for loop encasing a smaller for loop 
                    //the big loop will look at the query number
                    //the smaller loop will check each first segment to see if it matches the value of the ordered array
                    //the resulting array key is sent to be appended
                    //the big loop jumps to the next search query in the ordered array
                    */
                    
                }
            });
    
    
    
    
    
    
    
    
    $("#searchmisconception").keypress(function(event) {
        var searchquery = $("#searchmisconception").val();
        //encodeURIComponent searchquery
        searchquery = encodeURIComponent(searchquery);
        if(event.which == 13){
            window.location.href = "../home_page/homepage-index.php?query="+searchquery;
            
        }

    });
    
    
    
    
    
});