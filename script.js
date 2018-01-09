const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
var timer = [0, 0, 0, 0];
var timerInterval;
var timerRunning = false;
// Add leading zero to numbers 9 or below (purely for aesthetics):
function addLeadingZero(nr){
    if (nr < 10)
        nr = '0' + nr;
    return nr;
}

// Run a standard minute/second/hundredths timer:
function runTimer(){
    theTimer.innerHTML = `${addLeadingZero(timer[0])}:${addLeadingZero(timer[1])}:${addLeadingZero(timer[2])}`;
    timer[3]++;
    timer[0] = Math.floor(timer[3] / 100 / 60);
    timer[1] = Math.floor(timer[3] / 100 - timer[0] * 60);
    timer[2] = Math.floor(timer[3] - timer[1] * 100 - timer[0] * 6000);
}

// Match the text entered with the provided text on the page:
function spellCheck(){
    let textEntered = testArea.value;
    let originTextMatch = originText.substring(0, textEntered.length);

    if (textEntered === originText){
        testWrapper.style.borderColor = '#429890';
        clearInterval(timerInterval);

    }
    else{
        if (textEntered === originTextMatch){
            testWrapper.style.borderColor = '#65CCf3';
        } else {
            testWrapper.style.borderColor = '#E95D0F';
        }
    }

}

// Start the timer:
function startTimer(){
    let textEnteredLength = testArea.value.length;
    if (textEnteredLength === 0 && !timerRunning)
    {
        timerRunning = true;
        timerInterval = setInterval(runTimer, 10);
    }

}

// Reset everything:
function reset(){
    clearInterval(timerInterval);
    interval = null;
    timerRunning = false;
    timer = [0, 0, 0, 0];
    testArea.value = '';
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "grey";
}

// Event listeners for keyboard input and the reset button:
testArea.addEventListener('keypress', startTimer, false );
testArea.addEventListener('keyup', spellCheck, false );
resetButton.addEventListener('click', reset, false);