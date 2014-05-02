/*================Resize tabs div=================*/
$(function () {
    $('#streamers').resizable({
        handles: 'n',
        containment: '#draggablecontainer',
        minHeight: '200',
        start: function (event, ui) {
            ui.element.css('background-color', '#E0E0E0');
        },
        stop: function (event, ui) {
            ui.element.css('background-color', 'white');
        }
    });
});

/*================Drag and Drop=================*/
$(function () {
    $('#streamlist.li').draggable();
    $("#streamWrapper").droppable({
        hoverClass: 'hoverdrop',
        over: function(event, ui){
        	//Animate the movement of the stream.
        	if(numOfActiveStreams==1){
	        	$('#streamwindow1').animate({
	            			left: "3%",
	            			top: "2%"
	            		});
                $('#streamID1').animate({
                        bottom: "28%",
                        left: "23%"
                      
                    },
                    0);
	        	$('#streamPlayer1').css("height", "400px");
	        	$('#streamPlayer1').css("width", "700px");
	   	 	}
        },
        out: function(event, ui){
        	if(numOfActiveStreams==1){
	        	$('#streamwindow1').animate({
	            			left: "15%",
	            			top: "9%"
	            		});
                $('#streamID1').animate({
                        bottom: "1%",
                        left: "25%"
                      
                    },
                    0);
	        	$('#streamPlayer1').css("height", "550px");
	        	$('#streamPlayer1').css("width", "1250px");
	   	 	}
        },
        drop: function (event, ui) {
            var currentID = ui.draggable.attr("id");
            numOfActiveStreams++;
            /*=====Updates stream=====*/
            // If 2 or less streams are active
            if(numOfActiveStreams <= 2){ 
            	// If second stream is being added, animate stream 1 to top left position.
            	if(numOfActiveStreams==2){
            		$('#streamwindow1').animate({
            			left: "3%",
            			top: "2%"
            		});
                    $('#streamID1').animate({
                        bottom: "28%",
                        left: "23%"
                    });
            	}
                updateStreamAndChat(currentID, 700);

                }
            // If 3 or more streams are active
            else if(numOfActiveStreams >= 3 && numOfActiveStreams < 5){
  				//increase the height of streamWrapper and chatbox
                updateStreamAndChat(currentID, 980);    
        		$('#chatbox').animate({
        			height: "930px"
        		});
            	
            }
          }
    });
});

/*==================Tabs==================*/
$(function () {
    $("#tabs").tabs();
});

/*======Search======*/
$(function () {
    var streamlist = [
        "venruki",
        "starladder4",
        "liquidixmike88",
        "hearthstoneclubru",
        "iceiceice",
        "wcs_europe",
        "Reckful"
    ];
    $("#searchinput").autocomplete({
        source: streamlist,
        select: function(event, ui){
          var currentID = ui.item.value;
          numOfActiveStreams==1;
          updateStreamAndChat(currentID, 700);
        }
    });
});

/*Menu bar click events*/
$(document).ready(function () {
    /*Menu bar click events*/
    $(".wow").click(function () {
        getStreamList(wowList);
    });
    $(".dota2").click(function () {
        getStreamList(dota2List);
    });
    $(".sc2").click(function () {
        getStreamList(sc2List);
    });
    $(".lol").click(function () {
        getStreamList(lolList);
    });
    $(".hearthstone").click(function () {
        getStreamList(hearthList);
    });
    /*Updates stream & chat of the player that was clicked on*/
        $('#streamlist').click(function (evt) {
            /*Gets the players name from id of clicked button*/
            var clicked = evt.target;
            var currentID = clicked.parentNode.id || "No ID!";
            if (currentID != "No ID!") {
                numOfActiveStreams=1;
                $("#streamWrapper").empty();
                updateStreamAndChat(currentID,700);
            }
        });


});

/*======Facebook=====*/
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


