function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
  
  const dataStart = document.querySelector('button[data-start]');
  const dataStop = document.querySelector('button[data-stop]');
  const body = document.querySelector('body');
  
  dataStart.addEventListener('click', onStartBtnClick);
  dataStop.addEventListener('click', onStopBtnClick);
  
  let timerId = null;
  
  function onStartBtnClick() {
    timerId = setInterval(() => {
      const randomColorPicker = getRandomHexColor();
      body.style.background = randomColorPicker;
    }, 1000);
    enableDisableBtns(dataStop, dataStart);
  }
  
  function onStopBtnClick() {
    clearInterval(timerId);
    enableDisableBtns(dataStart, dataStop);
  }
  
  function enableDisableBtns(button1, button2) {
    button1.removeAttribute('disabled');
    button2.setAttribute('disabled', true);
  }
