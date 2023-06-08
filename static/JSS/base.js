discoveredServers = []

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

function insertBefore(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode);
}

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function startServer(serverID){

    let card = document.getElementById("serverCard" + serverID)
    card.classList.add("loading-darken")

    let loader = document.getElementById("loader" + serverID)
    loader.removeAttribute("hidden")

    const Http = new XMLHttpRequest();
    const url = 'http://127.0.0.1:9000/api/v1/startServer/' + serverID;

    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = (e) => {

        if (Http.readyState === 4) {

            card.classList.remove("loading-darken")
            loader.setAttribute("hidden", "true")

            setCard(serverID, true)

        }else {
            console.log("HTTP Ready State Was: " + Http.readyState)
        }

    }

    // delay(5000).then(() => {
    //         card.classList.remove("loading-darken")
    //         loader.setAttribute("hidden", "true")
    //     }
    // );

}

function stopServer(serverID){

    let card = document.getElementById("serverCard" + serverID)
    card.classList.add("loading-darken")

    let loader = document.getElementById("loader" + serverID)
    loader.removeAttribute("hidden")

    const Http = new XMLHttpRequest();
    const url = 'http://127.0.0.1:9000/api/v1/killServer/' + serverID;

    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = (e) => {

        if (Http.readyState === 4) {

            card.classList.remove("loading-darken")
            loader.setAttribute("hidden", "true")

            setCard(serverID, false)

        }else {
            console.log("HTTP Ready State Was: " + Http.readyState)
        }

    }
}

async function getServerStatus(serverID){

    return new Promise(function(resolve, reject) {

        const Http = new XMLHttpRequest();
        const url = "http://127.0.0.1:9000/api/v1/getServerStatus/" + serverID;

        Http.onreadystatechange = (e) => {

            if (Http.readyState === 4) {

                index = Http.responseText.indexOf("}")

                response = Http.responseText.slice(0, index + 1)

                var response = JSON.parse(response)
                serverStatus = response["Status"]

                resolve(serverStatus)

            }
        }

        Http.onerror = (e) => {
            reject("Error With Async Call!")
        }

        Http.open("GET", url);
        Http.send();

    });
}

function findServers(){

    let servers = document.getElementsByClassName("serverCard")

    for (let i = 0; i < servers.length; i++) {

        serverID = servers[i].id

        serverID = serverID.split("serverCard")[1]

        if(!discoveredServers.includes(serverID)){
            discoveredServers.push(serverID)
        }

    }

}

function setCard(serverID, status){

    if(status){

        delay(0).then(() => {

            try{

                // DECLARING CONTAINERS
                    btnContainer = document.getElementById("btnContainer" + serverID);
                    container = document.getElementById("statusP" + serverID);

                // IF CARD IS SET TO OFF

                // HIDE THE OFF BADGE

                    // Getting the off badge and hiding it
                        offBadge = document.getElementById("offStatus" + serverID);
                        offBadge.setAttribute("hidden", "true");

                // REPLACE OFF BADGE WITH THE ON BADGE

                    // Creating the on badge

                    onBadge = document.getElementById("onStatus" + serverID);

                    if(onBadge == null) {
                        onBadge = document.createElement("span");
                        onBadge.id = "onStatus" + serverID;
                        onBadge.classList.add("badge", "badge-success", "onStatus" + serverID);
                        onBadge.innerText = "Online";
                    }else{
                        onBadge.removeAttribute("hidden");
                    }

                // HIDE THE START BUTTON

                    // Getting the start server button and hiding it
                    startServerBtn = document.getElementById("startServer" + serverID);
                    startServerBtn.setAttribute("hidden", "true");

                // REPLACE THE START BUTTON WITH A STOP BUTTON

                stopServerBtn = document.getElementById("stopServer" + serverID)

                if(stopServerBtn == null) {
                    // Creating the stop button
                    stopServerBtn = document.createElement("a");
                    stopServerBtn.id = "stopServer" + serverID;
                    stopServerBtn.classList.add("btn", "btn-danger", "mt-2", "stopServer" + serverID);
                    stopServerBtn.setAttribute("onclick", "stopServer(" + serverID + ")");
                    stopServerBtn.innerText = "Stop Server";
                }else{
                    stopServerBtn.removeAttribute("hidden");
                }

                // REVEAL THE CONSOLE BUTTON

                    // Revealing the console button
                    consoleBtn = document.getElementById("console" + serverID);
                    consoleBtn.removeAttribute("hidden");

                container.appendChild(onBadge);
                insertBefore(stopServerBtn, consoleBtn)


            }catch(e){

                // Catching the error if a server is already active.
                if(String(e).includes("(reading 'setAttribute')")){
                    return
                }else{
                    console.log("ERROR ENABLING: " + e)
                }

            }

        });

    }else{

        try {

            btnContainer = document.getElementById("btnContainer" + serverID);
            container = document.getElementById("statusP" + serverID);

            // DISABLE THE CARD

            // HIDE THE ON BADGE

                // Getting the on badge and hiding it
                onBadge = document.getElementById("onStatus" + serverID);
                onBadge.setAttribute("hidden", "true");

            // REVEAL THE OFF BADGE

                // Getting the off badge and revealing it
                offBadge = document.getElementById("offStatus" + serverID);
                if(offBadge == null) {

                        offBadge = document.createElement("span");
                        offBadge.id = "offStatus" + serverID;
                        offBadge.classList.add("badge", "badge-danger", "offStatus" + serverID);
                        offBadge.innerText = "Offine";

                        container.appendChild(offBadge);
                }else{
                    offBadge.removeAttribute("hidden");
                }

            // HIDE THE CONSOLE BUTTON

                // Hiding the console button
                consoleBtn = document.getElementById("console" + serverID);
                consoleBtn.setAttribute("hidden", "true");

            // HIDE THE STOP SERVER BUTTON

                // Getting the stop server button and hiding it
                stopServerBtn = document.getElementById("stopServer" + serverID);
                stopServerBtn.setAttribute("hidden", "true");

            // REVEAL THE START SERVER BUTTON

                // Getting the start server button and revealing it
                startServerBtn = document.getElementById("startServer" + serverID);

                if(startServerBtn == null){

                    startServerBtn = document.createElement("a");
                    startServerBtn.id = "startServer" + serverID;
                    startServerBtn.classList.add("btn", "btn-success", "mt-2", "startServer" + serverID);
                    startServerBtn.setAttribute("onclick", "startServer(" + serverID + ")");
                    startServerBtn.innerText = "Start Server";

                    btnContainer.appendChild(startServerBtn);
                }else {
                    startServerBtn.removeAttribute("hidden");
                }

        }catch(e){

            // Catching the error if a server is already disabled.
            if(String(e).includes("(reading 'setAttribute')")){
                return
            }else{
                console.log(e)
                console.log("ERROR DISABLING: " + e)
            }

        }
    }

}

// TODO: Finish this function and incorporate it with the homepage
function pingBackend(){

    try{

        const Http = new XMLHttpRequest();
        const url = 'http://127.0.0.1:9000/api/v1/isBackendActive';

        Http.open("GET", url);
        Http.send();

        Http.onreadystatechange = (e) => {

            Http.onerror = (e) =>{

                var pageLoaderElement = document.getElementById("pageLoader");
                pageLoaderElement.setAttribute("hidden", "true");

                try{
                    var serversDiv = document.getElementById("ServerListBackground")
                    serversDiv.setAttribute("hidden", "true");
                }catch{}

                var sourceDiv = document.getElementById("sourceContainer")
                var noConnectionDiv = document.getElementById("noConnectionDiv");
                sourceDiv.setAttribute("hidden", "true");
                noConnectionDiv.removeAttribute("hidden");

                return false
            }

            if (Http.readyState === 4) {

                var pageLoaderElement = document.getElementById("pageLoader");
                pageLoaderElement.setAttribute("hidden", "true");

                try{
                    var serversDiv = document.getElementById("ServerListBackground")
                    serversDiv.removeAttribute("hidden");
                }catch{}

                var sourceDiv = document.getElementById("sourceContainer")
                var noConnectionDiv = document.getElementById("noConnectionDiv");
                noConnectionDiv.setAttribute("hidden", "true");
                sourceDiv.removeAttribute("hidden");
                return true
            }
        }

    }catch (e){
        console.log("Failed!")
        return false
    }

}

$(document).ready(function () {

    if(pingBackend()){

        findServers()

        discoveredServers.forEach((server) => {

            getServerStatus(server).then(promiseVal => {

                console.log("Checking Status of server " + server)

                if (promiseVal) {

                    console.log("Server " + server + " is active!")

                    const Http = new XMLHttpRequest();
                    const url = window.location.origin + "/enableServer";
                    const csrf_token = getCookie('csrftoken')

                    data = {"csrfmiddlewaretoken": csrf_token, "serverID": server}

                    Http.open("POST", url);
                    Http.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
                    Http.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded');
                    Http.send(server);

                    setCard(server, true)

                } else {
                    console.log("Server " + server + " is offline!")

                    const Http = new XMLHttpRequest();
                    const url = window.location.origin + "/disableServer";
                    const csrf_token = getCookie('csrftoken')

                    data = {"csrfmiddlewaretoken": csrf_token, "serverID": server}

                    Http.open("POST", url);
                    Http.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
                    Http.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded');
                    Http.send(server);

                    setCard(server, false)

                }

            }).catch(error => {
                console.log(error)
            })

        });
    }

});