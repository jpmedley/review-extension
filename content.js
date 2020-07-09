(() => {
  function postMessage(data) {
    const extension = document.querySelector('.w-extension');
    extension.contentWindow.postMessage(data, '*');
    console.log(`posting message from content.js`, data);
  }
  function audit() {
    const ui = document.querySelector('.w-extension');
    function hero() {
      const hero = document.querySelector('.w-hero');
      if (!hero) {
        postMessage({id: 'hero', pass: false, code: 'no-hero'});
        return;
      }
      // TODO(kayce): Create one image and share it across all audits that
      // need an image reference?
      const image = new Image();
      image.addEventListener('load', () => {
        if ((image.width === 3200) && (image.height === 920)) {
          postMessage({id: 'hero', pass: true});
        } else {
          postMessage({id: 'hero', pass: false, code: 'incorrect-dimensions'});
        }
      });
      image.src = document.querySelector('.w-hero').src;
    }
    function headings() {

    }
    function tags() {
      const data = {id: 'tags', pass: document.querySelector('.w-chip') ? true : false};
      postMessage(data);
    }
    function psi() {
      // PSI API is returing HTTP 400 (invalid request)
      const url = `url=${encodeURIComponent(window.location)}`;
      const key = 'key=AIzaSyCGRsPbQXhA3JdbYixZlFJRlGVyTUvPVik';
      //const categories =
      //    `category=${encodeURIComponent(['accessibility', 'best-practices', 'performance', 'pwa', 'seo'].join(','))}`
      //fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${url}&${categories}&${key}`)
      //    .then(response => response.text())
      //    .then(text => console.log(text));
    }
    hero();
    tags();
    //headings();
    //psi();
  }
  function setup() {
    function customize() {
      // TODO(kayce): Store the old values of the styles attributes before changing them
      // so that you can revert them during the teardown.
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
  function teardown() {
    document.querySelector('.w-actions').removeAttribute('style');
    document.querySelector('.w-post-content').removeAttribute('style');
    const extension = document.querySelector('.w-extension');
    if (extension) {
      extension.parentNode.removeChild(extension);
    }
  }
  window.addEventListener('message', e => {
    if (e.data.id === 'close') teardown();
    if (e.data.id === 'ready') audit();
  });
  setup();
  //audit();
})();