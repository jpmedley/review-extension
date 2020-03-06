document.querySelectorAll('img').forEach(img => {
  if (!img.alt) {
    console.log(img);
    img.style.border = '5px solid red';
  }
});
