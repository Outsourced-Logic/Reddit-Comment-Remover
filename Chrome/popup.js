let isExtensionOn = false;

function updateStatusText() {
  const status = document.querySelector('#status');
  status.textContent = isExtensionOn ? 'Enabled' : 'Disabled';
}

function updateWhitelist() {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ message: 'getWhitelist' }, function(response) {
      document.querySelector('#whitelistTable').textContent = response.whitelist.join(', ');
      resolve();
    });
  });
}

function addSubreddit(event) {
  event.preventDefault();
  const subreddit = document.querySelector('#whitelistInput').value;
  chrome.runtime.sendMessage({ message: 'addSubreddit', subreddit: subreddit }, function(response) {
    updateWhitelist().then(() => {
      document.querySelector('#whitelistInput').value = '';
    });
  });
}

function switchTabs(event) {
  const target = event.target;
  if (target.matches('#home-tab')) {
    document.querySelector('#home').classList.add('active');
    document.querySelector('#settings').classList.remove('active');
    document.querySelector('#whitelist').classList.remove('active');
    target.classList.add('active');
    document.querySelector('#settings-tab').classList.remove('active');
    document.querySelector('#whitelist-tab').classList.remove('active');
  } else if (target.matches('#settings-tab')) {
    document.querySelector('#settings').classList.add('active');
    document.querySelector('#home').classList.remove('active');
    document.querySelector('#whitelist').classList.remove('active');
    target.classList.add('active');
    document.querySelector('#home-tab').classList.remove('active');
    document.querySelector('#whitelist-tab').classList.remove('active');
  } else if (target.matches('#whitelist-tab')) {
    document.querySelector('#whitelist').classList.add('active');
    document.querySelector('#home').classList.remove('active');
    document.querySelector('#settings').classList.remove('active');
    target.classList.add('active');
    document.querySelector('#home-tab').classList.remove('active');
    document.querySelector('#settings-tab').classList.remove('active');
  }
}

document.addEventListener('DOMContentLoaded', (event) => {
  const toggleSwitch = document.querySelector('#toggle');
  toggleSwitch.addEventListener('change', (event) => {
    isExtensionOn = !isExtensionOn;
    updateStatusText();
    chrome.runtime.sendMessage({ message: 'toggle' });
  });

  document.querySelector('.navbar').addEventListener('click', switchTabs);

  const whitelistAddButton = document.querySelector('#whitelistAddButton');
  whitelistAddButton.addEventListener('click', addSubreddit);

  updateWhitelist().then(() => {
    updateStatusText();
  });
});
