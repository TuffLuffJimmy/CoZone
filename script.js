
// enter the searched word here 
let country = 'South africa'

// this function puts the searched item into the proper syntax for the Covid-19 API
function searchToLow(search) {
  let newSearch = ''

  // changes all uppercase letters to lowercase
  search = search.toLowerCase()

  // removes all spaces and replaces them with a -
  for (let i = 0; i < search.length; i++) {
    if (search.charAt(i) === ' ') {
      newSearch += '-'
    }

    else {
      newSearch += search.charAt(i)
    }
  }
  console.log(newSearch)
  // calls the findApi function
  findApi(newSearch)
}


function findApi(searchWord) {
  //code for fetching from covid19api, needs to be equipt with search bar for names, names can be changed where south-africa currently populates
  fetch(`https://api.covid19api.com/total/country/${searchWord}`)
    .then(r => r.json())
    .then(data => {
      //curently set to find most current value in the api, however this can be changed by subtracting more from data.length to get preveous info ex data.length-2 will give object data from the day befor
      let currentDay = data[data.length - 1]
      console.log(data[data.length - 1])
      console.log(data[data.length - 1].Confirmed)
      console.log(data[data.length - 1].Recovered)
      console.log(data[data.length - 1].Deaths)
    })
}
searchToLow(country)

let searchReq = ''

// listens for click event on search button, then passes user input into search request variable
document.getElementById('searchBtn').addEventListener('click', (event) => {
  event.preventDefault()
  searchReq = document.getElementById('searchContent').value
  document.getElementById('searchContent').value = ''
})

