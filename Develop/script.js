$(function () {
  var currentDay = dayjs().format("dddd, MMMM D");
  $("#currentDay").text(currentDay);

  $(".saveBtn").on("click", function () {
    var textarea = $(this).siblings(".description");
    var eventText = textarea.val();
    var timeblockId = $(this).parent().attr("id");
    localStorage.setItem(timeblockId, eventText);
  });

  var currentHour = dayjs().hour();
  var startHour = 12;
  var endHour = 17; 

  for (var i = startHour; i <= endHour; i++) {
    var timeblockId = "hour-" + i;
    var displayHour = dayjs().hour(i).format("hA");

    var $timeBlock = $('<div>')
      .attr("id", timeblockId)
      .addClass("row time-block")
      .appendTo(".container-lg");

    $('<div>')
      .addClass("col-2 col-md-1 hour text-center py-3")
      .text(displayHour)
      .appendTo($timeBlock);

    var $description = $('<textarea>')
      .addClass("col-8 col-md-10 description")
      .attr("rows", "3")
      .appendTo($timeBlock);

    var $saveBtn = $('<button>')
      .addClass("btn saveBtn col-2 col-md-1")
      .attr("aria-label", "save")
      .appendTo($timeBlock);

    $('<i>')
      .addClass("fas fa-save")
      .attr("aria-hidden", "true")
      .appendTo($saveBtn);

    var savedEvent = localStorage.getItem(timeblockId);
    if (savedEvent) {
      $description.val(savedEvent);
    }
  }

  $(".time-block").each(function () {
    var timeBlockHour = parseInt($(this).attr("id").split("-")[1]);

    if (timeBlockHour < currentHour) {
      $(this).removeClass("present future").addClass("past");
    } else if (timeBlockHour === currentHour) {
      $(this).removeClass("past future").addClass("present");
    } else {
      $(this).removeClass("past present").addClass("future");
    }
  });

  $(".description").on("input", function () {
    var eventText = $(this).val();
    var timeblockId = $(this).closest(".time-block").attr("id");
    localStorage.setItem(timeblockId, eventText);
  });

  $(".description").each(function () {
    var timeblockId = $(this).closest(".time-block").attr("id");
    var savedEvent = localStorage.getItem(timeblockId);
    if (savedEvent) {
      $(this).val(savedEvent);
    }
  });
});
