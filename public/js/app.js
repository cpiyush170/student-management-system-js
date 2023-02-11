deleteStudent() // to delete student
function deleteStudent() {
  let options = document.querySelector('.options')
  let deleteId;
  if(options !== null){
  options.onclick = async function(e){
    deleteId = e.target.getAttribute('data-id')
  // if data id exist on target, then only delete
    if (deleteId !== null) {
      if (confirm('Are you sure you want to delete ? ')) {
        // delete the record only when ok is clicked
        let url = `/students/${deleteId}`
        let response = await fetch(url, {
          method: 'DELETE'
        })
        let data = await response.json()
        console.log(data)
        window.location.reload();
      }
    }
  else{
    // when you cancel, do nothing
  }
  }
  }
}



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






