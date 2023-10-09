export const store = {
    interval: null,
    currentUser: null,
    currentScore: 0,
    pendingDirection: null,
    snake: [{x: 1,y: 1}],
    makeLarger: false,
    direction: "right",
    foodIndex: [null, null],
    state: null,
    cleanVersionOfFields: [
        ["w","w","w","w","w","w","w","w","w","w","w","w"],
        ["w", "", "", "", "", "", "", "","" ,"" ,"" ,"w"],
        ["w", "", "", "", "", "", "", "","" ,"" ,"" ,"w"],
        ["w", "", "", "", "", "", "", "","" ,"" ,"" ,"w"],
        ["w", "", "", "", "", "", "", "","" ,"" ,"" ,"w"],
        ["w", "", "", "", "", "", "", "","" ,"" ,"" ,"w"],
        ["w", "", "", "", "", "", "", "","" ,"" ,"" ,"w"],
        ["w", "", "", "", "", "", "", "","" ,"" ,"" ,"w"],
        ["w", "", "", "", "", "", "", "","" ,"" ,"" ,"w"],
        ["w", "", "", "", "", "", "", "","" ,"" ,"" ,"w"],
        ["w", "", "", "", "", "", "", "","" ,"" ,"" ,"w"],
        ["w","w","w","w","w","w","w","w","w","w","w","w"]
    ],
    fields: [
        ["w","w","w","w","w","w","w","w","w","w","w","w"],
        ["w","h", "", "", "", "", "", "","" ,"" ,"" ,"w"],
        ["w", "", "", "", "", "", "", "","" ,"" ,"" ,"w"],
        ["w", "", "", "", "", "", "", "","" ,"" ,"" ,"w"],
        ["w", "", "", "", "", "", "", "","" ,"" ,"" ,"w"],
        ["w", "", "", "", "", "", "", "","" ,"" ,"" ,"w"],
        ["w", "", "", "", "", "", "", "","" ,"" ,"" ,"w"],
        ["w", "", "", "", "", "", "", "","" ,"" ,"" ,"w"],
        ["w", "", "", "", "", "", "", "","" ,"" ,"" ,"w"],
        ["w", "", "", "", "", "", "", "","" ,"" ,"" ,"w"],
        ["w", "", "", "", "", "", "", "","" ,"" ,"" ,"w"],
        ["w","w","w","w","w","w","w","w","w","w","w","w"]
    ],
    domElements: {
        fields: document.querySelector(".fields"),
        restartDiv: document.querySelector(".restart"),
        logInBtn: document.querySelector(".log-in-button"),
        restartBtn: document.querySelector(".restart-btn"),
        username: document.querySelector(".log-in-username"),
        logInDiv: document.querySelector(".log-in"),
        table: document.querySelector(".table"),
    },
    data: [],
}

export function saveData(store) {
	localStorage.setItem("data", JSON.stringify(store.data));
}

export function getData(store) {
	store.data = JSON.parse(localStorage.getItem("data")) || [];
}

export function saveNewData(store) {
    const user = store.data.find(user => user.id === store.currentUser);
    if(user.highScore < store.currentScore) {
        user.highScore = store.currentScore;
    }
    saveData(store);
}


export function clearStore(store) {
    store.fields = JSON.parse(JSON.stringify(store.cleanVersionOfFields));
    store.pendingDirection = null;
    store.snake = [{x: 1,y: 1}];
    store.makeLarger = false;
    store.direction = "right";
    store.foodIndex = [null, null];
    store.state = null;
    store.currentScore = 0;
    store.fields[store.snake[0].x][store.snake[0].y] = "h";
}