// get the current date to display
var toDay = moment().format("dddd, MMMM Do YYYY");
// create array to hold hours for time blocks in military time
var hourSlots = [9, 10, 11, 12, 13, 14, 15, 16, 17];

// create time blocks for each array item dynamically using some bootstrap classes 
var createTaskSlots = function () {
    var container = $(".container");
    var hourSlot;
    // create time blocks using for loop through array items
    for (hourSlot of hourSlots) {
        var taskEl = $("<div>").addClass("input-group ");
        container.append(taskEl);
        var hourDivEl = $("<div>").addClass("hour-container");
        taskEl.append(hourDivEl);
        // pass military time to function to convert to standard time for display
        var hourSpanEl = $("<span>")
            .text(hourText(hourSlot));
        hourDivEl.append(hourSpanEl);
        var taskTextEl = $("<textarea>").attr("type", "text").addClass("form-control");
        taskEl.append(taskTextEl);
        var btnContainer = $("<div>").addClass("input-group-append");
        taskEl.append(btnContainer);
        // associate save button to specific hour slot
        var buttonEl = $("<button>").addClass("btn save-btn")
            .attr("type", "button")
            .attr("hour", hourSlot)
            .text("💾");
        btnContainer.append(buttonEl);
    }
    // when save button clicked tasks saved to local storage
    $(".save-btn").on("click", onSave);
};

// convert military time to standard time for display
var hourText = function (hours) {
    var amPm = hours >= 12 ? "pm" : "am";
    var hourNum = hours > 12 ? hours - 12 : hours;
    var displayHour = hourNum + " " + amPm;
    return displayHour;
};
// retrieve tasks from local storage and display with task color status
var loadData = function () {
    $(".save-btn").each(function () {
        var hours = $(this).attr("hour");
        var taskInput = $(this).parent().prev();
        var keyString = moment().format("YYYY MM DD") + hours;
        var savedData = localStorage.getItem(keyString);
        // pass hour associated with button and task block associated with button to function to color code time blocks
        auditTask(hours, taskInput);
        if (savedData) {
            taskInput.val(savedData);
        }
    })
};

// Wrap the retrieval if the current hour into a function.
// This way, other code doesn't have to keep making two calls.
var getCurrentHour = function() {
    var currentTimeText = moment().format("YYYY-MM-DDTHH");
    var currentTimeHour = moment(currentTimeText);
    return currentTimeHour;
}

// save taks function local storage key current date + hour associated with clicked button
var onSave = function () {
    var hours = $(this).attr("hour");
    var taskInput = $(this).parent().prev().val();
    var key = moment().format("YYYY MM DD") + hours;
    localStorage.setItem(key, taskInput);
};

// checking tasks to color code by priority
var auditTask = function (hours, taskInput) {
    var currentTime = getCurrentHour();

    // converting time block hours into a moment with hours only
    var slotTime = moment().hour(hours).minute(0).second(0).millisecond(0);

    // clear cleases to avoid class combinations; only one of the below should
    // be set at any given time.
    taskInput.removeClass("past present future");

    // using moment query methods to compare the hours and assign style class
    if (slotTime.isBefore(currentTime)) {
        taskInput.addClass("past");
    }
    else if (slotTime.isAfter(currentTime)) {
        taskInput.addClass("future");
    }
    else {
        taskInput.addClass("present");
    }
};

var upDateTasks = function () {
    $(".save-btn").each(function () {
        var hours = $(this).attr("hour");
        var taskInput = $(this).parent().prev();
        auditTask(hours, taskInput);
    })
};

// loading document and creating time blocks
$(document).ready(function () {
    $("#currentDay").text(toDay);
    createTaskSlots();
    loadData();
    // refresh calender every 30 minutes
    setInterval(upDateTasks, (1000 * 60 * 30));
});
