var runningTotalVar = 0, selectedDough, previousDoughAndSize, previousDoughPickIndex = false;
var pizzaSizes = {
    handTossed: {
        "Small ($9.99)": 9.99,
        "Medium ($12.99)": 12.99,
        "Large (14.99)": 14.99
    },
    thinCrust: {
        "Medium ($11.99)": 11.99,
        "Large (13.99)": 13.99
    },
    newYorkStyle: {
        "Large (16.99)": 16.99,
        "Extra-Large (19.99)": 19.99
    },
    glutenFree: {
        "Small ($10.99)": 10.99
    }
}

function runningTotal() {
    // runningTotalVar = ; HAVE TO ADD THE OTHER TOTALS HERE
    var sizePrice = Number(priceOfSize());
    var cheesePrice = Number(priceOfCheese());
    var saucePrice = Number(priceOfSauce());
    var toppingsPrice = Number(priceOfToppings());
    runningTotalVar = Number(sizePrice) + Number(cheesePrice) + Number(saucePrice) + Number(toppingsPrice);
    document.getElementById("runningTotal").innerHTML = "$" + runningTotalVar.toFixed(2);
}

function priceOfSize() {
    var sizePrice = 0;
    if (previousDoughAndSize != undefined) {
        var placeholder = document.getElementById("size").options;
            for (var i = 0; i < placeholder.length; i++) {
                if (placeholder[i].selected == true) {
                    sizePrice = placeholder[i].value;
                }
            }

        // document.getElementById(previousDoughAndSize).options[1].selected


    }    
    return sizePrice;
}

function priceOfCheese() {
    var cheesePrice = 0, placeholder;
    placeholder = document.getElementById("cheese");
    for (var i = 0; i < placeholder.length; i++) {
        if (document.getElementById("cheese")[i].selected) {
            cheesePrice = document.getElementById("cheese")[i].value;
        }
    }
    return cheesePrice;
}

function priceOfSauce() {
    var saucePrice = 0, placeholder;
    placeholder = document.getElementById("sauce");
    for (var i = 0; i < placeholder.length; i++) {
        if (document.getElementById("sauce")[i].selected) {
            saucePrice = document.getElementById("sauce")[i].value;
        }
    }
    return saucePrice;
}

function priceOfToppings() {
    var toppingsPrice = 0, placeholder, counter = 0;
    placeholder = document.getElementsByName("additionalToppings");
    for (var i = 0; i < placeholder.length; i++) {
        if (placeholder[i].checked) {
            counter += 1;
        }
    }
    toppingsPrice = Number(0.99 * counter);
    return toppingsPrice;
}

// function whichDoughPicked () {
//     //Get the list of possible dough options
//     var allOptions = document.getElementsByName("doughPick");
//     //Loop through and see which one is checked
//     for (var i = 0; i < allOptions.length; i++) {
//         selectedDough = allOptions[i].value;
//         var placeholder = selectedDough.concat("Size");
//         if (allOptions[i].checked == true) {
//             console.log(placeholder);
//             document.getElementById("finishBuildingPizzaContainer").classList.remove("hidden");
//             document.getElementById(placeholder).parentElement.parentElement.classList.remove("hidden");
//             document.getElementById("cheeseOptionsContainer").classList.remove("hidden");
//             document.getElementById("sauceOptionsContainer").classList.remove("hidden");
//             document.getElementById("additionalToppingsContainer").classList.remove("hidden");

//             //The seeThrough class is supposed to allow for css transitions. Changing from display: hidden; doesn't do transitions
//             document.getElementById(placeholder).parentElement.parentElement.classList.remove("seeThrough");
//             document.getElementById("cheeseOptionsContainer").classList.remove("seeThrough");
//             document.getElementById("sauceOptionsContainer").classList.remove("seeThrough");
//             document.getElementById("additionalToppingsContainer").classList.remove("seeThrough");

//             //
//             previousDoughPickIndex = i;
//             previousDoughAndSize = placeholder;
//         } else {
//             document.getElementById(placeholder).parentElement.parentElement.classList.add("hidden");
//         }
//     }
//     console.log(selectedDough);
//     runningTotal();
// }

function whichDoughPicked (e) {
    //e.srcElement.name === "doughPick"
    console.log(e.srcElement.name == "doughPick");
    //Get the list of possible dough options
    var allOptions = document.getElementsByName("doughPick");
    var sizeOptions = document.getElementById("size").options;
    

    //If you change the dough pick, the sizes change. First get sizes for intitial pick, then get for changing dough picks.
    if (e.srcElement.name === "doughPick") {
        //Initial Pick Handler
        if (allOptions[previousDoughPickIndex] === undefined) {
            //Loop through and see which one is checked
            for (var i = 0; i < allOptions.length; i++) {
                //Placeholder for which dough is currently selected in the for loop
                selectedDough = allOptions[i].value;
                var placeholder = selectedDough.concat("Size");
                if (allOptions[i].checked == true) {
                    var addOptions = Object.entries(pizzaSizes[selectedDough]);
                        for (var k = 0; k < addOptions.length; k++) {
                            sizeOptions[k] = new Option(addOptions[k][0], addOptions[k][1]);
                        }
                } else {
                    // document.getElementById(placeholder).parentElement.parentElement.classList.add("hidden");
                }
            }
        //if it's not undefined above, then previousDoughPickIndex will be set, and if it's still true then we'll keep it there, otherwise we'll wipe the options and insert the applicable options
        } else if (!allOptions[previousDoughPickIndex].checked) {
            //Loop through and see which one is checked
            for (var j = 0; j < sizeOptions.length; j++) {
                sizeOptions[j].remove();
            }
            for (var i = 0; i < allOptions.length; i++) {
                //Placeholder for which dough is currently selected in the for loop
                selectedDough = allOptions[i].value;
                var placeholder = selectedDough.concat("Size");
                if (allOptions[i].checked == true) {
                    var addOptions = Object.entries(pizzaSizes[selectedDough]);
                        for (var k = 0; k < addOptions.length; k++) {
                            sizeOptions[k] = new Option(addOptions[k][0], addOptions[k][1]);
                        }
                    }
                }
        }
    }
    //Loop through and see which one is checked
    for (var i = 0; i < allOptions.length; i++) {
        //Placeholder for which dough is currently selected in the for loop
        selectedDough = allOptions[i].value;

        var placeholder = selectedDough.concat("Size");
        if (allOptions[i].checked == true) {
            
            
            
            // console.log(placeholder);
            document.getElementById("finishBuildingPizzaContainer").classList.remove("hidden");
            document.getElementById("size").parentElement.parentElement.classList.remove("hidden");
            document.getElementById("cheeseOptionsContainer").classList.remove("hidden");
            document.getElementById("sauceOptionsContainer").classList.remove("hidden");
            document.getElementById("additionalToppingsContainer").classList.remove("hidden");

            //The seeThrough class is supposed to allow for css transitions. Changing from display: hidden; doesn't do transitions
            document.getElementById("size").parentElement.parentElement.classList.remove("seeThrough");
            document.getElementById("cheeseOptionsContainer").classList.remove("seeThrough");
            document.getElementById("sauceOptionsContainer").classList.remove("seeThrough");
            document.getElementById("additionalToppingsContainer").classList.remove("seeThrough");

            //
            previousDoughPickIndex = i;
            previousDoughAndSize = placeholder;
        } else {
            // document.getElementById(placeholder).parentElement.parentElement.classList.add("hidden");
        }
    }
    runningTotal();
}

window.document.getElementById("doughRadioButtons").addEventListener("click", 
    function (e) {
        if (previousDoughPickIndex !== false && e.srcElement.id !== "") {
            var confirmChange = window.confirm("Are you sure you want to change your Dough Selection?\rSize options and prices change depending on the dough so you may need to select the size again.");
            if (confirmChange == true) {
                whichDoughPicked(e);
            }
            else if (confirmChange == false) {
                document.getElementsByName("doughPick")[previousDoughPickIndex].checked = true;
            }
        } else {
            whichDoughPicked(e);
        }
    }
);

window.addEventListener("load", function() {
    //address type listener
    document.getElementById("addressType").addEventListener("change", function() {
        //hardcoded the other option in, will have to change this if the html for address type changes
        if (document.getElementById("addressType")[6].selected) {
            document.getElementById("otherAddressTypeContainer").classList.remove("hidden"); 
        } else {
            document.getElementById("otherAddressTypeContainer").classList.add("hidden");
        }
    })
    
    // select all elements of pizza selection from DOM and add event listeners so that price can be added up
    var whatToCalculate = document.getElementsByClassName("calculate");
    for (var i = 0; i < whatToCalculate.length; i++) {
        whatToCalculate[i].addEventListener("change",
        function(e) {
            console.log(e.srcElement);
            whichDoughPicked(e);
        }
        )
    }

    // handle delivery form errors or continue to pizza selection
    document.getElementById("continueToPizzaSelection").addEventListener("click", function() {
        //The error message will have a list of issues. If there's no list items it'll get hidden
        var errorMessage = "<h1>Error!</h1><p>Please fix the following issues so we can deliver your pizza!</p><ul>";
        //name field is weird because it can error for being blank or for having invalid characters
        if (document.getElementById("name").value === "") {
            errorMessage += "<li>Name Field Not Filled In</li>";
            document.getElementById("name").classList.add("errorInput");
        } else {
            document.getElementById("name").classList.remove("errorInput");
        }
        if (document.getElementById("name").value.match(/[^A-Z^a-z\s]/) !== null) {
            errorMessage += "<li>Name field has an invalid character. Only letters are allowed</li>";
            document.getElementById("name").classList.add("errorInput");
        } else if (document.getElementById("name").value !== "") {
            document.getElementById("name").classList.remove("errorInput");
        }
        //street address 
        if (document.getElementById("streetAddress").value === "") {
            errorMessage += "<li>Street Address Not Filled In</li>";
            document.getElementById("streetAddress").classList.add("errorInput");
        } else {
            document.getElementById("streetAddress").classList.remove("errorInput");
        }
        //other address type only needs validated if it's chosen
        if (document.getElementById("otherAddressType").value === ""  && document.getElementById("addressType").value === "Other") {
            errorMessage += "<li>Other Address Type must be filled in </li>";
            document.getElementById("otherAddressType").classList.add("errorInput");
        } else {
            document.getElementById("otherAddressType").classList.remove("errorInput");
        }
        //city
        if (document.getElementById("city").value === "") {
            errorMessage += "<li>City Not Filled In</li>";
            document.getElementById("city").classList.add("errorInput");
        } else {
            document.getElementById("city").classList.remove("errorInput");
        }
        //state must have exactly two letters
        if (document.getElementById("state").value === "") {
            errorMessage += "<li>State Not Filled In</li>";
            document.getElementById("state").classList.add("errorInput");
        } else if (document.getElementById("state").value.match(/[^A-Z^a-z]/) !== null && document.getElementById("state").value.length !== 2) {
            errorMessage += "<li>State Field Has An Invalid Non-Letter Character</li><li>State Field Must Have Exactly Two Letters</li>";
            document.getElementById("state").classList.add("errorInput");
        } else if (document.getElementById("state").value.match(/[^A-Z^a-z]/) !== null) {
            errorMessage += "<li>State Field Has An Invalid Non-Letter Character</li>";
            document.getElementById("state").classList.add("errorInput");
        } else if (document.getElementById("state").value.length !== 2) {
            errorMessage += "<li>State Field Must Be Exactly Two Letters</li>";
            document.getElementById("state").classList.add("errorInput");
        } else {
            document.getElementById("state").classList.remove("errorInput");
        }
        //zip code, went with one error code for both problems of length and invalid characters
        if (document.getElementById("zip").value === "") {
            errorMessage += "<li>Zip Code Not Filled In</li>";
            document.getElementById("zip").classList.add("errorInput");
        } else if (document.getElementById("zip").value.match(/[^0-9]/) || document.getElementById("zip").value.length !== 5) {
            errorMessage += "<li>Zip Code Must Be Exactly Five Numbers</li>";
            document.getElementById("zip").classList.add("errorInput");
        } else {
            document.getElementById("zip").classList.remove("errorInput");
        }
        //phone number, it's easiest to just make it 10 digits without () or -
        if (document.getElementById("phoneNumber").value === "") {
            errorMessage += "<li>Phone Number Not Filled In</li>";
            document.getElementById("phoneNumber").classList.add("errorInput");
        } else if (document.getElementById("phoneNumber").value.match(/[^0-9]/) || document.getElementById("phoneNumber").value.length !== 10) {
            errorMessage += "<li>Phone Number Must Be Exactly 10 Numbers</li>";
            document.getElementById("phoneNumber").classList.add("errorInput");
        } else {
            document.getElementById("phoneNumber").classList.remove("errorInput");
        }
        //email - used the internet for a regex validator for email. Credit to https://tylermcginnis.com/validate-email-address-javascript/
        var emailPlaceholder = document.getElementById("email").value;
        function emailIsValid (email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        }
        if (document.getElementById("email").value === "") {
            errorMessage += "<li>Email Not Filled In</li>";
            document.getElementById("email").classList.add("errorInput");
        } else if (emailIsValid(emailPlaceholder) !== true) {
            errorMessage += "<li>Email Is Invalid</li>";
            document.getElementById("email").classList.add("errorInput");
        } else {
            document.getElementById("email").classList.remove("errorInput");
        }

        errorMessage += "</ul>"
        document.getElementById("errorContainer").innerHTML = errorMessage;
        document.getElementById("errorContainer").classList.remove("hidden");
        
        //if it's passed all the validation steps, confirm to move on then move on
        if (errorMessage.indexOf("<li>") === -1) {
            document.getElementById("errorContainer").classList.add("hidden");
            if (window.confirm("Are you sure you want to move on?\rIf you want to change any of your information later you will have to restart the order proccess.")) {
                document.getElementById("deliveryForm").classList.add("hidden");
                document.getElementById("pizzaForm").classList.remove("hidden");
                document.getElementById("runningTotalContainer").classList.remove("hidden");
            }
        }
    })



})

function luhnValidator(cardNumber) {
    var placeholder, addUp = 0;
    cardNumber = cardNumber.toString().split("");
	for (var i = 0; i < cardNumber.length; i++) {
			if (i % 2 === 0 && cardNumber[i] < 5) {
			    addUp += (Number(cardNumber[i]) * 2);
            } else if (i % 2 === 0) {
                placeholder = (Number(cardNumber[i]) * 2).toString().split("");
                addUp += Number(placeholder[0]) + Number(placeholder[1]);
            } else if (i % 2 !== 0) {
                addUp += (Number(cardNumber[i]));
            }
    }
    if (addUp % 10 === 0) {
        return true;
    } else {
        return false;
    }
}