const firebaseConfig = {
    apiKey: "AIzaSyCI6w4PPKKecXzYh6QHG6yaXKdSDALSqPE",
    authDomain: "gam-learn-9af98.firebaseapp.com",
    projectId: "gam-learn-9af98",
    storageBucket: "gam-learn-9af98.appspot.com",
    messagingSenderId: "517281640775",
};

firebase.initializeApp(firebaseConfig);


const auth = firebase.auth();

const loggedUser = document.querySelector('.logged-user');
const toggleOnAuth = document.querySelector('.toggle-on-auth');

auth.onAuthStateChanged((user) => {
    if (user) {
        logout.innerText = 'Logout';
        loggedUser.innerText = user.email;
    } else {
        window.location.replace("/frontend/index.html");
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