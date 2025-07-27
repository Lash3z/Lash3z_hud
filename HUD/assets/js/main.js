console.log('LASH3Z HUD Final Build Loaded');

fetch('VERSION.txt')
  .then(response => response.text())
  .then(text => {
    const versionLine = text.split('\n')[0].replace('LASH3Z HUD Version: ', '');
    document.getElementById('hud-version').innerText = versionLine;
  })
  .catch(err => console.warn('Version file not found', err));


// Show global spinner during data loading
function showGlobalSpinner() {
  document.getElementById('global-spinner').style.display = 'block';
}
function hideGlobalSpinner() {
  document.getElementById('global-spinner').style.display = 'none';
}

// Example loader trigger
document.querySelectorAll('.module-content').forEach(mod => {
  mod.addEventListener('click', () => {
    showGlobalSpinner();
    setTimeout(hideGlobalSpinner, 2000); // Simulate load
  });
});
