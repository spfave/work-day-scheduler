// DOM SELECTORS
const dayDate = $("#current-day");
const daySchedule = $("#day-schedule");

// FUNCTIONS
// Get current date and display to header
const updateDate = () => {
  const today = moment();
  dayDate.text(today.format("dddd, MMMM Do, YYYY"));
  dayDate.data("date", today.format("YYYYMMDD"));
  // console.log(dayDate.data("date"));
};

// Create and render blank day schedule hour blocks to page
const createDaySchedule = (schedule) => {
  // Data entry validation
  if (schedule.startTime >= schedule.endTime) {
    alert("Schedule end time must be later than schedule start time");
    return;
  }

  // Determine current hour
  currentHour = moment().get("hour");

  // Create hour blocks for schedule and render to page
  for (let hour = schedule.startTime; hour < schedule.endTime; hour++) {
    // Create empty div and add 'row' class
    const scheduleBlock = $("<div>");
    scheduleBlock.addClass("row");

    //Define div inner HTML content
    const blockTime = moment(hour, "H").format("h a");
    scheduleBlock.html(`
      <div class="hour wrap-v-center width-80 pr-3">
        <p class="text-right m-0" data-hour="${hour}">${blockTime}</p>
      </div>

      <div class="task-desc col p-0">
        <textarea name="" class="w-100 h-100"></textarea>
      </div>

      <div class="saveBtn wrap-v-center width-80 p-0">
        <button class="btn btn-save h-100"><i class="fas fa-save"></i></button>
      </div>
    `);

    // Get schedule hour block task description div and add appropriate time block style
    const blockDesc = scheduleBlock.children(".task-desc");
    if (hour < currentHour) {
      blockDesc.addClass("past");
    } else if (hour === currentHour) {
      blockDesc.addClass("present");
    } /** hour > currentHour */ else {
      blockDesc.addClass("future");
    }

    // Append schedule block to day schedule
    daySchedule.append(scheduleBlock);
  }
};

// Render schedule tasks to screen
const displayDaySchedule = () => {
  // Load day schedule
  const daySchedule = loadDaySchedule();

  // Render schedule tasks to schedule
  for (const [hour, task] of Object.entries(daySchedule)) {
    displayScheduleTask(hour, task);
  }
};

// Modify day schedule time block to include
const displayScheduleTask = (hour, task) => {
  const hourBlock = $(`p[data-hour="${hour}"]`).parent();
  const taskInput = hourBlock.next().children().first();
  taskInput.val(task);
};

// TODO Update time block theme
const updateScheduleTheme = () => {};

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

  // Call save function for schedule item
  saveScheduleItem(hour, task);
};

// TODO Starts time monitor
const timeMonitor = () => {};

// EVENT LISTENERS
daySchedule.on("click", ".btn-save", handleSaveScheduleItem);

// WEBPAGE EXECUTION
// After page load
$(() => {
  updateDate();
  createDaySchedule({ startTime: 9, endTime: 18 });
  displayDaySchedule();

  // TESTING
  // loadDaySchedule();
});
