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
const saveScheduleItem = (time, task) => {
  // Load day schedule
  // const daySchedule = loadDaySchedule();
  const daySchedule = {};
  daySchedule[time] = task;

  // Save updated day schedule to local storage
  localStorage.setItem("YYYYMMDD", JSON.stringify(daySchedule));
};

// Handle schedule item save
const handleSaveScheduleItem = (event) => {
  element = $(event.target).parent();

  // Evaluate hour block and task description of task to save
  const hour = element.siblings().eq(0).children()[0].dataset.hour;
  const task = element.prev().children().first().val();

  // Create schedule item object
  // const scheduleItem = { [hour]: task };

  // Call save function for schedule item
  saveScheduleItem(hour, task);
};

// EVENT LISTENERS
schedule.on("click", ".btn-save", handleSaveScheduleItem);

// WEBPAGE EXECUTION
// After page load
$(() => {
  updateDate();
});
