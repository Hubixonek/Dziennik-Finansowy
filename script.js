/* eslint-disable no-empty */
const amount = document.querySelector('#amount');
const course = document.querySelector('#course');
const result = document.querySelector('#result');
const currencyOne = document.querySelector('#currencyOne');
const currencyTwo = document.querySelector('#currencyTwo');
const currencyText = document.querySelector('#currencyText');

// const saveBtn = document.querySelector('#save-btn');

// Multiplying amount and course to get result
const calculation = () => {
  if (amount.value === '') {
    result.value = 'Wpisz kwotę!';
    result.classList.remove('text-lime');
    result.classList.add('text-red');
  } else if (course.value === '') {
    result.value = 'Wpisz kurs!';
    result.classList.remove('text-lime');
    result.classList.add('text-red');
  } else {
    result.classList.remove('text-red');
    result.classList.add('text-lime');
    result.value = amount.value * course.value;
  }
};
// Multiplying the result by the curse
const secondCalculation = () => {
  if (result.value === '') {
  } else {
    amount.value = result.value * course.value;
  }
};
currencyOne.addEventListener('change', (event) => {
  currencyText.textContent = `${event.target.value}`;
  currencyTwo.addEventListener('change', (e) => {
    currencyText.textContent = `${event.target.value}/${e.target.value}`;
  });
});
//Swap positions between currencyOne and currencyTwo
let temp = '';
currencyTwo.addEventListener('click', (e) => {
  // if(currencyOne.value === currencyTwo.value)
  temp = e.target.value;
});
currencyTwo.addEventListener('change', (e) => {
  if (currencyTwo.value === currencyOne.value) {
    currencyOne.value = temp;
  }
});
let secondTemp = '';
currencyOne.addEventListener('click', (e) => {
  secondTemp = e.target.value;
});
currencyOne.addEventListener('change', (e) => {
  if (currencyOne.value === currencyTwo.value) {
    currencyTwo.value = secondTemp;
    currencyText.textContent = `${currencyOne.value}/${secondTemp}`;
  }
});

// Connection with localStorage
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.currencyOne) {
    currencyOne.value = localStorage.currencyOne;
  }
  currencyOne.onchange = function () {
    localStorage[currencyOne] = this.value;
  };
  if (localStorage.currencyTwo) {
    currencyTwo.value = localStorage.currencyTwo;
  }
  currencyTwo.onchange = function () {
    localStorage[currencyTwo] = this.value;
  };
});
const saveSettings = () => {
  localStorage.currencyOne = currencyOne.value;
  localStorage.currencyTwo = currencyTwo.value;
};

currencyOne.addEventListener('click', saveSettings);
currencyTwo.addEventListener('click', saveSettings);
result.addEventListener('keyup', secondCalculation);
amount.addEventListener('keyup', calculation);
course.addEventListener('keyup', calculation);
