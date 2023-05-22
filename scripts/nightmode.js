toggleCheckbox.addEventListener("change", () => {
  if (toggleCheckbox.checked) {
    bodyElement.style.backgroundColor = "#242426";
    contentDivOne.style.color = "#f8f9fa";
    contentDivTwo.style.color = "#f8f9fa";
  } else {
    bodyElement.style.backgroundColor = "#f8f9fa";
    contentDivOne.style.color = "#5e5e66";
    contentDivTwo.style.color = "#5e5e66";
  }
});
