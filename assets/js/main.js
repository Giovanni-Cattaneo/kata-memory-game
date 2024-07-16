console.log("Hello world");

let container = document.getElementById("container");
const markup = `<div class="box"><i class="fa-solid fa-diamond"></i></div>`;

console.log(container);

let hard = document.getElementById("hard")

let myArray = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];

let flipArray = []
let successArray = []
let errorContainer = document.getElementById("error")
let errors = 0

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffle(myArray);

function verify(array, boxes) {
    let redElements = document.querySelectorAll(".red")
    if (array.length == 2) {
        if (flipArray[0] == flipArray[1]) {
            console.log("corrispondono")
            if (!successArray.includes(flipArray[0] || !successArray.includes(flipArray[1]))) {
                successArray.push(flipArray[0], flipArray[1])
                console.log(successArray)
            }
            flipArray = []
        } else {
            let goldenChild = `<i class="fa-solid fa-diamond">`
            boxes.insertAdjacentHTML("beforeend", goldenChild)
            console.log("non corrispondono");
            errors++;
            console.log(errors);
            errorContainer.innerText = `Errori: ${errors}`;
            setTimeout(() => {
                flipArray = [];
                redElements.forEach(redElement => {
                    let iconElement = redElement.querySelector('i');
                    let iconClass = iconElement ? iconElement.className : '';
                    let iconValue;

                    if (iconClass.includes('fa-dragon')) {
                        iconValue = 1;
                    } else if (iconClass.includes('fa-otter')) {
                        iconValue = 2;
                    } else if (iconClass.includes('fa-hippo')) {
                        iconValue = 3;
                    } else if (iconClass.includes('fa-dog')) {
                        iconValue = 4;
                    } else if (iconClass.includes('fa-cat')) {
                        iconValue = 5;
                    } else if (iconClass.includes('fa-frog')) {
                        iconValue = 6;
                    }

                    if (!successArray.includes(iconValue)) {
                        redElement.innerHTML = "";
                        redElement.classList.remove("red");
                    }
                });
            }, 300);
        }
        // else {  mantenere per una versione hardcore del gioco
        //     console.log("non corrispondono")
        //     errors++
        //     console.log(errors)
        //     errorContainer.innerText = Errori: ${errors}
        //     setTimeout(() => {
        //         flipArray = []
        //         redElements.forEach(redElement => {
        //             if (!successArray.includes(redElement)) {
        //                 redElement.innerHTML = "";
        //                 redElement.classList.remove("red");
        //             }
        //         });
        //     }, 300)

        // }

    }
    if (successArray.length == 12) {
        alert("congratulazioni hai vinto")
    }
}

function start() {
    for (let index = 0; index < myArray.length; index++) {
        container.insertAdjacentHTML("beforeend", markup);
    }

    let boxes = document.getElementsByClassName("box");
    for (let index = 0; index < boxes.length; index++) {
        const element = boxes[index];


        element.addEventListener("click", function () {
            if (!element.classList.contains("red")) {
                let child = element.querySelector(".fa-diamond")
                if (child) {
                    element.removeChild(child)
                }
                if (myArray[index] == 1) {
                    element.insertAdjacentHTML("beforeend", `<i class="fa-solid fa-dragon"></i>`);
                } else if (myArray[index] == 2) {
                    element.insertAdjacentHTML("beforeend", `<i class="fa-solid fa-otter"></i>`);
                } else if (myArray[index] == 3) {
                    element.insertAdjacentHTML("beforeend", `<i class="fa-solid fa-hippo"></i>`);
                } else if (myArray[index] == 4) {
                    element.insertAdjacentHTML("beforeend", `<i class="fa-solid fa-dog"></i>`);
                }
                else if (myArray[index] == 5) {
                    element.insertAdjacentHTML("beforeend", `<i class="fa-solid fa-cat"></i>`);
                }
                else if (myArray[index] == 6) {
                    element.insertAdjacentHTML("beforeend", `<i class="fa-solid fa-frog"></i>`);
                }
                flipArray.push(myArray[index])

                element.classList.add("red");
                verify(flipArray, boxes)
            }
        });
    }
}

start();