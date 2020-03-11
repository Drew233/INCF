var mid = "[";
var sta;
  var ans=0;
$.ajax({
  url: "https://codeforces.com/api/contest.list?gym=false",
  dataType: 'json',
   async : false,
  success: function( end ) {
    for(var i=0;i<end.result.length;i++){
              if(end.result[i].phase=="FINISHED") {continue;}
              else{
                   mid+=JSON.stringify(end.result[i])+',';
                   ans=ans+1;
                }
         }
         sta="近期共有"+ans+"场比赛";
  },
  error: function( end ) {
    mid="";
    sta="加载失败，请刷新重试";
  }
});
mid+=']';

function formatSeconds(value) {
    let result = parseInt(value)
    let h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600);
    let m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
    let s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));

    let res = '';res += `${h}:`;res += `${m}`;
    return res;
  }

var jsonArray=eval('(' + mid + ')');
  var headArray = [];

          function parseHead(oneRow) {
                        for ( var i in oneRow) {
                            if(i=="frozen" || i=="phase" || i=="relativeTimeSeconds") continue;
                                headArray[headArray.length] = i;
                         }
            }

              appendTable() ;
            function appendTable() {
                          parseHead(jsonArray[0]);
                          var div = document.getElementById("div1");
                          var table = document.createElement("table");
                          var thead = document.createElement("tr");
                          for ( var count = 0; count < headArray.length; count++) {
                            var td = document.createElement("th");
                            if(count==0){
                              td.innerHTML = "ID";
                            }else if(count==1){
                              td.innerHTML = "Contest Name";
                            }else if(count==2){
                              td.innerHTML = "Type";
                            }else if(count==3){
                              td.innerHTML = "Length";
                            }
                            else{
                            td.innerHTML = "Start";}
                            thead.appendChild(td);
                                    thead.appendChild(td);
                           }
                           table.appendChild(thead);
                          for ( var tableRowNo = 0; tableRowNo < jsonArray.length; tableRowNo++) {
                                    var tr = document.createElement("tr");
                                    for ( var headCount = 0; headCount < headArray.length; headCount++) {
                                            var cell = document.createElement("td");

                                            if(headCount==1){
                                              cell.innerHTML = "<a href=\"https://codeforces.com/contest/"+JSON.stringify(jsonArray[tableRowNo][headArray[0]])+"\"a>"+jsonArray[tableRowNo][headArray[headCount]];
                                            }else if(headCount==3){

                                                  cell.innerHTML=formatSeconds(jsonArray[tableRowNo][headArray[headCount]]);
                                            }
                                            else if(headCount==4){
                                              var time = JSON.parse(JSON.stringify(jsonArray[tableRowNo][headArray[headCount]]));;
                                              var unixTimestamp = new Date(time*1000);
                                              var commonTime = unixTimestamp.toLocaleString();
                                              cell.innerHTML=commonTime;
                                            }
                                            else{
                                            cell.innerHTML = jsonArray[tableRowNo][headArray[headCount]];}
                                            tr.appendChild(cell);
                                    }
                                    table.appendChild(tr);
                         }
                          div.appendChild(table);
        }

        document.getElementById("status").innerHTML=sta+",点击比赛名字前往报名";
