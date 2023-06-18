document.addEventListener('DOMContentLoaded', function() {
  let checkbox = document.getElementById('toggle');
  let label = document.getElementById('status');

  // Initialize label
  label.innerText = checkbox.checked ? 'Enabled' : 'Disabled';

  checkbox.addEventListener('change', function() {
    // Change the label text whenever the checkbox state changes
    label.innerText = checkbox.checked ? 'Enabled' : 'Disabled';

    if(checkbox.checked) {
      // Execute the content script
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.runtime.sendMessage({command: "startDeleting", tabId: tabs[0].id});
      });
    }
  });
});
