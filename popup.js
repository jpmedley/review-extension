function audit() {
 chrome.tabs.executeScript({
   file: 'audit.js'
 }); 
}

document.getElementById('audit').addEventListener('click', audit);
