function calcView()
{
    height = String(document.getElementById("title").clientHeight * -1 / 2);
    document.getElementById("title").style.marginTop = String(height) + "px";
}


function showScreenshot(slide, screenshot)
{
    document.getElementById("s" + String(slide) + "capsule").src = "img/featured/game" + String(slide) + "/screenshot" + String(screenshot) + ".jpg";
}
function changeCapsuleBack(slide)
{
    document.getElementById("s" + String(slide) + "capsule").src = "img/featured/game" + String(slide) + "/capsule.jpg";
}