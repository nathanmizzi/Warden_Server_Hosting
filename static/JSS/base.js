discoveredServers = []

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

function startServer(serverID){

    let card = document.getElementById("serverCard" + serverID)
    card.classList.add("loading-darken")

    let loader = document.getElementById("loader" + serverID)
    loader.removeAttribute("hidden")

    delay(5000).then(() => {
            card.classList.remove("loading-darken")
            loader.setAttribute("hidden", "true")
        }
    );

}

function getServerStatus(serverID){

    const Http = new XMLHttpRequest();
    const url = "http://127.0.0.1:9000/api/v1/getServerStatus/" + serverID;

    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = (e) => {

        if (Http.readyState === 4) {

            index = Http.responseText.indexOf("}")

            response = Http.responseText.slice(0, index + 1)

            var response = JSON.parse(response)
            serverStatus = response["Status"]

            return serverStatus
        }

    }

    return false

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

$(document).ready(function () {

    findServers()

    discoveredServers.forEach((server) => {

        console.log("Checking Status of server " + server)

        serverStatus = getServerStatus(server)

        // TODO: Check why this check if always failing.
        if(serverStatus){

            console.log("Server " + server + " is active")

            const Http = new XMLHttpRequest();
            const url = window.location.origin + "/enableServer";
            data = {"serverID": server}

            Http.open("POST", url);
            Http.send(data);
        }

    })

});