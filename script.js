const complaintForm = document.getElementById("complaintForm");
const formMessage = document.getElementById("formMessage");
const trackButton = document.getElementById("trackButton");
const trackResult = document.getElementById("trackResult");

complaintForm.addEventListener("submit", function (event) {
  event.preventDefault();

  formMessage.textContent =
    "Frontend test successful! Backend connection will be added next.";

  complaintForm.reset();
});

trackButton.addEventListener("click", function () {
  const id = document.getElementById("complaintId").value;

  if (!id) {
    trackResult.textContent = "Please enter a complaint ID.";
    return;
  }

  trackResult.textContent =
    "Frontend test successful. Backend tracking will be connected next.";
});
