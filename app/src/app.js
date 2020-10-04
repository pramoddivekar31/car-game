'use strict'
const gameArea = document.querySelector('.game-area')
const startGameAlert = document.querySelector('.start-alert')
const player = {
    speed: 5,
    score: 0,
}
const keys = {
    ArrowUp: false,
    ArrowRight: false,
    ArrowDown: false,
    ArrowLeft: false
}

const createCar = () => {
    let car = document.createElement('div')
    car.setAttribute('class', 'car')
    gameArea.appendChild(car)

    player.left = car.offsetLeft
    player.top = car.offsetTop
}

const createRoadLines = () => {
    for (let i = 0; i < 5; i++) {
        let roadLines = document.createElement('div')
        roadLines.setAttribute('class', 'road__lines')
        roadLines.y = (i * 150)
        roadLines.style.top = (i * 150) + "px"
        gameArea.appendChild(roadLines)
    }
}

const isCollide = (myCar, enemyCar) => {
    const myCarRect = myCar.getBoundingClientRect()
    const enemyCarRect = enemyCar.getBoundingClientRect()
    const bottomCollision = myCarRect.bottom < enemyCarRect.top
    const topCollision = myCarRect.top > enemyCarRect.bottom
    const leftCollision = myCarRect.right < enemyCarRect.left
    const rightCollision = myCarRect.left > enemyCarRect.right
    return !(bottomCollision || topCollision || leftCollision || rightCollision)
}

const moveLines = (line) => {
    line.forEach((item) => {
        if (item.y > 700) {
            item.y -= 750
        }
        item.y += player.speed
        item.style.top = item.y + "px"
    })
}


const endGame = () => {
    player.start = false
    startGameAlert.classList.remove('hide')
}


const moveEnemyCar = (enemyCar) => {
    enemyCar.forEach((item) => {
        let car = document.querySelector('.car')
        if (isCollide(car, item)) {
            console.log("Boom");
            endGame()
        }
        if (item.y > 700) {
            item.y -= 750
            item.style.left = Math.floor(Math.random() * 300) + "px"
        }
        item.y += player.speed
        item.style.top = item.y + "px"
    })
}

const createEnemyCar = () => {
    for (let i = 0; i < 3; i++) {
        let enemyCar = document.createElement('div')
        enemyCar.setAttribute('class', 'enemy__car')
        enemyCar.y = (i * 200)
        enemyCar.style.top = (i * 200) + "px"
        enemyCar.style.left = Math.floor(Math.random() * 300) + "px"
        gameArea.appendChild(enemyCar)
    }
}


const setCarLimits = (road) => {
    if (keys.ArrowDown && player.top < (road.bottom - 70)) {
        player.top += player.speed
    }
    if (keys.ArrowUp && player.top > 0) {
        player.top -= player.speed
    }
    if (keys.ArrowRight && player.left < 300) {
        player.left += player.speed
    }
    if (keys.ArrowLeft && player.left > 0) {
        player.left -= player.speed
    }
}

// const setHighestScoreToLocalStorege = () => {
//     localStorage.setItem({
//         score: player.score
//     })

//     let localScore = localStorage.getItem('score')
//     console.log(localScore)
// }

const setScoreAndIncreaseSpeed = () => {
    player.score++
    let score = document.querySelector('.score')
    if (player.score % 200 === 0) {
        player.speed++
    }
    score.innerText = `Score : ${player.score}`
    // setHighestScoreToLocalStorege(player.score)
}


const playGame = () => {
    if (player.start) {
        let enemy = document.querySelectorAll('.enemy__car')
        moveEnemyCar(enemy)
        let lines = document.querySelectorAll('.road__lines')
        moveLines(lines)

        let road = gameArea.getBoundingClientRect()
        let car = document.querySelector('.car')
        setCarLimits(road)
        car.style.top = player.top + "px"
        car.style.left = player.left + "px"
        window.requestAnimationFrame(playGame)
        setScoreAndIncreaseSpeed()
    }
}

const start = () => {
    player.start = true
    player.score = 0
    player.speed = 5
    startGameAlert.classList.add('hide')
    gameArea.innerHTML = ""
    window.requestAnimationFrame(playGame)
    createCar()
    createEnemyCar()
    createRoadLines()
}

/**
 * 
 * @param {*} keyup on key up will get keyup event
 */
const keyUp = (keyup) => {
    keys[keyup.key] = false
}

/**
 * 
 * @param {*} keydown on key up will get keydown event
 */
const keyDown = (keydown) => {
    keys[keydown.key] = true
}

startGameAlert.addEventListener('click', start)
document.addEventListener('keyup', keyUp)
document.addEventListener('keydown', keyDown)