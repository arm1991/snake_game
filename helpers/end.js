export function checkLose(store) {
    const { fields, snake } = store;
    let state;
    for (let i = 0; i < snake.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y && i !== 0) {
            state = "end"
        }
        if(fields[snake[i].x][snake[i].y] === "w") {
            state = "end";
        }
    }
    return state;
}

export function changeDisplayWhenTheGameEnds(dom) {
    dom.restartDiv.style.display = "flex";
    dom.fields.style.display = "none";
    dom.table.style.display = "none";
  }