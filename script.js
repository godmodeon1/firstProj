function hide(hid, shw, lnk) {
    //CONDITIONS
    let CONDITIONS = ["0", ".empty", ".web, .graphics, .illustration, .audio, .video",
                  "1", ".graphics, .illustration, .audio, .video", ".web",
                  "2", ".web, .illustation, .audio, .video", ".graphics",
                  "3", ".graphics, .web, .illustration, .audio", ".video",
                  "4", ".graphics, .web, .audio, .video", ".illustration",
                  "5", ".graphics, .web, .illustration, .video", ".audio"]

    for( let i = 0, x = 0; i < CONDITIONS.length/3; i++){ 
        alert("x:"+ x + " " + "conditions:" + " " + CONDITIONS[x])
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

