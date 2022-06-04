// Chooses an aleatory play for the Computer. Returns Rock, Paper or Scissors
function computerPlay() {
    let randomNumber = Math.random();
    if (randomNumber >= 0 && randomNumber < 1/3) {
        return 'Rock';
    } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
        return 'Paper';
    } else {
        return 'Scissors';
    }
}

// With a player selection and a computer selection, plays a round. Returns win, lose or draw
function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        return `draw`
    } else if ((playerSelection === 'Rock' && computerSelection === 'Scissors') ||
        (playerSelection === 'Scissors' && computerSelection === 'Paper') ||
        (playerSelection === 'Paper' && computerSelection === 'Rock')) {
        return `win`
    } else {
        return `lose`
    }
}

function resetScores() {
    gamesLost = 0;
    gamesWon = 0;
}

//creates a new Round Row in DOM with round number, player selection and com selection
function createRoundRow (round) {
    let div1 = document.createElement('div');
    div1.textContent = 'You';
    let divPlayerSelection = document.createElement('div');
    divPlayerSelection.classList.add(`playerSelection`,`round${round}`);
    let divSelectionContainer1 = document.createElement('div');
    divSelectionContainer1.classList.add(`playerSelectionContainer`,`round${round}`);
    divSelectionContainer1.appendChild(div1);
    divSelectionContainer1.appendChild(divPlayerSelection);

    let divComputerSelection = document.createElement('div');
    divComputerSelection.classList.add(`computerSelection`,`round${round}`);
    let div2 = document.createElement('div');
    div2.textContent = 'Com';
    let divSelectionContainer2 = document.createElement('div');
    divSelectionContainer2.classList.add(`computerSelectionContainer`,`round${round}`);
    divSelectionContainer2.appendChild(divComputerSelection);
    divSelectionContainer2.appendChild(div2);

    let divRoundSelections = document.createElement('div');
    divRoundSelections.classList.add(`roundSelections`,`round${round}`);
    divRoundSelections.appendChild(divSelectionContainer1);
    divRoundSelections.appendChild(divSelectionContainer2);

    let divRoundNumber = document.createElement('div');
    divRoundNumber.classList.add(`roundNumber`,`round${round}`);
    divRoundNumber.textContent = `Round ${round}`;

    let divRoundRow = document.createElement('div');
    divRoundRow.classList.add(`roundRow`,`round${round}`);
    divRoundRow.appendChild(divRoundNumber);
    divRoundRow.appendChild(divRoundSelections);

    document.querySelector('.roundRows').appendChild(divRoundRow);
}
// If 1st round, resets the Rounds table
// Calls function to create a new round line
// Inputs player choice and com choice in the corresponding divs of the new round line
function updateRound(playerSelection, computerSelection, result) {
    if (round === 1) {
        resetRounds();
    }
    createRoundRow(round);
    
    let divPlayer = document.querySelector(`.playerSelection.round${round}`);
    divPlayer.textContent = playerSelection;
    let divComputer = document.querySelector(`.computerSelection.round${round}`);
    divComputer.textContent = computerSelection;
    
    if (result === 'win') {
        divPlayer.setAttribute('style', 'color: #003400');
        divComputer.setAttribute('style', 'color: #54000D');
    } else if (result === 'lose') {
        divPlayer.setAttribute('style', 'color: #54000D');
        divComputer.setAttribute('style', 'color: #003400');
    } else {
        divPlayer.setAttribute('style', 'color: #FFFF00');
        divComputer.setAttribute('style', 'color: #FFFF00');
    }

    let divSection3 = document.querySelector('.section3');
    divSection3.scrollTop = divSection3.scrollHeight;

    round++;
}

function resetRounds() {
    let roundRows = document.querySelector('.roundRows');
    roundRows.parentElement.removeChild(roundRows);
    roundRows = document.createElement('div');
    roundRows.classList.add('roundRows');
    document.querySelector('.section3').appendChild(roundRows);
}

function updateScore(result) {
    if (result === 'win') {
        gamesWon++;
    } else if (result === 'lose') {
        gamesLost++;
    }

    if (gamesWon === 5) {
        document.querySelector('#p1').textContent = `What a skill! You WIN!`;
        document.querySelector('#p2').textContent = `Choose a weapon to start a new game`;
        document.querySelector('#playerScore').textContent = gamesWon;
        document.querySelector('#computerScore').textContent = gamesLost;
    } else if (gamesLost === 5) {
        document.querySelector('#p1').textContent = `The bitter taste of defeat. GAME OVER!`;
        document.querySelector('#p2').textContent = `Choose a weapon to start a new game`;
        document.querySelector('#playerScore').textContent = gamesWon;
        document.querySelector('#computerScore').textContent = gamesLost;
    } else {
        document.querySelector('#p1').textContent = `The battle has begun! The first to reach 5 points is the Winner`;
        document.querySelector('#p2').textContent = `Choose your next weapon!`;
        document.querySelector('#playerScore').textContent = gamesWon;
        document.querySelector('#computerScore').textContent = gamesLost;
    }
}

let gamesWon = 0;
let gamesLost = 0;
let round = 1;
let computerSelection;
let playerSelection;

const buttons = document.querySelectorAll('button');
buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        if (gamesLost === 5 || gamesWon === 5) {
            resetScores();
            resetRounds();
            round = 1;
        }
        playerSelection = e.target.id;
        computerSelection = computerPlay();
        let result = playRound(playerSelection, computerSelection);
        updateRound(playerSelection, computerSelection, result);
        updateScore(result);
        })
});