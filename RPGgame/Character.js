import { getDiceRollArray, getDicePlaceholderHtml, getPercentage } from './utils.js'

function Character(data) {
    Object.assign(this, data)
    this.maxHealth = this.health
    this.usedFireball = false;
    this.usedHeal = false;
    this.diceHtml = getDicePlaceholderHtml(this.diceCount)

    this.setDiceHtml = function() {
        this.currentDiceScore = getDiceRollArray(this.diceCount)
        this.diceHtml = this.currentDiceScore.map((num) =>
            `<div class="dice">${num}</div>`).join("")
    }

    this.takeDamage = function (attackScoreArray) {
        const totalAttackScore = attackScoreArray.reduce((total, num) => total + num)
        this.health -= totalAttackScore
        if (this.health <= 0) {
            this.dead = true
            this.health = 0
        }
    }


    this.getHealthBarHtml = function () {
        const percent = getPercentage(this.health, this.maxHealth)
        return `<div class="health-bar-outer">
                    <div class="health-bar-inner ${percent < 26 ? "danger" : ""}" 
                            style="width:${percent}%;">
                    </div>
                </div>`  
    }
    console.log(data.name)

    this.getCharacterHtml = function () {
        const { elementId, name, avatar, health, diceCount, diceHtml } = this
        const healthBar = this.getHealthBarHtml()
        if(data.name === "Wizard") {
        return `
            <div class="character-card">
                <h4 class="name"> ${name} </h4>
                <img class="avatar" src="${avatar}" />
                <div class="health">health: <b> ${health} </b></div>
                ${healthBar}
                <div class="spells">
                <div class="${this.usedFireball ? "fireUsed" : "fire"}">
                <button id="fire">🔥</button>
                </div>
                <div class="${this.usedHeal ? "healUsed" : "heal"}">
                <button id="heal">🩹</button>
                </div>
                </div>
                <div class="dice-container">
                    ${diceHtml}
                </div>
            </div>`}
            else {
                return `
            <div class="character-card">
                <h4 class="name"> ${name} </h4>
                <img class="avatar" src="${avatar}" />
                <div class="health">health: <b> ${health} </b></div>
                ${healthBar}
               
                <div class="dice-container">
                    ${diceHtml}
                </div>
            </div>`
            }
    }
}

export default Character