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
  const snapshot = await db.collection("history");
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
//       description: "All India Harijan Sangha established in? ",
//       power: 4,
//     },
//     playerCards: [
//       {
//         description: "1932",
//         power: 5,
//       },
//       {
//         description: "1925",
//         power: 3,
//       },
//       {
//         description: "1825",
//         power: 1,
//       }
//     ]
//   },
//   {
//     questCard: {
//       description: "Mangal Pandey was a sepoy at?",
//       power: 3,
//     },
//     playerCards: [
//       {
//         description: "Sikh Regiment",
//         power: 5,
//       },
//       {
//         description: "34th Bengal Native Infantary",
//         power: 4,
//       },
//       {
//         description: "Royal Gorkha Rifle",
//         power: 1,
//       }
//     ]
//   },
//   {
//     questCard: {
//       description: "First battle of Panipat was fought between?",
//       power: 3,
//     },
//     playerCards: [
//       {
//         description: "Akbar and Hemu",
//         power: 5,
//       },
//       {
//         description: "Babur and Lodi",
//         power: 4,
//       },
//       {
//         description: "Akbar and Lodi",
//         power: 1,
//       }
//     ]
//   },
//   {
//     questCard: {
//       description: "Second battle of Panipat was fought between? ",
//       power: 3,
//     },
//     playerCards: [
//       {
//         description: "Akbar and Hemu",
//         power: 4,
//       },
//       {
//         description: "Mughal and British",
//         power: 2,
//       },
//       {
//         description: "Akbar and Lodi",
//         power: 1,
//       }
//     ]
//   },
//   {
//     questCard: {
//       description: " Who was the founder of Madras?",
//       power: 2,
//     },
//     playerCards: [
//       {
//         description: "Lord Dalhousie",
//         power: 4,
//       },
//       {
//         description: "Francis Day",
//         power: 3,
//       },
//       {
//         description: "Robert Clive",
//         power: 1,
//       }
//     ]
//   },

//   {
//     questCard: {
//       description: "Who is writer of Geet Govind ",
//       power: 2,
//     },
//     playerCards: [
//       {
//         description: "Ravidas",
//         power: 4,
//       },
//       {
//         description: "Jayadev",
//         power: 3,
//       },
//       {
//         description: "Kalidas",
//         power: 1,
//       }
//     ]
//   },

//   {
//     questCard: {
//       description: "Battle of Buxar was fought in?",
//       power: 2,
//     },
//     playerCards: [
//       {
//         description: "1958",
//         power: 4,
//       },
//       {
//         description: "1964",
//         power: 3,
//       },
//       {
//         description: "1900",
//         power: 1,
//       }
//     ]
//   },
//   {
//     questCard: {
//       description: "Swami Vivekananda attended the Parliament of the World's Religions in America in the year?",
//       power: 3,
//     },
//     playerCards: [
//       {
//         description: "1893",
//         power: 4,
//       },
//       {
//         description: "1815",
//         power: 2,
//       },
//       {
//         description: "1855",
//         power: 1,
//       }

//     ]
//   },
//   {
//     questCard: {
//       description: "Chandragupta was succeeded by? ",
//       power: 2,
//     },
//     playerCards: [
//       {
//         description: "Hemusara",
//         power: 4,
//       },
//       {
//         description: "Bindusara",
//         power: 3,
//       },
//       {
//         description: "Ashoka",
//         power: 1,
//       },
//     ]
//   },
//   {
//     questCard: {
//       description: "What is meaning of Mati Jnana in Jainism?",
//       power: 2,
//     },
//     playerCards: [
//       {
//         description: "Clairvoyant perception",
//         power: 4,
//       },
//       {
//         description: "Perception through activity of sense organs.",
//         power: 3,
//       },
//       {
//         description: "Telepathic knowledge",
//         power: 1,
//       }

//     ]
//   }
// ];