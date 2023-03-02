// get the submit button
var submitBtn = document.getElementById("submitCard");
var today = new Date().toDateString();

// attach an event listener to the submit button
submitBtn.addEventListener("click", function () {
  // get the values of the inputs
  var habitName = document.getElementById("habitName").value;
  var habitTag = document.getElementById("habitTag").value;
  var habitPriority = document.getElementById("habitPriority").value;
  // var habitStreak = document.getElementById("habitStreak").value;
  var habitCreationDate = document.getElementById("habitCreationDate").value;

  // if (habitStreak === "") {
  //   habitStreak = 0;
  // }

  // create a new card element
  var newCard = document.createElement("div");
  newCard.classList.add("card");

  // create the card header
  var cardHeader = document.createElement("div");
  cardHeader.classList.add("card-header");
  cardHeader.innerHTML = habitName;

  // create the card body
  var cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  // create the tag
  var tag = document.createElement("div");
  tag.classList.add("habit_tag");
  tag.innerHTML = "Tag: " + habitTag;

  // create the priority
  var priority = document.createElement("div");
  priority.classList.add("habit_priority");
  priority.innerHTML = "Priority: " + habitPriority;

  // create the Streak
  var streak = document.createElement("div");
  streak.classList.add("habit_streak");
  var habitStreak = 0;
  streak.innerHTML = "Streak: " + habitStreak;

  // create the creation date
  var creationDate = document.createElement("div");
  creationDate.classList.add("habit_creation_date");
  creationDate.innerHTML = "Creation Date: " + habitCreationDate;

  // create the button
  var habitButton = document.createElement("button");
  habitButton.classList.add("habit_button");
  habitButton.innerHTML = "Mark as Doned";

  // // function for habitButton
  // habitButton.addEventListener("click", function() {
  //   habitStreak++;
  //   streak.innerHTML = "Streak: " + habitStreak;
  // });
  
    // // function for habitButton
    // habitButton.addEventListener("click", function() {
    //   // get the current date
    //   var currentDate = new Date().toDateString();
  
    //   // check if the button has already been clicked today
    //   if (habitButton.dataset.date === currentDate) {
    //     alert("You have already marked this habit as done today!");
    //   } else {
    //     // update the streak and disable the button
    //     habitStreak++;
    //     streak.innerHTML = "Streak: " + habitStreak;
    //     // habitButton.disabled = true;
    //     habitButton.dataset.date = currentDate;
    //   }
    // });
    
    // function for habitButton
habitButton.addEventListener("click", function() {
  // get the current date
  var currentDate = new Date().toDateString();

  // check if the button has already been clicked today
  if (habitButton.dataset.date === currentDate) {
    alert("You have already marked this habit as done today!");
  } else {
    // check if the button was clicked within the last 24 hours
    var lastClickedDate = new Date(habitButton.dataset.date);
    var hoursSinceLastClicked = (new Date() - lastClickedDate) / 3600000;
    if (hoursSinceLastClicked > 24) {
      // reset the streak to 0
      habitStreak = 0;
    }
    // update the streak and disable the button
    habitStreak++;
    streak.innerHTML = "Streak: " + habitStreak;
    // habitButton.disabled = true;
    habitButton.dataset.date = currentDate;
  }
});

  // append elements to the card body
  cardBody.appendChild(tag);
  cardBody.appendChild(priority);
  cardBody.appendChild(creationDate);
  cardBody.appendChild(streak);
  cardBody.appendChild(habitButton);

  // append elements to the new card
  newCard.appendChild(cardHeader);
  newCard.appendChild(cardBody);

  // append the new card to the habit tracking column
  var habit_column = document.getElementById("habit_column");
  habit_column.appendChild(newCard);

  // reset the form
  $('#exampleModal').modal('toggle');
  document.getElementById("habit_form").reset();
 
});

var closecard = document.getElementById("closecard");
// attach an event listener to the submit button
closecard.addEventListener("click", function () {
    $('#exampleModal').modal('toggle');
    document.getElementById("habit_form").reset();
});


