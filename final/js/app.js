const term = document.querySelector('.term');
const definition = document.querySelector('.definition');
const checkButton = document.querySelector('.check');
const nextButton = document.querySelector('.next');
const termInput = document.querySelector('#term-input');
const definitionInput = document.querySelector('#definition-input');
const addButton = document.querySelector('#add-button');

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
