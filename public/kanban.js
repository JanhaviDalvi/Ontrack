var cardName, cardDescription, cardTag, cardPriority, cardDueDate, currentDate, status;
console.log(userId);

window.onload = function () {
    console.log("window loaded");
    
    var all_cards = document.querySelectorAll(".card");
    console.log("sdjfjsdkfhj", all_cards);
    all_cards.forEach(each_card => {
        each_card.addEventListener("dragstart", function (event) {
            each_card.setAttribute("id", "cardId");
            event.dataTransfer.setData("text/plain", event.target.id);
            console.log(event.target.id);
            event.target.style.opacity = 0.5;
            event.target.style.border = "1px solid black";
        });
        each_card.addEventListener("dragend", function (event) {
            event.target.style.opacity = 1;
            event.target.style.border = "";
        });
    });
};

// dragging
const column1 = document.getElementById("todo_column");
const column2 = document.getElementById("inprogress_column");
const column3 = document.getElementById("completed_column");

// this function will be triggered when a card is dropped in another column, will send updated column name to server js
function column_changed(column_name, card_id){
    console.log("function triggered");
    $.ajax({
        type: 'POST',
        url: '/drag',
        data: { column: column_name, task_id: card_id },
        success: function(response) {
          console.log('Column change request successful');
        },
        error: function(error) {
          console.log('Error in processing column change request');
        }
    });
}

column1.addEventListener("dragover", function (event) {
    event.preventDefault();
    console.log("heyy2");
});

column1.addEventListener("drop", function (event) {
    event.preventDefault();
    const id = event.dataTransfer.getData("text/plain");
    const draggableElement = document.getElementById(id);
    console.log(draggableElement);
    draggableElement.setAttribute("draggable", "true");
    column1.appendChild(draggableElement);
    draggableElement.removeAttribute("id");
    console.log("heyy3");
    let card_id = draggableElement.getElementsByClassName("card_id")[0].textContent.trim();
    column_changed("todo", card_id);
});

column2.addEventListener("dragover", function (event) {
    event.preventDefault();
    console.log("heyy2");
});

column2.addEventListener("drop", function (event) {
    event.preventDefault();
    const id = event.dataTransfer.getData("text/plain");
    const draggableElement = document.getElementById(id);
    console.log(draggableElement);
    draggableElement.setAttribute("draggable", "true");
    column2.appendChild(draggableElement);
    draggableElement.removeAttribute("id");
    console.log("heyy3");
    let card_id = draggableElement.getElementsByClassName("card_id")[0].textContent.trim();
    column_changed("inprogress", card_id);
});

column3.addEventListener("dragover", function (event) {
    event.preventDefault();
    console.log("heyy2");
});

column3.addEventListener("drop", function (event) {
    event.preventDefault();
    const id = event.dataTransfer.getData("text/plain");
    const draggableElement = document.getElementById(id);
    console.log(draggableElement);
    draggableElement.setAttribute("draggable", "true");
    column3.appendChild(draggableElement);
    draggableElement.removeAttribute("id");
    console.log("heyy3");
    let card_id = draggableElement.getElementsByClassName("card_id")[0].textContent.trim();
    column_changed("completed", card_id);
});


// for sort button
const sort = document.getElementById("sort-select");
sort.addEventListener("change", function () {
    let sortBy = sort.value;
    // var columns = [column1, column2, column3];
    // for(let i = 0; i < columns.length; i++){
    //     sort_cards(columns[i], sortBy);
    // }
    console.log(sortBy);
    sort_cards(column1, sortBy);
});

function sort_cards(column, sortBy){
    
    let cards = Array.from(column.querySelectorAll(".card"));
    console.log(sortBy);
    console.log(cards);
    if (sortBy === "priority") {
        cards.sort(function (a, b) {
            console.log("hey");
            let priorityA = parseInt(a.querySelector(".card_priority").textContent);
            let priorityB = parseInt(b.querySelector(".card_priority").textContent);
            return priorityA - priorityB;
        });
    } else if (sortBy === "due-date") {
        cards.sort(function (a, b) {
            let dueDateA = new Date(a.querySelector(".card_duedate").textContent);
            let dueDateB = new Date(b.querySelector(".card_duedate").textContent);
            return dueDateA - dueDateB;
        });
    }
    console.log(cards);
    for (let i = 0; i < cards.length; i++) {
        column.appendChild(cards[i]);
    }
}  