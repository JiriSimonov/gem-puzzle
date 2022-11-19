import { STATE } from "../data/globals.js";

export const timer = { time: 0, qtime: 0, gtime: 0 };

export function startTimer(elem, isAlreadyStarted, player) {
  if (!isAlreadyStarted) {
    return setInterval(function () {
      timer.time += 1/60;
      player.value = timer.time;
      const minutesValue = Math.floor(timer.time / 60) ;
      const secondsValue = Math.floor(Math.floor(timer.time) - Math.floor(timer.time / 60) * 60);
      printTime((elem = elem), secondsValue, minutesValue);
    }, 1000/60);
  }
  return isAlreadyStarted;
}

export function startQTimer(elem, isAlreadyStarted, player) {
  if (!isAlreadyStarted) {
    return setInterval(function () {
      timer.qtime += 1/60;
      player.value = timer.qtime;
      const minutesValue = Math.floor(timer.qtime / 60) ;
      const secondsValue = Math.floor(Math.floor(timer.qtime) - Math.floor(timer.qtime / 60) * 60);
      printQTime((elem = elem), secondsValue, minutesValue);
    }, 1000/60);
  }
  return isAlreadyStarted;
}

export function startGTimer(elem, isAlreadyStarted, player) {
  if (!isAlreadyStarted) {
    return setInterval(function () {
      timer.gtime += 1/60;
      player.value = timer.gtime;
      const minutesValue = Math.floor(timer.gtime / 60) ;
      const secondsValue = Math.floor(Math.floor(timer.gtime) - Math.floor(timer.gtime / 60) * 60);
      printQTime((elem = elem), secondsValue, minutesValue);
    }, 1000/60);
  }
  return isAlreadyStarted;
}

export function stopTimer() {
  clearInterval(STATE.isStartTimer);
  STATE.isStartTimer = null;
}

export function stopQTimer() {
  clearInterval(STATE.isStartQTimer);
  STATE.isStartQTimer = null;
}

export function stopGTimer() {
  clearInterval(STATE.isStartGTimer);
  STATE.isStartGTimer = null;
}

export function printTime(elem, sec, min) {
  elem.textContent = `${min < 10 ? min.toString().padStart(2, "0") : min}:${
    sec < 10 ? sec.toString().padStart(2, "0") : sec
  }`;
}

export function printQTime(elem, sec, min) {
  elem.textContent = `${min < 10 ? min.toString().padStart(2, "0") : min}:${
    sec < 10 ? sec.toString().padStart(2, "0") : sec
  }`;
}
 