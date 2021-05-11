// Databases

let towerDataArr =[
    {
        id: 0,
        name: 'Turret',
        cost: 100,
        damage: 1,
        speed: 2,
        range: 4,
        towerImg: 'imgs/tower-defense-assets/PNG/Default size/towerDefense_tile292.png',
        orientation: 180,
        projectileId: 0
    },
    {
        id: 1,
        name: 'Cannon',
        cost: 200,
        damage: 2,
        speed: 1,
        range: 4,
        towerImg: 'imgs/tower-defense-assets/PNG/Default size/towerDefense_tile249.png',
        orientation: 270,
        projectileId: 1
    }
]
let enemyDataArr = [
    {
        id: 0,
        name: 'Soldier',
        health: 3,
        speed: 0.01,
        enemyImg: 'imgs/tower-defense-assets/PNG/Default size/towerDefense_tile245.png',
        orientation: 0
    },
    {
        id: 1,
        name: 'EliteSoldier',
        health: 6,
        speed: 0.01,
        enemyImg: 'imgs/tower-defense-assets/PNG/Default size/towerDefense_tile246.png',
        orientation: 0
    }
]
let waveDataArr = [
        {
            id: 0,
            // defines each subwave
            // [0, 1] means 1st subwave will comprise of enemy '0' and 2nd subwave enemy '1'
            enemyTypes: [0, 0, 0, 0, 0],
            // defines no. of enemies per subwave
            noOfEach: [1, 1, 1, 1, 1],
            // defines interval between each subwave
            interval: [2000, 2000, 2000, 2000, 2000],
            pauseTillNextWave: 7000
        },
        {
            id: 1,
            // defines each subwave
            // [0, 1] means 1st subwave will comprise of enemy '0' and 2nd subwave enemy '1'
            enemyTypes: [0, 1, 0, 1, 0],
            // defines no. of enemies per subwave
            noOfEach: [1, 1, 1, 1, 1],
            // defines interval between each subwave
            interval: [2000, 3000, 2000, 3000, 2000],
            pauseTillNextWave: 1000
        },
        {
            id: 2,
            // defines each subwave
            // [0, 1] means 1st subwave will comprise of enemy '0' and 2nd subwave enemy '1'
            enemyTypes: [0],
            // defines no. of enemies per subwave
            noOfEach: [1],
            // defines interval between each subwave
            interval: [1000],
            pauseTillNextWave: 7000
        }
    ]
let projectileDataArr = [
    {
        id: 0,
        name: 'cannonball',
        speed: 0.4,
        projImg:'imgs/tower-defense-assets/PNG/Default size/towerDefense_tile272.png',
        orientation: 0
    },
    {
        id: 1,
        name: 'fireshot',
        speed: 0.8,
        projImg:'imgs/tower-defense-assets/PNG/Default size/towerDefense_tile297.png',
        orientation: 90
    }
]

// State Tracker

let state = {
    gameSpeed: 1, //some issues here
    isSelecting: false,
    towerToBuild: 0,
    activeTowers: [],
    activeEnemies: [],
    activeProjectiles:[],
    pathArr: [[0,4],[3,4],[3,1],[13,1],[13,4],[15,4]],
    totalWaves: 1,
    waveInfo: [waveDataArr[2]],// [waveDataArr[0], waveDataArr[1]],
    timeBetweenWaves: 2000,
    scene: {},
    playerHealth: 3,
    playerGold: 0,
}

// Class definitions

class Scene{
    constructor(ele, xGrid, yGrid) {
        this.ele = ele
        this.xGrid = xGrid
        this.yGrid = yGrid
        this.updateSceneParams()
    }
    updateSceneParams(){
        this.sceneW = this.ele.clientWidth
        this.sceneH = this.ele.clientHeight
        this.xUnit = this.sceneW/this.xGrid
        this.yUnit = this.sceneH/this.yGrid
        this.xHalf = this.xUnit/2
        this.yHalf = this.yUnit/2
    }
}

class Tower{
    constructor(name, cost, damage, speed, range, towerImg, orientation, htmlEle, projectileId) {
        this.id = getNextID('tower-',state.activeTowers)
        this.name = name
        this.cost = cost
        this.damage = damage
        this.speed = speed
        this.reloadTime = 0
        this.range = range
        this.towerImg = towerImg
        this.htmlEle = htmlEle
        this.orientation = orientation
        this.xDir = 1
        this.yDir = 0
        this.projectileId = projectileId
        this.projectileData = findObjectInArray(projectileId, projectileDataArr)
        this.gameArea = document.getElementById('game-area')
        this.updateCurrentPosition()
    }
    updateCenterPosition(){
        let cell = this.htmlEle.parentElement
        let eleWidth = this.htmlEle.getBoundingClientRect().width
        let eleHeight = this.htmlEle.getBoundingClientRect().height
        // console.log(`eleWH:${eleWidth},${eleHeight}`)
        this.centerX = this.xPosRatio + (eleWidth/getParentWH(cell)[0])/2
        this.centerY = this.yPosRatio + (eleHeight/getParentWH(cell)[1])/2
        // console.log(`CenterXY:${this.centerX},${this.centerY}`)
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
                this.currTarget = enemy
                minX = aEnemy
                minY = oEnemy
            }
        }
        let xDiff = (aTower - minX)
        let yDiff = (oTower - minY)

        this.xDir = xDiff / Math.sqrt(Math.pow(xDiff,2)+Math.pow(yDiff,2))
        this.yDir = yDiff / Math.sqrt(Math.pow(xDiff,2)+Math.pow(yDiff,2))

        let deg = tanInv(yDiff, xDiff)

        orientateElement(this.htmlEle, this.orientation + deg)
    }
    isInRange(target){
        let gameParams = state.scene

        let xDiff = (target.centerX - this.centerX) * gameParams.sceneW
        let yDiff = (target.centerY - this.centerY) * gameParams.sceneH

        let range = this.range * magnitude(gameParams.sceneW/gameParams.xGrid,
                                            gameParams.sceneH/gameParams.yGrid)
        let dist = magnitude(xDiff, yDiff)

        return (dist <= range)
    }
    fire(){
        if(this.isInRange(this.currTarget)){
            let data = this.projectileData
            if (this.reloadTime <= 0){
                let p = new Projectile(data.name, data.speed, this.damage, data.projImg,
                    data.orientation, this.currTarget,
                    this.xPosRatio, this.yPosRatio,
                    this.xDir, this.yDir)
                state.activeProjectiles.push(p)

                this.reloadTime = 100
            }else{
                this.reloadTime -= this.speed
            }
        }
    }
}

class Enemy{
    constructor(name, health, speed, enemyImg, htmlEle, xPosRatio, yPosRatio) {
        this.id = getNextID('enemy-',state.activeEnemies)
        this.name = name
        this.health = health
        this.speed = speed
        this.enemyImg = enemyImg
        this.htmlEle = htmlEle //enemyDiv
        this.xPosRatio = xPosRatio
        this.yPosRatio = yPosRatio
        this.updateCenterPosition()
        this.updateCollider()
        this.prevWaypoint = 0
        this.nextWaypoint = []
        this.findNextWaypoint()
        this.toDestroy = false
    }
    updateCenterPosition(){
        let eleWidth = this.htmlEle.getBoundingClientRect().width
        let eleHeight = this.htmlEle.getBoundingClientRect().height
        this.centerX = this.xPosRatio + (eleWidth/ state.scene.sceneW)/2
        this.centerY = this.yPosRatio + (eleHeight/state.scene.sceneH)/2
        // console.log(`${this.xPosRatio}, ${this.yPosRatio}, ${this.centerX}, ${this.centerY}`)
        // console.log(`collider: ${this.collider}`)
    }
    updateCurrentPosition(xRatioToAdd, yRatioToAdd){
        this.xPosRatio += xRatioToAdd
        this.yPosRatio += yRatioToAdd
        this.updateCenterPosition()
        this.updateCollider()
    }

    loadCurrentPosition(){
        this.x = getParentWH(this.htmlEle)[0] * this.xPosRatio
        this.y = getParentWH(this.htmlEle)[1] * this.yPosRatio
        this.htmlEle.style.left = `${this.x}px`
        this.htmlEle.style.top = `${this.y}px`
    }
    updateCollider(){
        this.collider = setCollider(this.centerX, this.centerY,
            this.xPosRatio, this.yPosRatio, 0.5)
    }
    findNextWaypoint(){

        if(this.nextWaypoint === []){
            this.nextWaypoint = state.pathArr[1]
        }else if(this.prevWaypoint+1 < state.pathArr.length){
            this.nextWaypoint = state.pathArr[this.prevWaypoint + 1]
        }else{
            this.nextWaypoint = state.pathArr[state.pathArr.length-1]
            this.htmlEle.style.display = 'none'
            this.toDestroy = true
        }
    }
    isAtNextWaypoint(){
        let nextXGrid = this.nextWaypoint[0] //+ gridToRatio(16, 0.5)
        let nextYGrid = this.nextWaypoint[1] //+ gridToRatio(9, 0.5)

        let xDeltaRatio = gridToRatio(16, nextXGrid) - this.centerX
        let yDeltaRatio = gridToRatio(9, nextYGrid) - this.centerY
        // need to amend percentage as pixels on y and x is different
        return (Math.abs(xDeltaRatio) < 0.03 && Math.abs(yDeltaRatio) < 0.03)
    }
    move(){
        if(this.isAtNextWaypoint()){
            this.findNextWaypoint()
            this.prevWaypoint += 1
        }
        let speed = this.speed

        let nextXGrid = this.nextWaypoint[0]//+ gridToRatio(16, 0.5)
        let nextYGrid = this.nextWaypoint[1]//+ gridToRatio(9, 0.5)

        let xDeltaRatio = gridToRatio(16, nextXGrid) - this.centerX
        let yDeltaRatio = gridToRatio(9, nextYGrid) - this.centerY

        let magnitude = Math.sqrt(Math.pow(xDeltaRatio,2) + Math.pow(yDeltaRatio,2))

        let unitXRatio = xDeltaRatio / magnitude
        let unitYRatio = yDeltaRatio / magnitude

        let newXPosRatio = unitXRatio * speed * state.gameSpeed/10
        let newYPosRatio = unitYRatio * speed * state.gameSpeed/10

        this.updateCurrentPosition(newXPosRatio, newYPosRatio)
    }
    destroyThis(){
        let currId = this.id
        let enemyIndex = state.activeEnemies.findIndex(function (ele){
            return (ele['id'] === currId)
        })
        state.activeEnemies.splice(enemyIndex, 1)
        this.htmlEle.remove()
    }
    checkHealth(){
        if(this.health <= 0){
            this.toDestroy = true
        }
    }
}

class Projectile{
    constructor(name, speed, damage, projImg, orientation,
                target, xPosRatio, yPosRatio, xDir, yDir) {
        this.id = getNextID('proj-',state.activeProjectiles)
        this.name = name
        this.speed = speed
        this.damage = damage
        this.projImg = projImg
        this.orientation = orientation
        this.target = target
        this.xDir = xDir
        this.yDir = yDir
        this.xPosRatio = xPosRatio
        this.yPosRatio = yPosRatio

        this.toDestroy = false
        this.initialiseProjectile()
        this.updateCenterPosition()
        this.updateCollider()
    }
    initialiseProjectile(){
        let projDiv = document.createElement('div')
        let htmlImg = document.createElement('img')

        this.htmlImg = htmlImg

        projDiv.setAttribute('class', 'projectile')
        htmlImg.setAttribute('class', 'projectile-img')
        htmlImg.setAttribute('src', this.projImg)

        orientateElement(htmlImg, this.orientation)

        let gameArea = document.getElementById("projectile-container")

        projDiv.appendChild(htmlImg)
        gameArea.appendChild(projDiv)

        this.htmlEle = projDiv
        //console.log(state.activeProjectiles)
    }
    updateCurrentPosition(xRatioToAdd, yRatioToAdd){
        this.xPosRatio += xRatioToAdd
        this.yPosRatio += yRatioToAdd
        this.updateCenterPosition()
        this.loadCurrentPosition()
        this.updateCollider()
    }
    updateCenterPosition(){
        let eleWidth = this.htmlEle.getBoundingClientRect().width
        let eleHeight = this.htmlEle.getBoundingClientRect().height
        this.centerX = this.xPosRatio + (eleWidth/state.scene.sceneW)/2
        this.centerY = this.yPosRatio + (eleHeight/state.scene.sceneW)/2
    }
    loadCurrentPosition(){
        this.x = getParentWH(this.htmlEle)[0] * this.xPosRatio
        this.y = getParentWH(this.htmlEle)[1] * this.yPosRatio
        this.htmlEle.style.left = `${this.x}px`
        this.htmlEle.style.top = `${this.y}px`
    }
    updateCollider(){
        this.collider = setCollider(this.centerX, this.centerY,
            this.xPosRatio, this.yPosRatio, 0.75)
    }
    move(){
        if (!this.isOutOfBounds()){
            let unitXRatio = -this.xDir
            let unitYRatio = -this.yDir

            let deg = tanInv(-unitYRatio, -unitXRatio)

            let newXPosRatio = unitXRatio * this.speed * state.gameSpeed/100
            let newYPosRatio = unitYRatio * this.speed * state.gameSpeed/100

            this.updateCurrentPosition(newXPosRatio, newYPosRatio)
            orientateElement(this.htmlImg, this.orientation + deg)
        }
    }
    isOutOfBounds(){
        if((this.centerX > 1 || this.centerY > 1)||
            (this.centerX < 0 || this.centerY < 0)){
            this.toDestroy = true
            return true
        } else {
            return false
        }
    }
    dealDamage(targetToDamage){
        targetToDamage.health -= this.damage
        this.toDestroy = true
    }
    destroyThis(){
        let currId = this.id
        let projIndex = state.activeProjectiles.findIndex(function (ele){
            return (ele['id'] === currId)
        })
        state.activeProjectiles.splice(projIndex, 1)
        this.htmlEle.remove()
    }
}

// Main Execution

initialiseTowerBar()
initialiseGameArea()
findCellMouseIsOver()
spawnEnemies()
setInterval(updateElementMethods,16/state.gameSpeed)

// Functions!!

// Run-Once Functions
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
    let gameArea = document.getElementById('game-area-container')
    let scene = new Scene(gameArea, 16, 9)
    state.scene = scene

}
// Keep Running Functions
function updateElementMethods(){
    updateTowerTargets()
    loadEnemyPosition()
    checkColliders()
    fireProjectiles()
    moveProjectiles()
    moveEnemies()
    destroyEnemies()
    destroyProjectiles()
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
function checkColliders(){
    if(state.activeEnemies.length !== 0 &&
        state.activeProjectiles.length !== 0){
        for(let enemy of state.activeEnemies){
            for (let projectile of state.activeProjectiles){
                if(isCollided(enemy, projectile)){
                    projectile.dealDamage(enemy)
                    enemy.checkHealth()
                    console.log("HIT")
                }
            }
        }
    }
}

function moveEnemies(){
    if(state.activeEnemies.length!==0){
        for(let enemy of state.activeEnemies){
            enemy.move()
        }
    }
}
function destroyEnemies(){
    for(let enemy of state.activeEnemies){
        if(enemy.toDestroy === true){
            enemy.destroyThis()
        }
    }
}
function fireProjectiles(){
    if(state.activeTowers.length !== 0
        && state.activeEnemies.length !== 0){
        for(let tower of state.activeTowers){
            tower.fire()
        }
    }
}
function moveProjectiles(){
    if(state.activeProjectiles.length !==0){
        for(let projectile of state.activeProjectiles){
            projectile.move()
        }
    }
}
function destroyProjectiles(){
    if(state.activeProjectiles.length !==0){
        for (let projectile of state.activeProjectiles){
            if (projectile.toDestroy){
                projectile.destroyThis()
            }
        }
    }
}

function selectTower(e){

    let towerId = e.target.getAttribute('towerId')
    let bodyHTML = document.querySelector('body')

    state.isSelecting = true
    state.towerToBuild = towerId

    let towerSelected = findObjectInArray(towerId, towerDataArr)

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

    if (state.isSelecting){
        data = findObjectInArray(id, towerDataArr)

        let towerImg = document.createElement('img')

        towerImg.setAttribute('src', data.towerImg)
        towerImg.setAttribute('class', 'tower-img')

        ele.appendChild(towerImg)

        let tower = new Tower(data.name, data.cost, data.damage,
            data.speed, data.range, data.towerImg, data.orientation, towerImg, data.projectileId)

        towerImg.setAttribute('id', tower.id)

        state.activeTowers.push(tower)
    }
    state.isSelecting = false
}
function updatePlayerHealth(){

}
function spawnEnemies(){
    let spawnPoint = state.pathArr[0]
    let divX = spawnPoint[0]
    let divY = spawnPoint[1]

    let x = divX/state.scene.xGrid
    let y = divY/state.scene.yGrid

    let waveInfoArr = state.waveInfo
    let timeline = 0 // the linear progression of time

    for(let waveCount = 0; waveCount < state.totalWaves; waveCount++){
        let waveData = waveInfoArr[waveCount]
        setTimeout(function(){

            for(let subwave = 0; subwave < waveData.enemyTypes.length; subwave++){

                setTimeout(function(){
                    let enemyToSpawn = waveData.enemyTypes[subwave]

                    for (let noOfEnemies = 0; noOfEnemies < waveData.noOfEach[subwave];
                         noOfEnemies++){
                        setTimeout(function(){
                            spawnEnemy(enemyToSpawn, x, y)
                            }, 0)
                    }
                }, timeline)
                timeline += waveData.interval[subwave]
            }
            timeline += waveData.pauseTillNextWave
        }, timeline)
    }
}
function spawnEnemy(id, xRatio, yRatio){
    let data = findObjectInArray(id, enemyDataArr)
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

    let enemy = new Enemy(data.name, data.health, data.speed,
                            data.enemyImg, enemyDiv, xRatio, yRatio)

    state.activeEnemies.push(enemy)
}
// Functional Functions
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
function getParentWH(childEle){
    let arr = []
    arr[0] = childEle.parentElement.clientWidth
    arr[1] = childEle.parentElement.clientHeight
    return arr
}
function findObjectInArray(id,arr){
    for (let t of arr){
        if(t.id == id){
            return t //returns the object
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
                let cursorOverlayElement = findObjectInArray('follow-cursor', eleUnderArr,)
                removeMouseIcon(cursorOverlayElement)
            }
        }
    })
}
function orientateElement(imageEle, cwDegreesFromTop){
    imageEle.setAttribute('style', `transform: rotate(${cwDegreesFromTop}deg)`)
}
function gridToRatio(totalGridLength, gridToMove){
    return gridToMove / totalGridLength
}
function tanInv(opp, adj){
    let deg = (Math.atan(opp / adj)/(2*Math.PI))*360
    if (opp < 0 && adj < 0){
        deg += 180
    }else if (opp > 0 && adj < 0){
        deg += 180
    }
    return deg
}
function magnitude(x,y){
    return Math.sqrt(Math.pow(x,2)+Math.pow(y,2))
}
function setCollider(centerX, centerY, left, top, size = 1){

    let leftBorder = centerX - (centerX - left) * size
    let rightBorder = centerX + (centerX - left) * size
    let topBorder = centerY - (centerY - top) * size
    let bottomBorder = centerY + (centerY - top) * size

    return [leftBorder, rightBorder, topBorder, bottomBorder]
}
function isCollided(objectA, objectB){
    //collides with ALL elements - to change?
    //console.log(`Enemy:${objectA.id} | Projectile:${objectB.id}`)

    let isXOverlap = false
    let isYOverlap = false

    // console.log(`A:${objectA.collider[0]},${objectA.collider[1]}`)
    // console.log(`B:${objectB.collider[0]},${objectB.collider[1]}`)

    let vertArrA = [objectA.collider[0],objectA.collider[1]]
    let vertArrB = [objectB.collider[0],objectB.collider[1]]
    let horiArrA = [objectA.collider[2],objectA.collider[3]]
    let horiArrB = [objectB.collider[2],objectB.collider[3]]

    for (let line of vertArrA){
        if(line >= vertArrB[0] && line <= vertArrB[1]){
            isXOverlap = true
        }
    }
    for (let line of horiArrA){
        if(line >= horiArrB[0] && line <= horiArrB[1]){
            isYOverlap = true
        }
    }
    // console.log(`X:${isXOverlap}, Y:${isYOverlap}`)
    return (isXOverlap === true && isYOverlap === true)
}