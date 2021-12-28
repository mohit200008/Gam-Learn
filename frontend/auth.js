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

const signupForm = document.querySelector('.form.sign-up');

function signUp() {
    signupForm.addEventListener('submit', e => {
        e.preventDefault();
        const name = signupForm['signup-name'].value;
        const email = signupForm['signup-email'].value;
        const password = signupForm['signup-password'].value;
        const cpassword = signupForm['signup-cpassword'].value;

        if (password !== cpassword) {
            alert('Passwords do not match');
            return;
        }

        auth.createUserWithEmailAndPassword(email, password)
            .then(cred => {
                return db.collection('user-info').doc(cred.user.uid).set({
                    email: email,
                    type: "user"
                })
            }).then(() => {
                window.alert('You are logged in');
                window.location.href = "LandingPage/index.html";
                signupForm.reset();
            })
            .catch(err => {
                const errorMsg = err.message;
                window.alert(errorMsg);
            })
    })
}

const signinForm = document.querySelector('.form.sign-in');

function signIn() {
    signinForm.addEventListener('submit', e => {
        e.preventDefault();
        const email = signinForm['signin-email'].value;
        const password = signinForm['signin-password'].value;
        auth.signInWithEmailAndPassword(email, password)
            .then(cred => {
                window.location.href = "LandingPage/index.html";
            })
            .catch(err => {
                const errorMsg = err.message;
                window.alert(errorMsg);
            })
    })
}

signIn();
signUp();