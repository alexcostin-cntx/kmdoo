const sizeP = document.getElementById('unit-size');
const cnxUnit = document.getElementById('cnx-unit');
const unitMain = document.getElementById('unit-main');

const large = 520;
const medium = 400;
const small = 320;
const xsmall = 288;


const status = {
    // unitWidth - number
    // unitHeight - number
    // size - (large / medium / small / xsmall)
    // layout - (portrait / landscape)
    // slideType - ()
    slideType: "cover"
}


// gets player dimensions 
// also updates status.layout
function unitSize() {
    let width = cnxUnit.clientWidth;
    let height = cnxUnit.clientHeight;

    status.unitWidth = width; // update status object
    status.unitHeight = height; // update status object

    if (width >= 400) {
        unitMain.className = ""
        unitMain.classList.add("landscape");
        status.layout = "landscape"; // update status object
    } else {
        unitMain.className = ""
        unitMain.classList.add("portrait");
        status.layout = "portrait"; // update status object
    }
    return [width, height]
} unitSize();


// updates status object with size type (large/medium/small/xsmall)
function updateSizeType() {
    let arr = unitSize();

    if (arr[0] >= large) {
        status.size = "large"; 
    } else if(arr[0] >= medium){
        status.size = "medium";
    } else if(arr[0] >= small){
        status.size = "small";
    } else if(arr[0] >= xsmall){
        status.size = "xsmall";
    } else if(arr[0] <= xsmall){
        status.size = "xsmall";
    }
}updateSizeType();


// adds a size type class on the player main wrapper
function addSizeClassOnPlayer(){
    switch (status.size) {
        case "large":
            cnxUnit.className = "";
            cnxUnit.classList.add("large");
            break;

        case "medium":
            cnxUnit.className = "";
            cnxUnit.classList.add("medium");
            break;

        case "small":
            cnxUnit.className = "";
            cnxUnit.classList.add("small");
            break;

        case "xsmall":
            cnxUnit.className = "";
            cnxUnit.classList.add("xsmall");
            break;
    
        default:
            break;
    }
}addSizeClassOnPlayer();


// prints unit width, height, and sizetype
function displayInfo() {
    let arr = unitSize();
    sizeP.innerHTML = `unit width: ${arr[0]}px | unit height: ${arr[1]}px | ( ${status.size} )`;
} displayInfo();

//if the player is portrait then the bottom part is dinamically computed (1/4 * player width)
// we do this in order to have a total ratio of 4/5 
function bottomSizeforPortrait() {
    let isPortrait = status.layout;
    let oneFourth = unitSize()[0]/4;
    if (isPortrait == "portrait") {
        document.documentElement.style
        .setProperty('--bottomSectionHeight', `${oneFourth}px`);
    } else {
        document.documentElement.style
        .setProperty('--bottomSectionHeight', "72px");
    }
}bottomSizeforPortrait();



function triggerOnResize() {
    unitSize();
    displayInfo();
    updateSizeType();
    addSizeClassOnPlayer();
    bottomSizeforPortrait()
}

window.onresize = triggerOnResize;

function toggleAnimations(){
    let slideType = status.slideType;

    
        if(slideType == "cover") {
            let title = document.querySelector(".content.cover .title-wrapper");
            let subtitle = document.querySelector(".content.cover .subtitle-wrapper");

            subtitle.classList.remove("bounceUp");
            title.classList.remove("bounceUp");

            title.classList.add("bounceUp");
            setTimeout(function(){ 
                subtitle.classList.add("bounceUp");
            }, 400);


        } else if (slideType == "description"){
            // do stuff
        }
   
    
}

window.onload = toggleAnimations;



