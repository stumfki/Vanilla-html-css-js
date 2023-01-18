// Remember to import the data and Dog class!
import Dog from './dog.js'
import dogs from './data.js'






//Get all avalible Dogs
function getAvalibleDogs() {
    let dogo = dogs.filter(item => {
        return !item.hasBeenLiked && !item.hasBeenSwiped
    })
    
   
    return dogo
    
}

function getRandomDog() {
    let doger = getAvalibleDogs()[Math.floor(Math.random() * getAvalibleDogs().length)]
    console.log(getAvalibleDogs().length)
    doger.hasBeenLiked = true;
    doger.hasBeenSwiped = true;
   return doger
}
//Get A random dog from avalible dogs
function createDog() {
    
    return new Dog(getRandomDog())
    
}












function render(){
   document.getElementById('dogPictures').innerHTML = createDog().getHtml()
 
    
}

render()
//Event listener for like
document.getElementById('likeButton').addEventListener('click', function() {
    document.getElementById('like').style.display = "inherit"
    setTimeout(() => {
        render()
        document.getElementById('like').style.display = "none"
      }, "2000")
    
    
})

document.getElementById('dislikeButton').addEventListener('click', function() {
    document.getElementById('dis').style.display = "inherit"
    setTimeout(() => {
        render()
        document.getElementById('dis').style.display = "none"
      }, "2000")
    
    
})




