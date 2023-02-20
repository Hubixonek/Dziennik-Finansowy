(() => {
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
  const history = JSON.parse(window.localStorage.getItem('history')) || [];
  const API_LINK = 'http://api.nbp.pl/api/exchangerates/tables/C/';
  // const tBodyEl = document.querySelector('tbody');

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
  // Multiplying amount and course to get result
  const calculation = () => {
    if (!amount.value) {
      result.value = 'Wpisz kwotę!';
      result.classList.remove('text-lime');
      result.classList.add('text-red');
    } else if (!course.value) {
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
    if (result.value) {
      amount.value = result.value * course.value;
    }
  };
  const updateCurrencyText = () => {
    currencyText.textContent = `${currencyOne.value}/${currencyTwo.value}`;
  };
  // Swap positions between currencyOne and currencyTwo
  let temp = '';
  currencyTwo.addEventListener('click', (event) => {
    temp = event.target.value;
  });
  currencyTwo.addEventListener('change', (event) => {
    if (event.target.value === currencyOne.value) {
      currencyOne.value = temp;
      updateCurrencyText();
    }
  });
  let secondTemp = '';
  currencyOne.addEventListener('click', (event) => {
    secondTemp = event.target.value;
  });
  currencyOne.addEventListener('change', (event) => {
    if (event.target.value === currencyTwo.value) {
      currencyTwo.value = secondTemp;
      updateCurrencyText();
    }
  });

  const addTableRow = (item) => {
    const newRow = table.insertRow(table.length);
    const dateCell = newRow.insertCell(0);
    const amountCell = newRow.insertCell(0);
    const currencyCell = newRow.insertCell(0);
    const courseCell = newRow.insertCell(0);
    const resultCell = newRow.insertCell(0);

    resultCell.innerHTML = item.date;
    courseCell.innerHTML = item.amount;
    currencyCell.innerHTML = item.currency;
    amountCell.innerHTML = item.course;
    dateCell.innerHTML = item.result;

    tdList.classList.add('addDisplay');
  };

  function saveDatas() {
    const datas = {
      date: date.value,
      amount: amount.value,
      currency: currencyText.innerHTML,
      course: course.value,
      result: result.value,
    };

    history.push(datas);
    window.localStorage.setItem('history', JSON.stringify(history));
    addTableRow(datas);
  }

  window.addEventListener('load', () => {
    const dataObject = localStorage.getItem('history');
    if (!dataObject) {
      return;
    }
    const parsedData = JSON.parse(dataObject);
    parsedData.forEach(addTableRow);
  });
  const prepareDOMEvents = () => {
    saveBtn.addEventListener('click', saveDatas);
    result.addEventListener('keyup', secondCalculation);
    amount.addEventListener('keyup', calculation);
    course.addEventListener('keyup', calculation);
    currencyOne.addEventListener('change', updateCurrencyText);
    currencyTwo.addEventListener('change', updateCurrencyText);
  };
  prepareDOMEvents();
})();
