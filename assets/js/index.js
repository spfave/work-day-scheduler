// DOM SELECTORS
const schedule = $("#day-schedule");

// FUNCTIONS
// Get current date and display to header
const updateDate = () => {
  const today = moment().format("dddd, MMMM D, YYYY");
  $("#currentDay").text(today);
};

// Update time block theme
const updateTimeTheme = () => {};

// Load saved schedule items from local storage
const loadDaySchedule = () => {};

// Save schedule item to local storage
const saveScheduleItem = () => {
  // localStorage.setItem();
};

// Handle schedule item save
const handleSaveScheduleItem = (event) => {
  // console.log($(event.target));

  const textArea = $(event.target).parent().prev().children().first();
  console.log(textArea.val());
};

// EVENT LISTENERS
schedule.on("click", ".btn-save", handleSaveScheduleItem);

// WEBPAGE EXECUTION
// After page load
$(() => {
  updateDate();
});
