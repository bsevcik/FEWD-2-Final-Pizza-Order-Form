var runningTotalVar = 0, selectedDough, previousDoughAndSize, previousDoughPickIndex = false;

function runningTotal() {
    // runningTotalVar = ; HAVE TO ADD THE OTHER TOTALS HERE
    var sizePrice = Number(priceOfSize());
    var saucePrice = Number(priceOfSauce());
    var toppingsPrice = Number(priceOfToppings());
    runningTotalVar = Number(sizePrice) + Number(saucePrice) + Number(toppingsPrice);
    document.getElementById("runningTotal").innerHTML = "$" + runningTotalVar.toFixed(2);
}

function priceOfSize() {
    var sizePrice = 0;
    if (previousDoughAndSize != undefined) {
        var placeholder = document.getElementById(previousDoughAndSize).options;
            for (var i = 0; i < placeholder.length; i++) {
                if (placeholder[i].selected == true) {
                    sizePrice = placeholder[i].value;
                }
            }

        // document.getElementById(previousDoughAndSize).options[1].selected


    }    
    return sizePrice;
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
    toppingsPrice = Number(.99 * counter);
    return toppingsPrice;
}

function whichDoughPicked () {
    //Get the list of possible dough options
    var allOptions = document.getElementsByName("doughPick");
    //Loop through and see which one is checked
    for (var i = 0; i < allOptions.length; i++) {
        selectedDough = allOptions[i].value;
        var placeholder = selectedDough.concat("Size");
        if (allOptions[i].checked == true) {
            console.log(placeholder);
            document.getElementById("finishBuildingPizzaContainer").classList.remove("hidden");
            document.getElementById(placeholder).parentElement.parentElement.classList.remove("hidden");
            document.getElementById("cheeseOptionsContainer").classList.remove("hidden");
            document.getElementById("sauceOptionsContainer").classList.remove("hidden");
            document.getElementById("additionalToppingsContainer").classList.remove("hidden");

            //The seeThrough class is supposed to allow for css transitions. Changing from display: hidden; doesn't do transitions
            document.getElementById(placeholder).parentElement.parentElement.classList.remove("seeThrough");
            document.getElementById("cheeseOptionsContainer").classList.remove("seeThrough");
            document.getElementById("sauceOptionsContainer").classList.remove("seeThrough");
            document.getElementById("additionalToppingsContainer").classList.remove("seeThrough");

            //
            previousDoughPickIndex = i;
            previousDoughAndSize = placeholder;
        } else {
            document.getElementById(placeholder).parentElement.parentElement.classList.add("hidden");
        }
    }
    console.log(selectedDough);
    runningTotal();
}


window.document.getElementById("doughRadioButtons").addEventListener("click", 
    function (e) {
        if (previousDoughPickIndex !== false && e.srcElement.id !== "") {
            var confirmChange = window.confirm("Are you sure you want to change your Dough Selection?\rYou will have to pick the pizza options again.");
            if (confirmChange == true) {
                whichDoughPicked();
            }
            else if (confirmChange == false) {
                document.getElementsByName("doughPick")[previousDoughPickIndex].checked = true;
            }
        } else {
            whichDoughPicked();
        }
    }
);

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
    newYork: {
        "Large (16.99)": 16.99,
        "Extra-Large (19.99)": 19.99
    },
    glutenFree: {
        "Small ($10.99)": 10.99
    }
}

window.addEventListener("load", function() {
    document.getElementById("addressType").addEventListener("change", function() {
        //hardcoded the other option in, will have to change this if the html for address type changes
        if (document.getElementById("addressType")[6].selected) {
            document.getElementById("otherAddressType").classList.remove("hidden"); 
        } else {
            document.getElementById("otherAddressType").classList.add("hidden");
        }
    })
    
    // select all elements of pizza selection from DOM and add event listeners so that price can be added up
    var whatToCalculate = document.getElementsByClassName("calculate");
    for (var i = 0; i < whatToCalculate.length; i++) {
        whatToCalculate[i].addEventListener("change",
        function(e) {
            console.log(e.srcElement);
            whichDoughPicked();
        }
        )
    }
})
