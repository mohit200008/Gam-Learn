const chemistryScore = localStorage.getItem('chemistry-score')
const englishScore = localStorage.getItem('english-score')
const historyScore = localStorage.getItem('history-score')
const mathsScore = localStorage.getItem('maths-score')
const phycicsScore = localStorage.getItem('physics-score')

const allScores = [chemistryScore, englishScore, historyScore, mathsScore, phycicsScore];
console.log(allScores);

const scores = document.querySelectorAll('.score');

scores.forEach((score, index) => {
    if (allScores[index] == null) {
        score.innerText = "No test attempted"
    } else {
        score.innerText = allScores[index];
    }
})