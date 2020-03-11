$(document).ready(function (){
    $("#btn382").click(function(){
      var x=  document.getElementById("input");
          var curl="https://codeforces.com/api/user.rating?handle="+x.value;
          var info = "https://codeforces.com/api/user.info?handles="+x.value;
          var reset = "<a href=\"\"><button id=\"btn382\" type=\"button\" class=\"btn-3d green\" >重新输入ID</button></a></div>"

          var aurl="";
          var detai="";
          jQuery.support.cors = true;
          var mid = "[";
           $.ajax({
             url: curl,
             dataType: 'json',
              async : false,
             success: function( end ) {
               for(var i=0;i<end.result.length;i++){
                         mid+=JSON.stringify(end.result[i])+',';
                    }
             },
             error: function( end ) {
               mid="";
             }
           });
           $.ajax({
             url: info,
             dataType: 'json',
              async : false,
             success: function( end ) {
               var time = JSON.parse(JSON.stringify(end.result[0].registrationTimeSeconds));;
               var unixTimestamp = new Date(time*1000);
               var commonTime = unixTimestamp.toLocaleString();
               var time1 = JSON.parse(JSON.stringify(end.result[0].lastOnlineTimeSeconds));;
               var unixTimestamp1 = new Date(time1*1000);
               var commonTime1 = unixTimestamp1.toLocaleString();
               aurl+=JSON.parse(JSON.stringify(end.result[0].titlePhoto));
               if(end.result[0].lastName){
                 detai+="<li> Lastname: "+JSON.parse(JSON.stringify(end.result[0].lastName))+"</li>";
               }else{
                 detai+="<li> Lastname: "+"unknown"+"</li>";
               }
               if(end.result[0].firstName){
                detai+="<li> Firstname: "+JSON.parse(JSON.stringify(end.result[0].firstName))+"</li>";
              }else{
                detai+="<li> Firstname: "+"unknown"+"</li>";
              }
               if(end.result[0].rating){
                detai+="<li> Rating: "+JSON.parse(JSON.stringify(end.result[0].rating))+"</li>"
              }else{
                detai+="<li> Rating: "+"1500"+"</li>";
              }
               if(end.result[0].rank){
                detai+="<li> Rank: "+JSON.parse(JSON.stringify(end.result[0].rank))+"</li>"
              }else{
                detai+="<li> Rank: "+"unknown"+"</li>";
              }

                 detai+="<li> RegistrationTime: "+commonTime+"</li>"+"<li> LastOnlineTime: "+commonTime1+"</li>";

          },
             error: function( end ) {
               aurl="error";
             }
           });
           var img;
           var link="https://codeforces.com/profile/"+x.value;
           console.log(aurl);
           if(aurl!="error")  { img = '<a href='+link+'><img src='+ "\"https:" +aurl+"\"" +  ' style="width:120px; height:120px; border-radius:50%; overflow:hidden;" />';
           console.log(detai);
            document.getElementById("profile").innerHTML=img;
            document.getElementById("detai").innerHTML=detai;

          }
            else {
              document.getElementById("profile").innerHTML=" ";
            }
           mid+=']';
           if(mid=="]") document.getElementById("Tit").innerHTML="ID不合法,请重新输入ID";
           else {document.getElementById("Tit").innerHTML=x.value+"的个人信息";
           document.getElementById("Rank").innerHTML=reset;
         }
           var jsonArray=eval('(' + mid + ')');
          var headArray = [];
          function parseHead(oneRow) {
                        for ( var i in oneRow) {
                                if(i=="ratingUpdateTimeSeconds" || i=="handle") continue;
                                headArray[headArray.length] = i;
                         }
                         headArray[headArray.length]="Rating Changes";
            }
            if(mid!="[]"){

              appendTable();

            }
            else {
              jsonArray=eval('( [{"contestId":"该用户尚未参加过比赛","contestName":"该用户尚未参加过比赛","rank":"null","oldRating":"null","newRating":"null"}])');
              appendTable();
            }
            function appendTable() {
                          parseHead(jsonArray[0]);
                          var div = document.getElementById("main");
                          var table = document.createElement("table");
                          var thead = document.createElement("tr");
                          for ( var count = 0; count < headArray.length; count++) {
                                    var td = document.createElement("th");
                                    td.innerHTML = headArray[count];
                                    thead.appendChild(td);
                           }
                           table.appendChild(thead);
                          for ( var tableRowNo = jsonArray.length-1; tableRowNo >=0; tableRowNo--) {
                                    var tr = document.createElement("tr");

                                    for ( var headCount = 0; headCount < headArray.length; headCount++) {
                                            var cell = document.createElement("td");
                                            if(headCount==headArray.length-1){
                                                var change=jsonArray[tableRowNo][headArray[4]]-jsonArray[tableRowNo][headArray[3]];
                                                if(change>=0)
                                                cell.innerHTML = "+"+change;
                                                else {
                                                    cell.innerHTML = change;
                                                }
                                            }
                                            else
                                            {
                                              cell.innerHTML = jsonArray[tableRowNo][headArray[headCount]];}
                                            tr.appendChild(cell);
                                    }
                                    table.appendChild(tr);
                         }
                          div.appendChild(table);
        }
        document.getElementById("div381").innerHTML="";
      });
  });
