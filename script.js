
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
  createChartInfo(newSearch)
}

// map variables
let markerSpot = new google.maps.LatLng(39.01, -98.484)
let map = new google.maps.Map(
  document.getElementById('map'), { center: markerSpot, zoom: 3 })
let service
let contentString = ``
let markerArr = []

// code for marker and info window
function mapMarker() {
  let infowindow = new google.maps.InfoWindow({
  content: contentString
  })
  service = new google.maps.places.PlacesService(map)
  let marker = new google.maps.Marker({
    map: map,
    // Instead of geocoding, the map already centers over the country you search, so this code just adds the marker to the center of the map
    position: map.getCenter()
  })
    // This adds the marker to an array so the old markers can be deleted later
    markerArr.push(marker)
    marker.addListener('click', function () {
      infowindow.open(map, marker)
  })
}

// Because we're not using geocoding, anytime you move the map and then search, it would create an unwanted marker at the center of the map at the time you hit enter, and then would jump to your searched location and place a map there
// these functions all work towards deleting all previous markers, so only the one centered on the country you searched for displays
// this first one loops through and makes an array of any markers added to the map
function setMapOnAll(map) {
  for(let i = 0; i <markerArr.length; i++) {
    markerArr[i].setMap(map)
  }
}
// this function helps set the markers to null
function clearMarkers() {
  setMapOnAll(null)
}
// this final function empties the entire array, so only one marker shows at a time
function deleteMarkers() {
  clearMarkers()
  markerArr = []
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
      // Generate card with info
      let infoElem = document.createElement('div')
      infoElem.className = 'card'
      infoElem.innerHTML = `
        <div class="row">
      <div class="col s12 m6">
        <div class="card card #424242 grey darken-3">
          <div class="card-content white-text">
            <span class="card-title">${data[data.length - 1].Country}</span>
            <ul>
             <li>Cases Confirmed: ${data[data.length - 1].Confirmed}</li>
             <li>Recovered: ${data[data.length - 1].Recovered}</li>
             <li>Deaths: ${data[data.length - 1].Deaths}</li>
            </ul>
           </div>
          </div>
        </div>
      </div>
    </div>
      `
      // For the maps info window
      let cardWindow = document.createElement('div')
      cardWindow.className = 'card'
      cardWindow.innerHTML = `
      <div class="row">
        <div class="col">
          <div class="card-panel red darken-2">
            <span class="white-text card-title">${data[data.length - 1].Country}</span>
            <ul>
              <li class="white-text">Cases: ${data[data.length - 1].Confirmed}</li>
              <li class="white-text">Deaths: ${data[data.length - 1].Deaths}</i>
            </ul>
          </div>
        </div>
      </div>
      `
      contentString = cardWindow
      mapMarker()
      // document.getElementById('searchContent').value = ''
      document.getElementById('countryInfo').innerHTML = ''
      document.getElementById('countryInfo').append(infoElem)
    })
}

let searchReq = ''

// listens for click event on search button, then passes user input into search request variable
document.getElementById('searchBtn').addEventListener('click', (event) => { searchFunc() })
document.getElementById('searchContent').addEventListener('keydown', function (e) {
  if (e.keyCode === 13) {
    searchFunc()
  }
})
function searchFunc() {
  event.preventDefault()
  searchReq = document.getElementById('searchContent').value
  document.getElementById('searchContent').value = ''
  // Links value from search input to Maps API
  map 
  let request = {
    query: `${searchReq}`,
    fields: ['name', 'geometry'],
  }
  service = new google.maps.places.PlacesService(map)
  service.findPlaceFromQuery(request, function (results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (let i = 0; i < results.length; i++) {
        console.log(results[i])
      }
      map.setCenter(results[0].geometry.location)
    }
    deleteMarkers()
    mapMarker()
  })
  searchToLow(searchReq)
}

function createChartInfo(searchWord){
  fetch(`https://api.covid19api.com/total/country/${searchWord}`)
    .then(r => r.json())
    .then(data => {
      let dateArr = []
      let confirmedArr = []
      let recoveredArr = []
      let deathsArr = []
      for (i = 10; i > 0; i--) {
        let currentDay = data[data.length - i]
        dateArr.push(`${currentDay.Date}`)
        confirmedArr.push(`${currentDay.Confirmed}`)
        recoveredArr.push(`${currentDay.Recovered}`)
        deathsArr.push(`${currentDay.Deaths}`)
      }
      console.log(dateArr)
      console.log(confirmedArr)
      console.log(recoveredArr)
      console.log(deathsArr)
      makeChart(dateArr, confirmedArr, 1)
      makeChart(dateArr, recoveredArr, 2)
      makeChart(dateArr, deathsArr, 3)
    })
}
function makeChart(xvar, yvar, chartNum) {
  var ctx = document.getElementById(`myChart${chartNum}`).getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: xvar,
      datasets: [{
        label: '# of Votes',
        data: yvar,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

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


document.getElementById('showMap').addEventListener('click', (event) => {
  document.getElementById('map').style.display = 'block'
  document.getElementById('countryInfo').style.display = 'none'
  document.getElementById('graphs').style.display = 'none'
})
document.getElementById('showGraph').addEventListener('click', (event) => {
  document.getElementById('map').style.display = 'none'
  document.getElementById('countryInfo').style.display = 'none'
  document.getElementById('graphs').style.display = 'block'
})
document.getElementById('showCountryInfo').addEventListener('click', (event) => {
  document.getElementById('map').style.display = 'none'
  document.getElementById('countryInfo').style.display = 'block'
  document.getElementById('graphs').style.display = 'none'
})