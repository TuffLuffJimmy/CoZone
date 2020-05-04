
let searchReq = ''

// listens for click event on search button, then passes user input into search request variable
document.getElementById('searchBtn').addEventListener('click', (event) => {
  event.preventDefault()
  searchReq = document.getElementById('searchContent').value
  document.getElementById('searchContent').value = ''
})
