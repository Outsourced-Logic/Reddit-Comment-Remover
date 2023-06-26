let whitelist = [];

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message === "toggle") {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        let tab = tabs[0];
        console.log(`Received toggle command for tabId: ${tab.id}`);
        
        let subreddit = tab.url.match(/reddit.com\/r\/([^/]*)/)[1];
        if (!whitelist.includes(subreddit)) { 
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
        } else {
          console.log('This subreddit is whitelisted. Comments deletion skipped.');
        }
      });
    } else if (request.message === "add_to_whitelist") {
      let subreddit = request.subreddit;
      if (!whitelist.includes(subreddit)) {
        whitelist.push(subreddit);
        console.log(`Added ${subreddit} to whitelist.`);
      } else {
        console.log(`Subreddit ${subreddit} is already in the whitelist.`);
      }
    } else if (request.message === "remove_from_whitelist") {
      let subreddit = request.subreddit;
      let index = whitelist.indexOf(subreddit);
      if (index !== -1) {
        whitelist.splice(index, 1);
        console.log(`Removed ${subreddit} from whitelist.`);
      } else {
        console.log(`Subreddit ${subreddit} is not in the whitelist.`);
      }
    }
  }
);
