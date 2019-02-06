// Create an array of colors for the squares
var numSquares = 6;
var colors = [];
var pickedColor;

// Select all the square divs 
var squares = document.querySelectorAll(".square");

var colorDisplay = document.getElementById("colorDisplay");
var message = document.getElementById("message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");

var modeButtons = document.querySelectorAll(".mode");

colorDisplay.textContent = pickedColor;


init();

function init() {
    setUpModeButtons();

    setUpSquares();

    reset();
}

resetButton.addEventListener("click", function() {
    reset();
});

function changeColors(color) {
    // Loop through all squares and change color to match given color
    for(var i = 0; i < colors.length; i++) {
        squares[i].style.backgroundColor = color;
    }
}

// Function to generate a random color from the array as the picked color
function pickColor() {
    var randomColor = Math.floor(Math.random() * colors.length);
    return colors[randomColor];
}
// Function to generate an array of random colors
function generateRandomColors(num) {
    // make an array
    var colorsArr = [];
    // add num random colors to array
    for(var i = 0; i < num; i++) {
        // get random color and push into array
        colorsArr.push(randomColor());
    }
    // return that array
    return colorsArr;
}

function randomColor() {
    // pick a "red" from 0-255
    var r = Math.floor(Math.random() * 256);
    // pick a "green" from 0-255
    var g = Math.floor(Math.random() * 256);
    // pick a "blue" from 0-255
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

function reset() {
    // Pick all new colors
    colors = generateRandomColors(numSquares);
    // Pick a new random color from array to become pickedColor
    pickedColor = pickColor();
    // Change color of display to match pickedColor
    colorDisplay.textContent = pickedColor;
    resetButton.textContent = "New Colors";
    message.textContent = "";
    // Change color of squares
    for(var i = 0; i < squares.length; i++) {
        if(colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }
    h1.style.backgroundColor = "steelblue";
}

function setUpModeButtons() {
    for(var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function() {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");

            this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
            reset();
        });
    }
}

function setUpSquares() {
    // Loop through all the squares
    for(var i = 0; i < squares.length; i++) {
        // add click listeners to squares
        squares[i].addEventListener("click", function() {
            //grab color of picked square
            var clickedColor = this.style.backgroundColor;
            //compare color to pickedColor
            if(clickedColor === pickedColor) {
                message.textContent = "Correct!";
                // Call the changeColors() function to change all squares to pickedColor
                changeColors(clickedColor);
                h1.style.backgroundColor = clickedColor;
                resetButton.textContent = "Play Again";
            } else {
                // Squares fades out into background color on wrong guess
                this.style.backgroundColor = "#232323";
                message.textContent = "Try Again";
            }
        });
    }
}

/*
btnEasy.addEventListener("click", function() {
    btnEasy.classList.add("selected");
    btnHard.classList.remove("selected");
    numSquares = 3;
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;

    for(var i = 0; i < squares.length; i++) {
        if(colors[i]) {
            // Only change color for top 3 squares
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }
});

btnHard.addEventListener("click", function() {
    btnHard.classList.add("selected");
    btnEasy.classList.remove("selected");
    numSquares = 6;
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;

    for(var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = colors[i];
        squares[i].style.display ="block";
    }
});
*/