export function setActiveSection(arr, num) {
  for (let i = 0; i < arr.length; i++) {
    if (i === num) {
      arr[i].classList.add("active");
    } else {
      arr[i].classList.remove("active");
    }
  }
}
