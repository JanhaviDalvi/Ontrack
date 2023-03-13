var cardName, cardDescription, cardTag, cardPriority, cardDueDate, currentDate, status;
console.log(userId);

// get the submit button
var submitBtn = document.getElementById("submitCard");

// attach an event listener to the submit button
submitBtn.addEventListener("click", function () {
    // get the value of the cardName input
    var cardName = document.getElementById("cardName").value;
    // console.log(cardName);

    var cardDescription = document.getElementById("cardDescription").value;
    // console.log(cardDescription);

    var cardTag = document.getElementById("cardTag").value;
    // console.log(cardTag);

    var cardPriority = document.getElementById("cardPriority").value;
    // console.log(cardPriority);

    // var cardCreationDate = document.getElementById("cardCreationDate").value;
    // console.log(cardCreationDate);

    var cardDueDate = document.getElementById("cardDueDate").value;
    // console.log(cardDueDate);

    const currentDate = new Date().toDateString();

    var status = 'todo';

    // // db insert 
    // try {
    //     User.save_task(task_name, description, due_date, date_creation, status, tag, priority, userId)
    // } catch (error) {
    //     console.log(error.message);
    // }

    // create a new card element
    var newCard = document.createElement("div");
    newCard.classList.add("card");

    // create the card header
    var cardHeader = document.createElement("div");
    cardHeader.classList.add("card-header");
    cardHeader.innerHTML = cardName;

    // create the card body
    var cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    // create the description
    var description = document.createElement("div");
    description.classList.add("card_discription");
    description.innerHTML = "Description: " + cardDescription;


    // create the tag
    var tag = document.createElement("div");
    tag.classList.add("card_tag");
    tag.innerHTML = "Tag: " + cardTag;

    // create the priority
    var priority = document.createElement("div");
    priority.classList.add("card_priority");
    let Prioritytext;
    if(cardPriority == 1 ){
        Prioritytext = "Low";
    }
    else if (cardPriority == 2) {
        Prioritytext = "Medium";
    }
    else {
        Prioritytext = "High";
    }
    priority.innerHTML = "Priority: " + Prioritytext;

    // create the due date
    var dueDate = document.createElement("div");
    dueDate.classList.add("card_duedate");
    dueDate.innerHTML = "Due Date: " + cardDueDate;

    // append elements to the card body
    cardBody.appendChild(description);
    cardBody.appendChild(tag);
    cardBody.appendChild(priority);
    cardBody.appendChild(dueDate);

    // append elements to the new card
    newCard.appendChild(cardHeader);
    newCard.appendChild(cardBody);

    // append the new card to the to-do column
    var todo_column = document.getElementById("todo_column");
    newCard.setAttribute("draggable", "true")
    todo_column.appendChild(newCard);

    $('#exampleModal').modal('toggle');
    document.getElementById("kanban_form").reset();

    var all_cards = document.querySelectorAll(".card");
    // console.log("sdjfjsdkfhj", all_cards);
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
});

var closecard = document.getElementById("closecard");

// attach an event listener to the submit button
closecard.addEventListener("click", function () {
    $('#exampleModal').modal('toggle');
    document.getElementById("kanban_form").reset();
});

// dragging
const column1 = document.getElementById("todo_column");
const column2 = document.getElementById("inprogress_column");
const column3 = document.getElementById("completed_column");


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
});


// for sort button
const sort = document.getElementById("sort-select");
sort.addEventListener("change", function () {
    let sortBy = sort.value;
    // var columns = [column1, column2, column3];
    // for(let i = 0; i < columns.length; i++){
    //     sort_cards(columns[i], sortBy);
    // }
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