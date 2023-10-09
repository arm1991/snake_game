export function generateRandomFoodPosition(store) {
    const { fields } = store;
    store.foodIndex = store.foodIndex.map(() => {
        return getRandomNumber(10) + 1;
    })
    if(fields[store.foodIndex[0]][store.foodIndex[1]] === "s" ||
       fields[store.foodIndex[0]][store.foodIndex[1]] === "f" ||
       fields[store.foodIndex[0]][store.foodIndex[1]] === "h") {
        generateRandomFoodPosition(store)
    }
}

function getRandomNumber(number) {
    return Math.floor(Math.random() * number);
}

export function checkFood(store) {
    const { fields, snake } = store;
    if(fields[snake[0].x][snake[0].y] === "f"){
        store.makeLarger = true;
        store.currentScore += 1;
        generateRandomFoodPosition(store)
    }
}