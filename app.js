// IDs of elements in DOM and game
const elementKeys = ['rock', 'paper', 'scissors'];

// creates an associative array which doesn't have a built in length method
const domElements = crawler(elementKeys);

// add click events to each DOM element
addClickEvent(domElements, elementKeys);

// get elements to manipulate at end of game
const messageContainer = document.querySelector('.game__message')
const gameContainer = document.querySelector('.game__row');
const messageP = document.getElementById('js__message');

// builds refresh button
document.getElementById('js__refresh').addEventListener('click', () => {location.reload()});

// responses for each outcome
const responses = {
  win: 'You win!',
  lose: ':( you lose.',
  draw: "It's a draw."
}

// array of strings to decide who wins, game() uses this array
// game() matches user choice and computer choice to these array items
const whoWins = ['rockscissors','scissorspaper','paperrock']

// Compare the two choices and determine a winner.
function game(str) {

  let message = '';
  let computersChoice = random(elementKeys);

  if (computersChoice === str) {
    message = responses.draw + " " + str + " equals " + computersChoice;
  } else if (whoWins.includes(str + computersChoice)) {
    message = responses.win + " " + str + " beats " + computersChoice;
  } else {
    message = responses.lose + " " + computersChoice + " beats " + str;
  }
  endGame(message);
}

// crawls the DOM for elements with IDs in an array
// returns an array with key value pairs
function crawler(arr) {
  const elements = [];

  for(let i = 0; i < arr.length; i++) {
    elements[arr[i]] = document.getElementById(arr[i]);
  }

  return elements;
}

// adds a click event to each key value pair in an array
function addClickEvent(arr, keys) {
  for(let i = 0; i < Object.keys(arr).length; i++) {
    arr[keys[i]].addEventListener('click', () => {game(keys[i])});
  }
}

// Get the computer’s choice.
function random(keys) {
  return keys[Math.floor(Math.random() * 3)];
}

// Actions completed at the end of the game
function endGame(str) {
  messageP.innerHTML = str;
  gameContainer.classList.add('hidden');
  messageContainer.classList.remove('hidden');
}