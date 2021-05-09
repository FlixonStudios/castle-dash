let towerDataArr =[
    {
        id: 0,
        name: 'Turret',
        cost: 100,
        damage: 1,
        speed: 2,
        range: 4,
        towerImg: 'imgs/tower-defense-assets/PNG/Default size/towerDefense_tile292.png',
        projImg:'',
        orientation: 180
    },
    {
        id: 1,
        name: 'Cannon',
        cost: 200,
        damage: 2,
        speed: 1,
        range: 4,
        towerImg: 'imgs/tower-defense-assets/PNG/Default size/towerDefense_tile249.png',
        projImg:'',
        orientation: 270
    }
]
let enemyDataArr = [
    {
        id: 0,
        name: 'Soldier',
        health: 10,
        speed: 3,
        enemyImg: 'imgs/tower-defense-assets/PNG/Default size/towerDefense_tile245.png',
        orientation: 0
    },
    {
        id: 1,
        name: 'EliteSoldier',
        health: 20,
        speed: 3,
        enemyImg: 'imgs/tower-defense-assets/PNG/Default size/towerDefense_tile246.png',
        orientation: 0
    }
]
// Class definitions

let state = {
    isSelecting: false,
    towerToBuild: 0,
    activeTowers: [],
    activeEnemies: []
}

class Tower{
    constructor(name, cost, damage, speed, range, towerImg, projImg, orientation, htmlEle) {
        this.id = getNextID('tower-',state.activeTowers)
        this.name = name
        this.cost = cost
        this.damage = damage
        this.speed = speed
        this.range = range
        this.towerImg = towerImg
        this.projImg = projImg
        this.htmlEle = htmlEle
        this.orientation = orientation
        this.updateCurrentPosition()
    }
    updateCurrentPosition(){
        this.x = this.htmlEle.getBoundingClientRect().x
        this.y = this.htmlEle.getBoundingClientRect().y
        console.log(`${this.x},${this.y}`)
        orientateElement(this.htmlEle, this.orientation)
    }
    aimAtClosestEnemy(){
        let minDist = 9999999999999
        let minX = 0; let minY = 0
        for(let enemy of state.activeEnemies){
            let xDiffSq = Math.pow((this.x - enemy.x),2)
            let yDiffSq = Math.pow((this.y - enemy.y),2)

            // console.log(`${xDiffSq},${yDiffSq}`)

            let dist = Math.sqrt(xDiffSq + yDiffSq)

            // console.log(dist)
            if (dist < minDist)
            {
                minDist = dist
                this.currTarget = enemy.htmlEle
                minX = enemy.x
                minY = enemy.y
                console.log(`${minDist}, ${this.currTarget}`)

            }
        }
        let xDiff = (this.x - minX)
        let yDiff = (this.y - minY)
        console.log(`${xDiff}, ${yDiff}`)

        let deg = (Math.atan(yDiff / xDiff)/(2*Math.PI))*360

        if (yDiff < 0 && xDiff < 0){
            deg += 180
        }else if (yDiff > 0 && xDiff < 0){
            deg += 180
        }

        console.log(deg)
        orientateElement(this.htmlEle, this.orientation + deg)
    }
}

class Enemy{
    constructor(name, health, enemyImg, htmlEle) {
        this.id = getNextID('enemy-',state.activeEnemies)
        this.name = name
        this.health = health
        this.enemyImg = enemyImg
        this.htmlEle = htmlEle
        this.updateCurrentPosition()
    }
    updateCurrentPosition(){
        this.x = this.htmlEle.getBoundingClientRect().x
        this.y = this.htmlEle.getBoundingClientRect().y
        console.log(`${this.x},${this.y}`)
    }

}


// Main Execution
initialiseTowerBar()
initialiseGameArea()
findCellMouseIsOver()
spawnEnemy(0, 0, 0)
spawnEnemy(1, 0, 150)
spawnEnemy(0, 1000, 300)
spawnEnemy(1, 500, 450)

setInterval(updateElementMethods,5000)

// Functions!!
function findDataInArray(id,arr){
    for (let t of arr)
    {
        if(t.id == id){
            return t //returns the object
            break
        }
    }
}

function getNextID(prefix,arr){
    let uid = 0

    if (arr.length !== 0){
        for (let i of arr)
        {
            let currId = i.id
            let str = currId.substr(prefix.length, currId.length+1)

            if (uid < parseInt(str)){
                uid = parseInt(str)
            }
        }
        uid += 1
    }
    return `${prefix}${uid}`
}

function findElementInArr(arr, id){
    for (let i of arr){
        if (i.id == id){
            return i
        }
    }
}

function orientateElement(imageEle, cwDegreesFromTop){
    imageEle.setAttribute('style', `transform: rotate(${cwDegreesFromTop}deg)`)
}

function initialiseTowerBar(){

    towerDataArr.forEach(function(tower, index){

        let towerSlot = document.getElementById(`tower-slot-${index}`)

        //Create Element
        let newTowerBtn = document.createElement('input')

        // Create text or content
        let newTowerBtnText = document.createElement('p')

        newTowerBtn.setAttribute('class', 'btn')
        newTowerBtn.setAttribute('class', 'tower-img')
        newTowerBtn.setAttribute('type', 'image')
        newTowerBtn.setAttribute('name', tower.name)
        newTowerBtn.setAttribute('src', tower.towerImg)
        newTowerBtn.setAttribute('alt', tower.name)
        newTowerBtn.setAttribute('towerId', tower.id)

        orientateElement(newTowerBtn, tower.orientation)

        newTowerBtn.addEventListener('click', selectTower)

        newTowerBtnText.textContent = tower.name
        newTowerBtnText.setAttribute('class', 'tower-name')


        // Append
        towerSlot.appendChild(newTowerBtn)
        towerSlot.appendChild(newTowerBtnText)



        // Add functionality to buttons

    })
}

function initialiseGameArea(){
    let cellColl = document.getElementsByClassName('cell')
    //console.log(cellObj)
    for (let cellElement of cellColl){
        //cellElement.addEventListener('click', buildTower)
    }
}

function selectTower(e){

    let towerId = e.target.getAttribute('towerId')
    let bodyHTML = document.querySelector('body')

    state.isSelecting = true
    state.towerToBuild = towerId

    let towerSelected = {}

    towerSelected = findDataInArray(towerId, towerDataArr)

    let mouseIcon = document.createElement('img')

    mouseIcon.setAttribute('src', towerSelected.towerImg)
    mouseIcon.setAttribute('id', 'follow-cursor')

    bodyHTML.appendChild(mouseIcon)

    document.addEventListener('mousemove', followCursor)
   // mousing over game-area will highlight cell block
    document.addEventListener('mouseover', highlightCell)
   // click to create new tower class

}

function findCellMouseIsOver(){
    document.addEventListener('click', function(e){
        let x = e.clientX
        let y = e.clientY

        //console.log(`${x}, ${y}`)

        let eleUnderArr = document.elementsFromPoint(x,y)
        //console.log(eleUnderArr)
        for(let i of eleUnderArr){
            if(i.className == 'cell' && state.isSelecting === true){
                buildTower(i)
                let cursorOverlayElement = findElementInArr(eleUnderArr, 'follow-cursor')
                removeMouseIcon(cursorOverlayElement)
            }
        }
    })
}

function buildTower(ele){
    let data = {}
    let id = state.towerToBuild
    let cellDiv = ele

    if (state.isSelecting){
        data = findDataInArray(id, towerDataArr)

        let towerImg = document.createElement('img')

        towerImg.setAttribute('src', data.towerImg)

        cellDiv.appendChild(towerImg)

        let tower = new Tower(data.name, data.cost, data.damage,
            data.speed, data.range, data.towerImg, data.projImg, data.orientation, towerImg)

        towerImg.setAttribute('id', tower.id)

        state.activeTowers.push(tower)
        console.log(state.activeTowers)
        console.log(state.activeEnemies)
    }
    state.isSelecting = false
}

function spawnEnemy(id, xPos, yPos){
    let data = {}
    data = findDataInArray(id, enemyDataArr)
    let enemyDiv = document.createElement('div')
    let enemyImg = document.createElement('img')

    enemyImg.setAttribute('src', data.enemyImg)
    enemyDiv.setAttribute('class', 'enemy')

    enemyDiv.style.top = yPos + "px"
    enemyDiv.style.left = xPos + "px"

    let gameArea = document.querySelector('#game-area-container')

    enemyDiv.appendChild(enemyImg)
    gameArea.appendChild(enemyDiv)

    let enemy = new Enemy(data.name, data.health, data.enemyImg, enemyDiv)

    state.activeEnemies.push(enemy)
}

function updateTowerTargets() {
    if(state.activeTowers.length !== 0){
        for(let tower of state.activeTowers) {
            tower.aimAtClosestEnemy()
        }
    }

}

function updateElementMethods(){
    updateTowerTargets();
}

function highlightCell(){

}

function triggerObjectMethods(t){

}



function followCursor(e){
    let x = e.clientX
    let y = e.clientY

    let cursor = document.getElementById('follow-cursor')
    cursor.style.left = x + "px"
    cursor.style.top = y +"px"
}

function removeMouseIcon(ele){
    document.removeEventListener('mousemove', followCursor)
    ele.remove()

}

