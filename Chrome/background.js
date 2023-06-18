// Add an event listener for messages from the runtime
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // Check if the received message has a command of "startDeleting"
    if (request.command === "startDeleting") {
      // Log a message with the tab ID where the command was sent from
      console.log(`Received startDeleting command for tabId: ${request.tabId}`);
      
      // Execute the script "deleteComments.js" in the tab with the specified tab ID
      chrome.scripting.executeScript({
        // Specify the target tab by its ID
        target: { tabId: request.tabId },
        
        // The file(s) to execute. In this case, it's just "deleteComments.js"
        files: ["deleteComments.js"]
      }, () => { // This function will be called after executing the script
        // If there was an error, log the error message
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message);
        } else { // If there was no error
          // Log a success message
          console.log('deleteComments.js injected successfully');
        }
      });
    }
  }
);
