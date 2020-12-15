function hide(push) {
    //CONDITIONS
    let CONDITIONS = ["0", ".empty", ".web, .graphics, .illustration, .audio, .video",
                  "1", ".graphics, .illustration, .audio, .video", ".web",
                  "2", ".web, .illustration, .audio, .video", ".graphics",
                  "3", ".graphics, .web, .illustration, .audio", ".video",
                  "4", ".graphics, .web, .audio, .video", ".illustration",
                  "5", ".graphics, .web, .illustration, .video", ".audio"]
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
}

function imageViewer(id) {
    //close old window if need
    if (document.querySelector(".imgView") != null) {
        let toRm = document.querySelector(".imgView");
        toRm.remove();
    }

    //get URL
    element = document.querySelector("#" + id);
    background = window.getComputedStyle(element).background;
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
    view.innerHTML = "<input type='button' alt='='Закрыть'' title='Закрыть' value='X' onclick='rmElem(this.parentNode.className)'>";
    view.style.cssText = "top:" + topPosition + "px; left:" + leftPosition + "px; width:" + 
            imgWidth + "px; height:" + imgHeight + "px; background: url(" + imgUrl + "); background-size: cover;";
    document.body.append(view);

}
function rmElem(id) {
    let toRm = document.querySelector("." + id);
    toRm.remove();
}