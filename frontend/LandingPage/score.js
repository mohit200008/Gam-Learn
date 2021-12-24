const firebaseConfig = {
    apiKey: "AIzaSyCI6w4PPKKecXzYh6QHG6yaXKdSDALSqPE",
    authDomain: "gam-learn-9af98.firebaseapp.com",
    projectId: "gam-learn-9af98",
    storageBucket: "gam-learn-9af98.appspot.com",
    messagingSenderId: "517281640775",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

db.settings({ timestampsInSnapshots: true });

const scores = document.querySelectorAll('.score');

async function getMarker() {
    let chemistryScore = []
    let englishScore = []
    let historyScore = []
    let mathsScore = []
    let physicsScore = []
    const snapshot = await db.collection('scores').get();
    const response = await snapshot.docs.map(doc => doc.data());
    response.forEach(res => {
        if (res.subject === 'maths') {
            mathsScore.push({ user: res.email, score: res.score, time: res.time.seconds });
        } else if (res.subject === 'chemistry') {
            chemistryScore.push({ user: res.email, score: res.score, time: res.time.seconds });
        } else if (res.subject === 'physics') {
            physicsScore.push({ user: res.email, score: res.score, time: res.time.seconds });
        } else if (res.subject === 'history') {
            historyScore.push({ user: res.email, score: res.score, time: res.time.seconds });
        } else if (res.subject === 'english') {
            englishScore.push({ user: res.email, score: res.score, time: res.time.seconds });
        }
    })
    chemistryScore.sort(function (a, b) {
        return b.time - a.time;
    });
    mathsScore.sort(function (a, b) {
        return b.time - a.time;
    });
    historyScore.sort(function (a, b) {
        return b.time - a.time;
    });
    englishScore.sort(function (a, b) {
        return b.time - a.time;
    });
    physicsScore.sort(function (a, b) {
        return b.time - a.time;
    });
    scores.forEach((score, index) => {
        if (index === 0) {
            chemistryScore.forEach(e => {
                let div = document.createElement('div');
                div.classList.add('user-score')
                let span = document.createElement('span');
                div.innerHTML = e.user;
                span.innerHTML = e.score;
                div.appendChild(span);
                score.appendChild(div);
            })
        } else if (index === 1) {
            englishScore.forEach(e => {
                let div = document.createElement('div');
                div.classList.add('user-score')
                let span = document.createElement('span');
                div.innerHTML = e.user;
                span.innerHTML = e.score;
                div.appendChild(span);
                score.appendChild(div);
            })
        } else if (index === 2) {
            historyScore.forEach(e => {
                let div = document.createElement('div');
                div.classList.add('user-score')
                let span = document.createElement('span');
                div.innerHTML = e.user;
                span.innerHTML = e.score;
                div.appendChild(span);
                score.appendChild(div);
            })
        } else if (index === 3) {
            mathsScore.forEach(e => {
                let div = document.createElement('div');
                div.classList.add('user-score')
                let span = document.createElement('span');
                div.innerHTML = e.user;
                span.innerHTML = e.score;
                div.appendChild(span);
                score.appendChild(div);
            })
        } else if (index === 4) {
            physicsScore.forEach(e => {
                let div = document.createElement('div');
                div.classList.add('user-score')
                let span = document.createElement('span');
                div.innerHTML = e.user;
                span.innerHTML = e.score;
                div.appendChild(span);
                score.appendChild(div);
            })
        }
    })
}

getMarker();


// const chemistryScore = localStorage.getItem('chemistry-score')
// const englishScore = localStorage.getItem('english-score')
// const historyScore = localStorage.getItem('history-score')
// const mathsScore = localStorage.getItem('maths-score')
// const phycicsScore = localStorage.getItem('physics-score')

// const allScores = [chemistryScore, englishScore, historyScore, mathsScore, phycicsScore];
// console.log(allScores);

// const scores = document.querySelectorAll('.score');

// scores.forEach((score, index) => {
//     if (allScores[index] == null) {
//         score.innerText = "No test attempted"
//     } else {
//         score.innerText = allScores[index];
//     }
// })