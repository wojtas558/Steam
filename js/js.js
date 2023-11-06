// GLOBAL VARIBLE
var tagsWidth = [];
direction = 1;


function calcView()
{
    height = String(document.getElementById("title").clientHeight * -1 / 2);
    document.getElementById("title").style.marginTop = String(height) + "px";
}
function startSlider()
{
    interval = setInterval(slide, 200);
}

function slide()
{
    slider = document.getElementById('slider').scrollLeft;
    document.getElementById('slider').scrollLeft += 1 * direction;
    if(slider == document.getElementById('slider').scrollLeft)
        clearInterval(direction *= -1);
}

function showScreenshot(slide, screenshot)
{
    document.getElementById("carousel" + String(slide) + "capsule").src = "img/featured/game" + String(slide) + "/screenshot" + String(screenshot) + ".jpg";
    document.getElementById("slide" + String(slide) + "capsule").src = "img/featured/game" + String(slide) + "/screenshot" + String(screenshot) + ".jpg";
}
function changeCapsuleBack(slide)
{
    document.getElementById("carousel" + String(slide) + "capsule").src = "img/featured/game" + String(slide) + "/capsule.jpg";
    document.getElementById("slide" + String(slide) + "capsule").src = "img/featured/game" + String(slide) + "/capsule.jpg";
}

function loadGamePage(title)
{
    window.location.href = "game.html" + "?title=" + title
}

async function changeData()
{
    function extractData(name)
    {        
        function deleteSlash()
        {        
            function changeChar(indeks, newChar)
            {
                dataArray = data.split('');
                dataArray[indeks] = newChar;
                data = dataArray.join('');
            }
            changeChar(data.indexOf("@"), "");
        }
        value = data.substring(data.search(name + ":") + name.length + 2, data.search("@"))
        deleteSlash();
        return value;
    }
    title = new URLSearchParams(window.location.search);
    title = title.get('title');
    data = await getData(title);
    
    // PRESENTATION
    document.getElementById('title').innerHTML = title;
    document.getElementById('title2').innerHTML = title;
    document.getElementById('title3').innerHTML = title;
    document.getElementById('genre').innerHTML = "Gatunek: " + extractData('genre');
    document.getElementById('desc').innerHTML = extractData('desc');
    document.getElementById('lastRev').innerHTML = extractData('lastRev');
    document.getElementById('allRev').innerHTML = extractData('allRev');
    document.getElementById('producent').innerHTML = extractData('producent');
    document.getElementById('publisher').innerHTML = extractData('publisher');
    document.getElementById('releaseDate').innerHTML = extractData('releaseDate');

    // TAGS
    tags = parseInt(extractData('tags'));
    for(let i = 0; i < tags; i++){
        tagsWidth[i] = [];
        tagsWidth[i][1] = extractData('tag' + String(i));
        tagsWidth[i][0] = textWidth(tagsWidth[i][1]);
    }
    changeTags();


    // PRESENTATION IMAGES
    for (let i = 1; i < 6; i++) {
        document.getElementById('carouselSlide' + String(i)).src = 'gameData/' + title + '/image' + String(i) + '.jpg';
        document.getElementById('carouselIndicator' + String(i)).src = 'gameData/' + title + '/image' + String(i) + '.jpg';
    }
    document.getElementById('mainImage').src = 'gameData/' + title + '/main.jpg';


    // BUY
    document.getElementById('title4').innerHTML = title;
    document.getElementById('price').innerHTML = extractData('price');
    if(extractData('discount') == "true")
    {
        document.getElementById('price').classList.add(extractData('discountAmount'));
        document.getElementById('price').classList.add("discount");
        document.getElementById('timeLeft').innerHTML = extractData('timeLeft');
    }
    platforms = parseInt(extractData('platforms'));
    document.getElementById('platforms').innerHTML = "";
    for(let i = 0; i < platforms; i++){
        document.getElementById('platforms').innerHTML += extractData('platform' + String(i));
    }
    
    // ABOUT
    document.getElementById('about').innerHTML = extractData('about');
    
    // FEATURES
    features = parseInt(extractData('features'));
    document.getElementById('features').innerHTML = "";
    for(let i = 0; i < features; i++){
        document.getElementById('features').innerHTML += extractData('feature' + String(i));
    }
    document.getElementById('featuresHeader').style.top = extractData('featuresHeader');
    
    // LINKS
    links = parseInt(extractData('links'));
    document.getElementById('links').innerHTML = "";
    for(let i = 0; i < links; i++){
        document.getElementById('links').innerHTML += extractData('link' + String(i));
    }
    document.getElementById('linksHeader').style.top = extractData('linksHeader');

    // PEGI
    document.getElementById('pegi').src = extractData('pegi');

    // LANGUAGES
    polish = extractData('polish');
    english = extractData('english');
    german = extractData('german');
    spanish = extractData('spanish');
    japanese = extractData('japanese');
    for(let i = 0; i < 3; i++){
        if(polish[i] == 1)
            document.getElementById('polish' + String(i)).innerHTML = "<i class='fa-solid fa-check'></i>"
        else
            document.getElementById('polish' + String(i)).innerHTML = ""
        if(english[i] == 1)
            document.getElementById('english' + String(i)).innerHTML = "<i class='fa-solid fa-check'></i>"
        else
            document.getElementById('english' + String(i)).innerHTML = ""
        if(german[i] == 1)
            document.getElementById('german' + String(i)).innerHTML = "<i class='fa-solid fa-check'></i>"
        else
            document.getElementById('german' + String(i)).innerHTML = ""
        if(spanish[i] == 1)
            document.getElementById('spanish' + String(i)).innerHTML = "<i class='fa-solid fa-check'></i>"
        else
            document.getElementById('spanish' + String(i)).innerHTML = ""
        if(japanese[i] == 1)
            document.getElementById('japanese' + String(i)).innerHTML = "<i class='fa-solid fa-check'></i>"
        else
            document.getElementById('japanese' + String(i)).innerHTML = ""
    }
}

function getData(title){
    data = fetch('Steam/gameData/' + title + '/data.txt')//https://stackoverflow.com/questions/14446447/how-to-read-a-local-text-file-in-the-browser
    .then(response => response.text())
    .then(text => {
        return text;
    })
    return data;
}

function textWidth(text)
{
    font = "700 15px Barlow"
    canvas = document.createElement("canvas");
    context = canvas.getContext("2d");
    context.font = font;
    return context.measureText(text).width
}

function changeTags()
{
    maxWidth = document.getElementById('tags').getBoundingClientRect().width - document.getElementById('plus').getBoundingClientRect().width;
    document.getElementById('tags').innerHTML = '';
    width = 0;
    tags = 0;
    while(width < maxWidth - 5 & tags < tagsWidth.length){
        width += tagsWidth[tags][0] + 23;
        if(width < maxWidth){
            tags++;
        }
    }
    for(let i = 0; i < tags; i++){
        document.getElementById('tags').innerHTML += '<span class="badge">' + tagsWidth[i][1]; + '</span>';
    }
    document.getElementById('tags').innerHTML += '<span class="badge" id="plus"><i class="fa-solid fa-plus"></i></span>';
}

function calculateEndHeight()
{
    h1 = document.getElementById('navbar').getBoundingClientRect().height;
    h2 = document.getElementById('footer').getBoundingClientRect().height;
    document.getElementById('end').style.height = "calc(100vh - " + (parseInt(h1) + parseInt(h2)) + "px)";

}