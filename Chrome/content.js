// A function to sleep in milliseconds
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function clickButtons() {
  // Select all instances of the first button
  const menuButtons = document.querySelectorAll("button[aria-label='more options']");

  let deleted = false;

  for (let button of menuButtons) {
    // Simulate a click event
    button.click();

    // Wait for the DOM to update
    await sleep(100); 

    // Click the delete button in the dropdown menu
    const deleteButtons = document.querySelectorAll("button[role='menuitem']");
    for (let deleteButton of deleteButtons) {
      // Only click the button if it has the word "delete" in it
      if (deleteButton.textContent.includes("delete")) {
        deleteButton.click();
        deleted = true;
        break;
      }
    }

    if (!deleted) continue; // if no delete button was found, continue to next comment

    await sleep(100); 

    // Click the confirmation delete button
    const confirmDeleteButtons = document.querySelectorAll("button._17UyTSs2atqnKg9dIq5ERg");
    for (let confirmDeleteButton of confirmDeleteButtons) {
      // Only click the button if it has the word "Delete" in it
      if (confirmDeleteButton.textContent.includes("Delete")) {
        confirmDeleteButton.click();
        break;
      }
    }

    await sleep(100);
  }

  return deleted;
}

function runUntilAllCommentsAreDeleted() {
  let intervalId = setInterval(async () => {
    const deleted = await clickButtons();

    if (!deleted) {
      clearInterval(intervalId);
      alert('All comments deleted!');
    }
  }, 2000); // Run every 2 seconds
}

// Function to start deleting comments
function startDeleting() {
  runUntilAllCommentsAreDeleted();
}

// Expose startDeleting to the window object so it can be called from the popup
window.startDeleting = startDeleting;
