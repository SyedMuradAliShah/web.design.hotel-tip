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



