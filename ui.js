const tasks = {};

// Using onmessage rather than addEventListener for the same reason
// as onlick (see below).
window.onmessage = (e) => {
  tasks[e.data.id] = e.data;
  update(e.data);
};

// Using onclick here rather than addEventListener so that the
// handler is not registered multiple times. E.g. user opens the
// extension, then closes it, then opens it again.
document.querySelector('#close').onclick = () => {
  window.parent.postMessage({id: 'close'}, '*');
};

function update(data) {
  const section = document.getElementById(data.id);
  if (data.pass) {
    section.querySelector('.pass').classList.add('visible');
    section.querySelector('.status').textContent = 'Pass';
    return;
  }
  section.querySelector('.fail').classList.add('visible');
  section.querySelector('.status').textContent = 'Fail';
}

// Using onclick for the same reason as document.querySelector('#close').onclick
// (see above).
document.querySelector('#copy').onclick = () => {
  // TODO this button should be disabled until the reviewer has manually
  // checked all of the manual checks.
  let markdown = '';
  for (id in tasks) {
    //console.log(tasks, id);
    markdown = `${markdown}- [ ] ${tasks[id].instruction}\n`;
  }
  console.log(markdown);
};

window.parent.postMessage({id: 'ready'}, '*');