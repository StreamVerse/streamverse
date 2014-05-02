/*====================== Streamer List ==========================*/
var wowList = "alinity,ann_ayo,cdewx,chinglishtv,cihanspielt,davex41,devahi,flubbah,hydramist,katealyst,legendarylea,marmx,mufasaprime,nosleeptv,owelliee,psynaps,rabbitbong,reckful,slootbag,snutzy,sodapoppin,sodez,swifty,swifty,teaselol,vanguardstv,vengeful7,venruki,woundman,xaryulol,yumyumfiona,ziqoftw";
var dota2List = "1437,4cejkee,aliastar,arenagamingtv_dota2,arteezy,bdiz,beyondthesummit,blitzdota,compgamertv,curseentertainment,cyborgmatt,dota2ti,dota2ti,dota2ti,dota2ti_pod_1,dotacinema,dotademon,draskyll,dreadztv,dubastv,funn1k,grandgrant,gspotdota,h4nn1,hall,iceiceice,jeyodude,joindotablue,joindotared,ldaelinl,liquidixmike88,livedotatv,pgg,pmsfurryfish,pod_2,purgegamers,rexitus,sheever,sing_sing,sololineabuse,starladder1,starladder9,tobiwandota,versuta,vjlinkhero,wagamamatv,wickedsique";
var sc2List = "0petraeus0,90stardust,basetradetv,coolagebrothers,demuslim,desrowfighting,dimaga,dragon,dreamhacksc2,eghuk,egjd,empiretvzerg,empiretvzerg,idrajit,incontroltv,liquidhero,liquidtlo,lowkotv,mlgsc2,mori09tv,n33bl3t,nathanias,painuser,protech,redbullesports,sc2,sc2l,colthestc,sc2proleague,sc2tv_ru,spanishiwa,tefel,tesllive,vickypan,wcs_america,esltv,wcs_europe,weedamins";
var lolList = "wickd,aphromoo,ESL_Australia,asiagodtonegg3be0,asusae920016,behkuhtv,bischulol,brunobit1,chaoxlol,chu8,crs_saintvicious,denissnidertv,destiny,digolera,fximba,disstream,edwardlol,fatefalls,flosd,fnaticcyanide,froggen,fximba,guardsmanbob,igamerstv,iijeriichoii,imaqtpie,itshafu,kneecoleslaw,littlebearrr,manalol,mcsesports,meandaenie,meteos,mym_alkapone,ocelote,officialbjergsen,ogamingtv,ongamenet,phantoml0rd,phreakstream,pooksie,qualityplayer,redmercylol,riotgames,riotgameslatino,sirhcez,snoopeh,soazed,soju_l,the rainman,trick2g,painkami,tsm_dyrus,tsm_theoddone,voyboy,wannabe1234,wong1224,x5tv2,yeetz,zynxyz";
var hearthList = "2gd,yellowpete,archonthewizard,athenelive,brotatoe,djwheat,ellohime,etup,hearthstoneclubru,itshafu,kungentv,lokazi,mg_jotto,mmoden,nl_kripp,novawar,rootcatz,ryuzilla,tastelesstv,trumpsc,voguestarcraft,wowhobbs,";
var numOfActiveStreams = 0;
/*========================== Functions ==========================*/
/*Function retrieves json object from the players currently live streaming and displays on playerList.*/
    function getStreamList(streamPlayerList) {
        $(".streams").remove();
        $(".streamlist").append('<img id="loadingGIF" src="loading.gif" >');
        $.getJSON("http://api.justin.tv/api/stream/list.json?channel=" + streamPlayerList + "&jsonp=?", function (data) {
            data.sort(function (a, b) {
                return b.channel_count - a.channel_count;
            }); //sort list of streams by viewers

            $("#loadingGIF").remove();
            for (var i = 0; i < data.length; i++) {
                $("#streamlist").append('<li id="' + data[i].channel.login + '" class="streams"' + '"></li>');
                $('#' + data[i].channel.login).append('<img class="small_img" src="' + data[i].channel.image_url_small + '">');
                $('#' + data[i].channel.login).append('<img class="cap_img" src="' + data[i].channel.screen_cap_url_medium + '">');
                $('#' + data[i].channel.login).append('<div class="topstrip" id="' + data[i].channel.login + '"> ' + '<span class="streamviews">' + data[i].channel_count + '</span>' + ' </div>');
                $('#' + data[i].channel.login).append('<div class="bottomstrip" id="' + data[i].channel.login + '"> ' + '<span class="streamname">' + data[i].channel.login + '</span>' + ' </div>');
                


                
                //Allows appended elements to be draggable
                $('#' + data[i].channel.login).draggable({
                    containment: '#draggablecontainer',
                    opacity: '0.60',
                    revert: true,
                    revertDuration: 0,
                });
            }
        });
    }
    /*=======Refresh stream and chat when stream is clicked=======*/
    //currentID is the streamer's twitch ID
    //height is the height of streamWrapper. Default is 700
    function updateStreamAndChat(currentID, height) {
        if(typeof(height)=='undefined')
            height = 700;   
        $("#streamWrapper").height(height);
        //creates the player
        $("#streamWrapper").append('<div id="streamwindow' + numOfActiveStreams + '"><object class="streamplayer" id="streamPlayer' + numOfActiveStreams + '" type="application/x-shockwave-flash" id="live_embed_player_flash" data="http://www.twitch.tv/widgets/live_embed_player.swf?channel=' + currentID + '" bgcolor="#000000"><param name="allowFullScreen" value="true" /><param name="allowScriptAccess" value="always" /><param name="allowNetworking" value="all" /><param name="movie" value="http://www.twitch.tv/widgets/live_embed_player.swf" /><param name="flashvars" value="hostname=www.twitch.tv&channel=' + currentID + '&auto_play=true&start_volume=25" /></object></div>');
        /*Creates stream description*/
        $("#streamwindow" + numOfActiveStreams).append('<span class="streamID" id="streamID' + numOfActiveStreams + '">' + currentID + '</span>');
        
        FB.XFBML.parse();
        $.getJSON("http://api.justin.tv/api/stream/list.json?channel=" + currentID + "&jsonp=?", 
            function (data) { 
            $("#streamwindow" + numOfActiveStreams).append('<span class="streamtitle">' + data[0].title + '</span>');

        });
        
        $('iframe #chatbox').remove(); //removes previous chatbox
        $("#streamWrapper").append('<iframe id="chatbox" frameborder="0" scrolling="no" id="chatbox" src="http://twitch.tv/chat/embed?channel=' + currentID + '&amp;popout_chat=true"></iframe>');
        document.getElementById('chatbox').src = document.getElementById('chatbox').src; //refreshes the chatbox
    }
    /*========================== Functions End =========================*/

  
        