let towerBarArr = []

class Tower{
    constructor(name, cost, damage, speed, towerImg, projImg) {
        this.name = name
        this.cost = cost
        this.damage = damage
        this.towerImg = towerImg
        this.projImg = projImg
    }
}

addTowersToTowerArr()
initialiseTowerBar()

function addTowersToTowerArr(){
    let t1 = new Tower('Turret', 100, 1, 2,
        "imgs/tower-defense-assets/PNG/Default size/towerDefense_tile292.png")
    let t2 = new Tower('Cannon', 200, 2, 1,
        "imgs/tower-defense-assets/PNG/Default size/towerDefense_tile249.png")
    let newTowers = [t1, t2]
    for (let t of newTowers){
        towerBarArr.push(t)
    }
    console.log(towerBarArr)
}

function initialiseTowerBar(){

    towerBarArr.forEach(function(tower, index){
     // console.log(t.name)
        // Find div to populate into
        let towerSlot = document.getElementById(`tower-slot-${index}`)

        //Create Element
        //let newTowerBtn = document.createElement('button')
        let newTowerBtn = document.createElement('input')
        //let imgTag = document.createElement('img')

        // Create text or content
        let newTowerBtnText = document.createTextNode(tower.name)
        newTowerBtn.setAttribute('class', 'btn')
        newTowerBtn.setAttribute('type', 'image')
        newTowerBtn.setAttribute('name', tower.name)
        newTowerBtn.setAttribute('src', tower.towerImg)
        newTowerBtn.setAttribute('alt', tower.name)
        // imgTag.setAttribute('src', tower.towerImg)

        // Append

        towerSlot.appendChild(newTowerBtnText)
        // towerSlot.appendChild(imgTag)
        towerSlot.appendChild(newTowerBtn)

        // Add functionality to buttons

    })
}

//Create Tower Bar
    //

// Select tower from tower bar
    //right click to deselect
    //left click on game area to plant
        // Deduct Gold
