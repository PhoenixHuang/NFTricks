    $(document).ready(function(){       
        $("pre").wrap("<div id='right' class='odin' style='float:right;width:90%;font-size:1em'><div style='overflow:auto'></div></div>");
        $("<div id='left'  class='odin' style='float:left;position:fixed;width:10%;background-color:#464547'><a href='index.html' style='color:white'>Index</a><div style='height:"+$(window).height()+"px;overflow:auto'><ul id='index' style='padding:0px'></ul></div></div>").insertBefore($("#right"));  
        $(".odin").wrapAll("<div id='content'></div>") ;
        $("body").css("font-family","Consolas");
        $("pre").css("font-family","Consolas");
        
        var a=$("span").filter(function(index) {
            return $(this).text() == "*QUESTION";
            });            
        a.each(function(){
            var b=$(this).next();            
            b.attr("id",b.text());
            var c=b;
            var d="";
            for(var i=0;i<10;i++){
                if(c.text()=="*VAR"){
                   d=c.next().text();
                   break;
                }
                c=c.next();
                }
            $("<li style='list-style: none;'><a href='#"+b.text()+"' style='color:white'>Q"+b.text()+"_"+d+"</a></li>").appendTo($("#index"));
            })        
            
         $(".LineNr").each(function(){
            $(this).removeAttr("id");
            })            
        
        })
        
        
       