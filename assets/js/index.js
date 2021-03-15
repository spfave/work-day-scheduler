// DOM SELECTORS

// FUNCTIONS
// Get current date and display to header
const updateDate = () => {
  const today = moment().format("dddd, MMMM D, YYYY");
  $("#currentDay").text(today);
};

// WEBPAGE EXECUTION
// After page load
$(() => {
  updateDate();
});
