'use strict';

// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

// from lecture 153
const calcDisplayBalance = function (account) {
  const balance = account.movements.reduce((acc, mov) => acc + mov, 0);
  account.balance = balance;
  labelBalance.textContent = `${account.balance} EUR`;
};

// from lecture 158
const UpdateUI = function (account) {
  //Display movements
  displayMovements(account.movements);
  //Display balance
  calcDisplayBalance(account);
  // Display summary
  calcDisplaySummary(account);
};
// calcDisplayBalance(account1.movements);

//////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

////////////////////////////////////////////////////////////////////////

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~164(More ways of filling arrays)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/*
const x = new Array(7);
console.log(x);
x.fill(1, 0, 7); // So here first one is elements that you want to insert
// second element is at which place you want to insert and third element is
console.log(x);
//  i can change also that
x.fill(23, 3, 4);
console.log(x);

let y = Array.from({ length: 7 }, () => 1); // So here this type i can make this array
// Here the callBack function is equal as function in map function
console.log(y);

let a = Array.from({ length: 9 }, (_, index) => index + 1); // _ means i do not want to use that position element
console.log(a);

// aaaaaaaaaaaaaa an example of getting array of code by use of this
labelBalance.addEventListener('click', function () {
  const movementUI = Array.from(document.querySelectorAll('.movements__value'));

  console.log(movementUI);
});
*/

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~163( SORTING ARRAY)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/*
// Here by default sort method are there and it will sort array in permanant way
const owners = ['darshil', 'om', 'aayush', 'parth', 'happy'];
console.log(owners);
console.log(owners.sort()); // so now it will change the array so now after this it will look like this one
console.log(owners);

console.log(movements);
console.log(movements.sort()); //i can give callback function also hete

// return < 0 , a ,b  (keep order)
// Return > 0 ,b,a    (switch order)
movements.sort((a, b) => {
  // acending order
  // if (a > b) return 1;
  // if (b > a) return -1;
  
   // descending order
  //  if (a > b) return -1;
  //  if (b > a) return 1;

   // acending order easy way
   return a - b;
   // decending order easy way
  //  return b-a;
});
console.log(movements);
*/
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~162( FLAT AND FALTMAP)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/*
const arr = [[1,2,3] , [4,5,6] ,7, 8,9]; // Nested Array but not deeper level
console.log(arr.flat());  // So here Flat Method will does all Nested array into flat array that's it!!!

const arrDeep = [[[1, 2], 3], [4,[ 5, 6]], 7, 8, 9];  // Deeper Nested array
console.log(arrDeep.flat()); // So here as result show me i can not flap the nested nested array
// so Basically if there are no any instruction than it will go till first level so now
console.log(arrDeep.flat(2));    // So like wise i can do for multiple layers as i want

// SO NOw Releted to bank prob now bank wanna know overall balance than????
// here use of FLAT Method
const overAllBalance = accounts
  .map(acc => acc.movements)
  .flat()  .reduce((acc, mov) => acc + mov, 0); 
  console.log(overAllBalance);

//  so Basically FLATMAP method is combination of FLAT() And MAP() Methods
const overAllBalance2 = accounts
  .flatMap(acc => acc.movements)    // Here One Drawback is flatmap() method is go only one level deeper if wanted to go more level deeper than go with flat() 
  .reduce((acc, mov) => acc + mov, 0);
console.log(overAllBalance2);
*/

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~161( SOME AND EVERY )~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/*
//~~~~~~~~~~~~~SomeMethod
console.log(movements.includes(-130));
// So basically i wanna know that if there are any movement in array list than how that can be .....
console.log(movements.some(mov => mov === -130));

const anyDeposits = movements.some(mov => mov >  0);
console.log(anyDeposits);
// Here basic difference between .include() and some() method is include() i need equality and in some() i can give condition

//~~~~~~~~~
~~ Every Method
// So here There are basic difference between some() and Every() method and diff is
//  here in some() if one element fulfill the given condition than also it works but in the Every Method here each and every element should fulfill given condition
console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

// Seperate callBack
console.log(`~~~~~~~~~call Back IDEA`);
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));
*/
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);
  // inputLoanAmount
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add Amount
    currentAccount.movements.push(Number(amount));

    //update UI
    UpdateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~160(THE FIND-INDEX METHOD)~~~~~~~~~~~~~~~
// so basically it's cosine of FIND() Method and here name suggest it will find out the index of the given ....
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  //  console.log(`Delete`);
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);

    // For deleting account
    accounts.splice(index, 1); // IT Will delete that perticular account
    // Hide UI after deleting the ccounts
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~159(Implementing Transfers)~~~~~~~~~~~~~~~~~~~~
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault(); // prevent
  const amount = inputTransferAmount.value;
  const receiverAccount = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  console.log(amount, receiverAccount);

  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    receiverAccount?.username !== currentAccount.username &&
    receiverAccount
  ) {
    // Doing Transfers
    currentAccount.movements.push(Number(-amount));
    receiverAccount.movements.push(Number(amount));
    // Update UI
    UpdateUI(currentAccount);
  }
});
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~158(Implementing login)~~~~~~~~~~~~~~~~~~~~
//Event Handler
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  // As name Suggest here prevent form from submitting
  e.preventDefault();
  // console.log('LOGIN');
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Display UI AND welcome Message
    labelWelcome.textContent = `Welcome back , ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    //clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    UpdateUI(currentAccount);
  }
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~157(The Find Method)~~~~~~~~~~~~~~~~~~~~
/*
const firstWithdrawal = movements.find(mov => mov < 0); 
// So Basically it will find out the first element in the list which will fulfill the given condition 
console.log(movements);
console.log(firstWithdrawal);
console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);
*/
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~156(Coding challenge #3)~~~~~~~~~~~~~~~~~~~~

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~155(Magic of chaining Methods (include map , filter , reduce))~~~~~~~~~~~~~~~~~~~~

/*
const curToUsd = 1.1;

// it's like a PipeLine  (in COA as i show pipeline ................ )
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * curToUsd)
  .reduce((acc, mov) => acc + mov, 0);
  console.log(totalDepositsUSD);
*/
const calcDisplaySummary = function (account) {
  const incomes = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = account.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .filter((int, i, arr) => {
      // it's one filter for reduction in interest if i want than do that otherwise contine
      console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};
// calcDisplaySummary(account1.movements);

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~154 (coding challange#2)~~~~~~~~~~~~~~~~~~~~

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~153(Reduce Method)~~~~~~~~~~~~~~~~~~~~

/*
const balance = movements.reduce(function (acc,mov
  // so basically in others like map ,  Filter method and FOREach method first parameter is generally value afterthat index and third one is array itself or may be others
  // but in reduce method first parameter is must be an accumulator and after that ohters are same as map,filter and FOREach method.....
) {
  return acc + mov;
}, 0); //  here in reduce method i should pass accumulator initial value so here zero if not than by default accum value is zero
console.log(balance);

// finding Max num via use of the accumulator
// So generally by reducce method i can do that so here accumulator policy is like to store max num return that so according to my usage i can shape the acc as i want

*/

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~152(the Filter Method)~~~~~~~~~~~~~~~~~~~~

/*
const deposit = movements.filter(function(mov) // filter is also return array i do not need to pass array for any thing
{
  return mov > 0 ;
});
console.log(movements);
console.log("`````after filter Method apply``````");
console.log(deposit);

// using for of loop
const depositUsingFforEach = [];
for(const mov of movements)
{
  if(mov > 0)
  depositUsingFforEach.push(mov);
}
console.log(depositUsingFforEach);

// same array ii can make withdraws array via use of filter........
*/

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~151(Computing Username)~~~~~~~~~~~~

const createUserName = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(word => word[0])
      .join(''); // split method returns array
    console.log(acc.username);
  });
};
createUserName(accounts); //stw
// console.log(accounts);

//~~~~~~~~~~~~~~~~~~~~~~~~~~150 (MAP METHOd)~~~~~~~~~~~~
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const usdTORupee = 83;

// const conversion = movements.map(function (mov) // map method return new array so need to declarea new array and so crazy stuff!!1
// {
//   return mov * usdTORupee;
// });

// By Arrow Functions
const conversion = movements.map(mov => mov * usdTORupee);
console.log(movements);
console.log(conversion);


const movementDescription = movements.map(
  (mov, index) =>
    `Movement ${index + 1} : you ${
      mov > 0 ? 'deposited' : 'withdrawn'
    } ${Math.abs(mov)}`
);
console.log(`~~~~~~~~~~~~~~~~Movement Description~~~~~~~~~~~~~~~~`);
console.log(movementDescription);
// main diff btn forEach and map is ForEach is create a side effect but map does not


// BY FOr OF LOOP
const conversionByForOfLoop = [];
for (const mov of movements) {
  let convertingProcess = mov * usdTORupee;
  conversionByForOfLoop.push(convertingProcess);
}
console.log(`~~~~~~~~~~~~By FOR OF LOOP~~~~~~~~~~~~`);
console.log(conversionByForOfLoop);

// BY For EACh LOOP
const conversionByForOfLoop1 = [];
movements.forEach(function (mov) {
  let convertingProcess = mov * usdTORupee;
  conversionByForOfLoop1.push(convertingProcess);
});
console.log(`~~~~~~~~By FOREACH LOOP~~~~~~~~~~~~`);

console.log(conversionByForOfLoop1);
*/

//~~~~~~~~~~~~~~~~~~~~~~~~~~149 (data Transformation :MAP , FILTER , REDUCE)~~~~
//  Explanation of some methodss are in the given section : MAP ,FILTER ,REDUCE

//  Generally Map is doing one type of coating on available arrays data and represent
// a newarray

// Filter is one type of restriction which will also give us an new array but
// some elements will be there which is fullfill condition

// Reduce is like one accumulatot and store the each element value in this and represent this single element

//~~~~~~~~~~~~~~~~~~~~~~~~~~148( COding Challenge #1)~~~~~~~~~~~~~~~~~~~~~~~~~

/*
const checkDogs = function (dogsJulia, dogsKate) {
  const dogsJuliaCorrected = dogsJulia.slice();
  dogsJuliaCorrected.splice(0, 1);
  dogsJuliaCorrected.splice(-2);
  // dogsJulia.slice(1, 3);
   const dogs = dogsJuliaCorrected.concat(dogsKate);
  console.log(dogs);

  dogs.forEach(function (dog, i) {
    if (dog >= 3) {
      console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`);
    } else {
      console.log(`Dog number ${i + 1} is still a puppy 🐶`);
    }
  });
};
// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

*/

//~~~~~~~~~~~~~~~~~~~~~~~~~~147 ( Creating DOM element)~~~~~~~~~~~~~~~~~~~~~~~~~
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = ``; // look like textContainer

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `<div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
         <!-- <div class="movements__date">3 days ago</div>  -->
          <div class="movements__value">${mov}€</div>
        </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html); // 4 option => beforebegin , afterbegin , beforeend , afterend
  });
};

// displayMovements(account1.movements);

//~~~~~~~~~~~~~~~~~~~~~~~~~~146 Intro of the bankList project~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~145 FOREACH WITH MAPS AND SETS ~~~~~~~

/*
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// i can call foreach on map also
currencies.forEach(function(value , key , map) 
{
    console.log(`${key}: ${value}`);    
});


const currenciesUnique = new Set(['USD' , 'GBP', 'USD' , 'EUR' , 'EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach(function(value , key , set)  // we can write it like this also for set ~~~~functio(value , _ , set)
{
      console.log(`${key}: ${value}`);   
      //       console.log(`${value}: ${value}`);   // avoid confusion of set or other method is see at signature of function  


});

// so Basically here in set their are not any key and value type somthing here key == vaues right!! but here if i remove
// key than thats not make any difference between set and array signature so make signature diff here keep key element

*/

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~144  Looping Arrays ~~~~~~~~~~~~~~~~~~~~~~~~~~~
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for(const movement of movements)
// so now if i want to show array elements with its index and valuse soo i write it like
for (const [i , movement] of movements.entries())
{
    if(movement > 0 )
    {
      console.log(`YOU Deposited ${movement}`);
    }
    else
    {
      console.log(`you Withdraw ${Math.abs(movement)}`);
    }
}
console.log(`~~~~~~~~~~~~~~~~~~ForEcah`);

// For each 
// SO basically forEach method require a return funtion by itself i can  not influce 
// anything generally , when exactly function will call by loop , loop over the array 
// and for iteration it will use the function
// so here it use fun for each iteration so here function need arguments
// so array elements will be passed through arguments for each time 
movements.forEach(function(movement , index , array) 
// so generally now i want too show data with its index so that can e done only by passing it into fnction
{
    if (movement > 0) {
      console.log(`YOU Deposited ${movement}`);
    } else {
      console.log(`you Withdraw ${Math.abs(movement)}`);
    }
});

// /////////// one diff btw foreach and for of loop is 
// "continue" & " break " is not work in" for of "" loop 
// buut it work in foreach loop 

*/

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~143 THE NEW AT METHOD --------------------------------
/* const arr = [12, 13,14,25];

console.log(arr[0]);

console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]);
console.log(arr.at(-1));
console.log(arr.at(0));
// it is useful in string also 
const str = "darshil"
console.log(str.at(0));
console.log(str.at(-1));
*/
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~142 Simple Array Methods --------------------------------
/*
let arr = ['a' , 'b' , 'c' , 'd' , 'e'];
console.log(arr);
console.log(...arr);

// slice methods
console.log(arr.slice(2));
console.log(arr.slice(3,5));
console.log(arr.slice(-2));
console.log(arr.slice(1, -2 ));
console.log(arr.slice(2)[0]); // it will represent arrayform
// So basically so slice(2) is array part of arr from 2 to .. so slice(2)[0]means selction of element fomr slice(2)'s array 's element Zero



// SPLICE
arr.splice(-1);
console.log(arr);
let arr1 = ['a', 'b', 'c', 'd', 'e'];
arr1.splice(-1);
console.log(arr1);
arr1.splice(2 ,2);
console.log(arr1);

//Reverse
let arr3 = ['a', 'b', 'c', 'd', 'e'];

let arr2 = ['j','i','h','g','f' , 'e'];
arr2.reverse();
console.log(arr2);

//Concat

let letters = arr3.concat(arr2);
let letters1 = [ ...arr3 , ...arr2 ];
console.log(letters1);

// join

console.log(letters.join('-'));

*/
