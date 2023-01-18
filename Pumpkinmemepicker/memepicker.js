import { catsData } from '/data.js'

const emotionRadio = document.getElementById('emotion-radios')
const catsDataStorage = catsData;
const emotionRadioDiv = document.getElementById('emotion-radios')
const emotionRadios = document.getElementById('emotion-radios')
//get Emotions From Data File
function getEmotions(cats) {
    const emotionStorage = [];
    for(let item of cats) {
       for(let emotion of item.emotionTags){
        if(!emotionStorage.includes(emotion)) {
            emotionStorage.push(emotion)
        } 
       }
    }
    return emotionStorage
}

function renderRadioEmotion() {
    let radioItems = ``
    const emotions = getEmotions(catsData)
    emotions.map(item => {
        radioItems += `
        <div class="radio">
            <label for=${item}>${item}</label>
            <input 
            type="radio"
            id="${item}"
            value="${item}"
            name="mood">
        </div>`
    })
 
    emotionRadioDiv.innerHTML = radioItems;

}

renderRadioEmotion();

//--------------------

emotionRadios.addEventListener('change', highlightCheckedOption)

function highlightCheckedOption (e) {
    
    const radios = document.getElementsByClassName('radio')
    for(let radio of radios) {
        radio.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')

    
}
//getCatsArray
const getImageBtn = document.getElementById('get-image-btn')
getImageBtn.addEventListener('click', renderImage)
const isGifonly = document.getElementById('gifs-only-option')
function getCatsArray () {
    const emotion = document.querySelector('input[type="radio"]:checked').value
    const isGif = isGifonly.checked

    const matchingCatsArray = catsData.filter(cat => {
        if(isGif) {
        return cat.emotionTags.includes(emotion) && cat.isGif
        } else {
            return cat.emotionTags.includes(emotion)
        }
        
    })
    console.log(matchingCatsArray)
    return matchingCatsArray
    
}

function getSingleObject () {
    const storage = getCatsArray()
    if(storage.length === 0) {
        return storage[0]
    } else {
        const random = Math.floor(Math.random() * storage.length)
        return storage[random]
    }
}

//Render Image
const imagePlace = document.getElementById('meme-modal-inner')
const memePlace = document.getElementById('meme-modal')
const closeMeme = document.getElementById('meme-modal-close-btn')

function renderImage() {
    console.log(getSingleObject ())
    const storageofcat = getSingleObject ()
    imagePlace.innerHTML = `
    <img
    class="cat-img"
    src="./images/${storageofcat.image}"/>`
    memePlace.style.display = 'flex'

}

closeMeme.addEventListener('click', function() {
    memePlace.style.display = 'none'
})




