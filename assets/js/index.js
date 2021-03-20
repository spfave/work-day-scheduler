// DOM SELECTORS
const dayDate = $("#current-day");
const daySchedule = $("#day-schedule");

// VARIABLES
let currentHour = moment().get("hour");
let schedule = {
  startTime: 0, // 9 am
  endTime: 24, // 6 pm
};

// FUNCTIONS
// Get current date and display to header
const updateDate = () => {
  // Get date and update header date
  const today = moment();
  dayDate.text(today.format("dddd, MMMM Do, YYYY"));
  dayDate.data("date", today.format("YYYYMMDD"));
  console.log(dayDate.data("date"));

  // Create new schedule and display tasks
  createDaySchedule(schedule);
  displayScheduleTasks();
};

// Create and render blank day schedule hour blocks to page
const createDaySchedule = (schedule) => {
  // Data entry validation
  if (schedule.startTime >= schedule.endTime) {
    alert("Schedule end time must be later than schedule start time");
    return;
  }

  // Remove old calendar
  daySchedule.html("");

  // Create hour blocks for schedule and render to page
  for (let hour = schedule.startTime; hour < schedule.endTime; hour++) {
    // Create empty div and add class names
    const scheduleBlock = $("<div>");
    scheduleBlock.addClass("row schedule-row");

    // Define schedule block inner HTML content
    const blockTime = moment(hour, "H").format("h a");
    scheduleBlock.html(`
      <div class="hour wrap-v-center width-80">
        <p data-hour="${hour}">${blockTime}</p>
      </div>

      <div class="task-desc col p-0">
        <textarea></textarea>
      </div>

      <div class="saveBtn wrap-v-center width-80">
        <button class="btn btn-save h-100"><i class="fas fa-save"></i></button>
      </div>
    `);

    // Append schedule block to day schedule
    daySchedule.append(scheduleBlock);
  }

  // Call function to set schedule block theme
  updateScheduleTheme();
};

// Render schedule tasks to screen
const displayScheduleTasks = () => {
  // Load schedule tasks
  const scheduleTasks = loadScheduleTasks();

  // Render saved tasks to schedule
  for (const [hour, task] of Object.entries(scheduleTasks)) {
    displayScheduleTask(hour, task);
  }
};

// Modify schedule task block to include task description
const displayScheduleTask = (hour, task) => {
  const hourBlock = $(`p[data-hour="${hour}"]`).parent();
  const taskInput = hourBlock.next().children().first();
  taskInput.val(task);
};

// Update schedule block themes
const updateScheduleTheme = () => {
  // Find all schedule blocks in day schedule
  scheduleBlocks = daySchedule.children(".schedule-row");

  // Loop over schedule blocks and set theme
  for (const scheduleBlock of scheduleBlocks) {
    const blockHour = $(scheduleBlock).find("[data-hour]").data("hour");
    const blockDesc = $(scheduleBlock).children(".task-desc");

    // Style schedule task block with appropriate theme
    if (blockHour < currentHour) {
      blockDesc.addClass("past").removeClass("present");
    } else if (blockHour === currentHour) {
      blockDesc.addClass("present").removeClass("future");
    } /** blockHour > currentHour */ else {
      blockDesc.addClass("future").removeClass("past");
    }
  }
};

// Load saved schedule tasks from local storage
const loadScheduleTasks = () => {
  // load day schedule from local storage
  let scheduleTasks = localStorage.getItem(dayDate.data("date"));

  // if scheduleTasks does not exist or is empty object - return empty object
  // else - return parsed schedule tasks
  if (scheduleTasks === null || $.isEmptyObject(scheduleTasks)) {
    scheduleTasks = {};
  } else {
    scheduleTasks = JSON.parse(scheduleTasks);
  }

  return scheduleTasks;
};

// Save schedule tasks to local storage
const saveScheduleTask = (time, task) => {
  // Load schedule tasks
  const scheduleTasks = loadScheduleTasks();

  // Add task to schedule
  scheduleTasks[time] = task;

  // Save updated schedule tasks to local storage
  localStorage.setItem(dayDate.data("date"), JSON.stringify(scheduleTasks));
};

// Handle schedule task save
const handleSaveScheduleTask = (event) => {
  element = $(event.target).closest("div");

  // Evaluate hour block and task description of task to save
  const hour = element.siblings().eq(0).children()[0].dataset.hour;
  const task = element.prev().children().first().val();

  // if task is non-empty string - call save function for schedule task
  // if (task) {
  //   console.log("test");
  //   saveScheduleTask(hour, task)
  // } else {removeScheduleTask(hour);}

  // Call save function for schedule task
  saveScheduleTask(hour, task);
};

// Starts time monitor
const timeMonitor = () => {
  // On time interval check if hour has changed
  timeIncrementor = setInterval(() => {
    const hour = moment().get("hour");

    // if change in hour - update current hour and update schedule block theme
    if (hour !== currentHour) {
      // Handle midnight
      if (hour === 0) {
        updateDate();
      }

      // Update current hour variable and update schedule block themes
      currentHour = hour;
      updateScheduleTheme();
    }
  }, 5000);
};

// EVENT LISTENERS
daySchedule.on("click", ".btn-save", handleSaveScheduleTask);

// WEBPAGE EXECUTION
// After page load
$(() => {
  updateDate();
  timeMonitor();
});
