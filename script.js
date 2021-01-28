'use strict';

//get screenMode 

function widthScreen() {
    const widthSmaller592 = window.matchMedia('(max-width: 592px)'); // for smaller than 592
    const widthSmaller820 = window.matchMedia('(max-width: 820px)'); // for smaller than 820
    const widthBiggest821 = window.matchMedia('(min-width: 821px)'); //for biggest than 821
    let screenMode;
    if (widthSmaller820.matches) {screenMode = "M";} // for smaller than 820
    if (widthSmaller592.matches) {screenMode = "S";} // for smaller than 592
    if (widthBiggest821.matches) {screenMode = "L";} //for biggest than 821
    return screenMode;
}

//FOR thumbnail filter

function hide(push) {
    //close old imgViews if need
    closeView();
    //CONDITIONS

    let CONDITIONS = ["0", ".empty", ".web, .graphics, .illustration, .audio, .video",
                  "1", ".graphics, .illustration, .audio, .video", ".web",
                  "2", ".web, .illustration, .audio, .video", ".graphics",
                  "3", ".graphics, .web, .illustration, .audio", ".video",
                  "4", ".graphics, .web, .audio, .video", ".illustration",
                  "5", ".graphics, .web, .illustration, .video", ".audio"];
    let hid, shw, lnk;
    for( let i = 0, x = 0; i < CONDITIONS.length/3; i++){ 
        if (push == CONDITIONS[x]) {
            lnk = CONDITIONS[x];
            hid = CONDITIONS[x+1];
            shw = CONDITIONS[x+2];
        }
        x = x + 3;
    }
    //find all what need to hide
    let toHide = document.querySelectorAll(hid);
    for( let i = 0; i < toHide.length; i++){ 
      toHide[i].style.display = "none";
    }

    //find all what need to show
    let toShow = document.querySelectorAll(shw);
    for( let i = 0; i < toShow.length; i++){ 
      toShow[i].style.display = "block"; 
    }

    //for drop red color from prevue link 
    let clear = document.querySelectorAll('.filter ul li');
    for( let z = 0; z < clear.length; z++){
        clear[z].style.color = "";
    }

    //painting the current link in red
    let selector = 1 + parseInt(lnk);
    let link = document.querySelector('.filter ul li:nth-child(' + selector +')');
    link.style.color = "#fa6c65";

    //call func for hide part of thumbnails
    countThumb('hide', '1');
}

//Adaptation thumbnails for small screen(hide half elements) ===================================================

// GLOBAL
    let shwdElems = []; //elems display:block now
    let counter = 0; //num of shwdElems

// END GLOBAL

function countThumb(status, tab) { // PLEASE rename func!!!

    let elem = document.querySelector('.thumbnails');
    let btn = document.getElementById('showHide');
    let screenMode = widthScreen();

   if (tab == 1) {test2hide();} //if page reload or changed filter
    
    function test2hide() { //seek not hidden elems
        shwdElems = [];
        counter = 0;

        for (let i=0; i<elem.childNodes.length; i++) {
            try {
                let display = elem.childNodes[i].style.display;
                if (display == 'block') {
                    shwdElems.push(i);
                }
            } catch {}
        }
        window.shwdElems = shwdElems;
        counter = shwdElems.length;
        window.counter = counter;
        return counter, shwdElems;
    }

    if (screenMode == "M") { //smaller than 820 (3 colums)
        if (status == 'hide') {statusHide();} else if (status == 'show') {statusShow();} else {console.log('ERROR');}

        function statusHide() {
            if (counter > 6) {
                for (let i = counter - 1; i>=6; i--) {
                    elem.childNodes[shwdElems[i]].style.display = "none";
                }
                btn.style.display = "block";
                btn.value = "Показать еще";
                btn.setAttribute('onclick','countThumb("show", "0")');
            } else {
                btn.style.display = "none";
            }
        }

        function statusShow() {
            for (let i = window.counter - 1; i>=6; i--) {
                elem.childNodes[window.shwdElems[i]].style.display = "block";
            }   
            btn.style.display = "block";
            btn.value = "Скрыть";
            btn.setAttribute('onclick','countThumb("hide", "0")');
        }
    }
}

// blogslider ===================================================================================================


function blogSlider() {

    let item = document.querySelector('.blogSlider__wrap');
    let nextBtn = document.querySelector('.next');
    let prevBtn = document.querySelector('.prev');
    let pushPos = 1;
    let pushCount = 0;
    let step, slideStep, currentStep, toRm, screenMode, countItems;
    let btnBlock = document.querySelector(".blog-button");

    //count div items in BlogSlider
    countItems = document.querySelectorAll('.blogSlider__item').length;

    //pushPosDots
        //close OLD dots if need
    if (document.querySelector(".pushDots") != null) {
        toRm = document.querySelector(".pushDots");
        toRm.remove();
    }

    //get screenMode from fucnc
    screenMode = widthScreen();
    console.log("screenMode: " + screenMode);
    //get length of step
    if (screenMode == "S") {
        pushCount = countItems;
        slideStep = document.documentElement.clientWidth + "px";
    } else {
        pushCount = countItems-2;
        slideStep = document.documentElement.clientWidth / 3 + "px";
    }

    currentStep = "0px";

    //make NEW dots
    for (let i=0; i < pushCount; i++) {
        let btnSpan = document.createElement('span');
        btnSpan.classList.add("pushDots");
        btnSpan.innerHTML = "&bull;";
        btnBlock.appendChild(btnSpan);   
    }    

    //listener
    nextBtn.addEventListener("click", () => changeSlide('next'), false);
    prevBtn.addEventListener("click", () => changeSlide('prev'), false);
    item.addEventListener("mouseout", () => timerStart(), false);
    item.addEventListener("mouseover", function() {clearInterval(intervalID);}, false);

    //timer
    let intervalID;
    function timerStart() {
    intervalID = setInterval(changeSlide, 3000, 'next');
    }

    timerStart();

    //change Slide
    function changeSlide(val) {
        if (val == "next") {
            pushPos++;
            btnBlock.childNodes[pushPos-1].style.color = "darkgray";
        } 
        if (val == "prev") {
            pushPos--;
            btnBlock.childNodes[pushPos+1].style.color = "darkgray";
        }
        
        currentStep = (pushPos-1) + " * (-1) * " + slideStep;

        if (pushPos > pushCount) {pushPos = 1; currentStep = "0px";}
        if (pushPos < 1) {pushPos = pushCount; currentStep = "-1 * (" + slideStep + ") * " + (countItems-3)}
    
    //style
    btnBlock.childNodes[pushPos].style.color = "gray";
    step = 'translateX(calc(' + currentStep + '))';
    item.style.transform = step;
}    
}

//Scale img from thumbnails and set to center ==================================================================
function imageViewer(id) {
    //close old imgView
    closeView();

    //get URL
    element = document.querySelector("#" + id);
    background = window.getComputedStyle(element).background || window.getComputedStyle(element, null).getPropertyValue("background-image");
    imgUrl = background.split('"')[1];
   
    //get element position
    let coords = element.getBoundingClientRect();

    //get current scroll
    let scroll = window.pageYOffset;

    //get window size and calc image-sizing and proportion
    let imageProportion =  window.innerWidth / coords.width * 0.5;
    let imgWidth = coords.width*imageProportion;
    let imgHeight = coords.height*imageProportion;
    let topPadding = (window.innerHeight - coords.height*imageProportion) / 2;
    let topPosition = scroll + topPadding;
    let leftPosition = (window.innerWidth - imgWidth) / 2;

    //create imgView
    let view = document.createElement('div');
    view.classList.add("imgView")
    view.innerHTML = "<input type='button' alt='='Закрыть'' title='Закрыть' value='X' onclick='closeView()'>";
    view.style.cssText = "top:" + topPosition + "px; left:" + leftPosition + "px; width:" + 
            imgWidth + "px; height:" + imgHeight + "px; background: url(" + imgUrl + "); background-size: cover;";
    document.body.append(view);

}

//turn off the imgView
function closeView() {
    //close old window if need
       if (document.querySelector(".imgView") != null) {
        let toRm = document.querySelector(".imgView");
        toRm.remove();
    }
}

//turn off the imgView by the press ESC
window.onkeydown = function( event ) {
    closeView();
    if ( event.keyCode == 27 ) {
    }
};