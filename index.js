import { store, saveNewData, clearStore } from "./helpers/store.js";
import { generateRandomFoodPosition, checkFood } from "./helpers/food.js";
import { createDom, createHighestScoreTable, createHighestScore } from "./helpers/create_field.js";
import { changeDirection, switchDirection, handleInput, changeFields } from "./helpers/change_direction.js";
import { logInFunc } from "./helpers/log_in.js";
import { checkLose } from "./helpers/end.js";

document.addEventListener('DOMContentLoaded', () => {
    store.domElements.logInBtn.addEventListener("click", () => {
        logInFunc(store);
		main(store)
    });
});

function main(store) {
    generateRandomFoodPosition(store);
    createDom(store);
    showHighScore(store)
    store.interval = setInterval(() => {
        handleInput(store);
        if(store.state !== "end") snakeMovement(store);
        if(store.state === "end") {
            setTimeout(() => {
                saveNewData(store)
                changeDisplayWhenTheGameEnds(store.domElements);
                clearInterval(store.interval);
            },8000);
        }
    }, 280);
}

function changeDisplayWhenTheGameEnds(dom) {
    dom.restartDiv.style.display = "flex";
    dom.fields.style.display = "none";
    dom.table.style.display = "none";
}

function showHighScore(store) {
    store.domElements.table.innerHTML = "";
    store.domElements.table.style.display = "flex";

    store.domElements.table.appendChild(createHighestScore(document.createElement("div"), store));
    store.domElements.table.appendChild(createHighestScoreTable(document.createElement("div"), store));
}

function snakeMovement(store) {
    const { snake, makeLarger, direction } = store;
    switchDirection(snake, direction);

    if(makeLarger === false) {
        snake.pop();
    }
    store.makeLarger = false;

    if(checkLose(store) === "end") {
        store.state = "end";
    }
    checkFood(store);
    store.fields = changeFields(store);
    createDom(store);
}

document.addEventListener("keyup",(e) => {
    store.pendingDirection = changeDirection(e.code, store.direction)
});

function restart (store) {
    store.domElements.restartBtn.addEventListener("click", () => {
        store.domElements.restartDiv.style.display = "none";
        store.domElements.fields.style.display = "flex";

        clearStore(store);
        main(store);
    })
}

restart(store);
