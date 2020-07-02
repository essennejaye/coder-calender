# Work Day Scheduler
* GIVEN I am using a daily planner to create a schedule
* WHEN I open the planner
* THEN the current day is displayed at the top of the calendar
* WHEN I scroll down
* THEN I am presented with time blocks for standard business hours
* WHEN I view the time blocks for that day
* THEN each time block is color-coded to indicate whether it is in the past, present, or future
* WHEN I click into a time block
* THEN I can enter an event
* WHEN I click the save button for that time block
* THEN the text for that event is saved in local storage
* WHEN I refresh the page
* THEN the saved events persist

## Screenshots
assets\images\screenshot1.png
assets\images\screenshot2.png
assets\images\screenshot3.png

```` JS
var hourText = function (hours) {
    var amPm = hours >= 12 ? "pm" : "am";
    var hourNum = hours > 12 ? hours - 12 : hours;
    var displayHour = hourNum + " " + amPm;
    return displayHour;
};

var loadData = function () {
    $(".save-btn").each(function () {
        var hours = $(this).attr("hour");
        var taskInput = $(this).parent().prev();
        var keyString = moment().format("YYYY MM DD") + hours;
        var savedData = localStorage.getItem(keyString);
        auditTask(hours, taskInput);
        if (savedData) {
            taskInput.val(savedData);
        }
    })
};

var onSave = function () {
    var hours = $(this).attr("hour");
    var taskInput = $(this).parent().prev().val();
    var key = moment().format("YYYY MM DD") + hours;
    localStorage.setItem(key, taskInput);
};
````
 https://essennejaye.github.io/coder-calender/.
