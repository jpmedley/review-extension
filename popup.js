// This is supposed to be in a "background script".
// I'm not sure if it's possible to pass data from the page to this script.
// https://stackoverflow.com/a/20023723/1669860
chrome.runtime.onMessage.addListener((message, sender) => {
  console.log(message, sender);
});

window.addEventListener('load', () => {
  audit();
});

function audit() {
  chrome.tabs.executeScript({
    file: 'content.js'
  }); 
}

document.getElementById('audit').addEventListener('click', audit);
