    var swiper = new Swiper(".mySwiper", {
      slidesPerView: 3,
      spaceBetween: 10,
     autoplay: true,
    });


document.addEventListener("DOMContentLoaded", () => {
  const radios = document.querySelectorAll('.tip-form input[type="radio"]');
  const customBtn = document.getElementById("custombtn");
  const customLabel = document.querySelector('label[for="custombtn"]');
  const customForm = document.querySelector(".custom-form");
  const customInput = document.getElementById("customAmount");
  const checkBtn = document.querySelector(".custom-form .check");

  const defaultIcon = `<i class="fa-solid fa-ellipsis fs-1"></i>`; // store default icon

  radios.forEach(radio => {
    radio.addEventListener("change", () => {
      customInput.value = radio.nextElementSibling.innerText.trim().replace("$", ""); 

      if (radio.id === "custombtn") {
        customForm.style.display = "block";
        customInput.focus();
      } else {
        customForm.style.display = "none";
      }
    });
  });

  // Allow re-click on custom label to reopen form
  customLabel.addEventListener("click", () => {
    customForm.style.display = "block";
    customInput.focus();
  });

  // Show check button only when input has value
  customInput.addEventListener("input", () => {
    if (customInput.value.trim() !== "") {
      checkBtn.style.display = "inline-block";
    } else {
      checkBtn.style.display = "none";
    }
  });

  // On check click: hide form & update label
  checkBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const value = customInput.value.trim();
    if (value !== "") {
      customLabel.innerHTML = `$${value}`; // show amount
    } else {
      customLabel.innerHTML = defaultIcon; // restore ellipsis
    }
    customForm.style.display = "none";
  });
});



document.addEventListener("DOMContentLoaded", () => {
  const marquee = document.getElementById("marquee");
  const track = document.getElementById("marquee-content");

  let speed = 0.6;
  let position = 0;
  let isDragging = false;
  let startX, dragX;

  // ✅ Store original items before duplicating
  const originals = Array.from(track.querySelectorAll(".staff-box"));

  // ✅ Assign unique IDs/names to originals
  originals.forEach((box, index) => {
    const input = box.querySelector("input[type='radio']");
    const label = box.querySelector("label");
    if (input && label) {
      const uniqueId = `staff-${index}`;
      input.id = uniqueId;
      input.name = "staff-original";
      label.setAttribute("for", uniqueId);
    }
  });

  // ✅ Duplicate items
  track.innerHTML += track.innerHTML;

  // ✅ Re-select all boxes (original + duplicate)
  const allBoxes = track.querySelectorAll(".staff-box");
  const half = allBoxes.length / 2;

  allBoxes.forEach((box, index) => {
    const input = box.querySelector("input[type='radio']");
    const label = box.querySelector("label");

    if (index >= half) {
      // 🎯 duplicate half
      const mirror = allBoxes[index - half].querySelector("input[type='radio']");
      const uniqueId = `staff-dup-${index}`;
      input.id = uniqueId;
      input.name = "staff-duplicate"; // different group
      label.setAttribute("for", uniqueId);

      // 🔄 Sync duplicate -> original
      input.addEventListener("change", () => {
        if (input.checked) mirror.checked = true;
      });

      // 🔄 Sync original -> duplicate
      mirror.addEventListener("change", () => {
        if (mirror.checked) input.checked = true;
      });
    }
  });

  // ✅ Now set Maria as default checked
  const mariaOriginal = Array.from(document.querySelectorAll("input[name='staff-original']"))
    .find(input => input.value.toLowerCase() === "maria");
  if (mariaOriginal) {
    mariaOriginal.checked = true;
    // also trigger change so duplicate stays in sync
    mariaOriginal.dispatchEvent(new Event("change"));
  }

  // ✅ Auto-scrolling animation
  function animate() {
    if (!isDragging) {
      position -= speed;
    }
    const singleWidth = track.scrollWidth / 2;
    if (position <= -singleWidth) {
      position += singleWidth;
    }
    if (position >= 0) {
      position -= singleWidth;
    }
    track.style.transform = `translateX(${position}px)`;
    requestAnimationFrame(animate);
  }
  animate();

  // ✅ Mouse drag
  marquee.addEventListener("mousedown", e => {
    isDragging = true;
    startX = e.pageX - position;
    marquee.style.cursor = "grabbing";
  });
  marquee.addEventListener("mousemove", e => {
    if (!isDragging) return;
    dragX = e.pageX - startX;
    position = dragX;
  });
  marquee.addEventListener("mouseup", () => {
    isDragging = false;
    marquee.style.cursor = "grab";
  });
  marquee.addEventListener("mouseleave", () => {
    isDragging = false;
    marquee.style.cursor = "grab";
  });

  // ✅ Touch drag
  marquee.addEventListener("touchstart", e => {
    isDragging = true;
    startX = e.touches[0].pageX - position;
  });
  marquee.addEventListener("touchmove", e => {
    if (!isDragging) return;
    dragX = e.touches[0].pageX - startX;
    position = dragX;
  });
  marquee.addEventListener("touchend", () => {
    isDragging = false;
  });
});







