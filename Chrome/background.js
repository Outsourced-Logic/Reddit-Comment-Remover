chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "toggle") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      let tab = tabs[0];
      console.log(`Received toggle command for tabId: ${tab.id}`);

      let subreddit = tab.url.match(/reddit.com\/r\/([^/]*)/)[1];

      // Fetch the whitelist from storage
      chrome.storage.local.get("whitelist", function (data) {
        let whitelist = data.whitelist || [];

        if (!whitelist.includes(subreddit)) {
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
        } else {
          console.log(
            "This subreddit is whitelisted. Comments deletion skipped."
          );
        }
      });
    });
  } else if (request.message === "add_to_whitelist") {
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
  } else if (request.message === "remove_from_whitelist") {
    let subreddit = request.subreddit;

    // Fetch the whitelist from storage
    chrome.storage.local.get("whitelist", function (data) {
      let whitelist = data.whitelist || [];

      let index = whitelist.indexOf(subreddit);
      if (index !== -1) {
        // Remove the subreddit from the whitelist and save it back to the storage
        whitelist.splice(index, 1);
        chrome.storage.local.set({ whitelist: whitelist }, function () {
          console.log(`Removed ${subreddit} from whitelist.`);
        });
      } else {
        console.log(`Subreddit ${subreddit} is not in the whitelist.`);
      }
    });
  }
});
