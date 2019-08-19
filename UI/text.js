// Select the elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// Class names
const CHECK = "check";
const UNCHECK = "";
const DELETE = "del";

// Variables
let LIST , id;

// get item from local storage
let data = localStorage.getItem("ADDITEM");

// check if data isn't empty
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
} else {
    // if data isn't empty
    LIST = [];
    id = 0;
}
// load items to the user interface
function loadList(array) {
    array.forEach((item) => {
        addItem(item.name, item.id, item.done, item.trash);
    });
}
/* localStorage.setItem("ADDITEM", JSON.stringify(LIST)); */

// clear local storage
clear.addEventListener("click", () =>{
    localStorage.clear();
    location.reload();
});

// Date
const options = {weekday :"long", month: "short", day: "numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

function addItem(message, id, done, trash) {
    if(trash) {return;}

    const DONE = done ? CHECK : UNCHECK
    const DEL = done ? DELETE : "";

    const item =  
    `<li class="item">
    <input class="check ${DONE}" type="checkbox" name="check" value="" id="${id} checked"> 
    <p class="text ${DEL}">${message}</p>
</li>
    `
    const position = "beforeend"
    list.insertAdjacentHTML(position, item);
}

// Add Item
document.addEventListener("keyup", function(event) {
    if(event.keyCode == 13) {
        const message = input.value;

        // if input is not empty
        if (message) {
            addItem(message, id, false, false);

            LIST.push({
                name : message,
                id : id,
                done : false,
                trash : false
            })
            
            // Add item to local storage 
            localStorage.setItem("ADDITEM", JSON.stringify(LIST));

            id++;
        }
        input.value = "";
    }
});

// Complete add item
function completeAddItem(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(DELETE);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// Delete item

function removeAddItem(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    LISt[element.id].trash = true;
}

// Getting items created
list.addEventListener("click", (event) => {
    const element = event.target;
    const elementJob = element.attributes.job.value;

    if (elementJob == "complete") {
        completeAddItem(element);
    } else if(elementJob == "delete") {
        removeAddItem(element);
    }
    // Add item to local storage 
    localStorage.setItem("ADDITEM", JSON.stringify(LIST));
})