// DOM SELECTORS
const dayDate = $("#current-day");
const schedule = $("#day-schedule");

// FUNCTIONS
// Get current date and display to header
const updateDate = () => {
  const today = moment();
  dayDate.text(today.format("dddd, MMMM Do, YYYY"));
  dayDate.data("date", today.format("YYYYMMDD"));
  // console.log(dayDate.data("date"));
};

// Update time block theme
const updateTimeTheme = () => {};

// Load saved schedule items from local storage
const loadDaySchedule = () => {
  // load day schedule from local storage
  let daySchedule = localStorage.getItem(dayDate.data("date"));

  // if day schedule does not exist or is empty object return empty object
  // else return parsed day schedule
  if (daySchedule === null || $.isEmptyObject(daySchedule)) {
    daySchedule = {};
  } else {
    daySchedule = JSON.parse(daySchedule);
  }

  return daySchedule;
};

// Save schedule item to local storage
const saveScheduleItem = (time, task) => {
  // Load day schedule
  const daySchedule = loadDaySchedule();

  // Add task to schedule
  daySchedule[time] = task;

  // Save updated day schedule to local storage
  localStorage.setItem(dayDate.data("date"), JSON.stringify(daySchedule));
};

// Handle schedule item save
const handleSaveScheduleItem = (event) => {
  element = $(event.target).closest("div");

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

  // TESTING
  loadDaySchedule();
});
