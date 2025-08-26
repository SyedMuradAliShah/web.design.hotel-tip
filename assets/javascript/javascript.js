document.addEventListener("DOMContentLoaded", () => { const staffRadios = document.querySelectorAll('input[name="staff"]'); const buttonSec = document.querySelector(".button-sec"); staffRadios.forEach(radio => { radio.addEventListener("change", () => { if (radio.checked) { buttonSec.classList.add("active"); } }); }); });

document.addEventListener("DOMContentLoaded", () => {
  const radios = document.querySelectorAll('.tip-form input[type="radio"]');
  const customBtn = document.getElementById("custombtn");
  const customForm = document.querySelector(".custom-form");
  const customInput = document.getElementById("customAmount");

  let lastSelectedValue = ""; // store the last clicked radio value

  radios.forEach(radio => {
    radio.addEventListener("change", () => {
      // store value of any radio click
      lastSelectedValue = radio.nextElementSibling.innerText.trim();

      // always put radio value into input
      customInput.value = lastSelectedValue.replace("$", ""); 

      if (radio.id === "custombtn") {
        // show custom form only when custom button clicked
        customForm.style.display = "block";
        customInput.focus();
      } else {
        // hide when normal radio selected
        customForm.style.display = "none";
      }
    });
  });
});

