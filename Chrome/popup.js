document.getElementById('toggleButton').addEventListener('click', () => {
  chrome.runtime.sendMessage({message: 'toggle'});
});
