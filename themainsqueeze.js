// Open your reddit comment history, open the browser developer console and enter this script.

// A function to sleep in milliseconds
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// The function to find and click the buttons
async function clickButtons() {
  // Select all instances of the first button
  const menuButtons = document.querySelectorAll("button[aria-label='more options']");

  for (let button of menuButtons) {
    // Simulate a click event
    button.click();

    // Wait for the DOM to update
    await sleep(100); // this can be adjusted based on how long it takes for the DOM to update

    // Click the delete button in the dropdown menu
    const deleteButtons = document.querySelectorAll("button[role='menuitem']");
    for (let deleteButton of deleteButtons) {
      // Only click the button if it has the word "delete" in it
      if (deleteButton.textContent.includes("delete")) {
        deleteButton.click();
        // Break after clicking the delete button to avoid deleting other elements
        break;
      }
    }

    // Wait for the DOM to update
    await sleep(100); // this can be adjusted based on how long it takes for the DOM to update

    // Click the confirmation delete button
    const confirmDeleteButtons = document.querySelectorAll("button._17UyTSs2atqnKg9dIq5ERg");
    for (let confirmDeleteButton of confirmDeleteButtons) {
      // Only click the button if it has the word "Delete" in it
      if (confirmDeleteButton.textContent.includes("Delete")) {
        confirmDeleteButton.click();
        // Break after clicking the delete button to avoid deleting other elements
        break;
      }
    }

    // Wait for the DOM to update
    await sleep(100); // this can be adjusted based on how long it takes for the DOM to update
  }
}

// Run the function
clickButtons();
