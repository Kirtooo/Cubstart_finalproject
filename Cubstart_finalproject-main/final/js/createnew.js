const termInput2 = document.querySelector('#term-input2');
const definitionInput2 = document.querySelector('#definition-input2');
const nameInput = document.querySelector('#name-input');
const addButton2 = document.querySelector('#add-button2');
const saveButton = document.querySelector('#save-button');
const setButton = document.querySelector('#set-button');
let setList = JSON.parse(localStorage.getItem("setList"));
if (localStorage.getItem("setList")) {
    let setList = JSON.parse(localStorage.getItem("setList"));
    console.log("successful");
    console.log(setList);
} else {
    let setList = ["group"];
    let setListSerialized = JSON.stringify(setList);
    console.log("unsuccessful");
    localStorage.setItem("setList", setListSerialized);
}
// let setListSerialized = JSON.stringify(setList);
// localStorage.setItem("setList", setListSerialized);
// let setListDeserialized = JSON.parse(localStorage.getItem("setList"));
// console.log(setListDeserialized);
let thisSet = {
    setName: "temp",
    content:{}
};

let defaultSet = {
    setName: "group",
    content:{Scott: "Osgard", Alan: 'Chen', Leo: 'Yuan', Justin: 'Williams'}
}
let groupSerialized = JSON.stringify(defaultSet);
localStorage.setItem("group", groupSerialized);

setButton.addEventListener('click', function() {
    const name = nameInput.value.trim();
    if (name !== '') {
        thisSet.setName = name;
        //console.log(name);
    }

});

addButton2.addEventListener('click', function() {
    const newTerm2 = termInput2.value.trim();
    const newDefinition2 = definitionInput2.value.trim();
    if (newTerm2 !== '' && newDefinition2 !== '') {
    //   activeFlashcards[newTerm2] = newDefinition2;
    //   console.log(newTerm2);
      thisSet.content[newTerm2] = newDefinition2;
      termInput2.value = '';
      definitionInput2.value = '';
      //console.log(thisSet);
    }
  });

saveButton.addEventListener('click', function() {
    let thisSetSerialized = JSON.stringify(thisSet);
    let currName = thisSet.setName;
    console.log(setList);
    setList.push(currName);
    console.log("first time")
    console.log(setList);
    localStorage.setItem(currName, thisSetSerialized);
    // localStorage.removeItem("setList");
    let setListSerialized = JSON.stringify(setList);
    localStorage.setItem("setList", setListSerialized);
    let setListDeserialized = JSON.parse(localStorage.getItem("setList"));
    console.log(setListDeserialized);
});