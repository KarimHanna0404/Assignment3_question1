const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

function findSummation(N = 1) {
    if (typeof N !== 'number' || N <= 0 || !Number.isInteger(N) || isNaN(N))
        return false;
    if (N === 1)
        return 1;
    else
        return N + findSummation(N - 1);
}

function uppercaseFirstandLast(str) {
    if (str.length === 0) {
        return str; // Return the original string if it's empty
    }
    if (str.length === 1) {
        return str.toUpperCase(); // If there's only one character, capitalize it
    }
    var firstCharacter = str.slice(0, 1).toUpperCase();
    var lastCharacter = str.slice(-1).toUpperCase();
    return firstCharacter + str.slice(1, -1) + lastCharacter;
}

function findAverageAndMedian(numbers){
    let sum =0; 
    if (!Array.isArray(numbers)){
        throw new Error ('input must be an array of numbers');
    }

    for(let i = 0; i< numbers.length;i++){
        sum+=numbers[i];
    }

    const average = sum/numbers.length;

    numbers.sort((a, b) => a - b);

    let median;
    const mid = Math.floor(numbers.length / 2);
    if (numbers.length % 2 === 0) {
        median = (numbers[mid - 1] + numbers[mid]) * 0.5;
    } else {
        median = numbers[mid];
    }

    return { average, median };
    
}

function find4Digits(str){
      const regex = /\b\d{4}\b/g;
    
      const matches = str.match(regex);
  
      if (matches && matches.length > 0) {
          return Number(matches[0]);
      } else {
          return false;
      }
  }


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Question1.html'));
});

app.get('/findSummation', (req, res) => {
    const input = Number(req.query.N); 
    const result = findSummation(input);
    res.send(`RESULT findSummation: ${result}`);
    console.log(`RESULT findSummation: ${result}`);
});

app.get('/uppercaseFirstandLast', (req, res) => {
    const input = req.query.string;
    const result = uppercaseFirstandLast(input);
    res.send(`RESULT uppercaseFirstandLast: ${result}`);
    console.log(`RESULT uppercaseFirstandLast: ${result}`);
});

app.get('/findAverageAndMedian', (req, res) => {
    const numbersString = req.query.numbers;
    if (!numbersString) {
        return res.status(400).send('Bad Request: Query parameter "numbers" is required.');
    }

    const numbers = numbersString.split(' ').map(Number);
    try {
        const result = findAverageAndMedian(numbers);
        res.send(`Average: ${result.average}, Median: ${result.median}`);
    } catch (error) {
        res.status(400).send(`Error: ${error.message}`);
    }
});

app.get('/find4Digits', (req, res) => {
    const inputString = req.query.str;
    if (!inputString) {
        return res.status(400).send('Bad Request: Query parameter "str" is required.');
    }

    const result = find4Digits(inputString);
    res.send(`First 4-digit number: ${result}`);
});



app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
