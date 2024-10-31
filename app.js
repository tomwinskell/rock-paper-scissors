// IDs of elements in DOM and game
const elementKeys = ['rock', 'paper', 'scissors', 'js__message', 'js__game__message', 'js__game__row'];
const gameKeys = elementKeys.slice(0,3); // returns only the game elements

// creates an associative array key=elementKeys and value=DOMelement
const domElements = crawler(elementKeys);

// add click events to DOM elements
addClickEvent(domElements, gameKeys);

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
  let computersChoice = random(gameKeys);

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
// pass in the array of DOM elements and keys to add event listener
function addClickEvent(arr, keys) {
  keys.forEach(element => {
    arr[element].addEventListener('click', () => {game(element)});
  });
}

// Get the computer’s choice.
function random(keys) {
  return keys[Math.floor(Math.random() * 3)];
}

// Actions completed at the end of the game
function endGame(str) {
  domElements['js__message'].innerHTML = str;
  domElements['js__game__row'].classList.add('hidden');
  domElements['js__game__message'].classList.remove('hidden');
}