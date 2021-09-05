auto.waitFor();
app.launchApp('抖音极速版');
sleep(6000);
console.show(); //开启日志（悬浮窗权限）31 31 17 
youngWin();
let ImageView = className("android.widget.ImageView").depth(3).find();
if (ImageView.length == 3) {
    ImageView[0].click();
    sleep(3000);
    if (className("android.view.View").text("去领取").exists()) {
        console.log("抖音去领取");
        let b = text("去领取").findOne().bounds();
        click(b.centerX(), b.centerY());
        sleep(25000);
        if (className("android.widget.textView").text("关闭广告").exists()){
            className("android.widget.textView").text("关闭广告").findOne().click();
        }
    }
    swipe(device.width / 2, device.height - 200, device.width / 2, 500, 700);
    if (text("去查看").exists()) {
        console.log("抖音去查看");
        let b = text("去查看").findOne().bounds();
        click(b.centerX(), b.centerY());
    }
}
sleep(10000);
//关闭当前程序
console.hide();
home();
exit();
/**如果弹出青少年窗口，点击 */
function youngWin() {
    if (youngWin = text("我知道了").exists()) {
        console.log("点击了我知道了(青少年窗口)");
        youngWin.click();
    };
}