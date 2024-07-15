console.log("Hello world");

let container = document.getElementById("container");
const markup = `<div class="box"></div>`;

console.log(container);

let myArray = [];

function start() {
    for (let index = 1; index <= 12; index++) {
        myArray.push(index);
        container.insertAdjacentHTML("beforeend", markup);
    }

    let boxes = document.getElementsByClassName("box");
    for (let index = 0; index < boxes.length; index++) {
        const element = boxes[index];

        element.insertAdjacentText("beforeend", index)

        element.addEventListener("click", function () {
            element.classList.add("red")
        })
        console.log(element);
    }
}

start();