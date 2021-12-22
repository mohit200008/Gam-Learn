const Question=document.querySelector("#Question1");
let i=2; 
function insert(){
    let clone=Question.cloneNode(true);

// Update the ID and add a class
 let s="#Question"+(i-1);
const lastQuestion=document.querySelector(s);
clone.id="Question"+i; 
i=i+1; 
// clone.id = 'elem2';
// clone.classList.add('text-large');

// // Inject it into the DOM
lastQuestion.after(clone);
}