var currencyArray = [
	{ name : '_50dollars' , amount : 50   , numOf : 0 } ,   // array of objects for each currency type
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

function roundToDecimal(num,dec) {        // custom function that rounds number num to decimal dec that you specify
	var rounded = (Math.round(num * Math.pow(10,dec)) / Math.pow(10,dec)).toFixed(dec);
	return rounded;
}

function hideElements() {
	document.getElementById('dollars').style.visibility='hidden';   // custom function to hide certain elements on the page
	document.getElementById('coins').style.visibility='hidden';     // much cleaner than using these 3 lines multiple times
	document.getElementById('captions').style.visibility='hidden';
}

function showElements() {
	document.getElementById('dollars').style.visibility='visible';   // custom function to show certain elements on the page
	document.getElementById('coins').style.visibility='visible';     // much cleaner than using these 3 lines multiple times
	document.getElementById('captions').style.visibility='visible';
}

var amountDue = 0;                       // initializing variables that I would like to be universal
var customerGiven = 0;
var changeOwedOriginally = 0;
var changeOwed = 0;

function calculateChange() {  // organized all of the statements/calculations involved in actually performing the change calculation into this function

	document.getElementById('changeOwed').innerHTML = 'We owe $' + changeOwed + ' in change.'; // initial statement printed at top that says how much change is due

	var summary = '';    // initialize a summary string to be added to at the end of the for loop

	for ( var i = 0; i < currencyArray.length ; i++ ) {   // for loop iterates through currency type objects

		var currentCurrency = currencyArray[i];          // grabs currency type object
		var name = currentCurrency.name;
		var amount = currentCurrency.amount;            // these 3 variables make the more complicated calculations easier to read
		var numOf = currentCurrency.numOf;

		if ( changeOwed >= amount ) {                   // if change remaining is greater than a currency's amount, there is at least one of that type of currency needed
			numOf = Math.floor( changeOwed / amount );  // returns the number of this currency type needed
			changeOwed = roundToDecimal( changeOwed - numOf * amount , 2 );     // updates the change owed depending on how much change has been given out already
		}

		if ( amount >= 1 && numOf > 0 ) {        // returns the amount of the currency type needed to the HTML for bills
			document.getElementById(name).innerHTML = numOf + ' x $' + amount + ' bills = $' + numOf*amount;
			summary += '$' + numOf*amount + ' + ';  // updates summary string
		} else if ( amount < 1 && numOf > 0 ) {   // returns the amount of the currency type needed to the HTML for coins
			document.getElementById(name).innerHTML = numOf + ' x ' + amount*100 + '&cent; = ' + numOf*amount*100 + '&cent;';
			summary += (numOf*amount*100) + '&cent; + ';   // updates summary string
		} else if ( numOf == 0 ) {   // if none of that currency type used
			document.getElementById(name).innerHTML = '<i>None</i>';   // adds 'None' to that currency type's HTML element instead
		}
	}
	summary = summary.slice(0,summary.length-3) + ' = $' + changeOwedOriginally + '!';  // creates final part of summary string (cuts out extra '&cent; + ' and adds '= total change' )
	document.getElementById('summary').innerHTML = summary; // adds summary string to HTML element
}

var button = document.getElementById('calculateChange');      // initiates the button variable

button.onclick = function() {                   // when button is clicked
	amountDue = document.getElementById('inputAmountDue').value;     // grab the amountDue
	customerGiven = document.getElementById('inputAmountGiven').value;  // grab the amount given
	changeOwedOriginally = roundToDecimal( customerGiven - amountDue , 2 ); // calculate the change owed originally so that I can reference it in the summary statement
	changeOwed = changeOwedOriginally; // this is the change variable that I will update as I calculate the change

	if ( amountDue == '' || customerGiven == '' ) {  // error message for if either of the fields are blank
		document.getElementById('changeOwed').innerHTML = 'Please complete both fields above.'; 
		hideElements(); // custom function to hide certain page elements
	} else if ( isNaN(amountDue) || isNaN(customerGiven) ) {    // error message for if either of the fields contains a letter
		document.getElementById('changeOwed').innerHTML = 'No letters or symbols in the text field por favor.';
		hideElements();  // custom function to hide certain page elements
	} else {
		calculateChange();  // this function calculates the amount of each currency type needed for the change and displays it on the page
		showElements();  // images are hidden initially and will show once the button is clicked
	}
}

/*var num50s = 0;         
var num20s = 0;
var num10s = 0;                    Here is my original math before the for loop
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

