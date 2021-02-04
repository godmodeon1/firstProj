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

function filter() {
    // close old imgViews if need
    closeView();

    // start
    const CONDITIONS = ["web", "graphics", "video", "illustration", "audio"],
          thmbBtns = document.querySelectorAll(".filter ul li span"); 
    
    thmbBtns.forEach( (item) => {

    // colorize filter links
        item.addEventListener('click', (event) => {
            thmbBtns.forEach( (el) => {
                el.style.color = ""; // reset Link colors
            });
            event.target.style.color = "#fa6c65"; // colorize Link in red

    // logic
            const classForFilter = event.target.getAttribute('data-class'); // what we need to filter?

            if (classForFilter == 'all') {
                CONDITIONS.forEach( (elem) => { // take classnames from CONDITIONS step by step
                    const i = document.querySelectorAll('.' + elem); // get object with div-elements
                    i.forEach( (x) => {
                        x.style.display = "block";
                    });                   
                });
                    
            } else {
                CONDITIONS.forEach( (elem) => {
                    const elemsForFilter = document.querySelectorAll("." + elem);
                    if (elem !== classForFilter) {
                        elemsForFilter.forEach( (y) => {
                            y.style.display = "none";
                        });
                    } else {
                        elemsForFilter.forEach( (y) => {
                            y.style.display = "";
                        });
                    }
                    
                });
            }
        });
    });
}

    // let hid, shw, lnk;
    // for( let i = 0, x = 0; i < CONDITIONS.length/3; i++){ 
    //     if (push == CONDITIONS[x]) {
    //         lnk = CONDITIONS[x];
    //         hid = CONDITIONS[x+1];
    //         shw = CONDITIONS[x+2];
    //     }
    //     x = x + 3;
    // }
    // //find all what need to hide
    // let toHide = document.querySelectorAll(hid);
    // for( let i = 0; i < toHide.length; i++){ 
    //   toHide[i].style.display = "none";
    // }

    // //find all what need to show
    // let toShow = document.querySelectorAll(shw);
    // for( let i = 0; i < toShow.length; i++){ 
    //   toShow[i].style.display = "block"; 
    // }

    // //for drop red color from prevue link 
    // let clear = document.querySelectorAll('.filter ul li');
    // for( let z = 0; z < clear.length; z++){
    //     clear[z].style.color = "";
    // }

    // //painting the current link in red
    // let selector = 1 + parseInt(lnk);
    // let link = document.querySelector('.filter ul li:nth-child(' + selector +')');
    // link.style.color = "#fa6c65";

    //call func for hide part of thumbnails
    // countThumb('hide', '1');


//Adaptation thumbnails for small screen(hide half elements) ===================================================

// GLOBAL
    // let shwdElems = []; //elems display:block now
    // let counter = 0; //num of shwdElems

// END GLOBAL

// function countThumb(status, tab) { // PLEASE rename func!!!

//     let elem = document.querySelector('.thumbnails');
//     let btn = document.getElementById('showHide');
//     let screenMode = widthScreen();

//    if (tab == 1) {test2hide();} //if page reload or changed filter
    
//     function test2hide() { //seek not hidden elems
//         shwdElems = [];
//         counter = 0;

//         for (let i=0; i<elem.childNodes.length; i++) {
//             try {
//                 let display = elem.childNodes[i].style.display;
//                 if (display == 'block') {
//                     shwdElems.push(i);
//                 }
//             } catch {}
//         }
//         window.shwdElems = shwdElems;
//         counter = shwdElems.length;
//         window.counter = counter;
//         return counter, shwdElems;
//     }

//     if (screenMode == "M") { //smaller than 820 (3 colums)
//         if (status == 'hide') {statusHide();} else if (status == 'show') {statusShow();} else {console.log('ERROR');}

//         function statusHide() {
//             if (counter > 6) {
//                 for (let i = counter - 1; i>=6; i--) {
//                     elem.childNodes[shwdElems[i]].style.display = "none";
//                 }
//                 btn.style.display = "block";
//                 btn.value = "Показать еще";
//                 btn.setAttribute('onclick','countThumb("show", "0")');
//             } else {
//                 btn.style.display = "none";
//             }
//         }

//         function statusShow() {
//             for (let i = window.counter - 1; i>=6; i--) {
//                 elem.childNodes[window.shwdElems[i]].style.display = "block";
//             }   
//             btn.style.display = "block";
//             btn.value = "Скрыть";
//             btn.setAttribute('onclick','countThumb("hide", "0")');
//         }
//     }
// }

// blogslider ===================================================================================================



function blogSlider() {
    
    const blogSliderWrap = document.querySelector('.blogSlider__wrap'),
          nextBtn = document.querySelector('.next'),
          prevBtn = document.querySelector('.prev'),
          btnBlock = document.querySelector(".blog-button");

    let step = 0, 
        slideStep = 0, 
        currentStep = "0px", 
        toRm = 0, 
        screenMode = 0, 
        pushPos = 1, 
        pushCount = 0,
        intervalID = 0;
 
    //count div items in BlogSlider
    const countItems = document.querySelectorAll('.blogSlider__item').length;

    //listener
    nextBtn.addEventListener("click", () => changeSlide('next'), false);
    prevBtn.addEventListener("click", () => changeSlide('prev'), false);
    blogSliderWrap.addEventListener("mouseout", () => timerStart(), false);
    blogSliderWrap.addEventListener("mouseover", function() {clearInterval(intervalID);}, false);



    function changeScreenMode() {
        screenMode = widthScreen();    //get screenMode from fucnc
    }
    changeScreenMode();

    // function rmDots() {  // close OLD dots if need
    
    //     if (document.querySelector(".pushDots")) {
    //         toRm = document.querySelector(".pushDots");
    //         toRm.remove();
    //     }

    // }
    // rmDots();

    function getStep() {
        //get length of step
        if (screenMode == "S") {
            pushCount = countItems;
            slideStep = document.documentElement.offsetWidth + "px";
        } else {
            pushCount = countItems-2;
            slideStep = document.documentElement.offsetWidth / 3 + "px";
        }
        return pushCount, slideStep;
    }
    getStep();

    // function getStep() {
    //     //get length of step
    //     if (screenMode == "S") {
    //         pushCount = countItems;
    //         slideStep = document.documentElement.clientWidth + "px";
    //     } else {
    //         pushCount = countItems-2;
    //         slideStep = document.documentElement.clientWidth / 3 + "px";
    //     }
    //     return pushCount, slideStep;
    // }
    // getStep();


    function makeDots() {
        const oldDots = document.querySelectorAll(".pushDots");
        
        if (oldDots.length > 0) {
            oldDots.forEach((i) => {
                console.log(i);
                i.remove();                
            });
    
        }
        // make NEW dots
        if (!document.querySelector(".pushDots")) {
            for (let i=0; i < pushCount; i++) {
                const btnSpan = document.createElement('span');
                btnSpan.classList.add("pushDots");
                btnSpan.innerHTML = "&bull;";
                btnBlock.appendChild(btnSpan);   
            }
        }    
    }
    makeDots();

    function timerStart() {
        if (intervalID) {clearInterval(intervalID);}
        intervalID = setInterval(changeSlide, 3000, 'next');
    }

    timerStart();

    //change Slide
    function changeSlide(val) {
 
    function testForExistDots() {
        if (pushPos > pushCount) {pushPos = 1; currentStep = "0px";}
        if (pushPos < 1) {pushPos = pushCount; currentStep = "-1 * (" + slideStep + ") * " + (countItems-3);}
    }
        
        changeScreenMode();
        getStep();
        makeDots(); 
        testForExistDots();

        if (val == "next") {
            pushPos++;
            btnBlock.childNodes[pushPos-1].style.color = "darkgray";
        } 

        if (val == "prev") {
            pushPos--;
            btnBlock.childNodes[pushPos+1].style.color = "darkgray";
        }
        
        currentStep = `(${pushPos} - 1) * (-1) * ${slideStep}`;
        console.log(currentStep);
 
    testForExistDots();
 
    //style
    btnBlock.childNodes[pushPos].style.color = "gray";
    step = 'translateX(calc(' + currentStep + '))';
    blogSliderWrap.style.transform = step;
    }    
}

//Scale img from thumbnails and set to center ==================================================================
function imageViewer(id) {
    //close old imgView
    closeView();

    //get URL
 const element = document.querySelector("#" + id),
       background = window.getComputedStyle(element).background || 
           window.getComputedStyle(element, null).getPropertyValue("background-image"),
       imgUrl = background.split('"')[1];
   
    // //get element position
    const coords = element.getBoundingClientRect(),
          scroll = window.pageYOffset,
          imageProportion =  window.innerWidth / coords.width * 0.5,
          imgWidth = coords.width*imageProportion,
          imgHeight = coords.height*imageProportion;

    //create imgView
    let overlay = document.createElement('div'),
        view = document.createElement('div');
    view.classList.add("imgView");
    overlay.classList.add("imgOverlay");
    view.innerHTML = "<input type='button' alt='='Закрыть'' title='Закрыть' value='X' onclick='closeView()'>";
    // view.style.cssText = "top:" + topPosition + "px; left:" + leftPosition + "px; width:" + 
    //         imgWidth + "px; height:" + imgHeight + "px; background: url(" + imgUrl + "); background-size: cover;";
    view.style.cssText = `background: url("${imgUrl}"); background-size: cover; top: calc(${scroll}px + 25%);
         width: ${imgWidth}px; height: ${imgHeight}px`;
  
    document.body.append(overlay);
    document.body.append(view);
    overlay.addEventListener("click", closeView);  

}

//turn off the imgView - close old window if need

function closeView() {

       if (document.querySelector(".imgView")) {
        const toRm1 = document.querySelector(".imgView"),
              toRm2 = document.querySelector(".imgOverlay");
        toRm1.remove();
        toRm2.remove();
    }
}

//turn off the imgView by the press ESC
window.onkeydown = function( event ) {
  
    if ( event.keyCode == 27 ) {
        closeView();
    }
};