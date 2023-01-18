import { tweetsData } from './data.js'
const tweetInput = document.getElementById('tweet-input')
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
console.log(uuidv4()); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

let isLiked = ''
function getFeedHtml(){
    let feedHtml = ``
    
    tweetsData.forEach(function(tweet){
        let likeIconClass = ''
        
        if (tweet.isLiked){
            likeIconClass = 'liked'
        }
        
        let retweetIconClass = ''
        
        if (tweet.isRetweeted){
            retweetIconClass = 'retweeted'
        }

        let commentData = ''

        if(tweet.replies.length > 0) {
            tweet.replies.forEach(item=> {
                commentData += 
                `<div class="tweet-reply">
                <div class="tweet-inner">
                    <img src="${item.profilePic}" class="profile-pic">
                        <div>
                            <p class="handle">${item.handle}</p>
                            <p class="tweet-text">${item.tweetText}</p>
                        </div>
                    </div>
            </div>`
            })
        }
        console.log(commentData[1])
        feedHtml += `
<div class="tweet">
    <div class="tweet-inner">
        <img src="${tweet.profilePic}" class="profile-pic">
        <div>
            <p class="handle">${tweet.handle}</p>
            <p class="tweet-text">${tweet.tweetText}</p>
            <div class="tweet-details">
                <span class="tweet-detail">
                    <i class="fa-regular fa-comment-dots"
                    data-reply="${tweet.uuid}"
                    ></i>
                    ${tweet.replies.length}
                </span>
                <span class="tweet-detail ">
                    <i class="fa-solid fa-heart ${likeIconClass}"
                    data-like="${tweet.uuid}"
                    ></i>
                    ${tweet.likes}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-retweet ${retweetIconClass}"
                    data-retweet="${tweet.uuid}"
                    ></i>
                    ${tweet.retweets}
                </span>
            </div>   
        </div>            
    </div>
    <div class="hidden comment" id="replies-${tweet.uuid}">
    ${commentData}
    </div>
</div>
`
   })
   return feedHtml 
}

function render(){
    document.getElementById('feed').innerHTML = getFeedHtml()
}

render()



document.addEventListener('click', function(e){
    
    console.log(e.target.id)
    if(e.target.dataset.like){
       
       handleLikeClick(e.target.dataset.like)
      
    }
    if(e.target.dataset.retweet){
        handleRetweetClick(e.target.dataset.retweet) 
     }
     else if(e.target.dataset.reply) {
        toggleComments(e.target.dataset.reply)
     } else if(e.target.id === 'tweet-btn') {
        handleTweetBtnClick()
     }
})

function handleTweetBtnClick(){
    if(tweetInput.value === "") {

        console.log("No empty Tweets!!!")
      
    } 
    else {
    tweetsData.unshift({
        handle: `@Scrimba`,
        profilePic: `images/scrimbalogo.png`,
        likes: 0,
        retweets: 0,
        tweetText: tweetInput.value,
        replies: [],
        isLiked: false,
        isRetweeted: false,
        uuid: uuidv4(),
    }   )
}
 tweetInput.value = ""
    render()
}


function toggleComments(e) {
   const test = document.getElementById(`replies-${e}`)
   if(test.classList.contains('hidden')) {
        document.getElementById(`replies-${e}`).classList.remove('hidden')
   
   } else {
    document.getElementById(`replies-${e}`).classList.add('hidden')
   }
    
}
function handleLikeClick(tweetId){
    
   
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]

    if(targetTweetObj.isLiked === false) {
        
        isLiked = 'liked'
    targetTweetObj.likes++
    
    } else if(targetTweetObj.isLiked === true) {
        isLiked = ''
        targetTweetObj.likes--
        
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked
    console.log(tweetsData)
 render()

}

function handleRetweetClick(tweetId){
    
   const targetTweetObj = tweetsData.filter(item => item.uuid === tweetId)[0]
   console.log(targetTweetObj.isRetweeted)
   if(targetTweetObj.isRetweeted === false) {
    targetTweetObj.retweets++
    console.log("test")
   } else {
    targetTweetObj.retweets--
   }
   targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted
   render()
}

