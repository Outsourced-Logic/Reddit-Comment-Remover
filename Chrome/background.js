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
              // ...
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
