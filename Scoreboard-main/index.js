let score1 = 0;
let count = document.getElementById("team1");

let score2 = 0;
let count2 = document.getElementById("team2");

//Home foul
let homefoul = 0;
let homefoulc = document.getElementById("team1foul");

//Team 1 Score
function inc1() {
    score1 += 1;
    count.innerText = score1;
}

function inc2() {
    score1 += 2;
    count.innerText = score1;
}

function inc3() {
    score1 += 3;
    count.innerText = score1;
}

// Team 2 Score
function tinc1() {
    score2 += 1;
    count2.innerText = score2;
}

function tinc2() {
    score2 += 2;
    count2.innerText = score2;
}

function tinc3() {
    score2 += 3;
    count2.innerText = score2;
}
// Team 1 Faul
function homefaul () {
    homefoul++;
    homefoulc.innerText = homefoul;
    if(homefoul >= 5) {
        homefoulc.style.color = "red";
        homefoulc.innerText = "Bonus";
    }
}
// Team 2 Faul
let team2faul = 0;
let team2f = document.getElementById("team2foul");
function homefaul2 () {
    team2faul++;
    team2f.innerText = team2faul;
    if(team2faul >= 5) {
        team2f.style.color = "red";
        team2f.innerText = "Bonus";
    }
}

function resetgame() {
    score1 = 0;
    count.innerText = score1;
    score2 = 0;
    count2.innerText = score2;
    homefoul = 0;
    homefoulc.innerText = homefoul;
    team2faul = 0;
    team2f.innerText = team2faul;
    homefoulc.style.color = "white";
    team2f.style.color = "white";
}