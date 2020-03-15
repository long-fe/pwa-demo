// $(function(){
// 	var system ={};
//         var p = navigator.platform;
//         system.win = p.indexOf("Win") == 0;
//         system.mac = p.indexOf("Mac") == 0;
//         system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
//          if(system.win||system.mac||system.xll){//如果是电脑访问，仍为index.html
//                 // window.location.href="phone.html";
//         }else{  //如果是手机,跳转到phone.html
//                window.location.href="phone.html";
//         }
// })
function isPC(){
    var userAgentInfo = navigator.userAgent.toLowerCase();
    var Agents = new Array("android", "iphone", "symbianOS", "windows phone", "ipad", "ipod");
    var flag = true;
    for (var i = 0; i < Agents.length; i++) {
        if (userAgentInfo.indexOf(Agents[i]) > 0) { flag = false; break; }
    }
    return flag;
}
if(!isPC()){
    //移动端
    window.location.href = 'http://www.nexusest.com/phone.html'
} else {
    //移动端
    window.location.href = 'http://www.nexusest.com/'
}