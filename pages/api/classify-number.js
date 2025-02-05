// Import the CORS middleware
import Cors from 'cors';

// Configure CORS to accept all origins
const cors = Cors({
  origin: '*',
  methods: ['GET', 'HEAD'],
});

// Middleware to run CORS
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

// Function to check if a number is prime
function isPrime(num) {
  if (num <= 1) return false;
  for (let i = 2; i < num; i++) {
    if (num % i === 0) return false;
  }
  return true;
}

// Function to check if a number is perfect
function isPerfect(num) {
  let sum = 1;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      if (i === num / i) sum += i;
      else sum += i + num / i;
    }
  }
  return sum === num && num !== 1;
}

// Function to check if a number is an Armstrong number
function isArmstrong(num) {
  const digits = num.toString().split('');
  const sum = digits.reduce((acc, digit) => acc + Math.pow(parseInt(digit), digits.length), 0);
  return sum === num;
}

// Function to calculate the sum of the digits of a number (using absolute value)
function getDigitSum(num) {
  return Math.abs(num).toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
}

// API handler function
export default async function handler(req, res) {
  // Run the CORS middleware
  await runMiddleware(req, res, cors);

  // Get the number from the query parameters
  const { number } = req.query;

  // Validate the input to ensure it is a valid integer
  if (!Number.isInteger(Number(number))) {
    return res.status(400).json({ number, error: true });
  }

  // Parse the number
  const num = parseInt(number);

  // Determine the properties of the number
  const is_prime = isPrime(num);
  const is_perfect = isPerfect(num);
  const is_armstrong = isArmstrong(num);
  const digit_sum = getDigitSum(num);
  const properties = [
    is_armstrong ? 'armstrong' : null,
    num % 2 === 0 ? 'even' : 'odd'
  ].filter(Boolean);

  // Fetch fun fact from Numbers API
  let fun_fact = 'No fun fact available.';
  try {
    const response = await fetch(`http://numbersapi.com/${num}/math?json`);
    if (response.ok) {
      const data = await response.json();
      if (data.found) {
        fun_fact = data.text;
      }
    }
  } catch (error) {
    console.error('Error fetching fun fact:', error);
  }

  // Construct the response object
  const response = {
    number: num,
    is_prime,
    is_perfect,
    properties,
    digit_sum,
    fun_fact
  };

  // Send the response
  res.status(200).json(response);
}