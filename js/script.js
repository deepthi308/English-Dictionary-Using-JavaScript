const input = document.querySelector(".input");
const title = document.querySelector(".title")
const definition = document.querySelector(".meaning")
const meaningContainer = document.querySelector(".meaning-container")
const info = document.querySelector(".info-text")
const audio = document.getElementById("audio")
const err = document.getElementById("error")
const infoText = document.getElementById("info")
const button = document.getElementById("button")
let userTextWithSpace = "";
let userTextWithoutSpace;
let meaning;
const loading = document.querySelector(".loading");
loading.style.display = "none"
button.style.display= "none"

button.addEventListener("click", () => {
    location.reload()
})

const fetchAPI = async(userText) => {
    let userTextArray = [...userText];
    userTextWithoutSpace = userTextArray.filter((element) => element != " ")
    const actualText = userTextWithoutSpace.join("").toString();
    try {
        infoText.style.display = "none"
       loading.style.display = ""
     const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${actualText}`)
        const data = await response.json()
       console.log(data) 
        
        loading.style.display = "none"
    let number = data[0].meanings[0].definitions.length;
    // console.log(number)
    let random = Math.floor((Math.random()*number))
        meaning = data[0].meanings[0].definitions[1].definition;
       
    title.innerText = actualText;
    definition.innerText = meaning;
    audio.setAttribute("src",data[0].phonetics[0].audio)
    // console.log(data[0].sourceUrls[0]);
       meaningContainer.style.display = "block"
       meaningContainer.style.gap = "20px"
    } catch (error) {
        loading.style.display = "none"
       meaningContainer.style.display = "none"
       input.value = "Something went wrong..."
       input.disabled = true;
        input.style.textAlign = "center"
        button.style.display = ""
   }

    // console.log(meaningContainer)
    
}



const handleInput = (event) => {
    // console.log(event.target.value)
    // console.log(event.key)
    userTextWithSpace = event.target.value;
    if (userTextWithSpace && event.key == "Enter") {
        fetchAPI(userTextWithSpace)
    }
}



input.addEventListener("keyup", handleInput)