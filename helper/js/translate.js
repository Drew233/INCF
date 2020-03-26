function fanyi(){
    var appid = '20200325000404914';
    var before="<form name=\"\" id=\"yuanwen\" action=\"\" class=\"Form\"><textarea id=\"wordtex\" style=\"width:100%;height:500px;\">";
    var end="</textarea></form>";
var key = 'jPB3B6AvpjKOdqlNQFqQ';
var salt = (new Date).getTime();
var query = document.getElementById("wordtext").value;
// console.log(query);
// <form name="" id="yuanwen" action="" class="Form"><textarea id="wordtext" style="width:100%;height:500px;"></textarea></form>
var from = 'auto';
var to = 'zh';
var str1 = appid + query + salt +key;
// console.log(str1);

var sign = MD5(str1);
$.ajax({
    url: 'https://fanyi-api.baidu.com/api/trans/vip/translate',
    type: 'get',
    dataType: 'jsonp',
    data: {
        q: query,
        appid: appid,
        salt: salt,
        from: from,
        to: to,
        sign: sign
    },
    success: function (data) {
        var mid="";
        for(var i=0;i<data.trans_result.length;i++){
            mid+=data.trans_result[i].dst+"\n";
        }
      document.getElementById("result").innerHTML=before+mid+end;
        // console.log(data.trans_result);
    } 
});
iziToast.success({
    message: '翻译结束',
    position: 'bottomRight',
    transitionIn: 'bounceInLeft',
    color: 'white',
});
}
