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
    // slideType - (cover/description)
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

//-----------animations-------------
//----------------------------------




//-----------animations-------------
//----------------------------------

function animationsOnLoad(){
    let slideType = status.slideType;

    if(slideType == "cover") {

        let title = document.querySelector(".content.cover .title-wrapper");
        let subtitle = document.querySelector(".content.cover .subtitle-wrapper");
        let footer = document.querySelector(".unit-bottom[cover] footer");
        
        subtitle.classList.remove("bounceUp");
        title.classList.remove("bounceUp");
        
        title.classList.add("bounceUp");
        setTimeout(function(){ 
            subtitle.classList.add("bounceUp");
        }, 400);
        setTimeout(function(){ 
            footer.classList.add("bounceUp");
        }, 800);
        
        
    } else if (slideType == "description"){
        // do stuff
    }

}

function animationsOnSlider() {
    let slideType = status.slideType;
    let description = document.querySelector(".description-1-wrapper");
    if(slideType == "description") {
        description.classList = "description-1-wrapper";
        description.classList.add('bounceUp');
    }
    console.log('oioi');
}

//-----------slider-------------
//------------------------------


const sliderUnit = {
    // activeSlide
    // previousSlide
    // nextSlide
    // unitWidth
}


function positionSlider (){
    let slider = document.querySelector(".slider");
    let width = unitSize()[0];
    let cover = document.querySelector(".cover");

    if (cover.clientWidth >0) {
        slider.setAttribute("style", `transform: translateX(${width}px)`);  
    } 
} positionSlider();

function startReading() {
    let coverwidth = document.querySelector(".cover img").clientWidth;
    let cover = document.querySelector(".cover");
    let slider = document.querySelector(".slider");
    let sliderFirst = slider.firstElementChild;
    let details = document.querySelector("#cnx-unit .details");
    let bottomDiscovered = document.querySelector(".unit-bottom[discovered]");
    let bottomSlider = document.querySelector(".unit-bottom[slider]");
    let logo = document.querySelector(".logo");
    
    cover.setAttribute("style", `transform: translateX(-${coverwidth}px)`);
    slider.setAttribute("style", `transform: translateX(0px)`);
    details.classList.remove("hide");
    bottomDiscovered.classList.add("hide");
    bottomSlider.classList.remove("hide");
    bottomSlider.classList.remove("hide");
    status.slideType = "description";
    logo.classList = "logo flipLogo"

    // update slider object
    sliderUnit.activeSlide = sliderFirst;
    sliderUnit.nextSlide = sliderFirst.nextElementSibling;

    sliderUnit.activeSlide.setAttribute("active", "");

    animationsOnSlider()

    setTimeout(function() { cover.classList.add('hide') }, 1000);

}

function changeSlide() {
    let activeSlide = slideUnit.activeSlide;
    let nextSlide = slideUnit.nextSlide;
}


function triggerOnResize() {
    unitSize();
    displayInfo();
    updateSizeType();
    addSizeClassOnPlayer();
    bottomSizeforPortrait();
    positionSlider();
    
}

window.onresize = triggerOnResize;
window.onload = animationsOnLoad;



