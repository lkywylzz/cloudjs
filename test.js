auto.waitFor();
let see_count =300;// rawInput('请输入滑动次数','1000');
app.launchApp('爱奇艺极速版');
sleep(2000);

do_task()
coin_task()





function coin_task(){
    if (descContains("1000金币轻松赚").exists()){
        descContains("1000金币轻松赚").findOne(2000).click()
        //sleep(1000)
        sleep(20000)//广告时长
        while(true){
            if (className("android.widget.ImageView").indexInParent(1).depth(6).exists){
                className("android.widget.ImageView").indexInParent(1).depth(6).findOne(2000).click()//关闭广告
                sleep(1000)
                break
            }
        }
        text_控件点击("看视频再赚100金币")
        if (className("android.widget.ImageView").indexInParent(1).depth(6).exists){
            className("android.widget.ImageView").indexInParent(1).depth(6).findOne(2000).click()//关闭广告
            sleep(1000)
        }
    }
}

function do_task(){
    if (!desc("明日可领")) { 
        if (desc("开宝箱领金币").exists()){
            desc_控件点击("开宝箱领金币")
            sleep(1000)
            if (text("看视频再赚100金币").exists()){
                text_控件点击("看视频再赚100金币")
                sleep(20000)//广告时长
                if (className("android.widget.ImageView").indexInParent(1).depth(6).exists){
                    className("android.widget.ImageView").indexInParent(1).depth(6).findOne(2000).click()//关闭广告
                    sleep(1000)
                }
            }
        }
    }
    else{
        log("宝箱已领完，请明天再来")
    }    
}


//定期检查获得金币数量，超过20000金币，停止继续刷广告
function Gold_coin_check(){
    text_控件点击("赚钱")
    sleep(3000)
    log("进入任务页面,开始检查")
    //var b=descContains("1000金币轻松赚").desc()
    //log(descContains("看电视剧广告赚3元"+' /n '+"翻倍中"+' /n '+"今日已看").findOnce().desc().replace(/'"看电视剧广告赚3元"+' /n '+"翻倍中"+' /n '+"今日已看"/,""'))
    c=descContains("看电视剧广告赚3元").findOnce().desc()
    log(c)
    //log(descContains("看电视剧广告赚3元").findOnce().desc())
}

function text_控件点击(dname) {
        //var a = dshuxing(dzhi).boundsInside(0, 0, device.width, device.height).findOnce();
        var a = text(dname).findOne(3000)
        if (a != null) {
            var x1 = a.bounds().left;
            var x2 = a.bounds().right;
            var y1 = a.bounds().top;
            var y2 = a.bounds().bottom;
            var x = random(Math.floor(x1 + 1), Math.floor(x2 - 1));//删除控件四周1的边界，防止边框位置点击无效
            var y = random(Math.floor(y1 + 1), Math.floor(y2 - 1));
            //var timedelay = random(50, 150);
            log(x)
            log(y)
            toastLog("点击 [" + dname + "]");
            //press(x, y, timedelay);
            click(x, y);
            sleep(1000);
            return true;
        } else {
            toastLog("无法找到 [" + dname + "]");
        }
    } 


    function desc_控件点击(dname) {
            //var a = dshuxing(dzhi).boundsInside(0, 0, device.width, device.height).findOnce();
            var a = desc(dname).findOne(3000)
            if (a != null) {
                var x1 = a.bounds().left;
                var x2 = a.bounds().right;
                var y1 = a.bounds().top;
                var y2 = a.bounds().bottom;
                var x = random(Math.floor(x1 + 1), Math.floor(x2 - 1));//删除控件四周1的边界，防止边框位置点击无效
                var y = random(Math.floor(y1 + 1), Math.floor(y2 - 1));
                //var timedelay = random(50, 150);
                log(x)
                log(y)
                toastLog("点击 [" + dname + "]");
                //press(x, y, timedelay);
                click(x, y);
                sleep(1000);
                return true;
            } else {
                toastLog("无法找到 [" + dname + "]");
            }
        } 

/*
//Gold_coin_check()
//do_task()
//desc("看视频再赚100金币").findOne(2000).parent().click()
//text_控件点击("看视频再赚100金币")
//sleep(1000)

//className("android.widget.ImageView").depth(6).findOne().click()

descContains("1000金币轻松赚").findOne(2000).click()
sleep(1000)
text_控件点击("看视频再赚100金币")
sleep(20000)//广告时长
className("android.widget.ImageView").indexInParent(1).depth(6).findOne(2000).click()//关闭广告
 */
