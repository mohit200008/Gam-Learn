const links = document.querySelectorAll('.text-black');
const btns = document.querySelectorAll('.btn.btn-outline-danger');

btns.forEach((btn, index) => {
    btn.addEventListener('mouseover', () => {
        links[index].removeAttribute('href');
    })
    btn.addEventListener('mouseout', () => {
        links[0].setAttribute('href', 'Questions/physics/index.html');
    })
    btn.addEventListener('mouseout', () => {
        links[1].setAttribute('href', 'Questions/Chem/index.html');
    })
    btn.addEventListener('mouseout', () => {
        links[2].setAttribute('href', 'Questions/maths/index.html');
    })
    btn.addEventListener('mouseout', () => {
        links[3].setAttribute('href', 'Questions/english/index.html');
    })
    btn.addEventListener('mouseout', () => {
        links[4].setAttribute('href', 'Questions/history/index.html');
    })
})