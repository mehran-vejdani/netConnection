const popup = document.querySelector(".popup");
const wifiIcon = document.querySelector(".icon i");
const popupTitle = document.querySelector(".popup .title");
const popupDesc = document.querySelector(".desc");
const reconnectBtn = document.querySelector(".reconnect");
let isOnine = true,
  intervalId,
  timer = 10;
const chekConnection = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    isOnine = response.status >= 200 && response.status < 300;
  } catch (error) {
    isOnine = false;
  }
  timer = 10;
  clearInterval(intervalId);
  haldelPopup(isOnine);
};
const haldelPopup = (status) => {
  if (status) {
    wifiIcon.className = "fa fa-wifi";
    popupTitle.innerText = "Restor Connection";
    popupDesc.innerHTML = " success";
    popup.classList.add("online");
    return setTimeout(() => popup.classList.remove("show"), 2000);
  }
  wifiIcon.className = "fa fa-wifi";
  popupTitle.innerText = "Lost Connection";
  popupDesc.innerHTML =
    " Your network is unavailable.we will attempt <b>10</b> seconds";
  popup.className = "popup show";
  intervalId = setInterval(() => {
    timer--;
    if (timer === 0) chekConnection();
    popup.querySelector(".desc b").innerText = timer;
  }, 1000);
};
setInterval(() => isOnine && chekConnection(), 3000);
reconnectBtn.addEventListener("click", chekConnection);
