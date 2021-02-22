'use strict';

//get screenMode 

function changeScreenMode() {
    const widthSmaller592 = window.matchMedia('(max-width: 592px)'); // for smaller than 592
    const widthSmaller820 = window.matchMedia('(max-width: 820px)'); // for smaller than 820
    const widthBiggest821 = window.matchMedia('(min-width: 821px)'); //for biggest than 821
    let screenMode;
    if (widthSmaller820.matches) {screenMode = "M";} // for smaller than 820
    if (widthSmaller592.matches) {screenMode = "S";} // for smaller than 592
    if (widthBiggest821.matches) {screenMode = "L";} //for biggest than 821
    return screenMode;   
}

// F I L T E R - FOR thumbnail filter

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

// B L O G  S L I D E R ========================================================

function blogSlider() {
    
    const blogSliderWrap = document.querySelector('.blogSlider__wrap'),
        nextBtn = document.querySelector('.next'),
        prevBtn = document.querySelector('.prev'),
        btnBlock = document.querySelector(".blog-button");
        // scrl = document.documentElement.offsetWidth - document.documentElement.clientWidth,
        // wrap = document.querySelectorAll(".blogSlider__item");

    let slideStep = 0, 
        currentStep = "0px", 
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

    function getStep() {
        //get length of step
        if (changeScreenMode() == "S") {
            pushCount = countItems;
            slideStep = "100%";
            // slideStep = document.querySelector(".blogSlider__wrap").offsetWidth + "px";
            console.log(slideStep);
        } else {
            pushCount = countItems-2;
            slideStep = "33%";
        }
        return pushCount, slideStep;
    }
    getStep();

    function makeDots() {
        const oldDots = document.querySelectorAll(".pushDots");
        
        if (oldDots.length > 0) {
            oldDots.forEach((i) => {
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
 
        testForExistDots();
 
        //style
        btnBlock.childNodes[pushPos].style.color = "gray";
        blogSliderWrap.style.transform = 'translateX(calc(' + currentStep + '))';
    }    
}

// I M A G E  V I E W E R - Scale img from thumbnails and set to center ==============================

function imageViewer(id) {
    //close old imgView
    closeView();

    //get URL
    const element = document.querySelector("#" + id),
          background = window.getComputedStyle(element).background || 
            window.getComputedStyle(element, null).getPropertyValue("background-image"),
          imgUrl = background.split('"')[1],
          scrollXWidth = window.innerWidth - document.documentElement.offsetWidth;
    
    let sizeCoof, margLeft;
    if (changeScreenMode() == "S") {
        sizeCoof = 0.9;
        margLeft = `calc((10% - ${scrollXWidth}px)*0.5)`;
        console.log(margLeft);
    } else {
        sizeCoof = 0.5;
        margLeft = `calc((25% - ${scrollXWidth}px))`;
    }
    const coords = element.getBoundingClientRect(),
          scrollY = window.pageYOffset,   
          imageProportion =  window.innerWidth / coords.width * sizeCoof,
          imgWidth = coords.width*imageProportion,
          imgHeight = coords.height*imageProportion,
          margTop = (window.innerHeight - imgHeight) / 2;

    //create imgView
    let overlay = document.createElement('div'),
        view = document.createElement('div');

    view.classList.add("imgView");
    overlay.classList.add("imgOverlay");
    view.innerHTML = "<input type='button' alt='='Закрыть'' title='Закрыть' value='&#10006;' onclick='closeView()'>";
    // view.style.cssText = "top:" + topPosition + "px; left:" + leftPosition + "px; width:" + 
    //         imgWidth + "px; height:" + imgHeight + "px; background: url(" + imgUrl + "); background-size: cover;";
    view.style.cssText = `background: url("${imgUrl}"); 
                          background-size: cover; 
                          left: ${margLeft}; 
                          top: calc(${scrollY}px + ${margTop}px);
                          width: ${imgWidth}px; 
                          height: ${imgHeight}px`;
  
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