var runningTotalVar = 9.99, selectedDough, previousDoughPickIndex = false;

function runningTotal() {
    // runningTotalVar = ; HAVE TO ADD THE OTHER TOTALS HERE
    document.getElementById("runningTotal").innerHTML = "$" + runningTotalVar;
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
            document.getElementById(placeholder).parentElement.parentElement.classList.remove("hidden");
            document.getElementById("cheeseOptionsContainer").classList.remove("hidden");
            document.getElementById("sauceOptionsContainer").classList.remove("hidden");
            document.getElementById("additionalToppingsContainer").classList.remove("hidden");
            // document.getElementById(placeholder).parentElement.parentElement.classList.remove("seeThrough");
            // document.getElementById("cheeseOptionsContainer").classList.remove("seeThrough");
            // document.getElementById("sauceOptionsContainer").classList.remove("seeThrough");
            // document.getElementById("additionalToppingsContainer").classList.remove("seeThrough");
            previousDoughPickIndex = i;
        } else {
            document.getElementById(placeholder).parentElement.parentElement.classList.add("hidden");
        }
    }
    console.log(selectedDough);
}
var x;
window.document.getElementById("doughRadioButtons").addEventListener("click", 
    function (e) {
        x = e;
        console.log(e.srcElement);
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