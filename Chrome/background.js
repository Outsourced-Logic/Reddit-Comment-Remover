// Wrap the entire script inside an immediately-invoked function expression (IIFE) to avoid polluting the global scope
(() => {
  // Create a flag to enable/disable the extension
  let extensionEnabled = false;

  // Listen for messages from the popup script
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'toggle') {
      extensionEnabled = !extensionEnabled;
    }
  });

  // Add an event listener for when a tab is updated
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (
      extensionEnabled &&
      changeInfo.status === 'complete' &&
      tab.url
    ) {
      // Execute a script in the updated tab
      chrome.scripting.executeScript(
        {
          target: { tabId },
          func: async function () {
            // Check if the script has already been injected
            if (!window.myExtensionScriptInjected) {
              window.myExtensionScriptInjected = true;
              
              // The clickButtons function from previous snippets goes here
              async function clickButtons() {
  // A function to sleep in milliseconds
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Select all instances of the first button
  const menuButtons = document.querySelectorAll("button[aria-label='more options']");

  for (let button of menuButtons) {
    // Simulate a click event
    button.click();

    // Wait for the DOM to update
    await sleep(1000);

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
    await sleep(1000);

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
    await sleep(1000);
  }
}

clickButtons();

            }
          },
        },
        () => {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message);
          }
        }
      );
    }
  });
})();
