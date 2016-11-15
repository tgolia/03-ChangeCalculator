/*At the last minute, you've been asked to work on team developing a module for an automated check-out system of a nationally based grocery store. The app you're building will accept two inputs:

The total amount of the sale
The amount tendered by the customer.
When the user clicks on a Calculate button (you'll need a button too!), your app should calculate the amount of change due in dollars, quarters, dimes, nickels and pennies.

This should give you a visual idea of what is required. Since it is just a prototype mockup, you are free to modify the layout and styles as you see fit.*/

var currencyArray = [
	{ name : '_50dollars' , amount : 50   , numOf : 0 } ,
	{ name : '_20dollars' , amount : 20   , numOf : 0 } ,
	{ name : '_10dollars' , amount : 10   , numOf : 0 } ,
	{ name : '_5dollars'  , amount : 5    , numOf : 0 } ,
	{ name : '_1dollar'   , amount : 1    , numOf : 0 } ,
	{ name : '_50cent'    , amount : 0.50 , numOf : 0 } ,
	{ name : '_quarters'  , amount : 0.25 , numOf : 0 } ,
	{ name : '_dimes'     , amount : 0.10 , numOf : 0 } ,
	{ name : '_nickels'   , amount : 0.05 , numOf : 0 } ,
	{ name : '_pennies'   , amount : 0.01 , numOf : 0 }
]

function roundToDecimal(num,dec) {        //custom function that rounds number num to decimal dec that you specify
	var rounded = (Math.round(num * Math.pow(10,dec)) / Math.pow(10,dec)).toFixed(dec);
	return rounded;
}

function calculateChange() {

	var amountDue = document.getElementById('inputAmountDue').value;

	var customerGiven = document.getElementById('inputAmountGiven').value;

	var changeOwedOriginally = roundToDecimal( customerGiven - amountDue , 2 );

	var changeOwed = changeOwedOriginally;

	document.getElementById('changeOwed').innerHTML = 'You owe $' + changeOwed + ' in change.';

	var summary = '';

	for ( var i = 0; i < currencyArray.length ; i++ ) {

		var currentCurrency = currencyArray[i];
		var name = currentCurrency.name;
		var amount = currentCurrency.amount;
		var numOf = currentCurrency.numOf;

		if ( changeOwed >= amount ) {
			numOf = Math.floor( changeOwed / amount );
			changeOwed = roundToDecimal( changeOwed - numOf * amount , 2 );
		}

		if ( amount >= 1 && numOf > 0 ) {
			document.getElementById(name).innerHTML = numOf + ' x $' + amount + ' bills = $' + numOf*amount;
			summary += '$' + numOf*amount + ' + ';
		} else if ( amount < 1 && numOf > 0 ) {
			document.getElementById(name).innerHTML = numOf + ' x ' + amount*100 + '&cent; = ' + numOf*amount*100 + '&cent;';
			summary += (numOf*amount*100) + '&cent; + ';
		} else if ( numOf == 0 ) {
			document.getElementById(name).innerHTML = '<i>None</i>';
		}
	}
	summary = summary.slice(0,summary.length-3) + ' = $' + changeOwedOriginally + '!';
	document.getElementById('dollars').style.visibility='visible';
	document.getElementById('coins').style.visibility='visible';
	document.getElementById('summary').innerHTML = summary;
}

var button = document.getElementById('calculateChange');

button.onclick = function() {
	calculateChange();
}

/*var num50s = 0;
var num20s = 0;
var num10s = 0;
var num5s = 0;
var num1s = 0;
var numQuarters = 0;
var numDimes = 0;
var numNickels = 0;
var numPennies = 0;

	num50s = Math.floor( changeOwed / 50 );  
	changeOwed = changeOwed - 50*num50s;     
 
	num20s = Math.floor( changeOwed / 20 );                          
	changeOwed = roundToDecimal( changeOwed - (20 * num20s) , 2 );     

	num10s = Math.floor( changeOwed / 10 );
	changeOwed = roundToDecimal( changeOwed - 10 * num10s , 2 );    

	num5s = Math.floor( changeOwed / 5 );
	changeOwed = roundToDecimal( changeOwed - 5 * num5s , 2 );      

	num1s = Math.floor( changeOwed );                                  
	changeOwed = roundToDecimal( changeOwed - num1s , 2 );             

	numQuarters = Math.floor( changeOwed / .25 );                        
	changeOwed = roundToDecimal( changeOwed - .25 * numQuarters , 2 );   

	numDimes = Math.floor( changeOwed / .1 );                           
	changeOwed = roundToDecimal( changeOwed - .1 * numDimes , 2 );       

	numNickels = Math.floor( changeOwed / .05 );                         
	changeOwed = roundToDecimal( changeOwed - .05 * numNickels , 2 );    

	numPennies = Math.round( changeOwed / .01 );                         
	changeOwed = roundToDecimal( changeOwed - .01 * numPennies , 2 );    

document.getElementById('changeOwed').innerHTML = 'You owe $' + changeOwed + ' in change.';
document.getElementById('_50dollars').innerHTML = num50s + ' x $50 bills = $' + num50s*50;
document.getElementById('_20dollars').innerHTML = num20s + ' x $20 bills = $' + num20s*20;
document.getElementById('_10dollars').innerHTML = num10s + ' x $10 bills = $' + num10s*10;
document.getElementById('_5dollars').innerHTML = num5s + ' x $5 bills = $' + num5s*5;
document.getElementById('_1dollar').innerHTML = num1s + ' x $1 bills = $' + num1s;
document.getElementById('_quarters').innerHTML = numQuarters + ' quarters x 25&cent; = ' + numQuarters*25 + '&cent;';
document.getElementById('_dimes').innerHTML = numDimes + ' dimes x 10&cent; = ' + numDimes*10 + '&cent;';
document.getElementById('_nickels').innerHTML = numNickels + ' nickels x 5&cent; = ' + numNickels*5 + '&cent;';
document.getElementById('_pennies').innerHTML = numPennies + ' pennies x 1&cent; = ' + numPennies*1 + '&cent;';
document.getElementById('dollars').style.visibility='visible';
document.getElementById('coins').style.visibility='visible';
document.getElementById('summary').innerHTML = '$' + num50s*50 + ' + $' + num20s*20 + ' + $' + num10s*10 + ' + $' + num5s*5 + ' + $'
											 + num1s + ' + ' + numQuarters*25 +'&cent; + ' + numDimes*10 + '&cent; + ' + numNickels*5
											 + '&cent; + ' + numPennies*1 + '&cent; = $' + changeOwed + '!';*/







