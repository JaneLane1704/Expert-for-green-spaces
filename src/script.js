'use strict'

import h from './home.js';
import w from './work.js';
import p from './pros.js';

document.addEventListener('DOMContentLoaded', function() {
    // Select all elements that have a popover
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    
    // Initialize each one
    const popoverList = popoverTriggerList.map(function(popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
});

const mdls = {
    home: h,
    work: w,
    pros: p,
}

const ids = ['home', 'work', 'pros'];

const parent = document.getElementsByTagName('main')[0];
const nav = document.querySelector('nav.nav');
const btn = document.querySelector('p#next');
const btnLink = btn.children[0];
const contact = document.querySelector('#contact')


const prg = document.querySelector('p#about');
const mainTitle = document.querySelector('h1');
const children = nav.children;

let count = 0;

updateInfo(ids[count]);
count++;

nav.addEventListener('click', function(e) {
    let i = e.target.id;
    if(i === 'mail' || i === 'tel') {
        cashValue(e.target.textContent)
    } else {
        updateInfo(i);
    }
})

btn.addEventListener('click', function() {
    if(count === ids.length) {
        count = 0;
    }
    updateInfo(ids[count]);
    count++;
})

contact.addEventListener('click', function() {
    let e = 'swetlana_kuznetsova03@rambler.ru';
    cashValue(e);
})

function updateInfo(id, mainElem = prg) {

    parent.classList.remove('show');

    btnLink.classList.remove('text');

    let info = mdls[id];

    for(let child of children) {
        if(child.id === id) {
            child.classList.add('active');
        } else {
             child.classList.remove('active');
        }  
    }
        
    let timeId = setTimeout(function() {

        mainTitle.textContent = info['h1'];

        if(!info['list']) {
            mainElem.textContent = info['about'];
        } else {
            let list = document.createElement('ul');

            for(let i of info['about']) {
            let li = document.createElement('li');

            if(id === 'pros') {
                li.innerHTML = i;
            } else {
                 li.textContent = i;
            }

            list.appendChild(li);
        }

            mainElem.textContent = '';
            mainElem.appendChild(list);
        }

        btnLink.textContent = info['next'];

        parent.classList.add('show');

        btnLink.classList.add('text');

        clearTimeout(timeId);

    }, 1700);
}

function cashValue(v) {
    let value = v.trimStart().trimEnd();

        navigator.clipboard.writeText(value)
        .then(() => {
            console.log(value)
        })
        .catch(err => {
            console.log(err)
        })
}