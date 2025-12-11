'use strict'

const parent = document.getElementsByTagName('main')[0];
const nav = document.querySelector('nav.nav');
const btn = document.querySelector('p#next');
const work = btn.children[0];
const pros = btn.children[1];
const contact = document.querySelector('#contact');
const year = document.querySelector('#year');
const amount = document.querySelector('#amount');
const w = document.querySelector('section#w');
const p = document.querySelector('section#p');
const btnClasses = ['btn', 'btn-lg', 'btn-secondary'];

let isWork;
let isPros;

document.addEventListener('DOMContentLoaded', function() {
    parent.classList.add('show');
    work.classList.add('text');
    pros.classList.add('text');
    contact.classList.add('white');
    setYear(year, amount);
    isWork = false;
    isPros = false;
    // Select all elements that have a popover
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    
    // Initialize each one
    const popoverList = popoverTriggerList.map(function(popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
});

nav.addEventListener('click', function(e) {
    let i = e.target.textContent;
    cashValue(i);
})

work.addEventListener('click', function() {
    if(!isWork) {
        updateInfo(this, w, p);
        isWork = true;
        isPros = false;
    }
})

pros.addEventListener('click', function() {
    if(!isPros) {
        updateInfo(this, p, w);
        isPros = true;
        isWork = false;
    }
    
})

contact.addEventListener('click', function() {
    let e = 'swetlana_kuznetsova03@rambler.ru';
    cashValue(e);
})

function updateInfo(btn, self, next) {
    parent.classList.remove('show');
    self.classList.remove('open');
    next.classList.remove('open');
    work.classList.remove('text');
    pros.classList.remove('text');
    work.classList.remove('now');
    pros.classList.remove('now');
    contact.classList.remove('white');
    for(let c of btnClasses) {
            work.classList.remove(c);
            pros.classList.remove(c);
    }

    let timeId = setTimeout(function() {
        next.classList.add('hidden');
        self.classList.add('hidden');
        clearTimeout(timeId);
    }, 700);

    let id = setTimeout(function() {
        parent.classList.add('show');
        contact.classList.add('white');

        self.classList.remove('hidden');
        clearTimeout(id);
    }, 800)

    let time = setTimeout(function() {
        self.classList.add('open');
        btn.classList.add('now');
        work.classList.add('text');
        pros.classList.add('text');
        for(let c of btnClasses) {
            work.classList.add(c);
            pros.classList.add(c);
        }
        clearTimeout(time);
    }, 900)
}

function cashValue(v) {
    let value = v.trimStart().trimEnd();

    navigator.clipboard.writeText(value)
    .then(() => {
        console.log(value);
    })
    .catch(err => {
        console.log(err);
    })
}

function setYear(elem1, elem2) {
    const exprYear = 2019;

    let now = new Date();

    let y = now.getFullYear();

    let expert = y - exprYear;
    let report = 150 * expert;

    elem1.textContent = expert + '+';
    elem2.textContent = report + '+';
}