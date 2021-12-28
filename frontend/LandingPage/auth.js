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

const addQuestionLink = document.querySelector('.add-question-link');
const loggedUser = document.querySelector('.logged-user');
const toggleOnAuth = document.querySelector('.toggle-on-auth');
addQuestionLink.style.display = 'none';

auth.onAuthStateChanged((user) => {
    if (user) {
        db.collection('user-info').doc(user.uid).get().then((doc) => {
            const data = doc.data();
            if (data.type !== 'user') {
                addQuestionLink.style.display = 'initial';
            }
        })
        logout.innerText = 'Logout';
        loggedUser.innerText = user.email;
    } else {
        logout.innerText = 'Login';
        toggleOnAuth.style.display = 'none';
    }
});

const logout = document.querySelector('#logout-btn');

function logOut() {
    logout.addEventListener('click', (e) => {
        auth.signOut().then(() => {
            if (user) {
                window.alert('You are logged out');
            }
        })
    })
}

logOut();