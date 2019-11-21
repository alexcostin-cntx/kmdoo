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
    // slideType - (cover/description/bullet)
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

//-----------cover animations-------------
//----------------------------------------

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

//-----------slider-------------
//------------------------------

const sliderUnit = {
    // activeSlide
    // previousSlide
    // nextSlide
    slideDuration: 8000
}

// after pressing start reading slider is triggered
function startReading() {
    let coverwidth = document.querySelector(".cover img").clientWidth;
    let cover = document.querySelector(".cover");
    let bottomDiscovered = document.querySelector(".unit-bottom[discovered]");
    let logo = document.querySelector(".logo");
    let details = document.querySelector("#cnx-unit .details");
    
    details.classList.remove("hide"); // details next to logo
    cover.setAttribute("style", `transform: translateX(-${coverwidth}px)`); // move cover out of view
    bottomDiscovered.classList.add("hide"); // hide title and content related to cover
    setTimeout(function() { cover.classList.add('hide') }, 1000);// hide cover after it's out of view
    
    logo.classList = "logo flipLogo" // start logo flip animation
    status.slideType = "description"; // update slider object
    
    startSliderLoop();
    // trigger functions
    // animationsOnSlider();
    // changeSlide(); 
}


function startSliderLoop() {
    let slider = document.querySelector(".slider");
    let sliderFirst = slider.firstElementChild;
    let bottomSlider = document.querySelector(".unit-bottom[slider]");
    
    sliderFirst.setAttribute("active", ""); // show first slide of slider
    bottomSlider.classList.remove("hide"); // show bottom side of slider
    bottomSlider.firstElementChild.classList.remove("hide"); // show bottom content of slider
    
    // update slider object
    sliderUnit.activeSlide = sliderFirst;
    sliderUnit.nextSlide = sliderFirst.nextElementSibling;
    sliderUnit.activeSlide.setAttribute("active", "");
    sliderUnit.previousSlide = sliderFirst;
    status.slideType = sliderFirst.getAttribute("data-type");
    console.log(status.slideType);
    loop();
}

function loop() {
    let content = document.querySelector(".content[description]");
    let text = content.getElementsByClassName("description-1-wrapper")[0];
    content.classList.remove("hide");
    text.classList.add('bounceUp');
    setTimeout(function() { 
        text.classList = "description-1-wrapper";
        content.classList.add("hide");
    }, sliderUnit.slideDuration);
    
    setInterval(function(){ 
        let activeSlide = document.querySelector(".slide[active]");
        let previousSlide = (activeSlide.previousElementSibling !==null) ? activeSlide.previousElementSibling : null;
        let nextSlide = (activeSlide.nextElementSibling !==null) ? activeSlide.nextElementSibling : document.querySelector(".slider").firstElementChild ;
        status.slideType = nextSlide.getAttribute("data-type");
        
        activeSlide.setAttribute("style", `transform: translateX(-${activeSlide.firstElementChild.clientWidth}px)`);
        nextSlide.setAttribute("style", "display: initial");
        
        // animate bottom content
        if (status.slideType === "description") {
            let content = document.querySelector(".content[description]");
            let text = content.getElementsByClassName("description-1-wrapper")[0];
            content.classList.remove("hide");
            text.classList.add('bounceUp');
            setTimeout(function() { 
                text.classList = "description-1-wrapper";
                content.classList.add("hide");
            }, sliderUnit.slideDuration);
            
        } else if (status.slideType === "bullet-list") {
            let content = document.querySelector(".content[bullet-list]");
            let text = content.getElementsByClassName("bullet-1-wrapper")[0];
            content.classList.remove("hide");
            text.classList.add('bounceUp');
            bulletAnimation()
            setTimeout(function() { 
                text.classList = "bullet-1-wrapper";
                content.classList.add("hide");
            }, sliderUnit.slideDuration);
        }
        
        setTimeout(function() { 
            nextSlide.setAttribute("active", " ");
            activeSlide.removeAttribute("active");
            activeSlide.setAttribute("style", " ");
            
            sliderUnit.activeSlide = nextSlide;
            sliderUnit.previousSlide = activeSlide;
            sliderUnit.nextSlide = activeSlide.nextElementSibling;
            if (previousSlide = activeSlide) {
                //    console.log("equals");
            } else {
                // console.log("altu");
                previousSlide.removeAttribute("active");
                previousSlide.setAttribute("style", " ");
            }
            
        }, 1000);
        
    }, sliderUnit.slideDuration);
}

function animationsOnSlider() {
    let slideType = status.slideType;
    let description = document.querySelector(".description-1-wrapper");
    if(slideType == "description") {
        description.classList = "description-1-wrapper";
        description.classList.add('bounceUp');
    }
}

// function changeSlide() {
//     let activeSlide = sliderUnit.activeSlide;
//     let nextSlide = sliderUnit.nextSlide;
//     let slideWidth = activeSlide.firstElementChild.clientWidth;
//     let bottomDescription = document.querySelector(".unit-bottom[slider] .content");

//     setTimeout(function() { 
//         nextSlide.setAttribute("style", "display: initial; z-index: 1");
//         activeSlide.setAttribute("style", `transform: translateX(-${slideWidth}px); z-index: 2`);
//         bottomDescription.classList.add("hide");
//     }, sliderUnit.slideDuration);
//     setTimeout(function() {
//         nextSlide.setAttribute("active", "");
//         activeSlide.removeAttribute("active");
//     }, sliderUnit.slideDuration + 1000);

// }

function triggerOnResize() {
    unitSize();
    displayInfo();
    updateSizeType();
    addSizeClassOnPlayer();
    bottomSizeforPortrait();
}

window.onresize = triggerOnResize;
window.onload = animationsOnLoad;

//-----------bullet list aniamtion-------------
//---------------------------------------------


function bulletAnimation() {
    let titles = document.querySelectorAll(".content[bullet-list] ul li")
    let bulletItemDuration = Math.round(sliderUnit.slideDuration / titles.length);

    titles.forEach(function(element, i){
        let prevElement = (element.previousElementSibling !== null) ? element.previousElementSibling : element ;
        let itemBody = element.getElementsByClassName('item-body')[0];
        let prevItemBody = (prevElement !== null) ? prevElement.getElementsByClassName('item-body')[0] : null;
        let itemHeight = itemBody.scrollHeight;
        console.log(prevElement.getElementsByClassName('item-body')[0]);

        setTimeout(() => {
            if(element.classList == "active") {
                prevItemBody.setAttribute("style", `max-height:0px`);
                element.classList.remove("active");
            } else {
                prevElement.classList.remove("active");
                element.classList.add("active")
                prevItemBody.setAttribute("style", `max-height:0px`);
                itemBody.setAttribute("style", `max-height: ${itemHeight}px`);
            }
        }, (i * bulletItemDuration)-2);
    });
    titles.forEach(function(element, i){
        element.className = "";
        element.getElementsByClassName('item-body')[0].setAttribute("style", `max-height:0px`);
    });

    
}