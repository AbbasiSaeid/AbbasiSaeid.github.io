const countDownDate = new Date("2025-06-01T23:59:59").getTime();
const timerTextEl = document.querySelector(".timer-text");

const timerMode = 'simple'; // 'full' or 'simple'

const toPersianDigits = str =>
  str.toString().replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);

const formatNumber = num => num.toString().padStart(2, "0");

const countdown = setInterval(() => {
  const now = new Date().getTime();
  const distance = countDownDate - now;

  if (distance < 0) {
    clearInterval(countdown);
    timerTextEl.innerHTML = "🎉 زمان به پایان رسید!";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  if (timerMode === 'full') {
    timerTextEl.innerHTML = toPersianDigits(
      `${days} روز و ${formatNumber(hours)} ساعت و ${formatNumber(minutes)} دقیقه و ${formatNumber(seconds)} ثانیه`
    );
  } else if (timerMode === 'simple') {
    const totalHours = days * 24 + hours;
    timerTextEl.innerHTML = toPersianDigits(
      `${formatNumber(totalHours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`
    );
  }

}, 1000);



const arrowButton = document.getElementById("scrollArrow");

arrowButton.addEventListener("click", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
    // At or near bottom → scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    // Not at bottom → scroll down
    window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
  }
});

// Change arrow direction based on scroll position
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
    arrowButton.classList.add("up");
  } else {
    arrowButton.classList.remove("up");
  }
});

