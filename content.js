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
        postMessage({id: 'hero', pass: false, code: 'no-hero',
            task: 'Add a hero image: https://web.dev/handbook/markup-media/#hero'});
        return;
      }
      const image = new Image();
      image.addEventListener('load', () => {
        if ((image.width === 3200) && (image.height === 960)) {
          postMessage({id: 'hero', pass: true});
        } else {
          postMessage({id: 'hero', pass: false, code: 'incorrect-dimensions',
              task: 'Resize the hero image: https://web.dev/handbook/markup-media/#hero'});
        }
      });
      image.src = document.querySelector('.w-hero').src;
    }
    function headings() {

    }
    function images() {
      const images = [].slice.call(document.querySelectorAll('.w-post-content img'));
      images.forEach((image, index) => {
        const node = new Image();
        node.addEventListener('load', () => {
          if (node.width >= 1600) {
            const pathname = new URL(node.src).pathname;
            const filename = pathname.substring(pathname.lastIndexOf('/') + 1);
            postMessage({
              id: 'images',
              pass: false,
              details: filename,
            });
          } else {
            if (index === images.length - 1) postMessage({id: 'images', pass: true});
          }
        });
        node.src = image.src;
      });
    }
    // Not used yet.
    function isBlog() {
      return document.querySelector('.w-breadcrumbs__link[href="/blog"]') ? true : false;
    }
    // TODO(kaycebasques): Getting CORS errors. Need to use the Extension to create new tabs
    // and check that the pages are valid that way.
    // Extension background script might be the way to go.
    // https://stackoverflow.com/a/5342473/1669860
    function links() {
      let links = [].slice.call(document.querySelectorAll('.w-post-content a'));
      // TODO(kayce): Refactor all of the filtering logic below to do less looping.
      // Filter out known links that the site's template injects into each page.
      [
        'w-breadcrumbs__link',
        'w-author__name-link',
        'w-author__link',
      ].forEach(siteLink => {
        links = links.filter(link => !link.classList.contains(siteLink));
      });
      links = links.filter(link => !RegExp('/authors/').test(link.href));
      links = links.filter(link => !RegExp('Improve article').test(link.textContent));
      links = links.map(link => link.href);
      // TODO(kaycebasques): Add a callback?
      chrome.runtime.sendMessage(JSON.stringify({id: 'links', links}));
    }
    function tags() {
      postMessage({
        id: 'tags', 
        pass: document.querySelector('.w-chip') ? true : false,
        task: 'Add relevant tags to the post: https://web.dev/handbook/tags',
      });
    }

    function psi() {
      // TODO(kaycebasques): Use multiple category=X params
      // PSI API is returning HTTP 400 (invalid request)
      const url = `url=${encodeURIComponent(window.location)}`;
      const key = 'key=AIzaSyCGRsPbQXhA3JdbYixZlFJRlGVyTUvPVik';
      //const categories =
      //    `category=${encodeURIComponent(['accessibility', 'best-practices', 'performance', 'pwa', 'seo'].join(','))}`
      //fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${url}&${categories}&${key}`)
      //    .then(response => response.text())
      //    .then(text => console.log(text));
    }
    // TODO(kaycebasques): Move this because it's not a content audit.
    // It's here right now because we don't want to run it until the Extension UI is ready.
    function version() {
      const url = 'https://raw.githubusercontent.com/kaycebasques/review-extension/master/manifest.json';
      fetch(url).then(response => response.json()).then(json => {
        if (json.version !== chrome.runtime.getManifest().version) {
          postMessage({id: 'version', pass: false, code: 'new-version-available'});
        } else {
          postMessage({id: 'version', pass: true});
        }
      });
    }
    function videos() {
      // https://web.dev/handbook/markup-media/#video-hosted-on-web.dev
      let data = [];
      const videos = [].slice.call(document.querySelectorAll('.w-post-content video'));
      videos.forEach(video => {
        let details = {
          id: video.querySelector('source').src,
          playsinline: video.hasAttribute('playsinline'),
          parent: video.parentNode.nodeName === 'FIGURE' && video.parentNode.classList.contains('w-figure'),
        };
        data.push(details);
      });
      console.log(data);
    }
    hero();
    images();
    //links();
    tags();
    //headings();
    //psi();
    version();
    videos();
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
  window.onmessage = e => {
    if (e.data.id === 'close') teardown();
    if (e.data.id === 'ready') audit();
    if (e.data.id === 'copy') {
      // https://github.com/w3c/webappsec-feature-policy/issues/322#issuecomment-618009921
      navigator.clipboard.writeText(e.data.markdown);
    }
  };
  setup();
  //audit();
})();