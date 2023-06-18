// A function to scroll to the end of the page
async function scrollUntilEnd() {
  let previousHeight;
  while (previousHeight !== document.body.scrollHeight) {
    previousHeight = document.body.scrollHeight;
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise(resolve => setTimeout(resolve, 10000));
  }
  console.log('Scrolling ended');
  // Send a message to background script to start deleting comments
  chrome.runtime.sendMessage({ command: 'startDeleting', tabId: chrome.runtime.id });
}

console.log('Starting scrolling process');
scrollUntilEnd();
