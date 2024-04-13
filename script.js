const boxes = document.querySelectorAll('.box')
const newGame = document.querySelector('[data-newGame]')
const playContainer = document.querySelector('[data-playContainer]')
const gameInfo = document.querySelector('[data-playerChance]')

let playerChance;
let gameGrid;

const winningChances = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function initGame(){
    playerChance = 'X'
    gameGrid = ['','','','','','','','','']
    boxes.forEach((box,index) =>{
        box.textContent = '';
        boxes[index].style.pointerEvents = 'all'
        box.classList.remove('win')
        // alternative approach to start with removing green colour
        // box.classList = `box box${index}+1`
    })
    newGame.classList.remove('active')
    gameInfo.textContent = `Current Player - ${playerChance}`
}

initGame()

function handleClick(index){
    if(gameGrid[index] === ''){
        gameGrid[index] = playerChance
        boxes[index].textContent = playerChance
        boxes[index].style.pointerEvents = 'none'

        swapTurn();
        checkGameOver();
    }
}

function swapTurn(){
    if(playerChance === 'X'){
        playerChance = 'O'
    }
    else{
        playerChance = 'X'
    }

    gameInfo.textContent = `Current Player - ${playerChance}`
}

function checkGameOver(){
    let answer = ''
    winningChances.forEach((position)=>{
        if(gameGrid[position[0]] !== '' && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){
            if(gameGrid[position[0]] === 'X'){
                answer = 'X'
            }
            else{
                answer = 'O'
            }
            boxes[position[0]].classList.add('win')
            boxes[position[1]].classList.add('win')
            boxes[position[2]].classList.add('win')

            boxes.forEach((box) =>{
                box.style.pointerEvents = 'none'
            })

            gameInfo.textContent = `Winner Player - ${answer}`
            newGame.classList.add('active')
            return
        }
    })
    let fillCount = 0
    gameGrid.forEach((box) =>{
        if(box !== "")
            fillCount++
    })
    if(fillCount === 9 && answer ===""){
        gameInfo.textContent = 'Game Tied'
        newGame.classList.add('active')
    }
    
}

boxes.forEach((box,index)=>{
    box.addEventListener('click',()=>{
        handleClick(index)
    })
    
})

newGame.addEventListener('click',initGame)
