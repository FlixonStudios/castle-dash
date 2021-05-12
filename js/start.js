
initialiseStartScreen()

function initialiseStartScreen(){
    if(document.getElementById('quit-btn-img') !== undefined){
        let quitBtnHTML = document.getElementById('quit-btn-img')
        quitBtnHTML.addEventListener('click', closeWindow)
    }
}

function closeWindow(){
    window.close()
}
// function editWinLoseText(isWin){
//     if(document.getElementById('title-text') !== undefined){
//         let winTextHTML = document.getElementById('title-text')
//         if(isWin){
//             winTextHTML.innerText = "YOU lOST :("
//             winTextHTML.style.color = "red"
//         }else{
//             winTextHTML.innerText = "YOU WON!"
//             winTextHTML.style.color = "yellow"
//         }
//     }
// }
