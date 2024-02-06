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
const itemEl = document.createElement("li")    

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(shoppingListInDB, inputValue)

    clearInputFieldEl();
})

onValue(shoppingListInDB, function(snapshot) {

    let itemsArray = Object.values(snapshot.val());

    clearListEl();

    for (let i=0; i<itemsArray.length; i++) {
        appendItemToListEl(itemsArray[i])
    }

} ) 

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToListEl(itemValue) {
    if ( inputFieldEl.value !== '' ){
        listEl.innerHTML += `<li>${itemValue}</li>`
    }
}

function clearListEl() {
    listEl.innerHTML = ""
}