// Databases
let towerDataArr =[
    {
        id: 0,
        name: 'Turret',
        cost: 10,
        damage: 1,
        speed: 2,
        range: 3,
        towerImg: 'imgs/tower-defense-assets/PNG/Default size/towerDefense_tile291.png',
        orientation: 180,
        projectileId: 0,
        projectileTracking: 'normal',
        splash: false,
        splashScale: 1,
        specialShot: 'none'
    },
    {
        id: 1,
        name: 'Cannon',
        cost: 20,
        damage: 2,
        speed: 2,
        range: 5,
        towerImg: 'imgs/tower-defense-assets/PNG/Default size/towerDefense_tile249.png',
        orientation: 270,
        projectileId: 1,
        projectileTracking: 'normal',
        splash: false,
        splashScale: 1,
        specialShot: 'none'
    },
    {
        id: 2,
        name: 'Rapid Turret',
        cost: 30,
        damage: 1,
        speed: 6,
        range: 3,
        towerImg: 'imgs/tower-defense-assets/PNG/Default size/towerDefense_tile292.png',
        orientation: 180,
        projectileId: 2,
        projectileTracking: 'normal',
        splash: false,
        splashScale: 1,
        specialShot: 'none'
    },
    {
        id: 3,
        name: 'Dual Cannon',
        cost: 40,
        damage: 2,
        speed: 2,
        range: 4,
        towerImg: 'imgs/tower-defense-assets/PNG/Default size/towerDefense_tile250.png',
        orientation: 270,
        projectileId: 1,
        projectileTracking: 'normal',
        splash: false,
        splashScale: 1,
        specialShot: 'dual'
    },
    {
        id: 4,
        name: 'Rocket',
        cost: 40,
        damage: 3,
        speed: 0.5,
        range: 8,
        towerImg: 'imgs/tower-defense-assets/PNG/Default size/towerDefense_tile206.png',
        orientation: 270,
        projectileId: 4,
        projectileTracking: 'homing',
        splash: true,
        splashScale: 4,
        specialShot: 'none'
    },
    {
        id: 5,
        name: 'Scatter Rocket',
        cost: 35,
        damage: 1,
        speed: 0.8,
        range: 4,
        towerImg: 'imgs/tower-defense-assets/PNG/Default size/towerDefense_tile204.png',
        orientation: 270,
        projectileId: 5,
        projectileTracking: 'normal',
        splash: true,
        splashScale: 2,
        specialShot: 'scatterBomb'
    }
]
let enemyDataArr = [
    {
        id: 0,
        name: 'Soldier',
        health: 3,
        speed: 0.01,
        enemyImg: 'imgs/tower-defense-assets/PNG/Default size/towerDefense_tile245.png',
        orientation: 0,
        reward: 3
    },
    {
        id: 1,
        name: 'EliteSoldier',
        health: 6,
        speed: 0.02,
        enemyImg: 'imgs/tower-defense-assets/PNG/Default size/towerDefense_tile246.png',
        orientation: 0,
        reward: 4
    },
    {
        id: 2,
        name: 'Operative',
        health: 4,
        speed: 0.03,
        enemyImg: 'imgs/tower-defense-assets/PNG/Default size/towerDefense_tile247.png',
        orientation: 0,
        reward: 5
    },
    {
        id: 3,
        name: 'Cyborg',
        health: 10,
        speed: 0.015,
        enemyImg: 'imgs/tower-defense-assets/PNG/Default size/towerDefense_tile248.png',
        orientation: 0,
        reward: 5
    },
    {
        id: 4,
        name: 'tank',
        health: 15,
        speed: 0.02,
        enemyImg: 'imgs/tower-defense-assets/PNG/Default size/towerDefense_tile268.png',
        orientation: 0,
        reward: 10
    },
    {
        id: 5,
        name: 'Armored Tank',
        health: 30,
        speed: 0.01,
        enemyImg: 'imgs/tower-defense-assets/PNG/Default size/towerDefense_tile269.png',
        orientation: 0,
        reward: 15
    },
    {
        id: 6,
        name: 'Biplane',
        health: 13,
        speed: 0.025,
        enemyImg: 'imgs/tower-defense-assets/PNG/Default size/towerDefense_tile270.png',
        orientation: 0,
        reward: 10
    }
]
let pathDataArr = [
    [[0,4],[15,4]],
    [[0,4],[3,4],[3,2],[13,2],[13,4],[15,4]],
    [[0,6],[6,6],[6,0],[8,0],[8,4],[9,4],[9,0],[11,0],[11,4],[15,4]],
    [[0,1],[2,1],[2,8],[8,8],[8,7],[12,7],[12,4],[15,4]],
    [[0,6],[6,6],[6,0],[8,0],[8,7],[14,7],[14,4],[15,4]]
]
let waveDataArr = [
    {
        id: 0,
        // defines each subwave
        // [0, 1] means 1st subwave will comprise of enemy '0' and 2nd subwave enemy '1'
        enemyTypes: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        // defines no. of enemies per subwave
        noOfEach: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        // defines interval between each subwave
        interval: [500,500,500,500,500,500,500,500,500,500,500,500,500,500,500],
        intervalInSubwave:[0],
        pauseTillNextWave: 7000,
        path: pathDataArr[0],
        isFlightPath: false
    },
    {
        id: 1,
        enemyTypes: [0,0,0,0,0],
        noOfEach: [1,1,1,1,1],
        interval: [2000,2000,2000,2000,2000],
        intervalInSubwave:[0],
        pauseTillNextWave: 4000,
        path: pathDataArr[2],
        isFlightPath: false
    },
    {
        id: 2,
        enemyTypes: [0,1,0,1,0],
        noOfEach: [1,1,1,1,1],
        interval: [2000,3000,2000,3000,2000],
        intervalInSubwave:[0],
        pauseTillNextWave: 1000,
        path: pathDataArr[2],
        isFlightPath: false
    },
    {
        id: 3,
        enemyTypes: [1,1,1,1,1,
                        1,1,1,1,1],
        noOfEach: [1,1,1,1,1,
                    1,1,1,1,1],
        interval: [1000,1000,1000,1000,3000,
                    1000,1000,1000,1000,3000],
        intervalInSubwave:[0],
        pauseTillNextWave: 5000,
        path: pathDataArr[2],
        isFlightPath: false
    },
    {
        id: 4,
        enemyTypes: [1,1,2,1,2,
            1,1,2,1,2],
        noOfEach: [1,1,1,1,1,
            1,1,1,1,1],
        interval: [2000,2000,2000,2000,3000,
            1000,1000,1000,1000,3000],
        intervalInSubwave:[0],
        pauseTillNextWave: 1000,
        path: pathDataArr[1],
        isFlightPath: false
    },
    {
        id: 5,
        enemyTypes: [3,1,3,1,3],
        noOfEach: [1,1,1,1,1],
        interval: [3000,3000,3000,3000,3000],
        intervalInSubwave:[0],
        pauseTillNextWave: 1000,
        path: pathDataArr[1],
        isFlightPath: false
    },
    {
        id: 6,
        enemyTypes: [4,1,2,1,3],
        noOfEach: [1,1,1,1,1],
        interval: [2000,2000,2000,2000,2000],
        intervalInSubwave:[0],
        pauseTillNextWave: 1000,
        path: pathDataArr[3],
        isFlightPath: false
    },
    {
        id: 7,
        enemyTypes: [4,1,2,2,2,
            4,1,2,2,2],
        noOfEach: [1,1,1,1,1,
            1,1,1,1,1],
        interval: [3000,3000,3000,3000,3000,
            3000,3000,3000,3000,3000],
        intervalInSubwave:[0],
        pauseTillNextWave: 1000,
        path: pathDataArr[3],
        isFlightPath: false
    },
    {
        id: 8,
        enemyTypes: [4,2,4,2,4,
                4,2,4,2,4,
                1,1,1,1,1],
        noOfEach: [1,1,1,1,1,
                1,1,1,1,1,
                1,1,1,1,1],
        interval: [3000,1000,3000,1000,3000,
                3000,1000,3000,1000,3000,
                500,500,500,500,500],
        intervalInSubwave:[0],
        pauseTillNextWave: 1000,
        path: pathDataArr[1],
        isFlightPath: false
    },
    {
        id: 9,
        enemyTypes: [5,3,4,2,4,
                    5,2,4,2,4,
                    1,2,1,2,1,
                    5,3,3,3,3],
        noOfEach: [1,1,1,1,1,
                    1,1,1,1,1,
                    1,1,1,1,1,
                    1,1,1,1,1],
        interval: [3000,1000,3000,1000,3000,
                    3000,1000,3000,1000,3000,
                    2000,2000,2000,2000,2000,
                    500,500,500,500,500],
        intervalInSubwave:[0],
        pauseTillNextWave: 1000,
        path: pathDataArr[4],
        isFlightPath: false
    },
    {
        id: 10,
        enemyTypes: [5,5,4,2,4,
            5,5,3,3,4,
            5,5,2,2,1,
            5,5,3,3,4],
        noOfEach: [1,1,1,1,1,
            1,1,1,1,1,
            1,1,1,1,1,
            1,1,1,1,1],
        interval: [2000,1000,2000,2000,2000,
            2000,1000,2000,1000,2000,
            2000,2000,2000,2000,2000,
            500,500,500,500,500],
        intervalInSubwave:[0],
        pauseTillNextWave: 1000,
        path: pathDataArr[3],
        isFlightPath: false
    },
    {
        id: 11,
        enemyTypes: [2,2,4,2,4,
            2,5,3,3,4,
            2,5,2,2,1,
            2,5,3,3,4],
        noOfEach: [1,1,1,1,1,
            1,1,1,1,1,
            1,1,1,1,1,
            1,1,1,1,1],
        interval: [1000,1000,1000,1000,1000,
            1000,2000,1000,1000,2000,
            1000,2000,1000,1000,2000,
            500,1500,500,1500,500],
        intervalInSubwave:[0],
        pauseTillNextWave: 1000,
        path: pathDataArr[4],
        isFlightPath: false
    },
    {
        id: 12,
        enemyTypes: [5,5,4,2,4,
            5,5,3,3,4,
            5,5,2,2,1,
            5,5,3,3,4],
        noOfEach: [1,1,1,1,1,
            1,1,1,1,1,
            1,1,1,1,1,
            1,1,1,1,1],
        interval: [1000,500,500,1000,1000,
            1000,1000,500,1000,500,
            1000,500,1000,500,500,
            500,500,500,500,500],
        intervalInSubwave:[0],
        pauseTillNextWave: 1000,
        path: pathDataArr[2],
        isFlightPath: false
    }
    ]
let projectileDataArr = [
    {
        id: 0,
        name: 'cannonball',
        speed: 0.5,
        projImg:'imgs/tower-defense-assets/PNG/Default size/towerDefense_tile272.png',
        orientation: 0,
        createSFX: "audio/explosion2__008.wav",
        destroySFX: "audio/explosion__003.wav",
        createVolume: 0.1,
        destroyVolume: 0.5,
        destroyVFX: 'imgs/tower-defense-assets/explosion.png'
    },
    {
        id: 1,
        name: 'fireshot',
        speed: 0.9,
        projImg:'imgs/tower-defense-assets/PNG/Default size/towerDefense_tile297.png',
        orientation: 90,
        createSFX: "audio/explosion3__001.wav",
        destroySFX: "audio/explosion__003.wav",
        createVolume: 0.05,
        destroyVolume: 0.5,
        destroyVFX: 'imgs/tower-defense-assets/explosion.png'
    },
    {
        id: 2,
        name: 'silvercannonball',
        speed: 0.6,
        projImg:'imgs/tower-defense-assets/PNG/Default size/towerDefense_tile273.png',
        orientation: 0,
        createSFX: "audio/explosion3__006.wav",
        destroySFX: "audio/explosion__003.wav",
        createVolume: 0.1,
        destroyVolume: 0.5,
        destroyVFX: 'imgs/tower-defense-assets/explosion.png'
    },
    {
        id: 3,
        name: 'flameshot',
        speed: 0.85,
        projImg:'imgs/tower-defense-assets/PNG/Default size/towerDefense_tile296.png',
        orientation: 90,
        createSFX: "audio/explosion3__002.wav",
        destroySFX: "audio/explosion__003.wav",
        createVolume: 0.1,
        destroyVolume: 0.5,
        destroyVFX: 'imgs/tower-defense-assets/explosion.png'
    },
    {
        id: 4,
        name: 'rocket',
        speed: 0.3,
        projImg:'imgs/tower-defense-assets/PNG/Default size/towerDefense_tile252.png',
        orientation: 270,
        createSFX: "audio/explosion2__007.wav",
        destroySFX: "audio/explosion3__005.wav",
        createVolume: 0.1,
        destroyVolume: 0.5,
        destroyVFX: 'imgs/tower-defense-assets/explosion.png'
    },
    {
        id: 5,
        name: 'minirocket',
        speed: 0.3,
        projImg:'imgs/tower-defense-assets/PNG/Default size/towerDefense_tile251.png',
        orientation: 270,
        createSFX: "audio/explosion2__007.wav",
        destroySFX: "audio/explosion3__005.wav",
        createVolume: 0.1,
        destroyVolume: 0.2,
        destroyVFX: 'imgs/tower-defense-assets/explosion.png'
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
    //pathArr: [[0,4],[3,4],[3,1],[13,1],[13,4],[15,4]],
    currentWave: 1,
    enemyCounter: 0,
    killCounter: 0,
    totalEnemies: 0,
    waveInfo: [waveDataArr[1], waveDataArr[2],waveDataArr[3],
                waveDataArr[4],waveDataArr[5],waveDataArr[6],
                waveDataArr[7],waveDataArr[8],waveDataArr[9],
                waveDataArr[10],waveDataArr[11],waveDataArr[12]],
    //[waveDataArr[0]],
    totalWaves: 1, // reassigned later
    timeBetweenWaves: 2000,
    scene: {},
    playerHealth: 10,
    playerResource: 20,
}

// Class definitions
class Scene{
    constructor(ele, xGrid, yGrid, pathImg) {
        this.ele = ele
        this.xGrid = xGrid
        this.yGrid = yGrid
        this.pathImg = pathImg
        this.updateSceneParams()
    }
    updateSceneParams(){
        this.sceneW = this.ele.clientWidth
        this.sceneH = this.ele.clientHeight
        this.xUnit = this.sceneW/this.xGrid
        this.yUnit = this.sceneH/this.yGrid
        this.xHalf = this.xUnit/2
        this.yHalf = this.yUnit/2
        this.yxRatio = this.yGrid/this.xGrid
        this.xyRatio = this.xGrid/this.yGrid
    }
}
class Tower{
    constructor(name, cost, damage, speed, range, towerImg,
                orientation, htmlEle, projectileId, projectileTracking,
                splash, splashScale, specialShot='none') {
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
        this.projectileTracking = projectileTracking
        this.splash = splash
        this.splashScale = splashScale
        this.specialShot = specialShot
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
        //console.log(`PosRatio:${this.xPosRatio},${this.yPosRatio}`)
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

        this.xDir = xDiff / magnitude(xDiff,yDiff)
        this.yDir = yDiff / magnitude(xDiff,yDiff)

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
        if (this.specialShot==='dual'){
            this.dualFire()
        }else if(this.specialShot==='scatterBomb'){
            this.scatterBombFire()
        }
        else{
            if(this.isInRange(this.currTarget)){
                let data = this.projectileData
                if (this.reloadTime <= 0){
                    let p = new Projectile(data.name, data.speed, this.damage, data.projImg,
                        data.orientation, this.currTarget, this.projectileTracking,
                        this.splash, this.splashScale,
                        this.xPosRatio, this.yPosRatio,
                        this.xDir, this.yDir, data.createSFX, data.createVolume,
                        data.destroySFX, data.createVolume,
                        data.destroyVFX)
                    state.activeProjectiles.push(p)

                    this.reloadTime = 100
                }else{
                    this.reloadTime -= this.speed
                }
            }
        }
    }
    scatterBombFire(){
        if(this.isInRange(this.currTarget)){
            let data = this.projectileData
            let ammoCount = 5
            let error = 0.7
            let xSign = 1
            let ySign = 1

            if (Math.random() < 0.5 ){xSign *= -1}
            if (Math.random() < 0.5 ){ySign *= -1}
            console.log(`${xSign}, ${ySign}`)
            if (this.reloadTime <= 0){
                for (let i = 0; i < ammoCount; i++){
                    let randX = this.xDir + xSign * this.xDir * error * Math.random()
                    let randY = this.yDir + ySign * this.yDir * error * Math.random()
                    console.log(`${randX}, ${randY}`)
                    let p = new Projectile(data.name, data.speed, this.damage, data.projImg,
                        data.orientation, this.currTarget, this.projectileTracking,
                        this.splash, this.splashScale,
                        this.xPosRatio, this.yPosRatio,
                        randX, randY, data.createSFX, data.createVolume,
                        data.destroySFX, data.createVolume,
                        data.destroyVFX)

                    state.activeProjectiles.push(p)

                    this.reloadTime = 100
                }
            }else{
                this.reloadTime -= this.speed
            }
        }
    }
    dualFire(){
        if(this.isInRange(this.currTarget)){
            let data = this.projectileData

            let offset = 0.02

            let p1XPos = this.xPosRatio + this.xPosRatio * offset / state.scene.xyRatio
            let p1YPos = this.yPosRatio - this.yPosRatio * offset

            let p2XPos = this.xPosRatio - this.xPosRatio * offset / state.scene.xyRatio
            let p2YPos = this.yPosRatio + this.yPosRatio * offset

            if (this.reloadTime <= 0){
                let p1 = new Projectile(data.name, data.speed, this.damage, data.projImg,
                    data.orientation, this.currTarget, this.projectileTracking,
                    this.splash, this.splashScale,
                    p1XPos,p1YPos,
                    this.xDir, this.yDir, data.createSFX, data.createVolume,
                    data.destroySFX, data.createVolume,
                    data.destroyVFX)
                state.activeProjectiles.push(p1)
                let p2 = new Projectile(data.name, data.speed, this.damage, data.projImg,
                    data.orientation, this.currTarget, this.projectileTracking,
                    this.splash, this.splashScale,
                    p2XPos, p2YPos,
                    this.xDir, this.yDir, data.createSFX, data.createVolume,
                    data.destroySFX, data.createVolume,
                    data.destroyVFX)
                state.activeProjectiles.push(p2)

                this.reloadTime = 100
            }else{
                this.reloadTime -= this.speed
            }
        }
    }
}
class Enemy{
    constructor(name, health, speed, reward, enemyImg, htmlEle, xPosRatio, yPosRatio, pathArr) {
        this.id = getNextID('enemy-',state.activeEnemies)
        this.name = name
        this.health = health
        this.speed = speed
        this.reward = reward
        this.enemyImg = enemyImg
        this.htmlEle = htmlEle //enemyDiv
        this.setElementID()
        this.xPosRatio = xPosRatio
        this.yPosRatio = yPosRatio
        this.updateCenterPosition()
        this.updateCollider()
        this.pathArr = pathArr
        this.prevWaypoint = 0
        this.nextWaypoint = []
        this.findNextWaypoint()
        this.toDestroy = false
    }
    setElementID(){
        this.htmlEle.setAttribute('id', this.id)
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
            this.xPosRatio, this.yPosRatio, 0.25)
    }
    findNextWaypoint(){
        if(this.nextWaypoint === []){
            this.nextWaypoint = this.pathArr[1]
        }else if(this.prevWaypoint+1 < this.pathArr.length){
            this.nextWaypoint = this.pathArr[this.prevWaypoint + 1]
        }else{
            this.nextWaypoint = this.pathArr[this.pathArr.length-1]
            this.htmlEle.style.display = 'none'
            this.damagePlayer()
            this.toDestroy = true
        }
    }
    isAtNextWaypoint(){
        let nextXGrid = this.nextWaypoint[0]//+ gridToRatio(16, 0.5)
        let nextYGrid = this.nextWaypoint[1]//+ gridToRatio(9, 0.5)

        let xDeltaRatio = gridToRatio(16, nextXGrid + 0.5)
            - this.centerX
        let yDeltaRatio = gridToRatio(9, nextYGrid + 0.5)
            - this.centerY
        // need to amend percentage as pixels on y and x is different

        let xError = xDeltaRatio / (1/state.scene.xGrid)
        let yError = yDeltaRatio / (1/state.scene.yGrid)
        // console.log(`DistToX:${xError}|DistToY:${yError}`)
        return (Math.abs(xError) < 0.05 && Math.abs(yError) < 0.05)
    }
    move(){
        if(this.isAtNextWaypoint()){
            this.findNextWaypoint()
            this.prevWaypoint += 1
        }
        let speed = this.speed

        let nextXGrid = this.nextWaypoint[0]
        let nextYGrid = this.nextWaypoint[1]

        let xDeltaRatio = gridToRatio(16, nextXGrid + 0.5)
                            - this.centerX
        let yDeltaRatio = gridToRatio(9, nextYGrid + 0.5)
                            - this.centerY

        let unitXRatio = xDeltaRatio / magnitude(xDeltaRatio,yDeltaRatio)
        let unitYRatio = yDeltaRatio / magnitude(xDeltaRatio,yDeltaRatio)

        let newXPosRatio = unitXRatio * speed * state.gameSpeed/10
        let newYPosRatio = unitYRatio * speed * state.gameSpeed/10
                                * state.scene.xyRatio

        let deg = tanInv(unitXRatio, -unitYRatio)

        orientateElement(this.enemyImg, deg - 90)
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
        this.playHitMarker()
        if(this.health <= 0){
            updateResourceValue(this.reward)
            state.killCounter += 1
          //  console.log(`${state.totalEnemies}, ${state.killCounter}`)
            checkWin()
            this.toDestroy = true
        }
    }
    playHitMarker(){
        playAnimation(this.id, 'enemy', 'hit-marker')
    }

    damagePlayer(){
        let damage = 1
        updatePlayerHealth(-damage)
    }
}
class Projectile{
    constructor(name, speed, damage, projImg, orientation,
                target, tracking = 'normal',
                splash = false, splashScale = 0,
                xPosRatio, yPosRatio, xDir, yDir,
                createSFX,createVolume,destroySFX,destroyVolume,
                destroyVFX) {
        this.id = getNextID('proj-',state.activeProjectiles)
        this.name = name
        this.speed = speed
        this.damage = damage
        this.projImg = projImg
        this.orientation = orientation
        this.target = target
        this.tracking = tracking
        this.splash = splash
        this.splashScale = splashScale
        this.isSplashScaled = false
        this.xDir = xDir
        this.yDir = yDir
        this.xPosRatio = xPosRatio
        this.yPosRatio = yPosRatio
        this.createSFX = createSFX
        this.createVolume = createVolume
        this.destroySFX = destroySFX
        this.destroyVolume = destroyVolume
        this.destroyVFX = destroyVFX
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
        this.playCreateSFX()
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
        this.centerY = this.yPosRatio + (eleHeight/state.scene.sceneH)/2
    }
    loadCurrentPosition(){
        this.x = getParentWH(this.htmlEle)[0] * this.xPosRatio
        this.y = getParentWH(this.htmlEle)[1] * this.yPosRatio
        this.htmlEle.style.left = `${this.x}px`
        this.htmlEle.style.top = `${this.y}px`
    }
    updateCollider(){
        this.collider = setCollider(this.centerX, this.centerY,
            this.xPosRatio, this.yPosRatio, 0.25)

    }
    move(){
        // console.log(this.tracking)
        if(this.tracking === 'normal'){
            if (!this.isOutOfBounds()){
                let unitXRatio = -this.xDir
                let unitYRatio = -this.yDir

                let deg = tanInv(-unitYRatio, -unitXRatio)

                let newXPosRatio = unitXRatio * this.speed * state.gameSpeed/100
                let newYPosRatio = unitYRatio * this.speed * state.gameSpeed/100 * state.scene.xyRatio

                this.updateCurrentPosition(newXPosRatio, newYPosRatio)
                orientateElement(this.htmlImg, this.orientation + deg)
            }
        }else if(this.tracking === 'homing'){
            this.moveHoming()
        }
    }
    moveHoming(){
        if (!this.isOutOfBounds()){

            if(!state.activeEnemies.includes(this.target)){
                this.createDestroyVFX()
                this.toDestroy=true
            }else{
                let homedTarget = this.target

                let homedTargetX = homedTarget.centerX
                let homedTargetY = homedTarget.centerY

                let xDelta = homedTargetX - this.centerX
                let yDelta = homedTargetY - this.centerY

                let unitXRatio = unitVector(xDelta,yDelta)[0]
                let unitYRatio = unitVector(xDelta,yDelta)[1]

                let deg = tanInv(-unitYRatio, -unitXRatio)

                let newXPosRatio = unitXRatio * this.speed * state.gameSpeed/100
                let newYPosRatio = unitYRatio * this.speed * state.gameSpeed/100 * state.scene.xyRatio

                this.updateCurrentPosition(newXPosRatio, newYPosRatio)
                orientateElement(this.htmlImg, this.orientation + deg)
            }
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
        this.createDestroyVFX()
        this.toDestroy = true
    }
    dealSplashDamage(){
        if(!this.isSplashScaled){
            this.scaleColliderForSplash()
        }
        let thisProjectile = findObjectInArray(this.id, state.activeProjectiles)
        checkSingleCollider(thisProjectile)
        this.createDestroyVFX()
        this.toDestroy = true
    }
    scaleColliderForSplash(){

        this.collider[0] = this.collider[0] - Math.abs(this.collider[0] - this.centerX) * this.splashScale
        this.collider[1] = this.collider[1] + Math.abs(this.collider[1] - this.centerX) * this.splashScale
        this.collider[2] = this.collider[2] - Math.abs(this.collider[2] - this.centerY) * this.splashScale
        this.collider[3] = this.collider[3] + Math.abs(this.collider[3] - this.centerY) * this.splashScale
        this.isSplashScaled = true
    }

    destroyThis(){
        let currId = this.id
        let projIndex = state.activeProjectiles.findIndex(function (ele){
            return (ele['id'] === currId)
        })
        this.playDestroySFX()
        state.activeProjectiles.splice(projIndex, 1)
        this.htmlEle.remove()
    }
    playDestroySFX(){
        playSFX(this.destroySFX,this.destroyVolume)
    }
    playCreateSFX(){
        playSFX(this.createSFX,this.createVolume)
    }
    createDestroyVFX(){
        let particleDiv = document.createElement('div')
        let particle = document.createElement("img")
        let gameArea = document.getElementById("vfx-container")

        particleDiv.setAttribute('class', 'particle')
        particle.setAttribute('class',
            'particleVFX fadeInOut')

        particle.setAttribute('src', this.destroyVFX)

        particleDiv.appendChild(particle)
        gameArea.appendChild(particleDiv)

        let x = getParentWH(particleDiv)[0] * this.xPosRatio
        let y = getParentWH(particleDiv)[1] * this.yPosRatio

        this.scaleDestroyVFX(particle)

        particleDiv.style.left = `${x}px`
        particleDiv.style.top = `${y}px`

        setTimeout(function(){
            particleDiv.remove()
        },1000)
    }

    scaleDestroyVFX(VFXHTML){
        VFXHTML.style.height = `${this.splashScale * 50}%`
        VFXHTML.style.width = `${this.splashScale * 50}%`
    }
}

// Main Execution
loadMusic("music/Venus_edited.wav", 0.1)
initialiseTowerBar()
initialiseGameArea()
initialisePathArea()
findCellMouseIsOver()
initialiseDeselectTower()
spawnEnemies()
initialiseUI()
setInterval(updateElementMethods,16/state.gameSpeed)
setInterval(checkWin, 4000)

// Functions!!
// Run-Once Functions
function loadRestart(isWin){
    let winHTML = document.getElementById('win-link')
    let loseHTML = document.getElementById('lose-link')
    if (isWin){
        winHTML.click()
    }else{
        loseHTML.click()
    }
}
function initialiseUI(){
    updatePlayerHealth()
    updateWaveValue()
    updateResourceValue()
}
function initialiseTowerBar(){
    towerDataArr.forEach(function(tower, index){
        let towerSlot = document.getElementById(`tower-slot-${index}`)

        //Create Element
        let newTowerBtn = document.createElement('input')
        let newTowerBtnText = document.createElement('p')
        let newTowerCostText = document.createElement('p')
        let newTowerBtnDiv = document.createElement('div')

        // Create text or content

        newTowerBtnDiv.setAttribute('class', 'tower-btn-container')

        newTowerBtn.setAttribute('class', 'tower-img btn')
        newTowerBtn.setAttribute('type', 'image')
        newTowerBtn.setAttribute('name', tower.name)
        newTowerBtn.setAttribute('src', tower.towerImg)
        newTowerBtn.setAttribute('alt', tower.name)
        newTowerBtn.setAttribute('towerId', tower.id)

        orientateElement(newTowerBtn, tower.orientation)

        newTowerBtn.addEventListener('click', selectTower)

        newTowerBtnText.innerHTML = `${tower.name}<br/>$${tower.cost}`
        newTowerBtnText.setAttribute('class', 'tower-name tower-text text' )
        //newTowerBtnText.setAttribute('class', 'text')

        newTowerCostText.textContent = `$${tower.cost}`
        newTowerCostText.setAttribute('class', 'tower-cost tower-text text')

        // Append
        newTowerBtnDiv.appendChild(newTowerBtn)
        towerSlot.appendChild(newTowerBtnDiv)
        towerSlot.appendChild(newTowerBtnText)
        //towerSlot.appendChild(newTowerCostText)

    })
}
function initialiseGameArea(){
    let gameArea = document.getElementById('game-area-container')
    let pathImgUrl = "imgs/tower-defense-assets/PNG/Default size/towerDefense_tile158.png"

    state.scene = new Scene(gameArea, 16, 9, pathImgUrl)
    state.totalWaves = state.waveInfo.length
}
function initialisePathArea(){
    let pathTerrainArr = []
    for(let wave of state.waveInfo){
        if(!pathTerrainArr.includes(wave.path)){
            pathTerrainArr.push(wave.path)
        }
    }
    for(let path of pathTerrainArr){
        let prevCell = [0,0]
        for(let cell of path){
            let currCell = cell
            if (currCell === path[0]){
                prevCell = currCell
            }
            // dont create path at last cell, but to the left of it
            if (currCell === path[path.length-1]){
                currCell[0] = currCell[0] - 1
            }
            generatePathInBetween(prevCell, currCell)
            prevCell = currCell
        }
    }
}
function generatePathInBetween(prevCell, currCell){
    let prevCellX = prevCell[0]
    let prevCellY = prevCell[1]

    let currCellX = currCell[0]
    let currCellY = currCell[1]
    if (prevCellX === currCellX){
        for(let i = 0; i <= Math.abs(currCellY-prevCellY); i++){
            let cellId = prevCellX
                + (currCellY + Math.sign(prevCellY-currCellY) * i) * state.scene.xGrid
            printPath(cellId)
        }
    }else if(prevCellY===currCellY){

        for(let i = 0; i <= Math.abs(currCellX-prevCellX); i++){
            let cellId = (prevCellX + Math.sign(currCellX-prevCellX) * i)
                + currCellY * state.scene.xGrid
            printPath(cellId);
        }
    }
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
                    if(projectile.splash){
                        projectile.dealSplashDamage()
                    }else{
                        projectile.dealDamage(enemy)
                        enemy.checkHealth()
                    }
                    break
                    //console.log("HIT")
                }
            }
        }
    }
}
function checkSingleCollider(projectile){
    if(state.activeEnemies.length !== 0){
        for(let enemy of state.activeEnemies){
            if(isCollided(enemy, projectile)){
                console.log(`Hit: ${enemy}`)
                projectile.dealDamage(enemy)
                enemy.checkHealth()
                if (projectile.splash === false){
                    break
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

function printPath(cellId) {
    let cellDiv = document.getElementById(`${cellId}`)
    if (!cellDiv.className.includes('path')) {
        cellDiv.setAttribute('class', 'cell non-buildable path')
        let pathImgHTML = document.createElement('img')
        pathImgHTML.setAttribute('src', state.scene.pathImg)
        pathImgHTML.setAttribute('class', 'tile-overlay')
        cellDiv.appendChild(pathImgHTML)
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
}
function buildTower(ele){
    let id = state.towerToBuild
    let data = findObjectInArray(id, towerDataArr)

    let hasResource = (state.playerResource >= data.cost)
    if (state.isSelecting && hasResource){
        let towerImg = document.createElement('img')

        towerImg.setAttribute('src', data.towerImg)
        towerImg.setAttribute('class', 'tower')

        ele.appendChild(towerImg)

        let tower = new Tower(data.name, data.cost, data.damage,
            data.speed, data.range, data.towerImg, data.orientation,
            towerImg, data.projectileId, data.projectileTracking,
            data.splash, data.splashScale, data.specialShot)

        towerImg.setAttribute('id', tower.id)

        state.activeTowers.push(tower)
        updateResourceValue(-data.cost)
    }
    state.isSelecting = false
}
function updatePlayerHealth(change=0){
    state.playerHealth += change

    let healthHTML = document.getElementById('lives-text')
    healthHTML.textContent = state.playerHealth

    if (state.playerHealth <= 0){
        loadRestart(false)
    }
}
function updateWaveValue(){
    let totalWaveHTML = document.getElementById('total-waves-text')
    let currWaveHTML = document.getElementById('current-wave-text')

    totalWaveHTML.textContent = state.totalWaves
    currWaveHTML.textContent = state.currentWave

}
function calculateCurrentWave(){
    let total = 0
    state.enemyCounter+=1
    let arrOfEnemies = []
    for (let wave of state.waveInfo){
        arrOfEnemies.push(wave.enemyTypes.length)
        total += wave.enemyTypes.length
        if (state.enemyCounter === total+1){
            state.currentWave+=1
            updateWaveValue()
            break
        }
    }
}
function updateResourceValue(change = 0){
    let resourceHTML = document.getElementById('cash-text')

    if(state.playerResource + change > 9999){
        state.playerResource = 9999
    }else{
        state.playerResource += change
    }

    let resource = state.playerResource.toString()

    let resourceStr = resource.split("")

    if(resourceStr.length < 4){
        for(let i = 4 - resourceStr.length; i > 0; i--){
            resourceStr.unshift('0')
        }
    }
    resourceHTML.textContent = resourceStr.join("")
}
function spawnEnemies(){
    let waveInfoArr = state.waveInfo

    let timeline = 0 // the linear progression of time

    for(let waveCount = 0; waveCount < state.totalWaves; waveCount++){
        let waveData = waveInfoArr[waveCount]

        let spawnPoint = waveData.path[0]

        let divX = spawnPoint[0]
        let divY = spawnPoint[1]

        let x = divX/state.scene.xGrid
        let y = divY/state.scene.yGrid

        setTimeout(function(){
            for(let subwave = 0; subwave < waveData.enemyTypes.length;
                subwave++){
                setTimeout(function(){
                    let enemyToSpawn = waveData.enemyTypes[subwave]

                    for (let noOfEnemies = 0; noOfEnemies < waveData.noOfEach[subwave];
                         noOfEnemies++){
                        setTimeout(function(){
                            spawnEnemy(enemyToSpawn, x, y, waveInfoArr[waveCount])
                            }, 0)
                    }
                    calculateCurrentWave()
                }, timeline)
                timeline += waveData.interval[subwave]
                countTotalEnemies(1)
            }
            timeline += waveData.pauseTillNextWave
        }, timeline)

    }
}
function spawnEnemy(id, xRatio, yRatio, wave){
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

    let enemy = new Enemy(data.name, data.health, data.speed,data.reward,
                            enemyImg, enemyDiv, xRatio, yRatio, wave.path)

    state.activeEnemies.push(enemy)
}
function countTotalEnemies(count){
    state.totalEnemies+= count
    console.log(state.totalEnemies)
}
function checkWin(){
    if(state.killCounter === state.totalEnemies){
        loadRestart(true)
    }else if(state.activeEnemies.length===0 && (state.totalEnemies === state.enemyCounter)){
        loadRestart(true)
    }
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
        let cursorOverlayElement = document.getElementById('follow-cursor')
        //console.log(`${x}, ${y}`)

        let eleUnderArr = document.elementsFromPoint(x,y)
        //console.log(eleUnderArr)

        for(let i of eleUnderArr){
            if(!i.className.includes('non-buildable')
                && i.className.includes('cell') && state.isSelecting === true){
                buildTower(i)
                //let cursorOverlayElement = findObjectInArray('follow-cursor', eleUnderArr,)
                removeMouseIcon(cursorOverlayElement)
            }else if(i.className.includes('non-buildable')) {

            }

        }
    })
}
function initialiseDeselectTower(){
    document.addEventListener('click', function(e){
        let x = e.clientX
        let y = e.clientY
        let cursorOverlayElement = document.getElementById('follow-cursor')
        let eleUnderArr = document.elementsFromPoint(x,y)

        if (state.isSelecting === true
            && !checkIfEleArrHasClass(eleUnderArr,'cell')
        && !checkIfEleArrHasClass(eleUnderArr,'tower-img')){
            removeMouseIcon(cursorOverlayElement)
            state.isSelecting = false
        }
    })
}
function checkIfEleArrHasClass(arr, className){
    let eleIsInside = false
    for(let i of arr){
        if (i.className.includes(className)){
            eleIsInside = true
        }
    }
    return eleIsInside
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
function unitVector(x,y){
    let unitX = x / Math.sqrt(Math.pow(x,2)+Math.pow(y,2))
    let unitY = y / Math.sqrt(Math.pow(x,2)+Math.pow(y,2))
    return [unitX,unitY]

}
function setCollider(centerX, centerY, left, top, size = 1){

    let leftBorder = centerX - (centerX - left) * size
    let rightBorder = centerX + (centerX - left) * size
    let topBorder = centerY - (centerY - top) * size
    let bottomBorder = centerY + (centerY - top) * size

    return [leftBorder, rightBorder, topBorder, bottomBorder]
}
function isCollided(objectA, objectB){
    let isXOverlap = false
    let isYOverlap = false
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
    return (isXOverlap === true && isYOverlap === true)
}
function loadMusic(url, volume = 0.5){
    let music = new Audio(url)
    music.setAttribute('class', 'audio')
    music.loop = true
    music.volume = volume
    music.play()
}
function playSFX(audioSource, volume= 0.5){
    let audio = new Audio(audioSource)
    audio.volume = volume
    audio.play()
}
function playAnimation(eleId, baseClass, animClassName) {
    let animatedEle = document.getElementById(eleId)
    animatedEle.className = baseClass
    window.requestAnimationFrame(function(time) {
        window.requestAnimationFrame(function(time) {
            animatedEle.className = `${baseClass} ${animClassName}`;
        });
    });
}

