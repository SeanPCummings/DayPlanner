$(document).ready(function() {
  // listen for save button clicks

  $(".saveBtn").on("click", function() {
    // get nearby values
    var value = $(this).siblings(".description").val();
    var time = $(this).parent().attr("id");

    console.log('value:', value);
    console.log('time:', time);

    // save the value in localStorage as time
    localStorage.setItem(time, value);
  });

  function hourUpdater() {
    // get current number of hours
    var currentHour = moment().hours();
    console.log('current hour:', currentHour);

    // loop over time blocks
    $(".time-block").each(function() {
      var blockHour = parseInt($(this).attr("id").split("-")[1]);
      
      // if the current hour is greater than the block hour
      if(currentHour > blockHour) {
        $(this).addClass("past");
      }// then add class "past"
      
      // if they are equal
      else if(currentHour == blockHour){
        $(this).removeClass("past");
        $(this).addClass("present");
      } // then remove class "past" and add class "present"
     
      else{
        $(this).removeClass("past");
        $(this).removeClass("present");
        $(this).addClass("future");
      }
      // remove class "past", remove class "present", add class "future"
    });
  }
  hourUpdater();
  // execute hourUpdater function every 15 seconds
  setInterval(hourUpdater, 15000); // 15000 milliseconds = 15 seconds 

  // load any saved data from localStorage
  $(".time-block").each(function() { // same func as line 22 that loops through each time block div
    var time = $(this).attr("id"); // var to store the id of the time block 
    $(this).children(".description").val(localStorage.getItem(time));// uses id to grab the descrip and set the value to the value of localStorage key of Time.
  });
  // display current day on page
  $("#currentDay").text(moment().format("dddd, MMMM Do"));
});
