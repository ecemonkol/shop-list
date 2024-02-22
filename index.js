import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, get, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://shop-list-63cfe-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListRef = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function () {

    let inputValue = inputFieldEl.value

    if (inputFieldEl.value !== '') {
        const newItem = push(shoppingListRef, inputValue);
        get(newItem.ref).then((snapshot) => {
            addItemToList(snapshot)
        })
    } else {
        alert('Please write an item')
    }

    clearInputFieldEl();
})

get(shoppingListRef).then((snapshot) => {
    if (snapshot.exists()) {
        snapshot.forEach((item) => {
            addItemToList(item);
        })
    } else {
        const noItemsText = document.createElement("h2")
        shoppingListEl.appendChild(noItemsText);
        noItemsText.innerHTML = "nothing here :/"
    }
})

function addItemToList(item) {
    const newEl = document.createElement('li');
    newEl.textContent = item.val();
    addRandomColor(newEl);

    newEl.addEventListener("click", function (event) {
        event.stopPropagation();
        // // Remove from DOM
        newEl.remove();

        // Remove from database
        remove(item.ref);
    });

    shoppingListEl.append(newEl);
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}


function addRandomColor(item) {
    if (!item.style.backgroundColor) {
        const colors = ["#FF6347", "#ff3399", "#ffbf47"];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        item.style.backgroundColor = randomColor;
    }

}