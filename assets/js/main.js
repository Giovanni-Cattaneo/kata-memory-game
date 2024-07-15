console.log("Hello world")

let container = document.getElementById("container")
let numbers = document.getElementsByClassName("numbers")

console.log(container, numbers)

for (let index = 1; index < 13; index++) {
    console.log(index)

    container.innerHTML = index

}