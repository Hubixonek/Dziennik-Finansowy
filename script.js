const amount = document.querySelector('#amount');
const course = document.querySelector('#course');
const result = document.querySelector('#result');
const saveBtn = document.querySelector('#save-btn');
const currencyOne = document.querySelector('#inputGroupSelect01');
const currencyTwo = document.querySelector('#inputGroupSelect02');
const convBtn = document.querySelector('.btn btn-primary');

// Multiplying amount and course to get result
const calculation = () => {
  if (amount.value === '') {
    result.value = 'Wpisz kwotę!';
    result.classList.add('text-red');
  } else if (course.value === '') {
    result.value = 'Wpisz kurs!';
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

result.addEventListener('keyup', secondCalculation);
amount.addEventListener('keyup', calculation);
course.addEventListener('keyup', calculation);
