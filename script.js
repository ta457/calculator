const row1 = document.querySelector('.row1');
const row2 = document.querySelector('.row2');
const buttons = document.querySelectorAll('.btn');

let nodes = [];
let operators = ["+", "-", "×", "÷"];
let numbers = ['1','2','3','4','5','6','7','8','9','.'];
let finalResult = false;
let tempValue = 0;
const toNum = function (str) {return str*1;}

const clear = (row) => {
    row.textContent = "";
}

const clearNodes = () => {
    nodes = [];
}

const acBtn = (row1, row2) => {
    row2.textContent = "0";
    row1.textContent = "";
    tempValue = null;
    clearNodes();
}
const delBtn = (row) => {
    row.textContent = row.textContent.slice(0, -1);
}
const negativeBtn = (row) => {
    row.textContent = -1 * toNum(row.textContent);
}
const percentBtn = (row) => {
    row.textContent = toNum(row.textContent)/100;
}
const update = (row) => {
    clear(row);
    nodes.forEach(node => {
        row1.textContent += node + " ";
    });
}
const resolve = (nodes) => {
    let plusMinus = [];
    for(let i = 0; i <= nodes.length; i++) {
        if(typeof(nodes[i]) == "number" || nodes[i] == "+" || nodes[i] == "-") {
            plusMinus.push(nodes[i]);
        }
        if(nodes[i] == "×") {
            plusMinus[plusMinus.length - 1] = plusMinus[plusMinus.length - 1] * nodes[i + 1];
            i++;
        }
        if(nodes[i] == "÷") {
            plusMinus[plusMinus.length - 1] = plusMinus[plusMinus.length - 1] / nodes[i + 1];
            i++;
        }
    }
    let result = plusMinus[0];
    for(let i = 1; i < plusMinus.length; i++) {
        if(plusMinus[i] == "+") {
            result += plusMinus[i + 1];
        }
        if(plusMinus[i] == "-") {
            result -= plusMinus[i + 1];
        }
    }
    return result;
}

let lastBtn = "";
buttons.forEach(function(i) {
    i.addEventListener('click', function() {
        let btn = i.textContent;

        if(btn === "AC") {
            acBtn(row1, row2);
        }
        if(btn === "Del") {
            delBtn(row2);
        }
        if(btn === "+/-") {
            negativeBtn(row2);
        }
        if(btn === "%") {
            percentBtn(row2);
        }
        if(btn === "0") {
            if(row2.textContent.charAt(0) !== "0") {
                row2.textContent += i.textContent;
            }
        }

        if(btn === "=" && lastBtn !== "="){
            nodes.push(toNum(row2.textContent));
            row1.textContent += " " + row2.textContent;
            
            let result = Math.round(resolve(nodes) * 100000000) / 100000000;
            tempValue = result;
            let resultText = result.toString();
            if(resultText.length > 10) {
                resultText = resultText.substring(0, 10) + "...";
            }

            if(resultText == "Infinity") {
                resultText = "177013";
            }
            row2.textContent = resultText;
            finalResult = true;
        }

        if(numbers.includes(btn)) {
            if(row2.textContent === "0") {
                clear(row2);
            }
            if(row2.textContent.length < 9) {
                row2.textContent += i.textContent;
            }
        }

        if(operators.includes(btn)){
            if(row2.textContent === "0" && operators.includes(nodes[nodes.length - 1])){
                nodes[nodes.length - 1] = btn;
                update(row1);
            } else {
                if(finalResult == true) {
                    clear(row1);
                    clearNodes();
                    if(tempValue !== null) {
                        nodes.push(tempValue);
                    } else {
                        nodes.push(toNum(row2.textContent));
                    }
                    nodes.push(btn);
                    update(row1);
                    clear(row2);
                    row2.textContent = "0";
                    finalResult = false;
                } else {
                    nodes.push(toNum(row2.textContent));
                    nodes.push(btn);
                    update(row1);
                    clear(row2);
                    row2.textContent = "0";
                }
            }
        }

        lastBtn = btn;
    });
});