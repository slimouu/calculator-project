const buttonValues = [
    "AC", "+/-", "%", "÷", 
    "7", "8", "9", "×",
    "4", "5", "6", "-",
    "1", "2", "3", "+",
    "0", ".", "="
];
const rightSymbols = ["÷", "×", "-", "+", "="];
const topSymbols = ["AC", "+/-", "%"];

const display = document.getElementById("display");
const historyList = document.getElementById("history-list");

let A = 0;
let operator = null;
let B = null;

function clearAll() {
    A = null;
    operator = null;
    B = null;
}


buttonValues.forEach((value) => {
    let button = document.createElement("button");
    button.innerText = value;


    //styling button color
    if(value == '0'){
        button.style.width = '200px';
        button.style.gridColumn = 'span 2'
    }
    if(rightSymbols.includes(value)){
        button.style.backgroundColor = 'orange';
    }else if(topSymbols.includes(value)){
        button.style.backgroundColor = '#D4D4D2';
        button.style.color = "#1C1C1C";
    }
    //process button clicks
    button.addEventListener("click", function() {
        if (rightSymbols.includes(value)) { 
            if (value == "=") {
                if (A != null) {
                    B = display.value;
                    let numA = Number(A);
                    let numB = Number(B);

                    if (operator == "÷") {
                        display.value = numA/numB;
                    }
                    else if (operator == "×") {
                        display.value = numA*numB;
                    }
                    else if (operator == "-") {
                        display.value = numA-numB;
                    }
                    else if (operator == "+") {
                        display.value = numA+numB;
                    }
                    const entry = `${A} ${operator} ${B} = ${display.value}`;
                    const li = document.createElement("li");
                    li.textContent = entry;
                    historyList.prepend(li);

                    clearAll();
                }
            }
            else {
                operator = value; //÷ × - +
                A = display.value;
                display.value = "";
            }
        }
        else if (topSymbols.includes(value)) { //AC +/- %
            if (value == "AC") {
                clearAll();
                display.value = "";
            }
            else if (value == "+/-") {
                if (display.value != "" && display.value != "0") {
                    if (display.value[0] == "-") { //remove -
                        display.value = display.value.slice(1); 
                    } else { //add -
                        display.value = "-" + display.value; 
                    }
                }
            }
            else if (value == "%") {
                display.value = Number(display.value) / 100;
            }
        }
        else { 
            if (value == ".") {
                //don't add multiple decimal places
                if (display.value != "" && !display.value.includes(value)) {
                    display.value += value;
                }
            }
            else if (display.value == "0") {
                display.value = value;
            }
            else {
                display.value += value;
            }
        }
    });

    //add button to calculator
    document.getElementById("buttons").appendChild(button);
    
});

const clearHistoryBtn = document.getElementById("clear-history");
clearHistoryBtn.addEventListener("click", () => {
    historyList.innerHTML = "";
});



