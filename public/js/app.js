



toggleActive() // to add active link indicator functionality
function toggleActive() {
  let links = document.querySelectorAll('.nav-link')

  links.forEach(link => {
    if (window.location.href === link.href) {
      link.classList.add('active')
      link.classList.add('aria-current', 'page')
    }
  })
}






