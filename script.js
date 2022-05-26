/* PROBLEM
Your game is going to play against the computer, so begin with a function called  computerPlay 
that will randomly return either ‘Rock’, ‘Paper’ or ‘Scissors’. We’ll use this function in the 
game to make the computer’s play.

SOLUTION
1. Calculate a random number between 0 and 1 (inclusive of 0, but not 1)

2.If the number is between 0 (inclusive) and 1/3 (exclusive), return 'Rock'
If the number is between 1/3 (inclusive) and 2/3 (exclusive), return 'Paper'
If the number is between 2/3 (inclusive) and 1 (exclusive), return 'Scissors' */

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

/* PROBLEM 
Write a function that plays a single round of Rock Paper Scissors. The function should take two 
parameters - the playerSelection and computerSelection - and then return a string that declares 
the winner of the round like so: "You Lose! Paper beats Rock". Make your function’s playerSelection 
parameter case-insensitive (so users can input rock, ROCK, RocK or any other variation).

SOLUTION
1. Adjust arguments so that the first letter is capitalized and the rest is lower case
 a. Standardize both arguments to lower case strings
 b. Capitalize first letter

2. Check if player selection is a valid one (either 'Rock', 'Paper' or 'Scissors'). If so, 
return true, else return false;

3. Compare player selection and computer selection and returns 'win', 'lose' or 'draw'
IF (the arguments are the same), return 'draw'
ELSE IF (pair of arguments belongs to the set of winning pairs), return  'win' 
ELSE return 'lose'

Set of winning pairs:
Rock AND Scissors
Scissors AND Paper
Paper AND Rock
*/

function adjustEntryString(string) {
    const adjusted = string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    return adjusted;
}

function entryIsValid(playerSelection) {
    if (playerSelection === 'Rock' || playerSelection === 'Paper' ||
    playerSelection === 'Scissors') {
        return true;
    } else {
        return false;
    }
}

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

/* PROBLEM
Write a NEW function called game(). Call the playRound function inside of this one to play a 
5 round game that keeps score and reports a winner or loser at the end.

SOLUTION
Prompt and validation
    Prompt the user for a selection
    Adjust the entry string (Capitalize first letter)
    Check if the entry is valid. If not, repeat steps above until user hits Cancel or inputs a 
    valid entry.

At any time, if the user chooses Cancel, stop the game and print 'Game cancelled'

If choice is valid and user didn't hit Cancel, play a round, print the results (alert and 
    console.log) and count wins and losses

After the 5th round has been played:
IF (number of wins is bigger than number of losses), return ('You won! Congratulations!')
ELSE IF (number of wins is smaller than number of losses), return ('You lost! Try again!')
ELSE return ('It's a Draw!')
*/

function game() {
    let gamesWon = 0;
    let gamesLost = 0;
    let playerSelection;

    for (let i = 0; i < 5; i++) {

        playerSelection = prompt('Choose Rock, Paper or Scissors');

        if (playerSelection === null){
            break;
        } else {
            playerSelection = adjustEntryString(playerSelection);
        }
        
        while (entryIsValid(playerSelection) === false && playerSelection !== null) {
            alert('Invalid choice! Please try again.');
            playerSelection = prompt('Choose Rock, Paper or Scissors');
            if (playerSelection === null) {
                break;
            } else {
            playerSelection = adjustEntryString(playerSelection);
            }
        }
        
        if (playerSelection === null) {
            break;
        } else { 
            let computerSelection = computerPlay();
            let result = playRound(playerSelection, computerSelection);
            if (result === 'win') {
                ++gamesWon;
                alert(`Round ${i+1}: You Win! ${playerSelection} beats ${computerSelection}`);
                console.log(`Round ${i+1}: You Win! ${playerSelection} beats ${computerSelection}`);
            } else if (result === 'lose') {
                ++gamesLost;
                alert(`Round ${i+1}: You Lose! ${playerSelection} is beaten by ${computerSelection}`);
                console.log(`Round ${i+1}: You Lose! ${playerSelection} is beaten by ${computerSelection}`);
            } else {
                alert(`Round ${i+1}: Draw! Both have chosen ${playerSelection}`);
                console.log(`Round ${i+1}: Draw! Both have chosen ${playerSelection}`);
            }
        }
    }

    if (playerSelection === null) {
        return 'Game cancelled';
    }
    
    if (gamesWon > gamesLost) {
        return `Games won: ${gamesWon}\nGames lost: ${gamesLost}\nDraws: ${5 - gamesWon - gamesLost}\n\nYou\'re the winner! Congratulations!`
    } else if (gamesWon < gamesLost) {
        return `Games won: ${gamesWon}\nGames lost: ${gamesLost}\nDraws: ${5 - gamesWon - gamesLost}\n\nComputer won! Try again.`
    } else {
        return `Games won: ${gamesWon}\nGames lost: ${gamesLost}\nDraws: ${5 - gamesWon - gamesLost}\n\nIt\'s a Draw!`
    }
}

const gameResult = game();
console.log(gameResult);
alert(gameResult);