const appSettings = {
 databaseURL: 'https://playground-60395-default-rtdb.firebaseio.com/',
}

import {
 initializeApp
} from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js';
import {
 getDatabase,
 ref,
 push,
 onValue,
 remove
} from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js';

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, 'shopping-list');

const inputBtn = document.getElementById('input-btn');
const inputFieldElement = document.getElementById('input-field');
const listElement = document.getElementById('shopping-list');


inputBtn.addEventListener('click', () => {
 let inputValue = inputFieldElement.value;
 push(shoppingListInDB, inputValue)

 clearInputFieldElement();
});

onValue(shoppingListInDB, (snapshot) => {
 clearShoppingListElement();
 if(snapshot.exists()) {
  let data = snapshot.val();
  let keys = Object.keys(data);
  keys.forEach((key) => {
   let item = data[key];
   appendItemToShoppingListElement(item, key);
  });
 } else {
  listElement.innerHTML = 'No data available';
  return;
 }

});

function clearShoppingListElement() {
 listElement.innerHTML = '';
}

function clearInputFieldElement() {
 inputFieldElement.value = '';
}

function appendItemToShoppingListElement(item, key) {
 let liElement = document.createElement('li');
 if(item === '') {
  return;
 } else {
  liElement.innerHTML = item;
  listElement.appendChild(liElement);
 }

 liElement.addEventListener('click', () => {
  removeItemFromShoppingListElement(key);
 });
}

function removeItemFromShoppingListElement(key) {
 let exactLocationOfItemInDB = ref(database, `shopping-list/${key}`);
 remove(exactLocationOfItemInDB);
}
