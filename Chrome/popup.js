// The 'DOMContentLoaded' event fires when the initial HTML document has been completely loaded
// This ensures that the HTML elements we want to interact with are available when the script runs
document.addEventListener('DOMContentLoaded', function() {

  // Get the checkbox element with the id 'toggle'
  let checkbox = document.getElementById('toggle');
  
  // Add an event listener for the 'change' event on the checkbox
  // This event fires when the checkbox is checked or unchecked
  checkbox.addEventListener('change', function() {
    
    // If the checkbox is checked...
    if(checkbox.checked) {
      // Query the active tab in the current window
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        
        // Send a message to the background script with a command to start deleting
        // Include the tab ID in the message for the background script to know where to execute the content script
        chrome.runtime.sendMessage({command: "startDeleting", tabId: tabs[0].id});
      });
    }
  });
});
