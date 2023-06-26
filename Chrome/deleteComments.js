// A function to sleep in milliseconds
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// The function to find and click the buttons
async function deleteComment(comment) {
  // Simulate a click event on the "more options" button
  let moreOptionsButton = comment.querySelector("button[aria-label='more options']");
  if (moreOptionsButton) {
    moreOptionsButton.click();

    // Wait for the DOM to update
    await sleep(100); // this can be adjusted based on how long it takes for the DOM to update

    // Click the delete button in the dropdown menu
    let deleteButton = Array.from(comment.querySelectorAll("button[role='menuitem']"))
      .find(button => button.textContent.includes("delete"));
    if (deleteButton) {
      deleteButton.click();

      // Wait for the DOM to update
      await sleep(100); // this can be adjusted based on how long it takes for the DOM to update

      // Click the confirmation delete button
      let confirmDeleteButton = Array.from(document.querySelectorAll("button._17UyTSs2atqnKg9dIq5ERg"))
        .find(button => button.textContent.includes("Delete"));
      if (confirmDeleteButton) {
        confirmDeleteButton.click();

        // Wait for the DOM to update
        await sleep(100); // this can be adjusted based on how long it takes for the DOM to update
      }
    }
  }
}

async function deleteComments() {
  let comments = document.querySelectorAll('.Comment');
  
  for (let comment of comments) {
    let subredditElement = comment.querySelector('a[data-click-id="subreddit"]');
    if (subredditElement) {
      let subreddit = subredditElement.textContent;
      await new Promise((resolve) => {
        chrome.runtime.sendMessage({ message: 'checkWhitelist', subreddit: subreddit }, function(response) {
          if (!response.isWhitelisted) {
            // delete the comment here
            deleteComment(comment).then(resolve);
          } else {
            resolve();
          }
        });
      });
    }
  }
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "toggle") {
    deleteComments();
  }
});
