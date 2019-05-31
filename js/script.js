var runningTotalVar = 0, selectedDough, previousDoughAndSize, previousDoughPickIndex = false;

function runningTotal() {
    // runningTotalVar = ; HAVE TO ADD THE OTHER TOTALS HERE
    document.getElementById("runningTotal").innerHTML = "$" + runningTotalVar;
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
    
    previousDoughPickIndex
}

function priceOfToppings() {
    var toppingsPrice = 0;

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
)