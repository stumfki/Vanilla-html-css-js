// Create the Dog class here

class Dog {
    constructor(data) {
        Object.assign(this, data)
        this.getHtml = function() {
    
            return `
            
            <img src="./${this.avatar}">
            <h1>${this.name}, ${this.age}</h1>
            <h2>${this.bio}</h2>`
        }
    }
}

export default Dog