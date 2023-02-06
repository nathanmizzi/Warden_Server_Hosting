let buttonClicked = false;

function clearConsoleContent() {
    consoleElement = document.getElementById("consolePrevious");
    consoleElement.innerText = "";
}

// TODO: Make url variables dynamic depending on the serverID
function getServerLog() {

    const Http = new XMLHttpRequest();
    const url = 'http://127.0.0.1:9000/api/v1/getLog/1';

    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = (e) => {

        if (Http.readyState === 4) {
            var response = JSON.parse(Http.responseText)
            log = response["content"]
            parsedConsoleOutput = log.split("\n")

            addLine(log)

        }else {
            console.log("HTTP Ready State Was: " + Http.readyState)
        }

    }

}

function enterCommand(){
    commandInputBox = document.getElementById("consoleInput")
    commandText = commandInputBox.innerText

    console.log("Command Sent: " + commandText)

    const Http = new XMLHttpRequest();
    const url = 'http://127.0.0.1:9000/api/v1/commandServer/1';

    Http.open("GET", url);
    Http.setRequestHeader("CommandContent", commandText)
    Http.send();
}

function addLine(stringToAdd){

    username = document.getElementById("consoleCurrent").innerText.split(" ")[0];
    consoleElement = document.getElementById("consolePrevious");
    input = document.getElementById("consoleInput");

    lineToAdd = document.createElement("p");
    lineToAdd.classList.add("p-0");
    lineToAdd.classList.add("ml-2");
    lineToAdd.classList.add("mb-0");
    lineToAdd.innerText = stringToAdd;

    input.innerText = "";
    consoleElement.appendChild(lineToAdd);

    consoleElement.scrollTop = consoleElement.scrollHeight;

}

$(document).ready(function () {

    $('#consoleCurrent').click(function() {
         $('#consoleInput').focus();
    });

    var consoleField = document.getElementById('consoleInput');

    consoleField.addEventListener('focusout', function handleNotClick() {

        consoleField.classList.remove("terminalBlinking")

    });

    consoleField.addEventListener('focusin', function handleClick() {
        consoleField.classList.add("terminalBlinking")
    });

    consoleField.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        enterCommand();
        clearConsoleContent();
        getServerLog();
      }
    });

    getServerLog()

});