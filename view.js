//parcurgerea array-ului de jocuri

getGamesList(function(arrayOfGames){
    for(var i = 0; i < arrayOfGames.length; i++) {
        createDomElement(arrayOfGames[i]);
    }
});


//creare div pentru fiecare joc si adaugare in DOM

function createDomElement(gameObj) {
    var container1 = document.querySelector('.container');
    const gameELement = document.createElement("div");
    gameELement.setAttribute("id", gameObj._id)
    gameELement.innerHTML = `<h1>${gameObj.title}</h1> 
                            <img src="${gameObj.imageUrl}" />
                            <p>${gameObj.description}</p> 
                            <button class="delete-btn">Delete Game</button>
                            <button class="update-btn">Edit Game</button>`;

//creare update form
    const updateGameElement = document.createElement("form");
    updateGameElement.classList.add('updateForm');
    updateGameElement.innerHTML = `
                                <label for="gameTitle">Title *</label>
                                <input type="text" value="${gameObj.title}" name="gameTitle" id="Title"/>

                                <label for="gameDescription">Description</label>
                                <textarea name="gameDescription" id="Description">${gameObj.description}</textarea>
                        
                                <label for="gameImageUrl">Image URL *</label>
                                <input type="text" name="gameImageUrl" id="ImageUrl" value="${gameObj.imageUrl}"/>
                        
                                <button class="updateBtn">Save Changes</button>
                                <button class="cancelBtn">Cancel</button>`;


    container1.appendChild(gameELement);


    // display update form on button click / delete game on button click
      
    document.getElementById(`${gameObj._id}`).addEventListener("click", function (event) {
        // console.log(event.target);
        if (event.target.classList.contains('delete-btn')) {
            deleteGame(gameELement.getAttribute("id"), function (apiResponse) {
                // console.log(event.target);
                console.log(apiResponse);
                removeDeletedElementFromDOM(event.target.parentElement);
            })
        } else if (event.target.classList.contains('update-btn')) {
            gameELement.appendChild(updateGameElement);
        } else if (event.target.classList.contains('cancelBtn')) {
            removeDeletedElementFromDOM(updateGameElement);
        } else if (event.target.classList.contains('updateBtn')) {
            event.preventDefault();

            updateDomElement(event.target.parentElement.parentElement);
            removeDeletedElementFromDOM(updateGameElement);
        }
    });
}

function updateDomElement(gameElement){
    //luam valorile din update form, din cele trei inputuri
    const newGameTitle = document.getElementById("Title").value;
    const newGameDescription = document.getElementById("Description").value;
    const newGameImageUrl = document.getElementById("ImageUrl").value;

    //le atribuim la cele din gameElemen
    gameElement.querySelector('h1').innerHTML = newGameTitle;
    gameElement.querySelector('p').innerHTML = newGameDescription;
    gameElement.querySelector('img').src = newGameImageUrl;

    //le encodam cu url params
    var urlencoded = new URLSearchParams();
    urlencoded.append("title", newGameTitle);
    urlencoded.append("description", newGameDescription);
    urlencoded.append("imageUrl", newGameImageUrl);
    
    //apelam functia de api cu id, urlencoded si create element
    updateGameRequest(gameElement.id, urlencoded, createDomElement);
    
}


function removeDeletedElementFromDOM(domElement){
    domElement.remove();
}


//Validare

function validateFormElement(inputElement, errorMessage){
    if(inputElement.value === "") {
        if(!document.querySelector('[rel="' + inputElement.id + '"]')){
            buildErrorMessage(inputElement, errorMessage);
        }
    } else {
        if(document.querySelector('[rel="' + inputElement.id + '"]')){
            console.log("the error is erased!");
            document.querySelector('[rel="' + inputElement.id + '"]').remove();
            inputElement.classList.remove("inputError");
        }
    }
}

function validateReleaseTimestampElement(inputElement, errorMessage){
    if(isNaN(inputElement.value) && inputElement.value !== "") {
        buildErrorMessage(inputElement, errorMessage);
    }
}

function buildErrorMessage(inputEl, errosMsg){
    inputEl.classList.add("inputError");
    const errorMsgElement = document.createElement("span");
    errorMsgElement.setAttribute("rel", inputEl.id);
    errorMsgElement.classList.add("errorMsg");
    errorMsgElement.innerHTML = errosMsg;c
    inputEl.after(errorMsgElement);
}



//Creare joc la submit

document.querySelector(".submitBtn").addEventListener("click", function(event){
    event.preventDefault();

    const gameTitle = document.getElementById("gameTitle");
    const gameDescription = document.getElementById("gameDescription");
    const gameGenre = document.getElementById("gameGenre");
    const gamePublisher = document.getElementById("gamePublisher");
    const gameImageUrl = document.getElementById("gameImageUrl");
    const gameRelease = document.getElementById("gameRelease");

    validateFormElement(gameTitle, "The title is required!");
    validateFormElement(gameGenre, "The genre is required!");
    validateFormElement(gameImageUrl, "The image URL is required!");
    validateFormElement(gameRelease, "The release date is required!");

    validateReleaseTimestampElement(gameRelease, "The release date you provided is not a valid timestamp!");

    if(gameTitle.value !== "" && gameGenre.value !== "" && gameImageUrl.value !== "" && gameRelease.value !== "") {
        var urlencoded = new URLSearchParams();
        urlencoded.append("title", gameTitle.value);
        urlencoded.append("releaseDate", gameRelease.value);
        urlencoded.append("genre", gameGenre.value);
        urlencoded.append("publisher", gamePublisher.value);
        urlencoded.append("imageUrl", gameImageUrl.value);
        urlencoded.append("description", gameDescription.value);

        createGameRequest(urlencoded, createDomElement);
    }
})

