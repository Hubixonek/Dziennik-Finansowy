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
  const h1 = document.querySelector('.saved-datas-body h1');
  const history = JSON.parse(window.localStorage.getItem('history')) || [];
  const summaryResults = document.querySelector('.summaryResults');
  const currentlyValue = document.getElementById('api-courses');
  const API_LINK = 'https://api.nbp.pl/api/exchangerates/tables/C/';

  // const tBodyEl = document.querySelector('tbody');

  async function fetchRates(currencyCode) {
    try {
      const response = await fetch(API_LINK);
      const data = await response.json();
      const currencyRate = data[0].rates.find((rate) => rate.code === currencyCode);
      currentlyValue.value = currencyRate.bid;
    } catch (error) {
      console.error('Wystąpił błąd:', error);
    }
  }

  currencyTwo.addEventListener('change', () => {
    const selectedCurrency = currencyTwo.value;
    fetchRates(selectedCurrency);
  });

  // Multiplying amount and course to get result
  const calculationAmountByCourse = () => {
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
  const multiplyingResultByTheCurse = () => {
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
  let total = 0;
  let lastCurrency;
  let lastCurrently;
  const addTableRow = (item) => {
    const newRow = table.insertRow(table.length);
    const resultCell = newRow.insertCell(0);
    const amountCell = newRow.insertCell(0);
    const currencyCell = newRow.insertCell(0);
    const courseCell = newRow.insertCell(0);
    const currentlyCell = newRow.insertCell(-1);
    const summaryCell = newRow.insertCell(-1);
    const cancelCell = newRow.insertCell(-1);
    const dateCell = newRow.insertCell(0);

    currentlyCell.innerHTML = item.currently;
    resultCell.innerHTML = item.result;
    courseCell.innerHTML = item.amount;
    currencyCell.innerHTML = item.currency;
    amountCell.innerHTML = item.course;
    dateCell.innerHTML = item.date;
    summaryCell.innerHTML = '';

    cancelCell.innerHTML = '';
    tdList.classList.add('addDisplay');

    total += parseFloat(item.result);
    lastCurrency = currencyTwo.value;
    lastCurrently = currentlyValue.value;
    summaryResults.innerHTML = `${total} &nbsp &nbsp ${lastCurrency} &nbsp &nbsp ${lastCurrently}`;

    newRow.addEventListener('mouseenter', () => {
      const cancelButton = document.createElement('span');
      cancelButton.textContent = 'X';
      cancelButton.className = 'cancelButton';

      cancelCell.appendChild(cancelButton);
      cancelCell.classList.add('cancelCell');
      cancelButton.addEventListener('click', (event) => {
        const rowIndex = event.target.closest('tr').rowIndex - 1;
        history.splice(rowIndex, 1);
        window.localStorage.setItem('history', JSON.stringify(history));
        event.target.closest('tr').remove();
      });
    });

    newRow.addEventListener('mouseleave', () => {
      cancelCell.textContent = '';
    });
  };

  function saveTransactionDatas() {
    const data = {
      date: date.value,
      amount: amount.value,
      currency: currencyText.innerHTML,
      course: course.value,
      result: result.value,
      currently: currentlyValue.value,
    };
    // Validation for not add empty string to tabel
    if (Object.values(data).some((value) => value.trim() === '')) {
      // H1 is text "saved datas" above the table
      h1.classList.add('tableValidation');
      const tableValidation = document.querySelector('.tableValidation');
      tableValidation.textContent = 'Proszę uzupełnij pozostałe dane!';

      return;
    }
    h1.classList.remove('tableValidation');
    h1.textContent = 'Zapisane dane';
    history.push(data);
    window.localStorage.setItem('history', JSON.stringify(history));

    addTableRow(data);
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
    saveBtn.addEventListener('click', saveTransactionDatas);
    result.addEventListener('keyup', multiplyingResultByTheCurse);
    amount.addEventListener('keyup', calculationAmountByCourse);
    course.addEventListener('keyup', calculationAmountByCourse);
    currencyOne.addEventListener('change', updateCurrencyText);
    currencyTwo.addEventListener('change', updateCurrencyText);
  };
  prepareDOMEvents();
})();
