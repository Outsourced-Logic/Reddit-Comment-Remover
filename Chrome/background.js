chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message === "toggle") {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        let tab = tabs[0];
        console.log(`Received toggle command for tabId: ${tab.id}`);
        
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ["deleteComments.js"]
        }, () => {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message);
          } else {
            console.log('deleteComments.js injected successfully');
          }
        });
      });
    }
  }
);
