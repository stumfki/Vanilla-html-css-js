import characterData from './data.js'
import Character from './Character.js'
import { getFireballDamage } from './utils.js'

let monstersArray = ["orc", "demon", "goblin"]
let isWaiting = false

function getNewMonster() {
    const nextMonsterData = characterData[monstersArray.shift()]
    return nextMonsterData ? new Character(nextMonsterData) : {}
}

function attack() {
    if(!isWaiting){
        wizard.setDiceHtml()
        monster.setDiceHtml()
        wizard.takeDamage(monster.currentDiceScore)
        monster.takeDamage(wizard.currentDiceScore)
        render()
        
        if(wizard.dead){
            endGame()
        }
        else if(monster.dead){
            isWaiting = true
            if(monstersArray.length > 0){
                setTimeout(()=>{
                    monster = getNewMonster()
                    render()
                    isWaiting = false
                },1500)
            }
            else{
                endGame()
            }
        }    
    }
}


function endGame() {
    isWaiting = true
    const endMessage = wizard.health === 0 && monster.health === 0 ?
        "No victors - all creatures are dead" :
        wizard.health > 0 ? "The Wizard Wins" :
            "The monsters are Victorious"

    const endEmoji = wizard.health > 0 ? "🔮" : "☠️"
        setTimeout(()=>{
            document.body.innerHTML = `
                <div class="end-game">
                    <h2>Game Over</h2> 
                    <h3>${endMessage}</h3>
                    <p class="end-emoji">${endEmoji}</p>
                </div>
                `
        }, 1500)
}

document.getElementById("attack-button").addEventListener('click', attack)


function render() {
    
    document.getElementById('hero').innerHTML = wizard.getCharacterHtml()
    document.getElementById('monster').innerHTML = monster.getCharacterHtml()
    const fireBall = document.getElementById('fire').addEventListener('click', castFireball)
    const heal = document.getElementById('heal').addEventListener('click', useHeal)
   
    
    
}

const wizard = new Character(characterData.hero)
let monster = getNewMonster()
render()


function castFireball() {
    if(wizard.usedFireball) {
        console.log("already used")
    } else if(wizard.usedFireball === false) {
        wizard.usedFireball = true;
        const damage =  getFireballDamage()
    monster.health -= damage
    document.getElementById('popUp').style.visibility = "inherit"
        document.getElementById('popUp').innerHTML = `FireBall Dealt ${damage} damage!`
        setTimeout(()=>{
            document.getElementById('popUp').style.visibility = "hidden"
        },1500)

    if(monster.health <= 0){
        isWaiting = true
        if(monstersArray.length > 0){
            setTimeout(()=>{
                monster = getNewMonster()
                render()
                isWaiting = false
            },1500)
        }
        else{
            endGame()
        }
    } 
    render()
    }
   
}
   
   
    
    
    function useHeal() {
        if(wizard.usedHeal) {
            console.log("already used")
        } else if(wizard.usedHeal === false) {
           wizard.usedHeal = true;
           const damage =  getFireballDamage()
       
           wizard.health += damage
           if(wizard.health > 60) {
            wizard.health = 60
           }
           document.getElementById('popUp').style.visibility = "inherit"
        document.getElementById('popUp').innerHTML = `You healed for ${damage} health.`
        setTimeout(()=>{
            document.getElementById('popUp').style.visibility = "hidden"
        },1500)

        }
        render()
        
        
        }
  