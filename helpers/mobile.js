import { store } from "./store.js";
import { changeDirection } from "./change_direction.js";

function start(fields) {
  fields.addEventListener("touchstart", handleTouchStart);
  fields.addEventListener("touchmove", handleTouchMove);
  fields.addEventListener("touchend", handleTouchEnd);
}

function handleTouchStart(e) {
  e.preventDefault();
  store.touch.touchStartX = e.touches[0].clientX;
  store.touch.touchStartY = e.touches[0].clientY;
}

function handleTouchMove(e) {
  const deltaX = e.touches[0].clientX - store.touch.touchStartX;
  const deltaY = e.touches[0].clientY - store.touch.touchStartY;

  if (
    Math.abs(deltaX) > store.touch.touchThreshold ||
    Math.abs(deltaY) > store.touch.touchThreshold
  ) {
    const eventCode = calculateDirection(deltaX, deltaY);
    store.pendingDirection = changeDirection(eventCode, store.direction);

    store.touch.touchStartX = e.touches[0].clientX;
    store.touch.touchStartY = e.touches[0].clientY;
  }
}

function handleTouchEnd(e) {
  e.preventDefault();
}

function calculateDirection(deltaX, deltaY) {
  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    if (deltaX < 0) return "ArrowLeft";
    if (deltaX > 0) return "ArrowRight";
  } else if (Math.abs(deltaY) > Math.abs(deltaX)) {
    if (deltaY < 0) return "ArrowUp";
    if (deltaY > 0) return "ArrowDown";
  }

  return null;
}

export default start;
