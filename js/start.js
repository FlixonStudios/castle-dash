
initialiseStartScreen()

function initialiseStartScreen(){
    if(document.getElementById('quit-btn-img') !== null){
        let quitBtnHTML = document.getElementById('quit-btn-img')
        quitBtnHTML.addEventListener('click', closeWindow)
    }
    loadMusic("music/Mars.wav")
}

function closeWindow(){
    window.close()
}

function loadMusic(url){
    let music = new Audio(url)
    music.loop = true
    music.volume = 0.3
    music.play()
}
