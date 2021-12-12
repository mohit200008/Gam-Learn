const firebaseConfig = {
  apiKey: "AIzaSyCI6w4PPKKecXzYh6QHG6yaXKdSDALSqPE",
  authDomain: "gam-learn-9af98.firebaseapp.com",
  projectId: "gam-learn-9af98",
  storageBucket: "gam-learn-9af98.appspot.com",
  messagingSenderId: "517281640775",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

db.settings({ timestampsInSnapshots: true });

var scenarios = [];

const getQuestions = async () => {
  const snapshot = await db.collection("english");
  snapshot.get().then(query => {
    const tempDoc = query.docs.map(doc => doc.data())
    tempDoc.forEach(temp => {
      const obj1 = {
        questCard: {
          description: temp.questDescription,
          power: temp.questPower
        }
      }
      const obj2 = {
        playerCards: [
          {
            description: temp.playerDescription[0],
            power: temp.playerPower[0]
          }, {
            description: temp.playerDescription[1],
            power: temp.playerPower[1]
          }, {
            description: temp.playerDescription[2],
            power: temp.playerPower[2]
          }
        ]
      }
      let obj = { ...obj1, ...obj2 };
      scenarios.push(obj);
    })
  })
}

getQuestions();

// var scenarios = [
//   {
//     questCard: {
//       description: "Her thinking leans ____ democracy. ",
//       power: 4,
//     },
//     playerCards: [
//       {
//         description: "towards",
//         power: 5,
//       },
//       {
//         description: "with",
//         power: 3,
//       },
//       {
//         description: "for",
//         power: 1,
//       }
//     ]
//   },
//   {
//     questCard: {
//       description: "He got too tired _____ over work.",
//       power: 3,
//     },
//     playerCards: [
//       {
//         description: "of",
//         power: 5,
//       },
//       {
//         description: "because of",
//         power: 4,
//       },
//       {
//         description: "for",
//         power: 1,
//       }
//     ]
//   },
//   {
//     questCard: {
//       description: "_____ his principles, he has to be very careful.",
//       power: 3,
//     },
//     playerCards: [
//       {
//         description: "for",
//         power: 5,
//       },
//       {
//         description: "with regard to",
//         power: 4,
//       },
//       {
//         description: "an",
//         power: 1,
//       }
//     ]
//   },
//   {
//     questCard: {
//       description: "Building has been built _____ the new plan.",
//       power: 3,
//     },
//     playerCards: [
//       {
//         description: "in accordance with",
//         power: 4,
//       },
//       {
//         description: "for",
//         power: 2,
//       },
//       {
//         description: "an",
//         power: 1,
//       }
//     ]
//   },
//   {
//     questCard: {
//       description: "He crossed the broken bridge ____ warning.",
//       power: 2,
//     },
//     playerCards: [
//       {
//         description: "to",
//         power: 4,
//       },
//       {
//         description: "inspite of",
//         power: 3,
//       },
//       {
//         description: "the",
//         power: 1,
//       }
//     ]
//   },

//   {
//     questCard: {
//       description: "The train ____ as fast as the bus. ",
//       power: 2,
//     },
//     playerCards: [
//       {
//         description: "went",
//         power: 4,
//       },
//       {
//         description: "moves",
//         power: 3,
//       },
//       {
//         description: "gone",
//         power: 1,
//       }
//     ]
//   },

//   {
//     questCard: {
//       description: "He was seen _____ to the school.",
//       power: 2,
//     },
//     playerCards: [
//       {
//         description: "went",
//         power: 4,
//       },
//       {
//         description: "going",
//         power: 3,
//       },
//       {
//         description: "go",
//         power: 1,
//       }
//     ]
//   },
//   {
//     questCard: {
//       description: "She ____ in the sun for 1 hour.",
//       power: 3,
//     },
//     playerCards: [
//       {
//         description: "has been sitting",
//         power: 4,
//       },
//       {
//         description: "sat",
//         power: 2,
//       },
//       {
//         description: "sits",
//         power: 1,
//       }

//     ]
//   },
//   {
//     questCard: {
//       description: " ____ it help you in your studies ? ",
//       power: 2,
//     },
//     playerCards: [
//       {
//         description: "can",
//         power: 4,
//       },
//       {
//         description: "will",
//         power: 3,
//       },
//       {
//         description: "you",
//         power: 1,
//       },
//     ]
//   },
//   {
//     questCard: {
//       description: "I ____ never seen such a picture before.",
//       power: 2,
//     },
//     playerCards: [
//       {
//         description: "can",
//         power: 4,
//       },
//       {
//         description: "have",
//         power: 3,
//       },
//       {
//         description: "am",
//         power: 1,
//       }

//     ]
//   }
// ];