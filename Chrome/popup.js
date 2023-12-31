let isExtensionOn = false;

function updateStatusText() {
  const status = document.querySelector('#status');
  status.textContent = isExtensionOn ? 'Enabled' : 'Disabled';
}

function switchTabs(event) {
  const target = event.target;
  if (target.matches('#home-tab')) {
    document.querySelector('#home').classList.add('active');
    document.querySelector('#settings').classList.remove('active');
    target.classList.add('active');
    document.querySelector('#settings-tab').classList.remove('active');
  } else if (target.matches('#settings-tab')) {
    document.querySelector('#settings').classList.add('active');
    document.querySelector('#home').classList.remove('active');
    target.classList.add('active');
    document.querySelector('#home-tab').classList.remove('active');
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

  updateStatusText();
});
