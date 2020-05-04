function searchToLow(){
let search
let searchWord
search = search.toLowerCase()
for (let i = 0; i<search.length;i++){
  if(search(i)=== ' '){
    searchWord +='-'
  }
  else{
    searchWord +=search.charAt(i)
  }
  }
}
chooseApi(searchWord)
}


function chooseApi(searchWord){
  fetch('https://api.covid19api.com/total/country/south-africa')
    .then(r => r.json())
    .then(data => {
      let currentDay = data[data.length - 1]
    }
    if (currentDay /=== 'undefined'){
      countryApi()
    }
}


function countryApi(){
//code for fetching from covid19api, needs to be equipt with search bar for names, names can be changed where south-africa currently populates
fetch('https://api.covid19api.com/total/country/south-africa')
  .then(r => r.json())
  .then(data => {
    //curently set to find most current value in the api, however this can be changed by subtracting more from data.length to get preveous info ex data.length-2 will give object data from the day befor
    let currentDay = data[data.length - 1]
    console.log(data[data.length - 1])
  }