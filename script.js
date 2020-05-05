
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

let map
let service
let infoWindow


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
// Links value from search input to Maps API
    const oklahoma = new google.maps.LatLng(35, 97.092)
    infoWindow = new google.maps.InfoWindow()
    map = new google.maps.Map(
      document.getElementById('map'), { center: oklahoma, zoom: 3 })
    let request = {
      query: `${searchReq}`,
      fields: ['name', 'geometry'],
    }
    let service = new google.maps.places.PlacesService(map)
    service.findPlaceFromQuery(request, function (results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          console.log(results[i])
        }
        map.setCenter(results[0].geometry.location)
      }
    })
})

// toggles map on and off when map tab is pressed
let displayMap = true
document.getElementById('showMap').addEventListener('click', (event) => {
  event.preventDefault()
  console.log('test map')
  if (displayMap) {
    console.log('true')
    displayMap = false
    document.getElementById('map').style.display = 'block'
  } else {
    console.log('false')
    displayMap = true
    document.getElementById('map').style.display = 'none'
  }
})