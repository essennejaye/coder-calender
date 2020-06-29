var toDay = moment().format("dddd, MMMM Do YYYY");
var hourSlots = [9, 10, 11, 12, 13, 14, 15, 16, 17];

var createTaskSlots = function () {
    var container = $(".container");
    var hourSlot;
    for (hourSlot of hourSlots) {
        var taskEl = $("<div>").addClass("input-group ");
        container.append(taskEl);
        var hourDivEl = $("<div>").addClass("hour-container");
        taskEl.append(hourDivEl);
        var hourSpanEl = $("<span>")
            .text(hourText(hourSlot));
        hourDivEl.append(hourSpanEl);
        var taskTextEl = $("<textarea>").attr("type", "text").addClass("form-control");
        taskEl.append(taskTextEl);
        var btnContainer = $("<div>").addClass("input-group-append");
        taskEl.append(btnContainer);
        var buttonEl = $("<button>").addClass("btn save-btn")
            .attr("type", "button")
            .attr("hour", hourSlot)
            .text("💾");
        btnContainer.append(buttonEl);
    }
    $(".save-btn").on("click", onSave);
};

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

var auditTask = function (hours, taskInput) {
    var currentTimeText = moment().format("YYYY-MM-DDTHH");

    //TODO - testing, remove before committing
    //--
    currentTimeText = moment("2020-06-28T14:51:37").format("YYYY-MM-DDTHH");
    //--

    var currentTime = moment(currentTimeText);
    var slotTime = moment().hour(hours).minute(0).second(0).millisecond(0);
    if (slotTime.isBefore (currentTime)) {
        taskInput.addClass("past");
    }
    else if (slotTime.isAfter (currentTime)) {
        taskInput.addClass("future");
    }
    else {
        taskInput.addClass("present");
    }
};

$(document).ready(function () {
    $("#currentDay").text(toDay);
    createTaskSlots();
    loadData();
});
