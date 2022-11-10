import { STATE } from "../data/globals.js";

export const timer = { time: 0 };

export function startTimer(elem, isAlreadyStarted, player) {
  if (!isAlreadyStarted) {
    return setInterval(function () {
      timer.time += 1;
      player.value = timer.time;
      const minutesValue = Math.floor(timer.time / 60);
      const secondsValue =
        Math.floor(timer.time) - Math.floor(timer.time / 60) * 60;
      printTime((elem = elem), secondsValue, minutesValue);
    }, 1000);
  }
  return isAlreadyStarted;
}

export function stopTimer() {
  clearInterval(STATE.isStartTimer);
  STATE.isStartTimer = null;
}

export function printTime(elem, sec, min) {
  elem.textContent = `${min < 10 ? min.toString().padStart(2, "0") : min}:${
    sec < 10 ? sec.toString().padStart(2, "0") : sec
  }`;
}
