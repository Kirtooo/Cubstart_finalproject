const term = document.querySelector('.term');
const definition = document.querySelector('.definition');
const checkButton = document.querySelector('.check');
const nextButton = document.querySelector('.next');
const termInput = document.querySelector('#term-input');
const definitionInput = document.querySelector('#definition-input');
const addButton = document.querySelector('#add-button');
const fccheckButton = document.querySelector('.check-fc');
const startBtn = document.querySelector(".start"),
  stopBtn = document.querySelector(".stop"),
  resetBtn = document.querySelector(".reset");

const activeFlashcards = {Scott: "Osgard", Alan: 'Chen', Leo: 'Yuan', Justin: 'Williams'}
let data = Object.entries(activeFlashcards);
let randomIndex = Math.floor(Math.random() * data.length);
let randomTerm = data[randomIndex][0];
let randomDefinition = data[randomIndex][1];

term.innerHTML = randomTerm;
definition.innerHTML = randomDefinition;

function getRandomFlashcard() {
  randomIndex = data[Math.floor(Math.random() * data.length)];
  term.innerHTML = randomTerm;
  definition.innerHTML = randomDefinition;
}


checkButton.addEventListener('click', function() {
    const temp = term.innerHTML;
    term.innerHTML = definition.innerHTML;
    definition.innerHTML = temp;
  });

  fccheckButton.addEventListener('click', function() {
    const temp = term.innerHTML;
    term.innerHTML = definition.innerHTML;
    definition.innerHTML = temp;
  });

nextButton.addEventListener('click', function() {
  randomIndex = Math.floor(Math.random() * data.length);
  randomTerm = data[randomIndex][0];
  randomDefinition = data[randomIndex][1];
  term.innerHTML = randomTerm;
  definition.innerHTML = randomDefinition;
});
addButton.addEventListener('click', function() {
    const newTerm = termInput.value.trim();
    const newDefinition = definitionInput.value.trim();
    if (newTerm !== '' && newDefinition !== '') {
      activeFlashcards[newTerm] = newDefinition;
      data = Object.entries(activeFlashcards);
      termInput.value = '';
      definitionInput.value = '';
    }
  });


let hr = min = sec = ms = "0" + 0,
  startTimer;


startBtn.addEventListener("click", start);
stopBtn.addEventListener("click", stops);
resetBtn.addEventListener("click", reset);

function start() {
  startBtn.classList.add("active");
  stopBtn.classList.remove("stopActive");

  startTimer = setInterval(()=>{
    ms++;
    ms = ms < 10 ? "00" + ms : ms;

    if(ms == 100){
      sec++;
      sec = sec < 10 ? "0" + sec : sec;
      ms = "0" + 0;
    }
    if(sec == 60){
      min++;
      min = min < 10 ? "0" + min : min;
      sec = "0" + 0;
    }

    putValue();
  },10); //1000ms = 1s

}


function stops() {
  startBtn.classList.remove("active");
  stopBtn.classList.add("stopActive");
  clearInterval(startTimer);
}

function reset() {
  startBtn.classList.remove("active");
  stopBtn.classList.remove("stopActive");
  clearInterval(startTimer);
  hr = min = sec = ms = "0" + 0,
  putValue();
}

function putValue() {
  document.querySelector(".millisecond").innerText = ms;
  document.querySelector(".second").innerText = sec;
  document.querySelector(".minute").innerText = min;
}