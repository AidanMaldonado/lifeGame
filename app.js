//DOM Vars
const main = document.querySelector('.main-body');
const body = document.querySelector('body');
const title = document.querySelector('.game-title');

//Main UI Buttons
const endTurnBtn = document.querySelector('.btn-end-turn');
const resetBtn = document.querySelector('.btn-reset');
const startCompanyBtn = document.querySelector('.btn-start-company');
const classesBtn = document.querySelector('.btn-classes');
const buyFoodBtn = document.querySelector('.btn-buy-food');

//Secondary UI Buttons and Headings
const moneyUI = document.querySelector('.money');
const dateUI = document.querySelector('.date');
const jobUI = document.querySelector('.job');
const foodUI = document.querySelector('.food');
const nameUI = document.querySelector('.name');
const garbageBtn = document.querySelector('.btn-garbage');
const waiterBtn = document.querySelector('.btn-waiter');
const officeClerkBtn = document.querySelector('.btn-officeclerk');

//Game vars
let money = 0;
let day = 1;
let pay = 0;
let food = 3;
let jobLevel = 1;

const names = ['Greg', 'Josh', 'Jimmy', 'Jamal', 'Stanley', 'Ryan'];

//Event Listeners
//On Load
window.addEventListener('load', onStart);

//Main UI Listeners
endTurnBtn.addEventListener('click', endTurn);

resetBtn.addEventListener('click', resetFunc);

startCompanyBtn.addEventListener('click', startCompany);

buyFoodBtn.addEventListener('click', buyFood);

//Job Button EventListeners
garbageBtn.addEventListener('click', jobGarbage);

waiterBtn.addEventListener('click', jobWaiter);

officeClerkBtn.addEventListener('click', jobOfficeClerk);

//Functions
function jobGarbage() {
    pay = 300;

    jobUI.textContent = 'Garbage Man';
}

function jobWaiter() {
    pay = 200;

    jobUI.textContent = 'Waiter';
}

function jobOfficeClerk() {
    pay = 400;

    jobUI.textContent = 'Office Clerk';
}

//Main UI Button Functions
function startCompany() {
    if(money < 10000) {
        showError('You do not have enough capital to start a company. You need $10000');
    } else {
        console.log('You started a company!');
    }
}

//Purchase More food
function buyFood() {
    if(money >= 20) {
        food += 1;
        money -= 20;
    } else {
        showError('You ran out of cash!');
    }

    updateUI();
}

//Update UI
function updateUI() {
    moneyUI.textContent = `$${money}`;
    dateUI.textContent = `${day}`;
    foodUI.textContent = `${food}`;

    if(money < 100) {
        moneyUI.style.color = 'red'
    } else {
        moneyUI.style.color = 'black'
    }

    if(food < 3) {
        foodUI.style.color = 'red'
    } else {
        foodUI.style.color = 'black'
    }
}

//On Start Function
function onStart() {
    let rand = Math.ceil((Math.random() * names.length) - 1);

    nameUI.textContent = names[rand];
}

//End Turn Function
function endTurn() {
    //Pay randomization for waiters tips
    if(jobUI.textContent === 'Waiter') {
        //Tip Randomizer
        tip = Math.ceil(Math.random() * 200);
        pay += tip;
    }

    if(food <= 1) {
        gameOver();
    }

    //Updating UI and values
    food -= 1;
    day += 1;
    money += pay;
    updateUI();
}

//Game Over and Resets

//Resets Game and Game Vars
function resetFunc() {
    //Resets Values
    money = 0;
    day = 1;
    pay = 0;
    food = 3;

    //Resets UI
    updateUI();
    jobUI.textContent = 'None';
}

//Game Over Function
function gameOver() {
    main.style.display = 'none';

    //Create Div
    const gameOverDiv = document.createElement('div');

    //Add Class
    gameOverDiv.className = 'container';

    //Create Heading
    const gameOverHeading = document.createElement('h1');
    gameOverHeading.textContent = 'Game over';

    //Create Button
    const continueButton = document.createElement('BUTTON');
    continueButton.className = 'btn btn-primary';
    continueButton.textContent = 'Restart Game';

    gameOverDiv.appendChild(gameOverHeading);
    gameOverDiv.appendChild(continueButton);
    body.appendChild(gameOverDiv);

    continueButton.addEventListener('click', function() {
        resetFunc();
        main.style.display = 'block';
        gameOverDiv.remove();
    });
}

//Error Functions

//Show Error Function
function showError(error) {
    //Create Div
    const errorDiv = document.createElement('div');

    //Add class
    errorDiv.className = 'alert alert-danger';

    //Create Text Node and Append to Div
    errorDiv.appendChild(document.createTextNode(error));

    //Insert Error Above Heading
    main.insertBefore(errorDiv, title);

    //Clear Error after 3 seconds
    setTimeout(clearError, 5000);
}

//Clear Error 
function clearError() {
    document.querySelector('.alert').remove();
}

//Game Notes

/* 
    Add Random Name Generator with array and function, utilize constructors
*/

