document.addEventListener('DOMContentLoaded', () => {
  const subredditInput = document.querySelector('#subreddit-input');
  const addButton = document.querySelector('#add-button');
  const whitelist = document.querySelector('#whitelist');

  // Load the existing whitelist from local storage
  chrome.storage.local.get('whitelist', (data) => {
    if (data.whitelist) {
      for (const subreddit of data.whitelist) {
        addSubredditToWhitelist(subreddit);
      }
    }
  });

  // Add the subreddit to the whitelist when the add button is clicked
  addButton.addEventListener('click', () => {
    const subreddit = subredditInput.value.trim();
    if (subreddit) {
      addSubredditToWhitelist(subreddit);

      // Save the updated whitelist to local storage
      chrome.storage.local.get('whitelist', (data) => {
        const updatedWhitelist = data.whitelist ? [...data.whitelist, subreddit] : [subreddit];
        chrome.storage.local.set({ whitelist: updatedWhitelist });
      });

      subredditInput.value = '';
    }
  });

  function addSubredditToWhitelist(subreddit) {
    const listItem = document.createElement('li');
    listItem.textContent = subreddit;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Remove';
    deleteButton.addEventListener('click', () => {
      listItem.remove();

      // Remove the subreddit from the whitelist in local storage
      chrome.storage.local.get('whitelist', (data) => {
        if (data.whitelist) {
          const updatedWhitelist = data.whitelist.filter((item) => item !== subreddit);
          chrome.storage.local.set({ whitelist: updatedWhitelist });
        }
      });
    });

    listItem.appendChild(deleteButton);
    whitelist.appendChild(listItem);
  }
});
