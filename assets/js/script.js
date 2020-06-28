var toDay = moment().format("dddd, MMMM Do YYYY");
var hourSlots = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];

var createTaskSlots = function () {
    var container = $(".container");
    var hourSlot;
    for (hourSlot of hourSlots) {
        var taskEl = $("<div>").addClass("input-group mb-1");
        container.append(taskEl);
        var hourDivEl = $("<div>").addClass("input-group-prepend");
        taskEl.append(hourDivEl);
        var hourSpanEl = $("<span>").addClass("input-group-text").text(hourSlot);
        hourDivEl.append(hourSpanEl);
        var taskTextEl = $("<input>").attr("type", "textarea").addClass("form-control");
        taskEl.append(taskTextEl);
        var btnContainer = $("<div>").addClass("input-group-append");
        taskEl.append(btnContainer);
        var buttonEl = $("<button>").addClass("btn btn-outline-secondary save-btn")
            .attr("type", "button")
            .attr("hour", hourSlot)
            .text("Save");
        btnContainer.append(buttonEl);
    }
    $(".save-btn").on("click", onSave);
};

var loadData = function () {
    $(".save-btn").each(function(){
        var hours = $(this).attr("hour");
        var taskInput = $(this).parent().prev();
        var keyString = moment().format("YYYY MM DD") + hours;
        var savedData = localStorage.getItem(keyString);
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
}


$(document).ready(function () {
    $("#currentDay").text(toDay);
    createTaskSlots();
    loadData();
});





