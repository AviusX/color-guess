// ===================================== Variable Definitions ================================================

var numSquares = 6;
var colors = generateRandomColors(numSquares);
var squares = document.querySelectorAll(".square");
// pickedColor is the color required to win the game.
var pickedColor = pickColor();
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var easyBtn = document.querySelector("#easyBtn");
var hardBtn = document.querySelector("#hardBtn");
var modeButtons = document.querySelectorAll(".mode");
var paletteButton = document.querySelector("#paletteButton");
var paletteImage = document.querySelector("#palette");

// ============================================================================================================

// Adding colors and click listeners to squares
configureSquares();
// Changing the colorDisplay in the heading to show what the pickedColor is
colorDisplay.textContent = pickedColor;

// ====================================== Button Click Listeners ==============================================

resetButton.addEventListener("click", reset);

for (var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function () {
        modeButtons[0].classList.remove("selected");
        modeButtons[1].classList.remove("selected");
        this.classList.add("selected");
        this.textContent === "Easy" ? numSquares = 3 : numSquares = 6;
        reset();
    });
}

paletteButton.addEventListener("click", function () {
    paletteButton.textContent = paletteButton.textContent === "Show Palette" ? "Hide Palette" : "Show Palette";
    paletteImage.classList.toggle("hide");
});

// ======================================= Function Definitions ===============================================

function reset() {
    // Generate an array of new colors
    colors = generateRandomColors(numSquares);
    // Pick a new winning color
    pickedColor = pickColor();
    // Change colorDisplay to match clicked color
    colorDisplay.textContent = pickedColor;
    // Reset H1 Color
    h1.style.background = "";
    messageDisplay.textContent = "";
    // Change the color of squares on the screen
    configureSquares();
}
function changeColors(color) {
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
    }
}

// Picks a color from the colors array to be the pickedColor
function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

// Generates and returns an array of random colors
function generateRandomColors(num) {
    // Make an array
    var arr = [];
    // Add num random colors to that array
    for (var i = 0; i < num; i++) {
        arr.push(randomColor());
    }
    // Return that array
    return arr;
}

// Generates and returns a random color
function randomColor() {
    // Generate a red between 0 and 255
    var r = Math.floor(Math.random() * 256); // We do 256 instead of 255 because the upper limit is not included.
    // Generate a green between 0 and 255
    var g = Math.floor(Math.random() * 256);
    // Generate a blue between 0 and 255
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}
function squareClick() {
    var clickedColor = this.style.backgroundColor;
    // Compare the clicked color to the picked color:
    if (clickedColor === pickedColor) {
        messageDisplay.textContent = "Correct!";
        changeColors(pickedColor);
        h1.style.backgroundColor = pickedColor;
    } else {
        messageDisplay.textContent = "Try Again!";
        this.style.backgroundColor = "#232323";
    }
}

function configureSquares() {
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.display = "block";
        // Add colors to squares:
        if (colors[i]) {
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }

        // Add click listeners to squares:
        squares[i].addEventListener("click", squareClick);
    }
}