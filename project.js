// 1. Deposit some money
// 2. Determine number of lines to bet on
// 3. Collect a bet amount
// 4. Spin the slot machine
// 5. Check if the user won
// 6. Give the user their winnings
// 7. Play again

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
  "A": 2,
  "B": 4,
  "C": 6,
  "D": 8
}

const SYMBOLS_VALUE = {
  "A": 5,
  "B": 4,
  "C": 3,
  "D": 2
}


// 1. Deposit some money
const deposit = () => {
  while (true) {
    const depositAmount = prompt("Enter a deposit amount: ");
    const numberDepositAmount = parseFloat(depositAmount);

    if(isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
      console.log('Invalid deposit amount, try again');
    } else {
      return numberDepositAmount;
    }
  }
}

// 2. Determine number of lines to bet on
const getNumberOfLines = () => {
  while (true) {
    const lines = prompt("Enter the number of lines to bet on(1-3): ");
    const numberOfLines = parseFloat(lines);

    if(isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
      console.log('Invalid number of lines, try again');
    } else {
      return numberOfLines;
    }
  }
}

// 3. Collect a bet amount
const getBet = (balance, lines) => {
  while (true) {
    const bet = prompt("Enter the bet per line: ");
    const numberBet = parseFloat(bet);

    if(isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
      console.log('Invalid bet, try again');
    } else {
      return numberBet;
    }
  }
}

// 4. Spin the slot machine
const spin = () => {
  const symbols = [];
  // a for loop to loop trough all the different entries inside the SYMBOL_COUNT object
  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
    // for loop to add however many symbols (A: 2, B: 4, C: 6, D: 8) into the symbols array.
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }
  // Each one of this array is going to rapresent a column inside the slot machine.
  const reels = [];
  // for every single reel(column of the slot machine) we have,
  // we need to generate what's inside of it.
  for (let i = 0; i < COLS; i++) {
    reels.push([]);
    // generate the available symbols
    const reelSymbols = [...symbols];
    // for every single array generate the number of rows and the number of elements
    // that needs to go inside of that array or inside of each reel.
    for (let j = 0; j < ROWS; j++) {
      // generate a random number between 0 and wathever the length of our reel is - 1
      const randomIndex = Math.floor(Math.random() * reelSymbols.length);
      // and then use that to select the element or the symbol from our reel symbols.
      const selectedSymbols = reelSymbols[randomIndex];
      // pushing into the interior array the selected symbol.
      reels[i].push(selectedSymbols);
      // remove the symbol cos we can't selected it again while we generate this reel.
      reelSymbols.splice(randomIndex, 1);
    }
  }
  return reels;
};

const reels = spin();
console.log(reels);

let balance = deposit();
const numberOfLines = getNumberOfLines();
const bet = getBet(balance, numberOfLines);
