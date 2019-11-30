function navBarEventListener() {
  const closeLinks = document.getElementsByClassName('nav__link');
  const linksCount = 2;

  for(let i = 0; i < linksCount; i++) {
    closeLinks[i].addEventListener('click', function() {
      const button = document.getElementById('nav-toggle');
      button.click();
    });
  }
}

navBarEventListener();

