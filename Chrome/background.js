chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "toggle") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      let tab = tabs[0];
      console.log(`Received toggle command for tabId: ${tab.id}`);

      chrome.scripting.executeScript(
        {
          target: { tabId: tab.id },
          files: ["deleteComments.js"],
        },
        () => {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message);
          } else {
            console.log("deleteComments.js injected successfully");
          }
        }
      );
    });
  } else if (request.message === "addSubreddit") {
    let subreddit = request.subreddit;

    // Fetch the whitelist from storage
    chrome.storage.local.get("whitelist", function (data) {
      let whitelist = data.whitelist || [];

      if (!whitelist.includes(subreddit)) {
        // Add the subreddit to the whitelist and save it back to the storage
        whitelist.push(subreddit);
        chrome.storage.local.set({ whitelist: whitelist }, function () {
          console.log(`Added ${subreddit} to whitelist.`);
        });
      } else {
        console.log(`Subreddit ${subreddit} is already in the whitelist.`);
      }
    });
  } else if (request.message === "checkWhitelist") {
    let subreddit = request.subreddit;

    // Fetch the whitelist from storage
    chrome.storage.local.get("whitelist", function (data) {
      let whitelist = data.whitelist || [];
      sendResponse({ isWhitelisted: whitelist.includes(subreddit) });
    });

    return true; // keeps the message channel open until sendResponse is called
  }
});
