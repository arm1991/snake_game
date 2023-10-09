export function createDom(store) {
    store.domElements.fields.innerHTML = "";
    store.domElements.fields.appendChild(drawSnake(store))
}

function drawSnake(store) {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < store.fields.length; i++) {
        const row = document.createElement("div");
        row.classList.add("row");
        for (let j = 0; j < store.fields[i].length; j++) {
            const field = createField(document.createElement("div"), store.fields[i][j], j + i, store.direction)
            field.classList.add("field");
            row.appendChild(field);
        }
        fragment.appendChild(row);
    }
    return fragment;
}

function createField(div, field, index, direction) {
    let img;
    switch (field) {
        case "h":
            img = createImage(document.createElement('img'), "./assets/image_processing20210706-12803-1ru9ef9.png", field);
            img = imgHead(img, direction)
            div.appendChild(img);
            break;
        case "s":
            div.classList.add("body");
            break;
        case "f":
            img = createImage(document.createElement('img'),"./assets/apple.png", field);
            div.appendChild(img);
            break;
        case "w":
            div.style.backgroundColor = "#228B22"
            break;
    }
    if(field !== "w" && field !== "s") {
        if(index % 2 === 0) {
            div.style.backgroundColor = "#c1f376"
        }
        else {
            div.style.backgroundColor = "#a1df50"
        }
    }
    return div;
}

function createImage(img, src, field) {
    if (field === "f") {
        img.style.maxWidth = "80%";
        img.style.maxHeight = "80%"
    }
    img.setAttribute("src", src);
    return img;
}

function imgHead(img, direction) {
    img.removeAttribute('class');
    switch(direction) {
        case "right":
            img.classList.add("right");
            break;
        case "left":
            img.classList.add("left");
            break;
        case "up":
            img.classList.add("up");
            break;
        case "down":
            img.classList.add("down");
            break;
    }
    return img;
}

export function createHighestScore(div, store) {
    div.classList.add("highest-score")
    div.innerHTML = `<p>Your Highest Score Is ${store.data.find(user => user.id === store.currentUser).highScore}</p>`
    return div;
}

export function createHighestScoreTable(div, store) {
    div.classList.add("high-score-table");
    const sortedData = store.data.sort((a, b) => b.highScore - a.highScore);
    for (let i = 0; i < 5 && sortedData[i]; i++) {
        const p = `<p class="person-info">${i + 1}. ${sortedData[i].username}'s Highest Score Is ${sortedData[i].highScore}</p>`
        div.innerHTML += p;
    }
    return div;
}