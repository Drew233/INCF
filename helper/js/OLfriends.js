var marr=new Array();
var apiKey="";
var secret="";
var id="";
var pname="";
var fresh="<button onclick=\"fre()\" type=\"button\" class=\"btn-3d green\" >戳我-刷新竞赛情况</button>"
var tfuck="<button onclick=\"fanyi()\" type=\"button\" class=\"btn-3d green\" >戳我-翻译</button>"
var fuck="<form name=\"\" id=\"yuanwen\" action=\"\" class=\"Form\"><textarea id=\"wordtext\" style=\"width:100%;height:500px;\"></textarea></form>"
$(document).ready(function (){
    $("#btn382").click(function(){
      var timestamp=Date.parse(new Date())/1000;
      document.getElementById("div1").innerHTML="";
      document.getElementById("div2").innerHTML="";
      
      apiKey = document.getElementById("apiKey").value;
      secret = document.getElementById("secret").value;
      id = document.getElementById("id").value; 
      pname = document.getElementById("pname").value; 
      // var apiKey="ca913cc70f82314caf387a77efc2b60ff181a1ab";
      // console.log("begin");
      // var secret="3df4f303428c151560e23ee5386bcd699e060009";
      var passp=new Array();
      for(var i=0;i<20;i++) {
        passp[i]=0;
      }
      // var id="1327";
      // var pname="Wu_drew"
      var pnumber=0;
      var params = new Array();
      var mid="";
      var pstatus=new Array();
      for(var i=0;i<20;i++){
        pstatus[i]=new Array();
      }
      params[0]="onlyOnline=false";
      params[1]="apiKey="+apiKey;
      params[2]="time="+timestamp;
      host="https://codeforces.com/api";
      var contesturl="https://codeforces.com/api/contest.standings?contestId="+id;
      methods="/user.friends?";
      params.sort();
      let chars = '0123456789';
      let maxPos = chars.length;
      let digit = '';
      for (let i = 0; i < 6; i++) {
          digit += chars.charAt(Math.floor(Math.random() * maxPos));
      }
      methods+=params[0]+'&'+params[1]+'&'+params[2];
      var links=digit+methods+'#'+secret;  
      var links512=  CryptoJS.SHA512(links).toString();    
      var url=host+methods+"&apiSig="+digit+links512;
      $.ajax({
      url: url,
      dataType: 'json',
      async : false,
      success: function( end ) {
        // console.log(end.result);
        for(var i=0;i<end.result.length;i++){
          mid+=JSON.parse(JSON.stringify(end.result[i]))+",";
        }
      },
      error: function( end ) {
        mid="";
        sta="加载失败，请刷新重试";
      }
    });
    if(apiKey==""||secret==""||id==""||pname==""){
      document.getElementById("status").innerHTML="缺少输入，以上均为必填项";
      return ;
    }
    if(mid==""){
      document.getElementById("status").innerHTML="输入有误，请检查后重新输入";
      return ;
    }
    mid+=pname;
    marr=mid.split(',');

    var name="";
    var plist="[";
    var FSD="[";
    var frlist="";
  $.ajax({
    url: contesturl,
    dataType: 'json',
    async : false,
    success: function( end ) {
      name=end.result.contest.name;
      // console.log(end.result.rows);
      for(var i=0;i<end.result.problems.length;i++){
        // console.log(end.result.problems[i]);
        plist+=JSON.stringify(end.result.problems[i])+',';
      }
      for(var i=0;i<end.result.rows.length;i++){
        for(var j=0;j<end.result.rows[i].problemResults.length;j++){
          if(end.result.rows[i].problemResults[j].points!=0){
            passp[j]++;
          }}
        if(marr.indexOf(end.result.rows[i].party.members[0].handle)!=-1){
        FSD+=JSON.stringify(end.result.rows[i])+',';
          pnumber=end.result.rows[i].problemResults.length;
          // console.log(end.result.rows[i].problemResults);
          for(var j=0;j<end.result.rows[i].problemResults.length;j++){
              pstatus[j].push(end.result.rows[i].problemResults[j].points);
          }
          if(frlist=="")  {frlist+=JSON.parse(JSON.stringify(end.result.rows[i].party.members[0].handle));}
          else{
            frlist+=","+JSON.parse(JSON.stringify(end.result.rows[i].party.members[0].handle));
          }
        }
      }
    },
    error: function( end ) {
      mid="";
      sta="加载失败，请刷新重试";
    }
  });
  plist+=']';
  var friendlist=frlist.split(',');
  // console.log(friendlist);
  var jsonArray=eval('('+plist+')');
  // console.log(prlist);
  var headArray=[];
  function parseHead(oneRow) {  
      for ( var i in oneRow) {  
        if(i=="problemResults" || i=="party" || i=="contestId" || i=="type" || i=="rating" || i=="tags"|| i=="penalty" || i=="successfulHackCount" || i=="unsuccessfulHackCount" ) continue;
              headArray[headArray.length] = i;  
        }  
        headArray[headArray.length] = "通过人数"; 
  }  
  appendTable() ;
  function appendTable() {  
        parseHead(jsonArray[0]);  
        var div = document.getElementById("div1");   
        var table = document.createElement("table");  
        var thead = document.createElement("tr");  
        for ( var count =0; count < headArray.length; count++) {  
                  var td = document.createElement("th");  
                  if(count==0){
                  td.innerHTML = "题目ID";  
                  }else if(count==1){
                  td.innerHTML = "题目名字";  
                  }else if(count==2){
                    if(headArray[count]!="通过人数"){
                      td.innerHTML = "题目分数";  
                    }else{
                      td.innerHTML = headArray[count]; 
                    }
                  }
                  else{
                  td.innerHTML = headArray[count];  }
                    thead.appendChild(td);
        }  
        table.appendChild(thead);  
        var ppos=0;
        for ( var tableRowNo = 0; tableRowNo < jsonArray.length; tableRowNo++) {  
                  var tr = document.createElement("tr");  
                  for ( var headCount = 0; headCount < headArray.length; headCount++) {  
                    var cell = document.createElement("td");  
                    if(headCount==headArray.length-1){
                      cell.innerHTML=passp[ppos++];
                    }else
                         { cell.innerHTML = jsonArray[tableRowNo][headArray[headCount]];  }
                          tr.appendChild(cell);  
                  }  
                  table.appendChild(tr);  
      }  
        div.appendChild(table);  
  }                         

  FSD+=']';
  var jsonArray=eval('('+FSD+')');
  // console.log(prlist);

  var headArray=[];

  function parseHead1(oneRow) {  
    for ( var i in oneRow) {  
      if(i=="problemResults" || i=="party" || i=="contestId" || i=="type" || i=="rating" || i=="tags"|| i=="penalty" || i=="successfulHackCount" || i=="unsuccessfulHackCount" ) continue;
            headArray[headArray.length] = i;  
      }  
    for(var i=0;i<pnumber;i++){
      headArray[headArray.length] =String.fromCharCode((65+i));

    }
}  


  appendTable1() ;
  function appendTable1() {  
    parseHead1(jsonArray[0]);  
    var div = document.getElementById("div2");   
    var table = document.createElement("table");  
    var thead = document.createElement("tr"); 
    var td = document.createElement("th");  
    td.innerHTML = "Name";  
      thead.appendChild(td);
    for ( var count =0; count < headArray.length; count++) {  
              var td = document.createElement("th");  
              td.innerHTML = headArray[count];  
                thead.appendChild(td);
    }  
    var pos=0;
    table.appendChild(thead);  
    for ( var tableRowNo = 0; tableRowNo < jsonArray.length; tableRowNo++) {  
              var tr = document.createElement("tr");  
              for ( var headCount = 0; headCount < headArray.length+1; headCount++) {  
                var cell = document.createElement("td");  
                if(headCount==0){
                  cell.innerHTML = friendlist[pos];  
                }else if(headCount>2){
                  if(pstatus[headCount-3][pos]!=0) {
                  cell.innerHTML =" ✓ ";  
                  }else{
                  cell.innerHTML = "   ";
                  }
                }
                else
                      {cell.innerHTML = jsonArray[tableRowNo][headArray[headCount-1]];  }
                      tr.appendChild(cell);  
              }  
              table.appendChild(tr);  
              pos++;
  }  
    div.appendChild(table);  
}  
document.getElementById("INPUT").innerHTML="";
document.getElementById("cname").innerHTML=name;
document.getElementById("cccname").innerHTML="翻译（仅支持其他语种转换为中文）";
// document.getElementById("fresh").innerHTML=" 戳我-刷新 ";
document.getElementById("freshs").innerHTML=fresh;
document.getElementById("tran").innerHTML=fuck;
document.getElementById("bb").innerHTML=tfuck;
document.getElementById("ccname").innerHTML="Current Frineds Standing";
document.getElementById("ccccname").innerHTML="翻译结果";
document.getElementById("hint").innerHTML="若想刷新榜单以及过题人数，请手动点击下方绿色按钮。若重新刷新页面则需重新输入密钥及密匙";
  });
});
function fre(){
  var timestamp=Date.parse(new Date())/1000;
  document.getElementById("div1").innerHTML="";
  document.getElementById("div2").innerHTML="";
  
  // console.log("begin");
  // var secret="3df4f303428c151560e23ee5386bcd699e060009";
  var passp=new Array();
  for(var i=0;i<20;i++) {
    passp[i]=0;
  }
  // var id="1327";
  // var pname="Wu_drew"
  var pnumber=0;
  var params = new Array();
  var mid="";
  var pstatus=new Array();
  for(var i=0;i<20;i++){
    pstatus[i]=new Array();
  }
  params[0]="onlyOnline=false";
  params[1]="apiKey="+apiKey;
  params[2]="time="+timestamp;
  host="https://codeforces.com/api";
  var contesturl="https://codeforces.com/api/contest.standings?contestId="+id;
  methods="/user.friends?";
  params.sort();
  let chars = '0123456789';
  let maxPos = chars.length;
  let digit = '';
  for (let i = 0; i < 6; i++) {
      digit += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  methods+=params[0]+'&'+params[1]+'&'+params[2];
  var links=digit+methods+'#'+secret;  
  var links512=  CryptoJS.SHA512(links).toString();    
  var url=host+methods+"&apiSig="+digit+links512;
  $.ajax({
  url: url,
  dataType: 'json',
  async : false,
  success: function( end ) {
    // console.log(end.result);
    for(var i=0;i<end.result.length;i++){
      mid+=JSON.parse(JSON.stringify(end.result[i]))+",";
    }
  },
  error: function( end ) {
    mid="";
    sta="加载失败，请刷新重试";
  }
});
if(mid==""){
  document.getElementById("status").innerHTML="输入有误，请检查后重新输入";
  return ;
}
mid+=pname;
marr=mid.split(',');

var name="";
var plist="[";
var FSD="[";
var frlist="";
$.ajax({
url: contesturl,
dataType: 'json',
async : false,
success: function( end ) {
  name=end.result.contest.name;
  // console.log(end.result.rows);
  for(var i=0;i<end.result.problems.length;i++){
    // console.log(end.result.problems[i]);
    plist+=JSON.stringify(end.result.problems[i])+',';
  }
  for(var i=0;i<end.result.rows.length;i++){
    for(var j=0;j<end.result.rows[i].problemResults.length;j++){
      if(end.result.rows[i].problemResults[j].points!=0){
        passp[j]++;
      }}
    if(marr.indexOf(end.result.rows[i].party.members[0].handle)!=-1){
    FSD+=JSON.stringify(end.result.rows[i])+',';
      pnumber=end.result.rows[i].problemResults.length;
      // console.log(end.result.rows[i].problemResults);
      for(var j=0;j<end.result.rows[i].problemResults.length;j++){
          pstatus[j].push(end.result.rows[i].problemResults[j].points);
      }
      if(frlist=="")  {frlist+=JSON.parse(JSON.stringify(end.result.rows[i].party.members[0].handle));}
      else{
        frlist+=","+JSON.parse(JSON.stringify(end.result.rows[i].party.members[0].handle));
      }
    }
  }
},
error: function( end ) {
  mid="";
  sta="加载失败，请刷新重试";
}
});
plist+=']';
var friendlist=frlist.split(',');
// console.log(friendlist);
var jsonArray=eval('('+plist+')');
// console.log(prlist);
var headArray=[];
function parseHead(oneRow) {  
  for ( var i in oneRow) {  
    if(i=="problemResults" || i=="party" || i=="contestId" || i=="type" || i=="rating" || i=="tags"|| i=="penalty" || i=="successfulHackCount" || i=="unsuccessfulHackCount" ) continue;
          headArray[headArray.length] = i;  
    }  
    headArray[headArray.length] = "通过人数"; 
}  
appendTable() ;
function appendTable() {  
    parseHead(jsonArray[0]);  
    var div = document.getElementById("div1");   
    var table = document.createElement("table");  
    var thead = document.createElement("tr");  
    for ( var count =0; count < headArray.length; count++) {  
              var td = document.createElement("th");  
              if(count==0){
              td.innerHTML = "题目ID";  
              }else if(count==1){
              td.innerHTML = "题目名字";  
              }else if(count==2){
                if(headArray[count]!="通过人数"){
                  td.innerHTML = "题目分数";  
                }else{
                  td.innerHTML = headArray[count]; 
                }
              }
              else{
              td.innerHTML = headArray[count];  }
                thead.appendChild(td);
    }  
    table.appendChild(thead);  
    var ppos=0;
    for ( var tableRowNo = 0; tableRowNo < jsonArray.length; tableRowNo++) {  
              var tr = document.createElement("tr");  
              for ( var headCount = 0; headCount < headArray.length; headCount++) {  
                var cell = document.createElement("td");  
                if(headCount==headArray.length-1){
                  cell.innerHTML=passp[ppos++];
                }else
                     { cell.innerHTML = jsonArray[tableRowNo][headArray[headCount]];  }
                      tr.appendChild(cell);  
              }  
              table.appendChild(tr);  
  }  
    div.appendChild(table);  
}                         

FSD+=']';
var jsonArray=eval('('+FSD+')');
// console.log(prlist);

var headArray=[];

function parseHead1(oneRow) {  
for ( var i in oneRow) {  
  if(i=="problemResults" || i=="party" || i=="contestId" || i=="type" || i=="rating" || i=="tags"|| i=="penalty" || i=="successfulHackCount" || i=="unsuccessfulHackCount" ) continue;
        headArray[headArray.length] = i;  
  }  
for(var i=0;i<pnumber;i++){
  headArray[headArray.length] =String.fromCharCode((65+i));

}
}  


appendTable1() ;
function appendTable1() {  
parseHead1(jsonArray[0]);  
var div = document.getElementById("div2");   
var table = document.createElement("table");  
var thead = document.createElement("tr"); 
var td = document.createElement("th");  
td.innerHTML = "Name";  
  thead.appendChild(td);
for ( var count =0; count < headArray.length; count++) {  
          var td = document.createElement("th");  
          td.innerHTML = headArray[count];  
            thead.appendChild(td);
}  
var pos=0;
table.appendChild(thead);  
for ( var tableRowNo = 0; tableRowNo < jsonArray.length; tableRowNo++) {  
          var tr = document.createElement("tr");  
          for ( var headCount = 0; headCount < headArray.length+1; headCount++) {  
            var cell = document.createElement("td");  
            if(headCount==0){
              cell.innerHTML = friendlist[pos];  
            }else if(headCount>2){
              if(pstatus[headCount-3][pos]!=0) {
              cell.innerHTML =" ✓ ";  
              }else{
              cell.innerHTML = "   ";
              }
            }
            else
                  {cell.innerHTML = jsonArray[tableRowNo][headArray[headCount-1]];  }
                  tr.appendChild(cell);  
          }  
          table.appendChild(tr);  
          pos++;
}  
div.appendChild(table);  
}  
document.getElementById("INPUT").innerHTML="";
document.getElementById("cname").innerHTML=name;
// document.getElementById("fresh").innerHTML=" 戳我-刷新 ";
document.getElementById("freshs").innerHTML=fresh;
document.getElementById("ccname").innerHTML="Current Frineds Standing";
document.getElementById("hint").innerHTML="若想刷新榜单以及过题人数，请手动点击下方绿色按钮。若想更换用户请直接刷新本页面";


iziToast.success({
    message: '竞赛刷新成功',
    position: 'bottomRight',
    transitionIn: 'bounceInLeft',
    color: 'white',
});



}