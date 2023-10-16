export function changeDirection(event, direction) {
    let pendingDirection;
    switch (event) {
      case "ArrowLeft":
      case "KeyA":
        if (direction !== "right") {
          pendingDirection = "left";
        }
        break;
  
      case "ArrowRight":
      case "KeyD":
        if (direction !== "left") {
          pendingDirection = "right";
        }
        break;
  
      case "ArrowUp":
      case "KeyW":
        if (direction !== "down") {
          pendingDirection = "up";
        }
        break;
  
      case "ArrowDown":
      case "KeyS":
        if (direction !== "up") {
          pendingDirection = "down";
        }
        break;
    }
    return pendingDirection;
  }
  
  export function switchDirection(snake, direction) {
    for (let i = snake.length - 1; i >= 0; i--) {
      snake[i + 1] = { ...snake[i] };
    }
    switch (direction) {
      case "right":
        snake[0].y += 1;
        break;
      case "left":
        snake[0].y -= 1;
        break;
      case "down":
        snake[0].x += 1;
        break;
      case "up":
        snake[0].x -= 1;
        break;
    }
  }
  
  export function handleInput(store) {
    if (store.pendingDirection) {
      store.direction = store.pendingDirection;
      store.pendingDirection = null;
    }
  }
  
  export function changeFields(store) {
    const { snake, foodIndex, cleanVersionOfFields } = store;
    const newField = JSON.parse(JSON.stringify(cleanVersionOfFields));
  
    snake.forEach((item) => {
      newField[item.x][item.y] = "s";
    });
    newField[snake[0].x][snake[0].y] = "h";
    newField[foodIndex[0]][foodIndex[1]] = "f";
    return newField;
  }
  