const appSettings = {
 databaseURL: 'https://playground-60395-default-rtdb.firebaseio.com/',
}

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js';
import { getDatabase, ref, push } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js';

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, 'shopping-list');

const inputBtn = document.getElementById('input-btn');
const inputFieldElement = document.getElementById('input-field');

inputBtn.addEventListener('click', () => {
 let inputValue = inputFieldElement.value;
 push(shoppingListInDB, inputValue)
 console.log(inputValue);
});
