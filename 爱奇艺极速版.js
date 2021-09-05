auto.waitFor();
let see_count =300;// rawInput('请输入滑动次数','1000');
app.launchApp('爱奇艺极速版');
sleep(8000);
//text_控件点击("关闭")
//console.show(); //开启日志（悬浮窗权限）

if (text("我的").exists()) {
    //text("我的").findOne().click();
    log("加载成功")
    text_控件点击("短视频")
    sleep(3000);
    log("进入短视频界面，开始寻找广告视频")
    find_广告视频()
    while(true){
        time_countdown()
    }
    //slide_down()
    //sleep(1000)
    /*
    while(true){
        //swipe(device.width / 2, device.height*0.1, device.width / 2,  device.height*0.8,300)
        slide_up()
        sleep(300)
        slide_down()
        sleep(random(16500,17800))
        //swipe(random(0.48, 0.52),random(0.78, 0.82),random(0.48, 0.52),random(0.1, 0.14),random(0.08, 0.12))
    }
    */
}

//定期检查获得金币数量，超过20000金币，停止继续刷广告
function Gold_coin_check(){
    text_控件点击("赚钱")
    sleep(3000)
    log("进入任务页面,开始检查")


}


//倒计时计入刷广告赚金币模式
function time_countdown(){
    while(true){
        if (!text("翻倍中").exists()){
            if (!text("金蛋奖励").exists()){
                toastLog("开始刷视频赚金币")
                slide_up()
                sleep(300)
                slide_down()
                sleep(random(16500,17800))
                //break
            }
            else{
                while(true){
                    if (!text("金蛋奖励").exists()){
                        toastLog("金蛋奖励已领取")
                        slide_up()
                        sleep(300)
                        slide_down()
                        sleep(random(16500,17800))
                        break
                        //continue
                    }
                }
            }
        }
    }
}


function find_广告视频(){
    let i=1
    while(true){
    log("寻找广告视频，滑动" + i + '次'+"总计:"+ i + "次")
    sml_move(device.width / 2, device.height*0.8, device.width / 2,  device.height*0.1, 300);
    //sml_move(500, 1600, 100,  1000, 300);
    let delayTime = random(8000, 12000);
    sleep(delayTime);
    if (text("详情").exists()) {
        toastLog("找到广告视频，等待刷视频任务开始...")
        slide_down()
        sleep(2000)
        break
        }
    i=i+1
    }
}

function text_控件点击(dname) {
    //var a = dshuxing(dzhi).boundsInside(0, 0, device.width, device.height).findOnce();
    var a = text(dname).findOne()
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



function slide_down(){
    sml_move(device.width / 2, device.height*0.8, device.width / 2,  device.height*0.1, 300)
    log("下滑")
}

function slide_up(){
    sml_move_up(device.width / 2, device.height*0.1, device.width / 2,  device.height*0.8, 300)
    log("上滑")
}

/**
 * 贝塞尔曲线
 * @param {坐标点} ScreenPoint 
 * @param {偏移量} Offset 
 */
function bezier_curves(ScreenPoint, Offset) {
    cx = 3.0 * (ScreenPoint[1].x - ScreenPoint[0].x);
    bx = 3.0 * (ScreenPoint[2].x - ScreenPoint[1].x) - cx;
    ax = ScreenPoint[3].x - ScreenPoint[0].x - cx - bx;
    cy = 3.0 * (ScreenPoint[1].y - ScreenPoint[0].y);
    by = 3.0 * (ScreenPoint[2].y - ScreenPoint[1].y) - cy;
    ay = ScreenPoint[3].y - ScreenPoint[0].y - cy - by;
    tSquared =Offset * Offset;
    tCubed = tSquared * Offset;
    result = {
        "x": 0,
        "y": 0
    };
    result.x = (ax * tCubed) + (bx * tSquared) + (cx * Offset) + ScreenPoint[0].x;
    result.y = (ay * tCubed) + (by * tSquared) + (cy * Offset) + ScreenPoint[0].y;
    return result;
};
/**
 * 曲线滑动
 * @param {*} qx 
 * @param {*} qy 
 * @param {*} zx 
 * @param {*} zy 
 * @param {*} time 
 */
function sml_move(qx, qy, zx, zy, time) {
    var xxy = [time];
    var point = [];
    var dx0 = {
        "x": qx,
        "y": qy
    };
    var dx1 = {
        "x": random(qx - 100, qx + 100),
        "y": random(qy, qy + 50)
    };
    var dx2 = {
        "x": random(zx - 100, zx + 100),
        "y": random(zy, zy + 50),
    };
    var dx3 = {
        "x": zx,
        "y": zy
    };
    for (var i = 0; i < 4; i++) {
        eval("point.push(dx" + i + ")");
    };
    for (let i = 0; i < 1; i += 0.08) {
        let newPoint=bezier_curves(point, i);
        xxyy = [parseInt(newPoint.x), parseInt(newPoint.y)]
        xxy.push(xxyy);
    }
    gesture.apply(null, xxy);
};


function sml_move_up(qx, qy, zx, zy, time) {
    var xxy = [time];
    var point = [];
    var dx0 = {
        "x": qx,
        "y": qy
    };
    var dx1 = {
        "x": random(qx - 100, qx + 100),
        "y": random(qy, qy -50)
    };
    var dx2 = {
        "x": random(zx - 100, zx + 100),
        "y": random(zy, zy -50),
    };
    var dx3 = {
        "x": zx,
        "y": zy
    };
    for (var i = 0; i < 4; i++) {
        eval("point.push(dx" + i + ")");
    };
    for (let i = 0; i < 1; i += 0.08) {
        let newPoint=bezier_curves(point, i);
        xxyy = [parseInt(newPoint.x), parseInt(newPoint.y)]
        xxy.push(xxyy);
    }
    gesture.apply(null, xxy);
};