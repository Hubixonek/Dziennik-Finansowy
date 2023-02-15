const amount = document.getElementById('amount');
const course = document.getElementById('course');
const result = document.getElementById('result');
const currencyOne = document.getElementById('currencyOne');
const currencyTwo = document.getElementById('currencyTwo');
const currencyText = document.getElementById('currencyText');
const date = document.getElementById('date');
const saveBtn = document.getElementById('save-btn');
const table = document.querySelector('.table-test');
const tdList = document.querySelector('.saved-datas');
const tr = document.querySelector('.table test tr');
// const tBodyEl = document.querySelector('tbody');

const API_LINK = 'http://api.nbp.pl/api/exchangerates/tables/C/';

async function fetchRates() {
  try {
    const response = await fetch(API_LINK);
    const data = await response.json();
    const currencys = data[0].rates;
    console.log(currencys);
    // znalezc obiekt za pomoca property
  } catch {
    console.error('błąd');
  }
}
fetchRates();

// const main = () =>{

// }

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
  if (result.value !== '') {
    amount.value = result.value * course.value;
  }
};
currencyOne.addEventListener('change', (event) => {
  currencyText.textContent = `${event.target.value}`;
  currencyTwo.addEventListener('change', (e) => {
    currencyText.textContent = `${event.target.value}/${e.target.value}`;
  });
});
// Swap positions between currencyOne and currencyTwo
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

function getDatas() {
  localStorage.setItem('date', JSON.stringify(date.value));
  localStorage.setItem('amount', JSON.stringify(amount.value));
  localStorage.setItem('currency', JSON.stringify(currencyText.innerHTML));
  localStorage.setItem('course', JSON.stringify(course.value));
  localStorage.setItem('result', JSON.stringify(result.value));
}
function saveDatas() {
  let cell1;
  let cell2;
  let cell3;
  let cell4;
  let cell5 = '';

  let newRow = '';
  const dateData = JSON.parse(localStorage.getItem('date'));
  const amountData = JSON.parse(localStorage.getItem('amount'));
  const currencyData = JSON.parse(localStorage.getItem('currency'));
  const courseData = JSON.parse(localStorage.getItem('course'));
  const resultData = JSON.parse(localStorage.getItem('result'));
  tdList.classList.add('addDisplay');
  newRow = table.insertRow(table.length);

  cell5 = newRow.insertCell(0);
  cell4 = newRow.insertCell(0);
  cell3 = newRow.insertCell(0);
  cell2 = newRow.insertCell(0);
  cell1 = newRow.insertCell(0);

  cell5.innerHTML = resultData;
  cell4.innerHTML = courseData;
  cell3.innerHTML = currencyData;
  cell2.innerHTML = amountData;
  cell1.innerHTML = dateData;

  if (localStorage.getItem('history') == null) {
    localStorage.setItem('history', '[]');
  }
  const history = JSON.parse(localStorage.getItem('history'));
  history.push(dateData);
  localStorage.setItem('history', JSON.stringify(history));

  if (localStorage.getItem('history') != null) {
    cell1.innerHTML = JSON.parse(localStorage.getItem('history'));
  }
}
window.onload = function () {
  saveDatas();
  getDatas();
};
saveBtn.addEventListener('click', getDatas);
saveBtn.addEventListener('click', saveDatas);
result.addEventListener('keyup', secondCalculation);
amount.addEventListener('keyup', calculation);
course.addEventListener('keyup', calculation);
