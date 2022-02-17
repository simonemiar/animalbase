"use strict";
// THIS IS NOT WORKING BECAUSE OF THE "THIS" APPRENTLY  
window.addEventListener("DOMContentLoaded", start);

let allAnimals = [];
let filter;

// The prototype for all animals: 
const Animal = {
    name: "",
    desc: "-unknown animal-",
    type: "",
    age: 0
};

function start( ) {
    console.log("ready");
    

    // TODO: Add event-listeners to filter and sort buttons
    const clickBtn = document.querySelectorAll("[data-action=filter]");
    clickBtn.forEach((btn) => {
        btn.addEventListener("click", filterAnimal());
    });

    loadJSON()
}

// get filter depinding on data filter attribue 

function filterAnimal() {
    // This is our model
    
    let filteredAnimals;
    filter = this.dataset.filter;
    switch (filter) {
        case "*":
            filteredAnimals = filterData(all);
            break;  
        case "*":
            filteredAnimals = filterData(isCat);
            break;  
        case "*":
            filteredAnimals = filterData(isDog);
            break;
                                          
    }
    displayList(filteredAnimals);
}


// is cat function
function isCat(animal) {
    if(animal.type === "cat") {
        return true; 
    } else {
        return false;
    }
};

// is dog function
function isDog(animal) {
    if(animal.type === "dog") {
        return true; 
    } else {
        return false;
    }
};

// is all function
function all() {
    return true;
}
// filter allAnimals with correc function and put info filterAnimals 

// call display(filteredAnimals)

async function loadJSON() {
    const response = await fetch("animals.json");
    const jsonData = await response.json();
    
    // when loaded, prepare data objects
    prepareObjects(jsonData);
}

function prepareObjects(jsonData) {
    allAnimals = jsonData.map(preapareObject);

    // TODO: This might not be the function we want to call first
    displayList(allAnimals);
}

function preapareObject( jsonObject ) {
    const animal = Object.create(Animal);
    
    const texts = jsonObject.fullname.split(" ");
    animal.name = texts[0];
    animal.desc = texts[2];
    animal.type = texts[3];
    animal.age = jsonObject.age;

    return animal;
}


function displayList(animals) {
    // clear the list
    document.querySelector("#list tbody").innerHTML = "";

    // build a new list
    animals.forEach(displayAnimal);
}

function displayAnimal(animal) {
    // create clone
    const clone = document.querySelector("template#animal").content.cloneNode(true);

    // set clone data
    clone.querySelector("[data-field=name]").textContent = animal.name;
    clone.querySelector("[data-field=desc]").textContent = animal.desc;
    clone.querySelector("[data-field=type]").textContent = animal.type;
    clone.querySelector("[data-field=age]").textContent = animal.age;

    // append clone to list
    document.querySelector("#list tbody").appendChild(clone);
}


// use filter on all animals and then you can call the displaylist array 