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

$(document).ready(function () {

});