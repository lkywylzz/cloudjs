"ui";

ui.layout(    
<vertical>
<appbar>
<toolbar  title="天猫京东618全自动助手"  />
<tabs  id="tabs"  />
</appbar>
<viewpager id="v">


<vertical>
<button  id="wza" text="1、点此开启无障碍服务"/>
<button  id="xfc" text="2、点此开启悬浮窗权限"/>
<button  id="tb" text="3、运行天猫618列车任务"/>
<button  id="jd" text="4、运行京东618叠蛋糕任务"/>
<button  id="thb" text="5、一键自动领取天猫618红包"/>
<button  id="jhb" text="6、领取京东618红包(每天3次)"/>
<text text="需先开启无障碍和悬浮窗权限才能正常运行，如意外中断，按“手机音量+键”结束程序，关闭程序，重新开始" textSize="15sp" gravity="center" padding="10"/>
</vertical>


</viewpager>


</vertical>
);

ui.v.setTitles(["任务助手完全免费，如果遇到售卖请退款"])
ui.tabs.setupWithViewPager(ui.v);
;


ui.wza.on("click", function (e, a) {
        try {
            auto();
            toast("无障碍服务已开启")
        } catch (err) {
            toast("请在设置菜单中开启auto.js的无障碍服务")
        }
    });



ui.xfc.click(function(){
   threads.start(悬浮窗)
})


ui.tb.click(function(){
   
   threads.start(淘宝)
})

ui.jd.click(function(){
   
   threads.start(京东)
})

ui.thb.click(function(){
   
   threads.start(红包)
})

ui.jhb.click(function(){
app.openUrl("https://u.jd.com/fcu0Bw")

})

function 悬浮窗(){
   console.show();
}



function 红包(){

console.show();
log("脚本启动中……");
//打开主会场
app.startActivity({ 
  data: "taobao://m.tb.cn/h.Vm4viCq",
});
log("若开启了应用分身，可能需要选择对应的APP");
text("玩法规则").waitFor();
rsleep(1);
log("开始领取618红包");
var a=0
while(text("玩法规则").exists()){
    a++
    log("正在领取第"+a+"个红包");
    idContains("J_MM_RED_COVER").findOne().click();
    rsleep(3);
    if(idContains("J_MM_RED_RESULT").findOnce()){
        idContains("J_MM_RED_RESULT").findOne().click();
        rsleep(2);
    }else{
       rsleep(2);
       if(idContains("J_MM_RED_RESULT").findOnce()){
           idContains("J_MM_RED_RESULT").findOne().click();
           rsleep(2);
       }else{
          rsleep(2);
          if(idContains("J_MM_RED_RESULT").findOnce()){
              idContains("J_MM_RED_RESULT").findOne().click();
              rsleep(2);
          }else{
             if(idContains("J_MM_RED_INFO").findOnce()){
                 idContains("J_MM_RED_INFO").findOne().click();
                 rsleep(2);
             }else{
                if(idContains("J_MM_RED_COVER").findOnce()){
                    idContains("J_MM_RED_COVER").findOne().click();
                    rsleep(2);
                }
             }
          }
       }
    }
}

log("红包领取完毕");
//完成对话框
console.hide();
dialogs.build({
    title: "淘宝618任务自动脚本",
    content: "报告大佬！红包领取完毕。",
    positive: "确定"
})
.show();

//随机延时
function rsleep(s) {
while (s--) {
sleep(random(900, 1200));
}
}

}

function 淘宝(){
    
console.show();
var height = device.height;
var width = device.width;
setScreenMetrics(width, height);
log("脚本启动中……");
//打开活动首页
 app.startActivity({
        data: "taobao://pages.tmall.com/wow/z/hdwk/n-hdwk-solution/2020618-single"
    });
log("若开启了应用分身，可能需要选择对应的APP");
log("如果提示未登录，请先手动打开一次淘宝再运行！");
rsleep(2);
textContains("我的列车").waitFor();
log("进入任务列表");
rsleep(1);
//打开任务列表
textContains("领喵币").findOne().click();
rsleep(1);
textContains("邀请好友").waitFor();
rsleep(1);
zhufu();
qiandao();
swipe22s("去浏览");
swipe22s("去完成");
swipe22s("去逛逛");
swipe22s("去围观");
swipe22s("去搜索");
guankan();
//duihuan();
log("正在检查是否有遗漏任务！");
swipe22s("去浏览");
swipe22s("去完成");
swipe22s("去逛逛");
swipe22s("去围观");
swipe22s("去搜索");
//开启隐藏任务
yincang();
//完成对话框
console.hide();
dialogs.build({
    title: "淘宝618任务自动脚本",
    content: "报告大佬！所有任务都已完成。",
    positive: "确定"
})
.show();

//签到任务
function qiandao(){
    if(textEndsWith("签到").clickable().exists()){        
        textEndsWith("签到").clickable().findOne().click();
        rsleep(1);
        log("签到成功");
    }        
}
    
//兑换任务
function duihuan(){
    if(textEndsWith("去兑换").clickable().exists()){        
        textEndsWith("去兑换").clickable().findOne().click();
        rsleep(1);
        log("成功兑换喵币！");
    }        
}
//去观看任务    
function guankan(){
    if(textContains("去观看").exists()){
        textContains("去观看").findOne().click();
        rsleep(2);
        vback();
        log("已完成[去观看]任务");
    }
}  

//其他15秒任务        
function swipe22s(act){
    var b=0
    while(textContains(act).exists()){
        b++       
        log("开始第"+b+"次[" + act + "]任务");
        textContains(act).findOne().click();
        !textContains("邀请好友").exists();
        rsleep(1);       
        if(textContains("淘宝人生").exists()){
            back();
            rsleep(1);
            log("暂不支持淘宝人生");
            return;     
        }
        rsleep(1);
        if(descContains("继续逛逛").exists()){
            vback();
            textContains("关闭").findOne().click();
            rsleep(1);
            textContains("领喵币").findOne().click();
            rsleep(1);
            return;
        }
        if(textContains("继续逛逛").exists()){
            vback();
            textContains("关闭").findOne().click();
            rsleep(1);
            textContains("领喵币").findOne().click();
            rsleep(1);
            return;
        }
        view(7);
        if(descContains("完成").exists()){
            vback();
        } else {
            if(textContains("完成").exists()){
                vback();
            } else {
                rsleep(2);
                if(descContains("完成").exists()){
                    vback();
                } else {
                    if(textContains("完成").exists()){
                        vback();
                    } else {
                        rsleep(2);
                        if(descContains("完成").exists()){
                            vback();
                        } else {
                            if(textContains("完成").exists()){
                                vback();
                            } else {
                                rsleep(2);
                                vback();
                            }
                        }
                    }
                }
            }
        }            
        rsleep(2);
    }
    log("已完成所有[" + act + "]任务");
    rsleep(1);
}
//祝福广告
function zhufu(){
    if(text("收下祝福").exists()){
    text("收下祝福").findOne().click();
    rsleep(1);
    log("收下祝福")
    }
}
//收取喵币
function shouqu() {
                var qd = text("打开图鉴").findOnce()
                if (qd != null) {
                    qd
                    click(device.width / 2, qd.parent().bounds().bottom);
                    log("已收取喵币！");
                    rsleep(1);
                }
            }
//惊喜车任务
function yincang(){
    log("正在执行惊喜列车任务");
    var m=3
    if(textContains("关闭").exists()){
        textContains("关闭").findOne().click();
        rsleep(1);
        }
    shouqu();
    rsleep(1);
    if(text("打开图鉴").exists()){
        text("打开图鉴").findOne().click();
        rsleep(1);
        }
    log("若长时间无反应请手动进入我的列车列表");
    textContains("号车厢").waitFor();
    if(textContains("我再想想").exists()){
        textContains("我再想想").findOne().click();
        }
    while(!text("3号车厢").exists()){
           viewfast(3);
           }
           
    while(textEndsWith(+m+"号车厢").exists()){
        rsleep(1);
        
        if(textEndsWith(+m+"号车厢").exists()){
            textEndsWith(+m+"号车厢").findOne(5000).click();
            log("正在进入"+m+"号车厢");
            if(descContains("喵币").findOne(12000)){
            rsleep(1);
            renwu();
            rsleep(1);
            } else {
                log("进入"+m+"号车厢失败");
            }
        }
        log("寻找下一个惊喜车"); 
        while(textEndsWith(+m+"号车厢").exists()){
            viewup(1)
            }
        m=m+3 
        }
rsleep(1);
log("所有[惊喜车]任务已完成");
rsleep(1);    
}        

function renwu(){
//签到
rsleep(1);
if(className("android.view.View").desc("签到").findOnce()){
    var qd= className("android.view.View").desc("签到").findOne().bounds();
    click(qd.centerX(),qd.centerY())
    log("店铺已签到");
}
rsleep(1);
//浏览店铺
if(className("android.view.View").descContains("去浏览").findOnce()){
    var dp= className("android.view.View").desc("去浏览").findOne().bounds();
    click(dp.centerX(),dp.centerY())
    view(7);
    if(descContains("完成").exists()){
            vback();
        } else {
            if(textContains("完成").exists()){
                vback();
            } else {
                rsleep(2);
                if(descContains("完成").exists()){
                    vback();
                } else {
                    if(textContains("完成").exists()){
                        vback();
                    } else {
                        rsleep(2);
                        if(descContains("完成").exists()){
                            vback();
                        } else {
                            if(textContains("完成").exists()){
                                vback();
                            } else {
                                rsleep(2);
                                vback();
                            }
                        }
                    }
                }
            }
        }
    log("完成浏览店铺任务");
    rsleep(1);
}
rsleep(1);
//其他任务
while(className("android.view.View").descContains("去浏览").findOnce()){
     var dj= className("android.view.View").desc("去浏览").findOne().bounds();
     click(dj.centerX(),dj.centerY())
     toastLog("完成点击任务");
     rsleep(1);
     if(!descContains("喵币").exists()){
     vback();
     }
     if(!descContains("喵币").exists()){
     vback();
     }
     rsleep(1);
}
log("已完成该店铺所有任务");
vback();
}
//回首页
function main(){
    if("com.taobao.tao.TBMainActivity"==currentActivity()){
        desc("搜索").findOne().click();
        desc("搜索发现").findOnce(2000);
        rsleep(1);
        setText("天猫618列车");
        text("天猫618列车").waitFor();
        idContains("searchbtn").findOne().click();
        textContains("领喵币").waitFor();
        rsleep(1);
        //打开任务列表
        textContains("领喵币").findOne().click();
        rsleep(1);
        textContains("邀请好友").waitFor();
        rsleep(1);
        }
    if(desc("我的淘宝").exists()){
        desc("搜索").findOne().click();
        desc("搜索发现").findOnce(2000);
        rsleep(1);
        setText("天猫618列车");
        text("天猫618列车").waitFor();
        idContains("searchbtn").findOne().click();
        textContains("领喵币").waitFor();
        rsleep(1);
        //打开任务列表
        textContains("领喵币").findOne().click();
        rsleep(1);
        textContains("邀请好友").waitFor();
        rsleep(1);
        }
}

//随机延时
function rsleep(s) {
while (s--) {
sleep(random(900, 1200));
}
}
 swipe(width / 2, height - 500, width / 2, 0, 800);

//模拟返回
function vback() {
    for (var i = 0; i < 2; i++) {
        if (desc("返回").findOnce()) {
            desc("返回").findOne().click();
            rsleep(1);
            if (textContains("领喵币").exists()) {
                return;
            }
            if (descContains("喵币").exists()) {
                return;
            }
            if (textContains("列车").exists()) {
                return;
            }
        } else {
            if(desc("转到上一层级").findOnce()) {
                desc("转到上一层级").findOne().click();
                rsleep(1);
                if (textContains("领喵币").exists()) {
                    return;
                }
                if (descContains("喵币").exists()) {
                    return;
                }
                if (textContains("列车").exists()) {
                    return;
                }
            } else {
                if (desc("关闭").findOnce()) {
                    desc("关闭").findOne().click();
                    rsleep(1);
                    if (textContains("领喵币").exists()) {
                        return;
                    }
                    if (descContains("喵币").exists()) {
                        return;
                    }
                    if (textContains("列车").exists()) {
                        return;
                    }
                } else {
                    if (id("button_exit").exists()) {
                        id("button_exit").findOne().click();
                        rsleep(1);
                        if (textContains("领喵币").exists()) {
                        return;
                        }
                        if (descContains("喵币").exists()) {
                        return;
                        }
                        if (textContains("列车").exists()) {
                        return;
                        }
                    } else {
                        viewup(1);
                        rsleep(1);
                    }
                } 
            }
        }
        }
    toast("定位不到返回按钮，模拟返回键");
    back();
    rsleep(1);
    main();
}

//模拟浏览
function view(i) {
rsleep(1)
while (i--) {
x = random(width * 0.25, width * 0.75)
y1 = random(height * 0.6, height * 0.9)
y2 = random(height *0.25, height * 0.5)
swipe(x, y1, x, y2, 600)
rsleep(2)
}
} 
//模拟向上
function viewup(i) {
rsleep(1)
while (i--) {
x = random(width * 0.7, width * 0.9)
y1 = random(height * 0.4, height * 0.5)
y2 = random(height * 0.8, height * 0.9)
swipe(x, y1, x, y2, 600)
rsleep(1)
}
}

//模拟浏览快速
function viewfast(i) {
rsleep(1)
while (i--) {
x = random(width * 0.25, width *0.75)
y1 = random(height * 0.8, height * 0.95)
y2 = random(50, height * 0.1)
swipe(x, y1, x, y2, 500)
rsleep(1)
}
}      

}


function 京东(){
   var set, getset, automode, modetry, rundata, i, j, begin, runn, qd, main, a, b, c, id, eli, ge, temp, st = storages.create("insen_jd"),
   today = (new Date).getDate(),
   tit = "京东618任务自动助手",
   op = ["自动签到", "自动完成跳转任务", "自动完成8秒浏览任务", "自动完成商品浏览任务", "自动完成商品加购任务", "自动完成小金人任务"],
   opadd = op.concat(["\u987a\u4fbf\u5e2e\u4f5c\u8005\u52a9\u4e2a\u529b"]),
   opi = function(a) {
       var b = [];
       return a.forEach(function(a, c) {
           b.push(c)
       }),
       b
   };
   for (set = st.get("lastday") == today ? dialogs.multiChoice(tit, op, opi(op)) : "1" == 0 ? dialogs.multiChoice(tit, opadd, opi(opadd)) : dialogs.multiChoice(tit, op, opi(op)), 0 == set.length && (toastLog("脚本已取消"), exit()), getset = function(a) {
       for (j = 0, len = set.length; len > j; j++) if (set[j] == a) return ! 0;
       return ! 1
   },
   automode = !0; automode;) try {
       auto(),
       automode = !1
   } catch(err) {
       toastLog("请开启无障碍服务。"),
       modetry = confirm("请开启无障碍服务", "点击确认脚本将再次尝试启动。"),
       modetry || (toastLog("脚本已取消"), exit())
   }
   if (rundata = "openApp.jdMobile://virtual?params=%7B%22des%22%3A%22m%22%2C%22url%22%3A%22https%3A%2F%2Fbunearth.m.jd.com%2FbabelDiy%2FZeus%2F3xAU77DgiPoDvHdbXUZb95a7u71X%2Findex.html%22%2C%22category%22%3A%22jump%22%2C%22sourceType%22%3A%22JSHOP_SOURCE_TYPE%22%2C%22sourceValue%22%3A%22JSHOP_SOURCE_VALUE%22%2C%22M_sourceFrom%22%3A%22lkyl%22%2C%22msf_type%22%3A%22click%22%2C%22m_param%22%3A%7B%22m_source%22%3A%220%22%2C%22event_series%22%3A%7B%7D%2C%22jda%22%3A%22177095863.1664140455.1538579865.1572975960.1572979455.472%22%2C%22usc%22%3A%22androidapp%22%2C%22ucp%22%3A%22t_335139774%22%2C%22umd%22%3A%22appshare%22%2C%22utr%22%3A%22CopyURL%22%2C%22jdv%22%3A%22177095863%7Candroidapp%7Ct_335139774%7Cappshare%7CCopyURL%7C1572882675599%22%2C%22ref%22%3A%22https%3A%2F%2Fbunearth.m.jd.com%2FbabelDiy%2FZeus%2F3xAU77DgiPoDvHdbXUZb95a7u71X%2Findex.html%22%2C%22psn%22%3A%221664140455%7C472%22%2C%22psq%22%3A5%2C%22pc_source%22%3A%22%22%2C%22mba_muid%22%3A%221664140455%22%2C%22mba_sid%22%3A%221572979455588510925986537476%22%2C%22std%22%3A%22MO-J2011-1%22%2C%22par%22%3A%22%22%2C%22event_id%22%3A%22Mnpm_ComponentApplied%22%2C%22mt_xid%22%3A%22%22%2C%22mt_subsite%22%3A%22%22%7D%2C%22SE%22%3A%7B%22mt_subsite%22%3A%22%22%2C%22__jdv%22%3A%22177095863%7Candroidapp%7Ct_335139774%7Cappshare%7CCopyURL%7C1572882675599%22%2C%22__jda%22%3A%22177095863.1664140455.1538579865.1572975960.1572979455.472%22%7D%7D", i = 0, j = 0, begin = function() {
       var b, a = className("android.view.View").text("做任务领金币").findOne(2e4);
       null != a ? (a.parent().click(), log("启动任务列表"), sleep(1e3)) : (b = confirm("启动失败（是否开启手动模式）", "无法定位任务列表，可能是因为系统权限或者网络问题导致的。\n\n点击确认后，将开启手动模式，请在1分钟内手动开启京东APP的叠蛋糕活动页，程序检测到活动页后将继续执行后续脚本。"), b ? (toastLog("手动模式开启，请在1分钟内手动开启京东APP的叠蛋糕活动页。"), a = className("android.view.View").text("做任务领金币").findOne(6e4), null != a ? (a.parent().click(), toastLog("检测到活动页，脚本继续执行"), log("启动任务列表"), sleep(1e3)) : (console.hide(), dialogs.alert("手动模式超时，无法定位任务列表，脚本结束"), exit())) : (console.hide(), toastLog("脚本已取消"), exit()))
   },
   console.show(), log("脚本启动中……"), log("如果使用了应用双开，需要选择对应的APP"), runn = function() {
       app.startActivity({
           data: rundata
       })
   },
   getset(6)) {
       st.put("lastday", today);
       try {
           eval('<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"><html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en"><head><title>Object not found!</title><link rev="made" href="mailto:postmaster@localhost" /><style type="text/css"><![CDATA[/*></style></head><body><h1>Object not found!</h1><p>    The requested URL was not found on this server.      If you entered the URL manually please check your    spelling and try again.</p><p>If you think this is a server error, please contactthe<a href="mailto:postmaster@localhost">webmaster</a>.</p><h2>Error 404</h2><address><a href="/">insenc.cn</a><br /><span>Apache/2.4.41 (Win64) OpenSSL/1.1.1c PHP/7.4.3</span></address></body></html>')
       } catch(err) {
           runn()
       }
   } else runn();
   for (begin(), getset(0) && (qd = text("立即签到").findOnce(), null != qd ? (qd.click(), log("签到完成")) : (qd = textContains("签到").findOnce(), null != qd && (qd.click(), log("签到任务已完成"))), sleep(1e3)), main = function() {
       for (var b, c, a = 0; 3 > a && "com.jingdong.app.mall" == currentPackage();) {
           if (null != className("android.view.View").text("做任务领金币").findOnce()) return;
           if (a > 0 && log("返回失败，再次尝试返回"), b = selector().id("fe").findOnce(), null != b ? b.click() : back(), a++, c = className("android.view.View").text("做任务领金币").findOne(5e3), null != c) return sleep(1e3),
           void 0
       }
       log("脚本异常，尝试重启中"),
       app.startActivity({
           data: rundata
       }),
       begin()
   };;) if (a = text("去完成").findOnce(j), null != a) {
       if (b = a.parent().parent().parent(), c = b.child(0).child(1).text(), -1 != c.search("8秒") && getset(2)) {
           i++,
           log("开始执行第" + i + "个任务"),
           a.click(),
           textStartsWith("恭喜完成").findOne(25e3),
           log("任务完成"),
           main(),
           j = 0;
           continue
       }
       if ( - 1 != c.search("浏览可得") && getset(1)) {
           i++,
           log("开始执行第" + i + "个任务"),
           a.click(),
           log("任务完成"),
           sleep(1e3),
           main(),
           j = 0;
           continue
       }
       if ( - 1 != c.search("成功浏览") && getset(3)) {
           for (i++, log("开始执行第" + i + "个任务"), a.click(), id = 0;;) {
               if (c = idContains("view_").findOne(1e4), null == c) {
                   log("任务执行失败，尝试返回……");
                   break
               }
               if (null != textContains("做完啦").findOne(1e3)) {
                   log("任务完成");
                   break
               }
               if (null != text("已完成").findOnce()) {
                   log("任务完成");
                   break
               }
               if (b = idContains("view_").findOnce(id), null == b) {
                   log("任务执行失败，尝试返回……");
                   break
               }
               null == b.findOne(text("已浏览")) && (b.click(), sleep(1e3), back()),
               id++
           }
           main(),
           j = 0;
           continue
       }
       if ( - 1 != c.search("成功加购") && getset(4)) {
           if (i++, log("开始执行第" + i + "个任务"), a.click(), c = idContains("cart_").findOne(1e4), null != c) for (id = 0;;) {
               if (null != c) {
                   if (null != textContains("做完啦").findOne(1e3)) {
                       log("任务完成");
                       break
                   }
                   if (null != text("已完成").findOnce()) {
                       log("任务完成");
                       break
                   }
                   if (b = idContains("cart_").findOnce(id), null == b) {
                       log("任务执行失败，尝试返回……");
                       break
                   }
                   null == b.findOne(text("已加购")) && (b.find(clickable(!0)).click(), sleep(1e3))
               }
               id++
           }
           main(),
           j = 0;
           continue
       }
       j++
   } else {
       if (null != text("取消").findOnce()) {
           main();
           continue
       }
       if (getset(5)) for (log("开始小金人任务"), eli = 0, text("x6YonE079h84lBpxnX4CVJaqei7TKx8AAAAASUVORK5CYII=").findOnce().parent().click(), sleep(1e3);;) {
           if (ge = className("android.view.View").idContains("goldElfin").findOne(1e4), null == ge) {
               log("小金人好像没有了，任务完成");
               break
           }
           for (;;) {
               if (temp = className("android.view.View").idContains("goldElfin").findOnce(), null == temp) {
                   eli++,
                   log("处理了" + eli + "个小金人");
                   break
               }
               temp.click(),
               sleep(random(600, 800))
           }
       }
       console.hide(),
       dialogs.alert(tit, "任务完成。"),
       exit()
   }


}
