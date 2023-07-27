async function loadHeader() {
    const response = await fetch('/header.html');
    const headerHtml = await response.text();
    const headerContainer = document.querySelector('.header-container');
    headerContainer.innerHTML = headerHtml;
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    loadHeader();
  });
  