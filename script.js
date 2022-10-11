// Declare global variables and constants
const API_URL = 'http://www.reddit.com/search.json?q='
// cats+nsfw:no'
const INTERVAL_DELAY = 2500
let currentImages = []
let currentIndex = 0
let interval = null
let form = document.getElementById('search-form')
let resultContainer = document.getElementById('result')
let slideShowContainer = document.getElementById('slideshow-container')
let stopBtn = document.querySelector('#stop-button')
slideShowContainer.style.display = 'none'

stopBtn.addEventListener('click', e => {
    slideShowContainer.style.display = 'none'
    form.style.visibility = 'visible'
    form.style.display = 'block'
    document.querySelector('#query').value = ''
    clearInterval(interval)
})

form.addEventListener('submit', e => {
    e.preventDefault() // stops browser from refreshing
    let userQuery = document.querySelector('#query').value
    // Check to see if userQuery is not empty
    // if userQuery is not empty -> call fetch function
    //else console.log that the string is empty
    if (userQuery){
        searchRedditAPI(userQuery)
    } else {
        console.log('String is empty!')
    }
    form.style.visibility = 'hidden'
})
//async 
function searchRedditAPI(userQuery){
    // let response = await fetch(API_URL + userQuery)
    // response.json()
    fetch(API_URL + userQuery)
    .then(response => response.json())
    .then(responseData => {
        currentImages = responseData.data.children.map(element => {
            return {
                title: element.data.title,
                url: element.data.url
            }
        }) 
        console.log('Cleaned up data!', currentImages)
        startSlideshow()
    }).catch(err => console.log(err))
}

function startSlideshow(){
    // let resultContainer = document.getElementById('result')
    form.style.display = 'none'
    // let slideShowContainer = document.getElementById('slideshow-container')
    slideShowContainer.style.display = 'block'

    console.log('Starting Slideshow!')
    if (currentIndex >= currentImages.length){
        currentIndex = 0
    }
    let img = document.createElement('img')
    img.src = currentImages[currentIndex].url
    resultContainer.append(img)
    interval = setInterval(() => {
        changeImage()
    }, 2500)
}

function changeImage(){
    currentIndex++
    resultContainer.innerHTML = ''
    let img = document.createElement('img')
    img.src = currentImages[currentIndex].url
    resultContainer.append(img)
}