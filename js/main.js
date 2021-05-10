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
let waveDataArr = [
        {
            id: 0,
            // defines each subwave
            // [0, 1] means 1st subwave will comprise of enemy '0' and 2nd subwave enemy '1'
            enemyTypes: [0],
            // defines no. of enemies per subwave
            noOfEach: [1],
            // defines interval between each subwave
            intervalInMS: 500
        }
    ]
// Class definitions

let state = {
    isSelecting: false,
    towerToBuild: 0,
    activeTowers: [],
    activeEnemies: [],
    pathArr: [[0,4],[15,4]],
    totalWaves: 1,
    waveInfo: [waveDataArr[0]]
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
        this.gameArea = document.getElementById('game-area')
        this.updateCurrentPosition()
    }
    updateCenterPosition(){
        let cell = this.htmlEle.parentElement
        let eleWidth = this.htmlEle.getBoundingClientRect().width
        let eleHeight = this.htmlEle.getBoundingClientRect().height
        console.log(`eleWH:${eleWidth},${eleHeight}`)
        this.centerX = this.xPosRatio + (eleWidth/getParentWH(cell)[0])/2
        this.centerY = this.yPosRatio + (eleHeight/getParentWH(cell)[1])/2
        console.log(`CenterXY:${this.centerX},${this.centerY}`)
    }
    updateCurrentPosition(){
        let cell = this.htmlEle.parentElement
        let cellId = cell.id

        this.xPosRatio = (cellId % 16) / 16
        this.yPosRatio = (Math.floor(cellId / 16))/ 9
        console.log(`PosRatio:${this.xPosRatio},${this.yPosRatio}`)
        this.updateCenterPosition()
        orientateElement(this.htmlEle, this.orientation)
    }
    aimAtClosestEnemy(){
        let minDist = 9999999999999
        let minX = 0; let minY = 0
        let aTower = this.centerX * this.gameArea.clientWidth
        let oTower = this.centerY * this.gameArea.clientHeight

        for(let enemy of state.activeEnemies){
            let aEnemy = enemy.centerX * this.gameArea.clientWidth
            let oEnemy = enemy.centerY * this.gameArea.clientHeight
            let xDiffSq = Math.pow((aTower - aEnemy),2)
            let yDiffSq = Math.pow((oTower - oEnemy),2)
            let dist = Math.sqrt(xDiffSq + yDiffSq)

            if (dist < minDist)
            {
                minDist = dist
                this.currTarget = enemy.htmlEle
                minX = aEnemy
                minY = oEnemy
                //console.log(`${minDist}, ${this.currTarget}`)
            }
        }
        let xDiff = (aTower - minX)
        let yDiff = (oTower - minY)
        //console.log(`${xDiff}, ${yDiff}`)
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
    constructor(name, health, enemyImg, htmlEle, xPosRatio, yPosRatio) {
        this.id = getNextID('enemy-',state.activeEnemies)
        this.name = name
        this.health = health
        this.enemyImg = enemyImg
        this.htmlEle = htmlEle
        this.xPosRatio = xPosRatio
        this.yPosRatio = yPosRatio
        this.updateCenterPosition()
        this.prevWaypoint = 0
        this.nextWaypoint = []

    }
    updateCenterPosition(){
        let eleWidth = this.htmlEle.getBoundingClientRect().width
        let eleHeight = this.htmlEle.getBoundingClientRect().height

        this.centerX = this.xPosRatio + (eleWidth/getParentWH(this.htmlEle)[0])/2
        this.centerY = this.yPosRatio + (eleHeight/getParentWH(this.htmlEle)[1])/2

    }
    updateCurrentPosition(xRatioToAdd, yRatioToAdd){
        this.xPosRatio += xRatioToAdd
        this.yPosRatio += yRatioToAdd
        console.log(`UpdatePos:${this.x},${this.y}`)
    }
    loadCurrentPosition(){
        this.x = getParentWH(this.htmlEle)[0] * this.xPosRatio
        this.y = getParentWH(this.htmlEle)[1] * this.yPosRatio
        this.htmlEle.style.left = `${this.x}px`
        this.htmlEle.style.top = `${this.y}px`
        //console.log(`LoadPos:${this.x},${this.y}`)
    }
    moveBy(xGrid, yGrid){
        let xToMove = xGrid/16
        let yToMove = yGrid/9

        let xPos = getParentWH(this.htmlEle)[0] * xToMove + this.x
        let yPos = getParentWH(this.htmlEle)[1] * yToMove + this.y

        this.htmlEle.style.left = `${xPos}px`
        this.htmlEle.style.top = `${yPos}px`
        this.updateCurrentPosition()
    }
    findNextWaypoint(){
        if(this.nextWaypoint === []){
            this.nextWaypoint = state.pathArr[1]
        }else{
            this.nextWaypoint = state.pathArr[this.prevWaypoint + 1]
        }
    }
    updatePrevWaypoint(){
        this.prevWaypoint += 1
    }
    moveToWaypoint(){

    }
}


// Main Execution
initialiseTowerBar()
initialiseGameArea()
findCellMouseIsOver()
spawnEnemies()
setInterval(updateElementMethods,100)

// Functions!!

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

function updateElementMethods(){
    updateTowerTargets()
    loadEnemyPosition()
}

function selectTower(e){

    let towerId = e.target.getAttribute('towerId')
    let bodyHTML = document.querySelector('body')

    state.isSelecting = true
    state.towerToBuild = towerId

    let towerSelected = findDataInArray(towerId, towerDataArr)

    let mouseIcon = document.createElement('img')

    mouseIcon.setAttribute('src', towerSelected.towerImg)
    mouseIcon.setAttribute('id', 'follow-cursor')

    bodyHTML.appendChild(mouseIcon)

    document.addEventListener('mousemove', followCursor)
   // mousing over game-area will highlight cell block

   // click to create new tower class

}

function buildTower(ele){
    let data = {}
    let id = state.towerToBuild
    let cellDiv = ele

    if (state.isSelecting){
        data = findDataInArray(id, towerDataArr)

        let towerImg = document.createElement('img')

        towerImg.setAttribute('src', data.towerImg)
        towerImg.setAttribute('class', 'tower-img')

        cellDiv.appendChild(towerImg)

        let tower = new Tower(data.name, data.cost, data.damage,
            data.speed, data.range, data.towerImg, data.projImg, data.orientation, towerImg)

        towerImg.setAttribute('id', tower.id)

        state.activeTowers.push(tower)
        // console.log(state.activeTowers)
        // console.log(state.activeEnemies)
    }
    state.isSelecting = false
}

function spawnEnemies(){
    let spawnPoint = state.pathArr[0]
    let divX = spawnPoint[0]
    let divY = spawnPoint[1]

    let gridXOffset = (1/16)/2
    let gridYOffset = (1/9)/2

    let x = divX/16 // + gridXOffset
    let y = divY/9 // + gridYOffset
    //console.log(`${x}, ${y}`)
    let waveInfoArr = state.waveInfo

    for(let waveCount = 0; waveCount < state.totalWaves; waveCount++){
        let waveData = waveInfoArr[waveCount]

        for(let subwave = 0; subwave < waveData.enemyTypes.length; subwave++){
            setTimeout(function(){
                let enemyToSpawn = waveData.enemyTypes[subwave]
                for (let noOfEnemies = 0; noOfEnemies < waveData.noOfEach[subwave]; noOfEnemies++){
                    setTimeout(spawnEnemy(enemyToSpawn,x,y),0)
                }
            }, waveData.intervalInMS)
        }
    }
}

function spawnEnemy(id, xRatio, yRatio){
    let data = {}
    data = findDataInArray(id, enemyDataArr)
    let enemyDiv = document.createElement('div')
    let enemyImg = document.createElement('img')

    enemyImg.setAttribute('src', data.enemyImg)
    enemyImg.setAttribute('class','enemy-img')
    enemyDiv.setAttribute('class', 'enemy')

    let gameArea = document.getElementById('enemy-container')

    enemyDiv.appendChild(enemyImg)
    gameArea.appendChild(enemyDiv)

    let xPos = getParentWH(enemyDiv)[0] * xRatio
    let yPos = getParentWH(enemyDiv)[1] * yRatio

    enemyDiv.style.top = yPos + "px"
    enemyDiv.style.left = xPos + "px"

    let enemy = new Enemy(data.name, data.health, data.enemyImg, enemyDiv, xRatio, yRatio)

    state.activeEnemies.push(enemy)
}

function getParentWH(childEle){
    let arr = []
    arr[0] = childEle.parentElement.clientWidth
    arr[1] = childEle.parentElement.clientHeight
    return arr
}

function updateTowerTargets() {
    if(state.activeTowers.length !== 0){
        for(let tower of state.activeTowers){
            tower.aimAtClosestEnemy()
        }
    }
}

function loadEnemyPosition(){
    if(state.activeEnemies.length!==0){
        for(let enemy of state.activeEnemies){
            enemy.loadCurrentPosition()
        }
    }
}

function removeMouseIcon(ele){
    document.removeEventListener('mousemove', followCursor)
    ele.remove()
}

function followCursor(e){
    let x = e.clientX
    let y = e.clientY

    let cursor = document.getElementById('follow-cursor')
    cursor.style.left = x + "px"
    cursor.style.top = y +"px"
}

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

function orientateElement(imageEle, cwDegreesFromTop){
    imageEle.setAttribute('style', `transform: rotate(${cwDegreesFromTop}deg)`)
}
