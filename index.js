const player1name= document.getElementById('namePlayer1')
const player2name = document.getElementById('namePlayer2')
let player1 = ""
let player2 = ""
let currentPlayer = ""
let combinationsPlayer1 = []
let combinationsPlayer2 = []

const winnerCombinations = [
    ['a1', 'a2', 'a3'],
    ['b1', 'b2', 'b3'],
    ['c1', 'c2', 'c3'],

    ['a1', 'b1', 'c1'],
    ['a2', 'b2', 'c2'],
    ['a3', 'b3', 'c3'],

    ['a1', 'b2', 'c3'],
    ['a3', 'b2', 'c1']
]
let scoreDisplay = {player1: 0, player2: 0 }

player1name.addEventListener('click', function () {
    player1 = prompt ('Insert the name of player 1:' )
    player1name.textContent = player1
    console.log(player1)
})
   
player2name.addEventListener('click', function () {
    player2 = prompt('Insert the name of player 2:')    
    player2name.textContent = player2
    console.log(player2)
})

let ul = document.getElementById('board')
let li = ul.querySelectorAll('li').forEach(function (ev) {
    ev.addEventListener('click', registerPlay)
})

function registerPlay () {
    const images = this.querySelectorAll('img')
    let turn = document.getElementById('nameTurn')
    if(currentPlayer === "" || currentPlayer === player2) {
        currentPlayer = player1
        turn.innerText = player2
    } else {
        currentPlayer = player2
        turn.innerText = player1
    }

    if(currentPlayer === player1) {
        combinationsPlayer1.push(this.id)
        img = images[1]
    
        
    } else {
        combinationsPlayer2.push(this.id)
        img = images[0]

        
    }
    img.style.display = 'block'
    this.classList.add('disabled')
    this.style.pointerEvents ='none'  
    
    
   

    winnerCombinations.forEach( (combination, index) => {
        console.log(index , combination)
        console.log(checkSubset(combinationsPlayer1, combination))
        console.log(checkSubset(combinationsPlayer2, combination))
    })

    let winner = verifyWinner(combinationsPlayer1, combinationsPlayer2, winnerCombinations)
    if (winner) {
        alert(winner)
    }
   
}


let checkSubset = (parentArray, subsetArray) => {
    return subsetArray.every((el) => {
        return parentArray.includes(el)
    })
}

function verifyWinner (combinationsPlayer1, combinationsPlayer2, winnerCombinations) {
    let result = false 
    let scoreTablePlayer1 = document.getElementById('scorePlayer1')
    let scoreTablePlayer2 = document.getElementById('scorePlayer2')
    let roundWinner = false

    winnerCombinations.forEach((combination ) => {
        
        if (checkSubset(combinationsPlayer1, combination) === true ) {
            scoreDisplay.player1++ 
            scoreTablePlayer1.innerText = scoreDisplay.player1
            roundWinner = true
            result = "Player 1 " + player1 + " wins!"    
            
        } 
         else if (checkSubset(combinationsPlayer2, combination) === true) {
            scoreDisplay.player2++
            scoreTablePlayer2.innerText = scoreDisplay.player2
            roundWinner = true
            result = "Player 2 " + player2 + " wins!"
            
        }    
    })
     if ((combinationsPlayer1.length >= 5 || combinationsPlayer2.length >= 5) && !roundWinner ) {
        alert("It's a tied game")
    }

    let scoreTableNamePlayer1 = document.getElementById('namePlayer1Board').innerText = player1
    let scoreTableNamePlayer2  = document.getElementById('namePlayer2Board').innerText = player2

    return result 
}


function restart () {
let restartBtn = document.getElementById('restartBtn')
restartBtn.addEventListener('click' , function() {
    let imagens = ul.querySelectorAll('li img')
    imagens.forEach(img => img.style.display = 'none')
})
resetGame()
}

function resetGame () {
    combinationsPlayer1.length = 0
    combinationsPlayer2.length = 0
    let lis = ul.querySelectorAll('li')
    lis.forEach(li => {
        li.style.pointerEvents ='auto'
        li.classList.remove('disabled')
    
    })

}

restart()











