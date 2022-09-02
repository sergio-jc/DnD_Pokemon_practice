const CARDS = 8;

// Peticion de pokemones al  API

for (let i = 0; i < CARDS; i++) {
   let id = getRandomId(150)
   searchPokemonById(id)
}

function getRandomId(max) {
  return Math.floor(Math.random() * max) + 1;
}

let draggableElements = document.querySelector(".draggable-elements")
let droppableElements = document.querySelector(".droppable-elements")

let pokemonsSearhched = []
let pokemonNames = []

async function searchPokemonById (id) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    const data = await res.json()

    //Arreglos de los pokemones 
    pokemonsSearhched.push(data)
    //Arreglos de los nombres de los pokemones
    pokemonNames.push(data.name)


    pokemonNames = pokemonNames.sort(()=>Math.random()-0.5)


    //Dibujando los pokemones 
    draggableElements.innerHTML = ""
    pokemonsSearhched.forEach((pokemon)=>{
       draggableElements.innerHTML += `
        <div class="pokemon">
         <img id="${pokemon.name}" draggable="true" class="image" src="${pokemon.sprites.other["official-artwork"].front_default}" alt="practice"/>
        </div>
       `
    })

    //Insertando nombres de los pokemones
    droppableElements.innerHTML = ""
    pokemonNames.forEach((names)=> {
        droppableElements.innerHTML += `
        <div class="names">
         <p>${names}</p>
        </div>
        `
    })

    let pokemons =document.querySelectorAll(".image");
    pokemons= [...pokemons]
    pokemons.forEach((pokemon)=>{
        pokemon.addEventListener("dragstart",(event)=>{
            event.dataTransfer.setData("text",event.target.id)
        })
    })

    let names = document.querySelectorAll(".names")
    let wrongMsg = document.querySelector(".wrong")
    let points = 0;

    names = [...names]
    names.forEach((name)=>{
        name.addEventListener("dragover",(event)=>{
            event.preventDefault()
 
        })
        name.addEventListener("drop",(event)=>{
            const draggableElementData = event.dataTransfer.getData("text");
            let pokemonElement = document.querySelector(`#${draggableElementData}`)

            if(event.target.innerHTML == draggableElementData){

                points++
                event.target.innerHTML=""
                event.target.appendChild(pokemonElement)
                wrongMsg.innerHTML= ""

                if(points === CARDS){
                    draggableElements.innerHTML = `<p class="win">Ganaste!</p>`
                }

            }else {
                wrongMsg.innerHTML= "Ups!"
            }
        })
    })
}
