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
 snapshot.forEach((childSnapshot) => {
  let childKey = childSnapshot.key;
  let childData = childSnapshot.val();
  appendItemToShoppingListElement(childData, childKey);
 });
});

function clearShoppingListElement() {
 listElement.innerHTML = '';
}

function clearInputFieldElement() {
 inputFieldElement.value = '';
}

function appendItemToShoppingListElement(item, key) {
 let liElement = document.createElement('li');
 liElement.innerText = item;
 listElement.appendChild(liElement);

 liElement.addEventListener('click', () => {
  removeItemFromShoppingListElement(key);
 });
}

function removeItemFromShoppingListElement(key) {
 let exactLocationOfItemInDB = ref(database, `shopping-list/${key}`);
 remove(exactLocationOfItemInDB);
}
