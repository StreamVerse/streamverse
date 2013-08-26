
      	 /*====================== Streamer List ==========================*/
    	 var wowList = "Slootbag,rabbitbong,DevaHI,Flubbah,Vengeful7,chinglishtv,ann_ayo,CihanSpielt,Swifty,Reckful,Woundman,xaryulol,VanguardsTV,Swifty,mufasaprime,Teaselol,Davex41,YumYumFiona,Psynaps,Katealyst,Alinity,Hydramist,owelliee,cdewx,snutzy";
         var dota2List = "Sheever,VeRsuta,GspotDOTA,4cejkee,joinDOTABlue,dota2ti_hall,dota2ti_pod_2,dota2ti_pod_1,liquidixmike88,curseentertainment,BeyondTheSummit,starladder1,SoloLineAbuse,Bdiz,DotaCinema,TobiWanDOTA,ArenaGamingTv_Dota2,blitzdota,cyborgmatt,dota2ti,joinDOTARed,wagamamatv,rexitus,Funn1k,purgegamers,DotADeMoN,VJLinkHero,jeyodude,dubasTV,aliastar,CompgamerTV,Draskyll,Sing_sing,Arteezy,lDaelinl";
         var sc2List = "iNcontroLTV,LiquidTLO,90Stardust,EmpireTvZERG,LowkoTV,N33bl3t,Tefel,vickypan,wcs_america,esltv_sc2,Nathanias,TeSLLive,Sc2tv_ru,Painuser,dreamhacksc2,idrajit,demuslim,eghuk,redbullesports,EmpireTvZERG,desRowfighting,ProTech,Spanishiwa,MLGSC2";
         var lolList = "Aphromoo,GuardsmanBob,OGamingTV,Pooksie,fximba,RedmercyLoL,asusae920016,Digolera,fximba,brunobit1,tsm_dyrus,behkuhtv,trick2g,painkami,chaoxlol,voyboy,ocelote,riotgames,destiny,PhantomL0rd,asiagodtonegg3be0,Meteos,Crs_saintvicious,iGamersTV,yeeTz,itsHafu,MYM_ALKAPONE,DisStream,Snoopeh,imaqtpie,TSM_TheOddOne,Littlebearrr,flosd,EdwardLoL,Meandaenie,MYM_ALKAPONE,DisStream,Bischulol,x5tv2,MCSeSports,iijeriichoii,KneeColeslaw,denissniderTV,soju_l,ongamenet";
         var featureList = "dota2ti_hall,dota2ti_pod_2,dota2ti_pod_1,liquidixmike88,curseentertainment,BeyondTheSummit,starladder1,SoloLineAbuse,Bdiz,DotaCinema,TobiWanDOTA,ArenaGamingTv_Dota2,blitzdota,cyborgmatt,dota2ti,joinDOTARed,wagamamatv,rexitus,Funn1k,purgegamers,DotADeMoN,VJLinkHero,jeyodude,dubasTV,aliastar,CompgamerTV,Draskyll,Sing_sing,Arteezy,lDaelinl,tsm_dyrus,behkuhtv,trick2g,painkami,chaoxlol,voyboy,ocelote,riotgames,destiny,PhantomL0rd,asiagodtonegg3be0,Meteos,Crs_saintvicious,iGamersTV,yeeTz,itsHafu,MYM_ALKAPONE,DisStream,Snoopeh,imaqtpie,TSM_TheOddOne,Littlebearrr,flosd,EdwardLoL,Meandaenie,MYM_ALKAPONE,DisStream,Bischulol,x5tv2,MCSeSports,iijeriichoii,KneeColeslaw,denissniderTV,soju_l,ongamenet"
         /*========================== Functions ==========================*/
         /*Function retrieves json object from the players currently live streaming and displays on playerList.*/
         function getStreamList(streamPlayerList){         	
           	$(".streamer_name").remove();
            $(".streamList").append('<img id="loadingGIF" src="loading.gif" >');
         	$.getJSON("http://api.justin.tv/api/stream/list.json?channel=" + streamPlayerList + "&jsonp=?", function(data){
         	data.sort(function(a,b){return b.channel_count-a.channel_count;}); //sort list of streams by viewers
            
            $("#loadingGIF").remove();
         	for(var i=0;i<data.length;i++){
         	$(".streamList").append('<li id="' + data[i].channel.login + '"" class="streamer_name"> <img id="small_img" src="' + data[i].channel.image_url_small + '">' + data[i].channel.login + '<br/>' + data[i].channel_count + '</li>');
         		}

         	});
         }
        
         /*========================== Functions End =========================*/
         
         
         $(document).ready(function(){
         	/*=========== Setup the front page ============*/
         	getStreamList(lolList);     	
         	$.getJSON("http://api.justin.tv/api/stream/list.json?channel=" + lolList + "&jsonp=?", function(data){
         		var random = Math.floor((Math.random()*(data.length - 1))+0);
			  	var	currentViewCount = data[random].channel.views_count;
			  	var currentGame = data[random].channel.meta_game;
			  	var currentID = data[random].channel.login;
		  			  				  	
			  	//creates the player
			  	$("#streamWrapper").append('<object id="streamPlayer" type="application/x-shockwave-flash" height="378" width="680" id="live_embed_player_flash" data="http://www.twitch.tv/widgets/live_embed_player.swf?channel=' + currentID + '" bgcolor="#000000"><param name="allowFullScreen" value="true" /><param name="allowScriptAccess" value="always" /><param name="allowNetworking" value="all" /><param name="movie" value="http://www.twitch.tv/widgets/live_embed_player.swf" /><param name="flashvars" value="hostname=www.twitch.tv&channel=' + currentID + '&auto_play=true&start_volume=25" /></object>');			  	
			  	//creates title and other text description
			  	$("#streamWrapper").append('<a class="streamerText" style="font-size:12px; float:left;" href="http://www.twitch.tv/' + currentID + '?utm_campaign=live_embed_click&utm_source=streamverse.tv">View on Twitch.tv</a>' + '<p class="streamerText" style="float:right; font-size:12px;">Total views &nbsp;' + currentViewCount + '</p>' + '<br><br><h1 style="color:#00004c; float:left;" class="streamerText">' + currentID + '</h1><p class="streamerText" style=" float:left; border-bottom:1px solid #A8A8A8; width:679px; font-size:12px;">Playing ' + currentGame + '</p>');	
			  	document.getElementById('streamPlayer').src = document.getElementById('streamPlayer').src; //refreshes the stream player
			  	/*Updates chatbox*/			
				$('iframe').remove();  //removes previous chatbox
				$("#chatboxWrapper").append('<iframe id="chatbox" frameborder="0" scrolling="no" id="chatbox" src="http://twitch.tv/chat/embed?channel=' + currentID + '&amp;popout_chat=true" height="698" width="300"></iframe>');
				document.getElementById('chatbox').src = document.getElementById('chatbox').src; //refreshes the chatbox

                             
			});
         	/*======================= Featured List =======================*/
            $.getJSON("http://api.justin.tv/api/stream/list.json?channel=" + featureList + "&jsonp=?", function(data){               
                for(var i=0;i<data.length;i++){
                    var t = i+1;
                    $(".bl" + t).css('background-image', 'url(' + data[i].channel.screen_cap_url_large + ')');     
                    $("#b" + t).append('<h1 id="' + data[i].channel.login +  '">' + data[i].channel.login + '</h1>'); 
                }
            });
            /*Feature click event*/
            $( ".featureBlock").click(function(evt){
              /*Gets the players name from id of clicked button*/
              var clicked = evt.target;
              var currentID = $(evt.target).next().attr("id") || "No ID!";
              
              if(currentID!="No ID!"){

                $.getJSON("http://api.justin.tv/api/stream/list.json?channel=" + currentID + "&jsonp=?", function(data){
                var currentViewCount = data[0].channel.views_count;
                var currentGame = data[0].channel.meta_game;



                /*=====Updates stream=====*/
                $("#streamWrapper").empty();  //deletes all elements in wrapper                                         
                //creates the player
                $("#streamWrapper").append('<object id="streamPlayer" type="application/x-shockwave-flash" height="378" width="680" id="live_embed_player_flash" data="http://www.twitch.tv/widgets/live_embed_player.swf?channel=' + currentID + '" bgcolor="#000000"><param name="allowFullScreen" value="true" /><param name="allowScriptAccess" value="always" /><param name="allowNetworking" value="all" /><param name="movie" value="http://www.twitch.tv/widgets/live_embed_player.swf" /><param name="flashvars" value="hostname=www.twitch.tv&channel=' + currentID + '&auto_play=true&start_volume=25" /></object>');                
                //creates title and other text description
                $("#streamWrapper").append('<a class="streamerText" style="font-size:12px; float:left;" href="http://www.twitch.tv/' + currentID + '?utm_campaign=live_embed_click&utm_source=streamverse.tv">View on Twitch.tv</a>' + '<p class="streamerText" style="float:right; font-size:12px;">Total views &nbsp;' + currentViewCount + '</p>' + '<br><br><h1 style="color:#00004c; float:left;" class="streamerText">' + currentID + '</h1><p class="streamerText" style=" float:left; border-bottom:1px solid #A8A8A8; width:679px; font-size:12px;">Playing ' + currentGame + '</p>'); 
                document.getElementById('streamPlayer').src = document.getElementById('streamPlayer').src; //refreshes the stream player
                /*Updates chatbox*/         
                $('iframe').remove();  //removes previous chatbox
                $("#chatboxWrapper").append('<iframe id="chatbox" frameborder="0" scrolling="no" id="chatbox" src="http://twitch.tv/chat/embed?channel=' + currentID + '&amp;popout_chat=true" height="698" width="300"></iframe>');
                document.getElementById('chatbox').src = document.getElementById('chatbox').src; //refreshes the chatbox
              
                });
              }
            });
    

         	/*Menu bar click events*/
         	$(".wow").click(function(){
            	getStreamList(wowList);
         	});
            $(".dota2").click(function(){
                getStreamList(dota2List);
         	});
         	$(".sc2").click(function(){
                getStreamList(sc2List);
         	});
         	$(".lol").click(function(){
                getStreamList(lolList);
         	});
         	
         	/*Updates stream & chat of the player that was clicked on*/
         	$( ".streamList").click(function(evt){
         	  /*Gets the players name from id of clicked button*/
         	 
			  var clicked = evt.target;
			  var currentID = clicked.id || "No ID!";
			  if(currentID!="No ID!"){

			  	$.getJSON("http://api.justin.tv/api/stream/list.json?channel=" + currentID + "&jsonp=?", function(data){
			  	var	currentViewCount = data[0].channel.views_count;
			  	var currentGame = data[0].channel.meta_game;



			  	/*=====Updates stream=====*/
			  	$("#streamWrapper").empty();  //deletes all elements in wrapper			  			  				  	
			  	//creates the player
			  	$("#streamWrapper").append('<object id="streamPlayer" type="application/x-shockwave-flash" height="378" width="680" id="live_embed_player_flash" data="http://www.twitch.tv/widgets/live_embed_player.swf?channel=' + currentID + '" bgcolor="#000000"><param name="allowFullScreen" value="true" /><param name="allowScriptAccess" value="always" /><param name="allowNetworking" value="all" /><param name="movie" value="http://www.twitch.tv/widgets/live_embed_player.swf" /><param name="flashvars" value="hostname=www.twitch.tv&channel=' + currentID + '&auto_play=true&start_volume=25" /></object>');			  	
			  	//creates title and other text description
			  	$("#streamWrapper").append('<a class="streamerText" style="font-size:12px; float:left;" href="http://www.twitch.tv/' + currentID + '?utm_campaign=live_embed_click&utm_source=streamverse.tv">View on Twitch.tv</a>' + '<p class="streamerText" style="float:right; font-size:12px;">Total views &nbsp;' + currentViewCount + '</p>' + '<br><br><h1 style="color:#00004c; float:left;" class="streamerText">' + currentID + '</h1><p class="streamerText" style=" float:left; border-bottom:1px solid #A8A8A8; width:679px; font-size:12px;">Playing ' + currentGame + '</p>');	
			  	document.getElementById('streamPlayer').src = document.getElementById('streamPlayer').src; //refreshes the stream player
			  	/*Updates chatbox*/			
				$('iframe').remove();  //removes previous chatbox
				$("#chatboxWrapper").append('<iframe id="chatbox" frameborder="0" scrolling="no" id="chatbox" src="http://twitch.tv/chat/embed?channel=' + currentID + '&amp;popout_chat=true" height="698" width="300"></iframe>');
				document.getElementById('chatbox').src = document.getElementById('chatbox').src; //refreshes the chatbox
			  
			  	});
			  }
			});
         });
                  