auto.waitFor();
app.launchApp('抖音');


//textContains_控件点击("首页")
descContains_控件点击("直播")
sleep(3000)

//replayList=[]
var searchKeyWord = [
    '求关注，秒回，谢谢！',
    '求关注求关注，秒回，谢谢！',
    '求关注求关注求关注，秒回，谢谢！',
    '交朋友交朋友交朋友，必回！',
    '交朋友交朋友交朋友交朋友，必回！',
    '交朋友交朋友交朋友交朋友交朋友，必回！',
    '互粉互粉互粉互粉，绝对回！',
    '互粉互粉互粉互粉互粉，绝对回！',
    '互粉互粉互粉互粉互粉互粉，绝对回！',
];

var keyWord = searchKeyWord[Math.floor(Math.random() * searchKeyWord.length)];

while(true){
    i=1
    while(i<=15){
        textContains_控件点击("说点")
        sleep(random(1000,2000))
        className("android.widget.EditText").findOne(2000).setText(keyWord)
        sleep(random(1000,2000))
        descContains_控件点击("发送")
        sleep(random(5000,8000))
        i=i+1
    }
    slide_down()
    sleep(random(1000,2000))
}


function textContains_控件点击(dname) {
        //var a = dshuxing(dzhi).boundsInside(0, 0, device.width, device.height).findOnce();
        var a = textContains(dname).findOne()
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


function descContains_控件点击(dname) {
        //var a = dshuxing(dzhi).boundsInside(0, 0, device.width, device.height).findOnce();
        var a = descContains(dname).findOne()
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
    

//滑屏
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