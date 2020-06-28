var currentDateTime = moment().format("YYYY MM DD");
var toDay = moment().format("dddd, MMMM Do YYYY");
$(".save-btn").on("click", function () {
    // var hourButton = event.target;
    var hour = $(this).attr("hour");
    var task = $(this)
        .parent().prev();
    var taskText = task.val();
    var key = currentDateTime + " " + hour;
    localStorage.setItem(key, taskText);
});
var loadPage = function () {
    $(".save-btn").each(function () {
        var hour = $(this).attr("hour");
        var key = currentDateTime + " " + hour;
        var taskText = localStorage.getItem(key);
        if (taskText) {
            var taskEl = $(this).parent().prev();
            taskEl.val(taskText);
        }
    });
}
$(document).ready(function() {
    loadPage();
});