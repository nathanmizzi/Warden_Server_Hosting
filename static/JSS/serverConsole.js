let buttonClicked = false;

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
}

function addLine(stringToAdd){

    username = document.getElementById("consoleCurrent").innerText.split(" ")[0]
    console = document.getElementById("consolePrevious")
    input = document.getElementById("consoleInput")

    lineToAdd = document.createElement("p")
    lineToAdd.classList.add("p-0")
    lineToAdd.classList.add("ml-2")
    lineToAdd.classList.add("mb-0")
    lineToAdd.innerText = stringToAdd

    input.innerText = ""
    console.appendChild(lineToAdd)

    console.scrollTop = console.scrollHeight;

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
        addLine(username + consoleField.innerText);
      }
    });

    getServerLog()

});