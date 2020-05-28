window.addEventListener('load', () => {
  audit();
  console.log('popup load');
});

chrome.runtime.onMessage.addListener((message, sender) => {
  console.log(message, sender);
});

function audit() {
  chrome.tabs.executeScript({
    file: 'content.js'
  }); 
}