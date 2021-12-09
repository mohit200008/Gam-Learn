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
  const snapshot = await db.collection("maths");
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
//       description: "What is the average of first 150 natural numbers?",
//       power: 4,
//     },
//     playerCards: [
//       {
//         description: "75.5",
//         power: 5,
//       },
//       {
//         description: "25",
//         power: 3,
//       },
//       {
//         description: "25",
//         power: 1,
//       }
//     ]
//   },
//   {
//     questCard: {
//       description: "What is the sum of 130+125+191",
//       power: 3,
//     },
//     playerCards: [
//       {
//         description: "329",
//         power: 5,
//       },
//       {
//         description: "446",
//         power: 4,
//       },
//       {
//         description: "105",
//         power: 1,
//       }
//     ]
//   },
//   {
//     questCard: {
//       description: "If we minus 712 from 1500, how much do we get?",
//       power: 3,
//     },
//     playerCards: [
//       {
//         description: "488",
//         power: 5,
//       },
//       {
//         description: "788",
//         power: 4,
//       },
//       {
//         description: "399",
//         power: 1,
//       }
//     ]
//   },
//   {
//     questCard: {
//       description: "50 times of 8 is equal to: ",
//       power: 3,
//     },
//     playerCards: [
//       {
//         description: "400",
//         power: 4,
//       },
//       {
//         description: "288",
//         power: 2,
//       },
//       {
//         description: "3666",
//         power: 1,
//       }
//     ]
//   },
//   {
//     questCard: {
//       description: " 110 divided by 10 is:",
//       power: 2,
//     },
//     playerCards: [
//       {
//         description: "44",
//         power: 4,
//       },
//       {
//         description: "11",
//         power: 3,
//       },
//       {
//         description: "99",
//         power: 1,
//       }
//     ]
//   },

//   {
//     questCard: {
//       description: "20+(90÷2) is equal to:",
//       power: 2,
//     },
//     playerCards: [
//       {
//         description: "44",
//         power: 4,
//       },
//       {
//         description: "65",
//         power: 3,
//       },
//       {
//         description: "45",
//         power: 1,
//       }
//     ]
//   },

//   {
//     questCard: {
//       description: "The product of 82 and 5 is: ",
//       power: 2,
//     },
//     playerCards: [
//       {
//         description: "258",
//         power: 4,
//       },
//       {
//         description: "410",
//         power: 3,
//       },
//       {
//         description: "300",
//         power: 1,
//       }
//     ]
//   },
//   {
//     questCard: {
//       description: "Find the missing terms in multiple of 3: 3, 6, 9, __, 15 ",
//       power: 3,
//     },
//     playerCards: [
//       {
//         description: "12",
//         power: 4,
//       },
//       {
//         description: "15",
//         power: 2,
//       },
//       {
//         description: "55",
//         power: 1,
//       }

//     ]
//   },
//   {
//     questCard: {
//       description: "Solve 24÷8+2.",
//       power: 2,
//     },
//     playerCards: [
//       {
//         description: "8",
//         power: 4,
//       },
//       {
//         description: "5",
//         power: 3,
//       },
//       {
//         description: "12",
//         power: 1,
//       },
//     ]
//   },
//   {
//     questCard: {
//       description: "The product of 121 x 0 x 200 x 25 is",
//       power: 2,
//     },
//     playerCards: [
//       {
//         description: "4",
//         power: 4,
//       },
//       {
//         description: "0",
//         power: 3,
//       },
//       {
//         description: "1",
//         power: 1,
//       }

//     ]
//   }
// ];