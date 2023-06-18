// Check if the user is on the right page, if not, stop the script
if (!window.location.href.includes('/comments/')) {
  // We are not on the comments page, so stop the script
  console.log("Not on comments page, stopping script");
  return;
}

// Function to sleep in milliseconds
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to scroll to the bottom of the page
async function scrollToEnd() {
  // Get the total height of the page
  let totalHeight = document.body.scrollHeight;
  let newHeight = totalHeight;
  do {
    // Set totalHeight to the current total height of the page
    totalHeight = newHeight;

    // Scroll to the bottom of the page
    window.scrollTo(0, totalHeight);

    // Wait for a short period to allow the page to load new content
    await sleep(1000);

    // Get the new total height of the page
    newHeight = document.body.scrollHeight;
  } while (newHeight > totalHeight); // Continue until there's no more new content to load
}

// The function to find and click the buttons
async function deleteComments() {
  console.log('deleteComments function started');

  // Select all instances of the first button
  const menuButtons = document.querySelectorAll("button[aria-label='more options']");
  console.log('Found', menuButtons.length, 'menu buttons');

  for (let button of menuButtons) {
    // Simulate a click event
    button.click();

    // Wait for the DOM to update
    await sleep(1000); // this can be adjusted based on how long it takes for the DOM to update

    // Click the delete button in the dropdown menu
    const deleteButtons = document.querySelectorAll("button[role='menuitem']");
    console.log('Found', deleteButtons.length, 'delete buttons');

    for (let deleteButton of deleteButtons) {
      // Only click the button if it has the word "delete" in it
      if (deleteButton.textContent.includes("delete")) {
        deleteButton.click();
        // Break after clicking the delete button to avoid deleting other elements
        break;
      }
    }

    // Wait for the DOM to update
    await sleep(1000); // this can be adjusted based on how long it takes for the DOM to update

    // Click the confirmation delete button
    const confirmDeleteButtons = document.querySelectorAll("button._17UyTSs2atqnKg9dIq5ERg");
    console.log('Found', confirmDeleteButtons.length, 'confirm delete buttons');

    for (let confirmDeleteButton of confirmDeleteButtons) {
      // Only click the button if it has the word "Delete" in it
      if (confirmDeleteButton.textContent.includes("Delete")) {
        confirmDeleteButton.click();
        // Break after clicking the delete button to avoid deleting other elements
        break;
      }
    }

    // Wait for the DOM to update
    await sleep(1000); // this can be adjusted based on how long it takes for the DOM to update
  }

  console.log('deleteComments function ended');
}

console.log('Scrolling to end of page');
await scrollToEnd();
console.log('Starting deletion process');
deleteComments();
