// var apiURL = "https://games-world.herokuapp.com";
var apiURL = "https://games-app-siit.herokuapp.com";


//Get the list of games

//Get games With promises
function getGamesList() {
    return fetch(apiURL + "/games", {
        method: "GET",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(response => response.json());
}




//Delete game with promises
function deleteGame(gameID) {
    return fetch(apiURL + "/games/" + gameID, {
                method: "DELETE"
            }).then(r => r.text());
}




//Create game request with promises
function createGameRequest(gameObject) {
    return  fetch(apiURL + "/games", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: gameObject
            }).then (response => response.json());
              
}



//Update game with promises

function updateGameRequest(gameid,updatedGameObj){
    return fetch(apiURL + "/games/" + gameid,  {
        method: "PUT",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: updatedGameObj
    })
    .then(response => response.json());
}



// "application/json"
// {"cheie": "valoare", "cheie2": "valoare2"}

//application/x-www-form-urlencoded
// cheie=valoare&cheie2=valoare2