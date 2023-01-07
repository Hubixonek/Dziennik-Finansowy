const amount = document.querySelector('#amount');
const course = document.querySelector('#course');
const currencyOne = document.querySelector('.inputGroupSelect01');
const currencyTwo = document.querySelector('.inputGroupSelect02');
const convBtn = document.querySelector('.btn btn-primary');
const result = document.querySelector('#result');
const saveBtn = document.querySelector('#save-btn');

const calculation = () => {
  if (amount.value === '') {
    result.value = 'Wpisz kwotę!';
    result.classList.add('text-red');
  } else if (course.value === '') {
    result.value = 'Wpisz kurs!';
    result.classList.add('text-red');
  } else {
    result.style.color = 'gold';
    result.value = amount.value * course.value;
  }
};

amount.addEventListener('keyup', calculation);
course.addEventListener('keyup', calculation);
