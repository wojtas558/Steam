function calcView()
{
    height = String(document.getElementById("title").clientHeight * -1 / 2);
    document.getElementById("title").style.marginTop = String(height) + "px";
}