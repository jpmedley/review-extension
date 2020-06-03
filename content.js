(() => {  
  function audit() {
    const ui = document.querySelector('.w-extension');
    function hero() {
      const image = new Image();
      image.addEventListener('load', () => {
        if (image.width !== 3200) {
          document.querySelector('.w-extension').contentWindow.postMessage({id: 'hero', success: false}, '*');
          console.log('fail');
        } else {
          document.querySelector('.w-extension').contentWindow.postMessage({id: 'hero', success: true}, '*');
          console.log('pass');
        }
      });
      image.src = document.querySelector('.w-hero').src;
    }
    hero();
  }
  function setup() {
    function customize() {
      document.querySelector('.w-actions').style.display = 'none';
      // TODO you can store old css by noting values before you change them.
      document.querySelector('.w-post-content').style.margin = '0 0 0 auto';
    }
    function init() {
      let ui = document.querySelector('.w-extension');
      if (!ui) {
        ui = document.createElement('iframe');
        ui.referrerpolicy = 'same-origin';
        ui.classList.add('w-extension');
        ui.style.width = `${document.querySelector('.w-post-content').getBoundingClientRect().left}px`;
        ui.style.height = `${document.documentElement.clientHeight}px`;
        ui.src = chrome.runtime.getURL('ui.html');
        document.body.appendChild(ui);
      }
    }
    customize();
    init();
  }
  setup();
  audit();
})();