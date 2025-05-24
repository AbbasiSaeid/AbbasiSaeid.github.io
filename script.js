const toPersianDigits = (str) =>
  str.toString().replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d]);

const countdownDate = new Date("2025-06-01T23:59:59").getTime();

const dayEl = document.getElementById("day");
const hourEl = document.getElementById("hour");
const minuteEl = document.getElementById("minute");

setInterval(() => {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  if (distance < 0) return;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  dayEl.textContent = toPersianDigits(days);
  hourEl.textContent = toPersianDigits(hours.toString().padStart(2, '0'));
  minuteEl.textContent = toPersianDigits(minutes.toString().padStart(2, '0'));
}, 1000);




// const countDownDate = new Date("2025-06-01T23:59:59").getTime();
// const timerTextEl = document.querySelector(".timer-text");

// const timerMode = 'full'; // 'full' or 'simple'

// const toPersianDigits = str =>
//   str.toString().replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);

// const formatNumber = num => num.toString().padStart(2, "0");

// const countdown = setInterval(() => {
//   const now = new Date().getTime();
//   const distance = countDownDate - now;

//   if (distance < 0) {
//     clearInterval(countdown);
//     timerTextEl.innerHTML = "🎉 زمان به پایان رسید!";
//     return;
//   }

//   const days = Math.floor(distance / (1000 * 60 * 60 * 24));
//   const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//   const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//   const seconds = Math.floor((distance % (1000 * 60)) / 1000);

//   if (timerMode === 'full') {
//     timerTextEl.innerHTML = toPersianDigits(
//       // `${days} روز و ${formatNumber(hours)} ساعت و ${formatNumber(minutes)} دقیقه و ${formatNumber(seconds)} ثانیه`
//       `${days} روز و ${formatNumber(hours)} ساعت و ${formatNumber(minutes)} دقیقه`
//     );
//   } else if (timerMode === 'simple') {
//     const totalHours = days * 24 + hours;
//     timerTextEl.innerHTML = toPersianDigits(
//       `${formatNumber(totalHours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`
//     );
//   }

// }, 1000);



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




const questions = document.querySelectorAll('.qa-question');

questions.forEach((q) => {
  q.addEventListener('click', () => {
    const answer = q.nextElementSibling;
    const isOpen = answer.style.display === 'block';

    // Close all answers
    document.querySelectorAll('.qa-answer').forEach(a => a.style.display = 'none');
    document.querySelectorAll('.qa-question').forEach(btn => btn.classList.remove('active'));

    // Toggle clicked one
    if (!isOpen) {
      answer.style.display = 'block';
      q.classList.add('active');
    }
  });
});





// 
// 
// 
const sheetURL = 'https://api.sheetbest.com/sheets/693521a9-32fb-42e9-bc2c-6447a06be207'; // replace with your real one

fetch(sheetURL)
  .then(res => res.json())
  .then(data => {
    const sorted = data
      .filter(item => item.image_url && item.title)
      .sort((a, b) => Number(a.order) - Number(b.order));

    sorted.forEach(item => {
      const slide = document.createElement("div");
      slide.className = "swiper-slide";
      slide.innerHTML = `
        <a href="${item.link || '#'}" target="_blank" class="product-card">
          <img src="${item.image_url}" alt="${item.title}" />
          <h4>${item.title}</h4>
          <p><del>${item.price} تومان</del> <strong>${item.sale_price} تومان</strong></p>
        </a>
      `;
      document.getElementById("campaign-carousel").appendChild(slide);
    });

    new Swiper(".second-swiper", {
      slidesPerView: 1.5,
      spaceBetween: 10,
      breakpoints: {
        768: {
          slidesPerView: 4,
          spaceBetween: 20
        }
      }
    });
  });

