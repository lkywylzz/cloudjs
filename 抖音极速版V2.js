auto.waitFor();
let see_count =300;// rawInput('请输入滑动次数','1000');
app.launchApp('抖音极速版');
sleep(5000);
console.show(); //开启日志（悬浮窗权限）
for (var i = 1; i < see_count; i++) {
    toastLog("抖音极速版滑动" + i + '次'+"总计:"+ see_count + "次")
    //sml_move(device.width / 2, device.height*0.8, device.width / 2,  device.height*0.1, 300);
    sml_move(500, 1600, 100,  1000, 300);
    let delayTime = random(8000, 12000);
    sleep(delayTime);
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