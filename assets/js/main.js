console.log("Hello world");

let container = document.getElementById("container");
const markup = `<div class="box"><i class="fa-solid fa-diamond"></i></div>`;

console.log(container);

let hard = document.getElementById("hard")

let myArray = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];

let flipArray = []

let boxes = document.getElementsByClassName("box");

let retry = document.getElementById("retry")

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

function verify(array, element) {
    let redElements = document.querySelectorAll(".red")


    // disabilita le card
    function disableAllCards() {
        Array.from(boxes).forEach(box => {
            box.style.pointerEvents = 'none';
        })
    }

    // riabilita le card
    function enableAllCards() {
        Array.from(boxes).forEach(box => {
            box.style.pointerEvents = 'auto';
        })

    }


    if (array.length == 2) {
        disableAllCards(); // appena ne abbiamo cliccate due disabilita il click
        if (flipArray[0] == flipArray[1]) {
            //console.log("Corrispondono")
            let matchingValue = flipArray[0];
            redElements.forEach(redElement => {
                let iconElement = redElement.querySelector('i');
                let iconClass = iconElement ? iconElement.className : '';

                if ((matchingValue == 1 && iconClass.includes('fa-dragon')) ||
                    (matchingValue == 2 && iconClass.includes('fa-otter')) ||
                    (matchingValue == 3 && iconClass.includes('fa-hippo')) ||
                    (matchingValue == 4 && iconClass.includes('fa-dog')) ||
                    (matchingValue == 5 && iconClass.includes('fa-cat')) ||
                    (matchingValue == 6 && iconClass.includes('fa-frog'))) {
                    redElement.classList.add("green");
                }
            })
            if (!successArray.includes(flipArray[0])) {
                successArray.push(flipArray[0])
            }
            flipArray = []
            enableAllCards(); //riabilitiam0 le carte alla fine della verifica
        } else {
            console.log("Non corrispondono");
            errors++;
            console.log(errors);
            errorContainer.innerText = `Errori: ${errors}`;
            setTimeout(() => {
                flipArray = [];
                redElements.forEach(redElement => {
                    let iconElement = redElement.querySelector('i')
                    let iconClass = iconElement ? iconElement.className : ''
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
                        redElement.innerHTML = '<i class="fa-solid fa-diamond"></i>';
                        redElement.classList.remove("red");
                    }
                });
                enableAllCards() //riabilitiamo le carte alla fine della verifica
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
        if (successArray.length === 6) {
            alert("Congratulazioni, hai vinto!");
        }
    }
}

function start() {

    for (let index = 0; index < myArray.length; index++) {
        container.insertAdjacentHTML("beforeend", markup);
    }



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
                } else if (myArray[index] == 5) {
                    element.insertAdjacentHTML("beforeend", `<i class="fa-solid fa-cat"></i>`);
                } else if (myArray[index] == 6) {
                    element.insertAdjacentHTML("beforeend", `<i class="fa-solid fa-frog"></i>`);
                }
                flipArray.push(myArray[index])

                element.classList.add("red");
                verify(flipArray, element);
            }
        });
    }
}

retry.addEventListener("click", function () {
    console.log("hello world")
    console.log(boxes)
    if (!errors == 0) {
        errors = 0
        errorContainer.innerText = `Errori: ${errors}`;
    }
    Array.from(boxes).forEach(box => {
        box.remove();
    });
    successArray = []
    shuffle(myArray)
    start()
})

start();