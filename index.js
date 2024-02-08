import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://shop-list-63cfe-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const listEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    if ( inputFieldEl.value !== '' ){
        push(shoppingListInDB, inputValue)
    } else {
        alert('write sth')
    }

    clearInputFieldEl();
})

onValue(shoppingListInDB, function(snapshot) {

    let itemsArray = Object.entries(snapshot.val());

    clearListEl();

    for (let i=0; i<itemsArray.length; i++) {
        let currentItem = itemsArray[i];
        let currentItemID = currentItem[0];
        let currentItemValue = currentItem[1];

        appendItemToListEl(currentItem);
    }

    console.log(itemsArray)

} )

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToListEl(item) {
    if (inputFieldEl.value !== '') {
        let itemID = item[0];
        let itemValue = item[1]
    
        let newEl = document.createElement('li');
        newEl.textContent = itemValue;

        

        if (!newEl.style.backgroundColor) {
            const colors = ["#FF6347", "#ff3399", "#ffbf47"];            
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            newEl.style.backgroundColor = randomColor; // Apply random color if not set
        }

        listEl.appendChild(newEl);

        
    }
}


function clearListEl() {
    listEl.innerHTML = ""
}

