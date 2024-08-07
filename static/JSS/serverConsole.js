let buttonClicked = false;
let debugMode = false;

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

            index = Http.responseText.indexOf("}")

            HTTPResponse = Http.responseText.slice(0, index + 1)

            Parsedresponse = JSON.parse(HTTPResponse)

            log = Parsedresponse["content"]
            parsedConsoleOutput = log.split("\n")

            addLine(log, true)

        }else {
            console.log("HTTP Ready State Was: " + Http.readyState)
        }

    }

}

// TODO: Make url variables dynamic depending on the serverID
async function getServerLogAsync() {

    const Http = new XMLHttpRequest();
    const url = 'http://127.0.0.1:9000/api/v1/getLog/1';

    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = (e) => {

        if (Http.readyState === 4) {

            index = Http.responseText.indexOf("}")

            HTTPResponse = Http.responseText.slice(0, index + 1)

            Parsedresponse = JSON.parse(HTTPResponse)

            // Begin comparison with already displayed content

            log = Parsedresponse["content"]

            var consoleDiv = document.getElementById("consolePrevious");

            currentLog = consoleDiv.innerText;

            var originalConsoleOutput = log;

            originalConsoleOutput = originalConsoleOutput.replace(/\n/g, '\n');

            if (currentLog.trim() !== originalConsoleOutput.trim()) {
                clearConsoleContent();
                parsedConsoleOutput = log.split("\n");
                addLine(log, false);
            }

        }else {
            if(debugMode !== false){
                console.log("HTTP Ready State Was: " + Http.readyState)
            }
        }

    }

}

function enterCommand(){

    enterCommandAsync()
    .then(data => {
        console.log('[Info] Command Sent Succesfully');
    })
    .catch(error => {
        console.error('[ERROR] Send Command Error: ', error);
    });

}

async function enterCommandAsync() {

    commandInputBox = document.getElementById("consoleInput")
    commandText = commandInputBox.innerText

    url = 'http://127.0.0.1:9000/api/v1/commandServer/1'
    data = {
        'CommandContent': commandText
    }

    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });

    return response.json(); // parses JSON response into native JavaScript objects

}

function addLine(stringToAdd, userinputted){

    username = document.getElementById("consoleCurrent").innerText.split(" ")[0];
    consoleElement = document.getElementById("consolePrevious");
    input = document.getElementById("consoleInput");

    lineToAdd = document.createElement("p");
    lineToAdd.classList.add("p-0");
    lineToAdd.classList.add("ml-2");
    lineToAdd.classList.add("mb-0");
    lineToAdd.innerText = stringToAdd;

    if(userinputted === true) {
        input.innerText = "";
    }

    consoleElement.appendChild(lineToAdd);

    consoleElement.scrollTop = consoleElement.scrollHeight;

}

async function startPolling(interval) {
    while (true) {
        await getServerLogAsync();
        await new Promise(resolve => setTimeout(resolve, interval));
    }
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
        //clearConsoleContent();
        //getServerLog();
      }
    });

    //getServerLog();

    // Handles looping and getting updated logs.
    startPolling(500);

});