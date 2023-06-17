document.getElementById('toggleSwitch').addEventListener('change', (event) => {
  chrome.runtime.sendMessage({message: 'toggle', data: event.target.checked});
});
