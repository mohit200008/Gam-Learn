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

const testAttemptedCount = document.querySelector('.test-attempted-count');
const subjectWiseTestAttempted = document.querySelector('.subject-wise-test-attempted');
const recentTestTable = document.querySelector('.recent-test-table');

async function getScores(user) {
    const snapshot = await db.collection('scores');
    const scoreSnapshot = await snapshot.where("email", "==", user.email).get();
    let scores = await scoreSnapshot.docs.map(doc => doc.data());
    testAttemptedCount.innerHTML = scores.length;
    let allTests = [];
    scores.forEach(score => {
        let found = false;
        for (let i = 0; i < allTests.length; i++) {
            if (allTests[i].subject && allTests[i].subject == score.subject) {
                found = true;
                allTests[i].tests++;
                break;
            }
        }
        if (!found) {
            allTests.push({ subject: score.subject, tests: 1 });
        }
    })
    allTests.forEach(test => {
        let div = document.createElement('div');
        div.classList.add('user-subject')
        let span = document.createElement('span');
        div.innerHTML = test.subject;
        span.innerHTML = test.tests;
        div.appendChild(span);
        subjectWiseTestAttempted.appendChild(div);
    })
    scores.sort(function (a, b) {
        return b.time.seconds - a.time.seconds;
    });
    scores = scores.slice(0, 10);
    scores.forEach(score => {
        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');
        td1.innerHTML = score.subject;
        tr.appendChild(td1);
        td2.innerHTML = score.score;
        tr.appendChild(td2);
        td3.innerHTML = new Date(1000 * score.time.seconds).toLocaleDateString();
        tr.appendChild(td3);
        recentTestTable.appendChild(tr);
    })
}

auth.onAuthStateChanged((user) => {
    if (user) {
        getScores(user);
    } else {
        window.location.href = '/frontend/index.html';
    }
});