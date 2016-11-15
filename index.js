/*At the last minute, you've been asked to work on team developing a module for an automated check-out system of a nationally based grocery store. The app you're building will accept two inputs:

The total amount of the sale
The amount tendered by the customer.
When the user clicks on a Calculate button (you'll need a button too!), your app should calculate the amount of change due in dollars, quarters, dimes, nickels and pennies.

This should give you a visual idea of what is required. Since it is just a prototype mockup, you are free to modify the layout and styles as you see fit.*/

var num50s = 0;
var num20s = 0;
var num10s = 0;
var num5s = 0;
var num1s = 0;
var numQuarters = 0;
var numDimes = 0;
var numNickels = 0;
var numPennies = 0;


function roundToDecimal(num,dec) {        //custom function that rounds number num to decimal dec that you specify
      var rounded = (Math.round(num * Math.pow(10,dec)) / Math.pow(10,dec)).toFixed(dec);
      return rounded;
    }

function change(changeOwed) {
	num50s = Math.floor( changeOwed / 50 );
	console.log(changeOwed);
	changeOwed = changeOwed - 50*num50s;
	console.log(num50s);
	console.log(changeOwed);

	num20s = Math.floor( changeOwed / 20 );
	changeOwed = roundToDecimal(changeOwed - 20*num20s,2);

	num10s = Math.floor( changeOwed / 10 );
	changeOwed = roundToDecimal(changeOwed - 10*num10s,2);

	num5s = Math.floor( changeOwed / 5 );
	changeOwed = roundToDecimal(changeOwed - 5*num5s,2);

	num1s = Math.floor( changeOwed );
	changeOwed = roundToDecimal(changeOwed - num1s,2);

	numQuarters = Math.floor( changeOwed / .25 );
	changeOwed = roundToDecimal(changeOwed - .25*numQuarters,2);

	numDimes = Math.floor( changeOwed / .1 );
	changeOwed = roundToDecimal(changeOwed - .1*numDimes,2);

	numNickels = Math.floor( changeOwed / .05 );
	changeOwed = roundToDecimal(changeOwed - .05*numNickels,2);

	numPennies = Math.round( changeOwed / .01 );
	changeOwed = roundToDecimal(changeOwed - .01*numPennies,2);
}

var button = document.getElementById('calculateChange');

button.onclick = function() {
	var amountDue = document.getElementById('inputAmountDue').value;
	var customerGiven = document.getElementById('inputAmountGiven').value;

	var changeOwed = customerGiven - amountDue;

	change(changeOwed);

	document.getElementById('_50dollars').innerHTML = num50s + ' $50 bills';
	document.getElementById('_20dollars').innerHTML = num20s + ' $20 bills';
	document.getElementById('_10dollars').innerHTML = num10s + ' $10 bills';
	document.getElementById('_5dollars').innerHTML = num5s + ' $5 bills';
	document.getElementById('_1dollar').innerHTML = num1s + ' $1 bills';
	document.getElementById('_quarters').innerHTML = numQuarters + ' quarters';
	document.getElementById('_dimes').innerHTML = numDimes + ' dimes';
	document.getElementById('_nickels').innerHTML = numNickels + ' nickels';
	document.getElementById('_pennies').innerHTML = numPennies + ' pennies';
}









