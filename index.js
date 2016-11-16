// array of objects for each currency type
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

// custom function that rounds number num to decimal dec that you specify
function roundToDecimal(num,dec) {
	var rounded = (Math.round(num * Math.pow(10,dec)) / Math.pow(10,dec)).toFixed(dec);
	return rounded;
}

// custom function to hide certain elements on the page, much cleaner than using these 3 lines multiple times
function hideElements() {
	document.getElementById('dollars').style.visibility='hidden';
	document.getElementById('coins').style.visibility='hidden';
	document.getElementById('captions').style.visibility='hidden';
}

// custom function to show certain elements on the page, much cleaner than using these 3 lines multiple times
function showElements() {
	document.getElementById('dollars').style.visibility='visible';   
	document.getElementById('coins').style.visibility='visible';
	document.getElementById('captions').style.visibility='visible';
}

// initializing variables that I would like to be universal
var amountDue = 0;
var customerGiven = 0;
var changeOwedOriginally = 0;
var changeOwed = 0;

// organized all of the statements/calculations involved in actually performing the change calculation into this function
function calculateChange() {
	// initial statement printed at top that says how much change is due
	document.getElementById('changeOwed').innerHTML = 'We owe $' + changeOwed + ' in change.';

	// initialize a summary string to be added to at the end of the for loop
	var summary = '';

	// for loop iterates through currency type objects
	for (var i = 0; i < currencyArray.length ; i++) {
		// grabs currency type object
		var currentCurrency = currencyArray[i];
		
		// these 3 variables make the more complicated calculations easier to read
		var name = currentCurrency.name;
		var amount = currentCurrency.amount;
		var numOf = currentCurrency.numOf;

		// if change remaining is greater than a currency's amount, there is at least one of that type of currency needed
		if (changeOwed >= amount) {                   
			// returns the number of this currency type needed
			numOf = Math.floor(changeOwed / amount);

			// updates the change owed depending on how much change has been given out already
			changeOwed = roundToDecimal(changeOwed - numOf * amount,2);
		}

		if ( amount >= 1 && numOf > 0 ) {
			// returns the amount of the currency type needed to the HTML for bills
			document.getElementById(name).innerHTML = numOf + ' x $' + amount + ' bills = $' + numOf*amount;

			// updates summary string
			summary += '$' + numOf*amount + ' + ';
		} else if ( amount < 1 && numOf > 0 ) {
			// returns the amount of the currency type needed to the HTML for coins
			document.getElementById(name).innerHTML = numOf + ' x ' + amount*100 + '&cent; = ' + numOf*amount*100 + '&cent;';

			// updates summary string
			summary += (numOf * amount * 100) + '&cent; + ';

		// if none of that currency type used
		} else if (numOf == 0) {
			// adds 'None' to that currency type's HTML element instead
			document.getElementById(name).innerHTML = '<i>None</i>';
		}
	}

	// creates final part of summary string (cuts out extra '&cent; + ' and adds '= total change' )
	summary = summary.slice(0,summary.length-3) + ' = $' + changeOwedOriginally + '!';

	// adds summary string to HTML element
	document.getElementById('summary').innerHTML = summary;
}

// initiates the button variable
var button = document.getElementById('calculateChange');

// when button is clicked
button.onclick = function() {
	// grab the amountDue
	amountDue = document.getElementById('inputAmountDue').value;

	// grab the amount given
	customerGiven = document.getElementById('inputAmountGiven').value;

	// calculate the change owed originally so that I can reference it in the summary statement
	changeOwedOriginally = roundToDecimal( customerGiven - amountDue , 2 );

	// this is the change variable that I will update as I calculate the change
	changeOwed = changeOwedOriginally;

	if (amountDue == '' || customerGiven == '') {
		// error message for if either of the fields are blank
		document.getElementById('changeOwed').innerHTML = 'Please complete both fields above.'; 

		// custom function to hide certain page elements
		hideElements();
	} else if (isNaN(amountDue) || isNaN(customerGiven) || amountDue < 0 || customerGiven < 0) {
		// error message for if either of the fields contains a letter
		document.getElementById('changeOwed').innerHTML = 'No letters, symbols, or negative numbers in the text field por favor.';

		// custom function to hide certain page elements
		hideElements();  
	} else if (changeOwedOriginally < 0) {
		// error message for negative change values
		document.getElementById('changeOwed').innerHTML = 'The customer still owes $' + changeOwed*(-1) + '!';

		// custom function to hide certain page elements
		hideElements();
	} else if (changeOwedOriginally == 0) {
		// error message for exact change
		document.getElementById('changeOwed').innerHTML = 'The customer provided exact change!';

		// custom function to hide certain page elements
		hideElements();
	} else {
		// this function calculates the amount of each currency type needed for the change and displays it on the page
		calculateChange();

		// images are hidden initially and will show once the button is clicked
		showElements();
	}
}

// Original math/code before the for loop

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

