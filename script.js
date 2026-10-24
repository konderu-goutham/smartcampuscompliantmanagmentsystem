const API_URL = "https://YOUR-RENDER-SERVICE.onrender.com/api/complaints";

const complaintForm = document.getElementById("complaintForm");
const formMessage = document.getElementById("formMessage");
const trackButton = document.getElementById("trackButton");
const trackResult = document.getElementById("trackResult");

complaintForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    try {
        const formData = Object.fromEntries(
            new FormData(complaintForm).entries()
        );

        formMessage.textContent = "Submitting complaint...";

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error("Could not submit complaint.");
        }

        const complaint = await response.json();

        formMessage.textContent =
            "Complaint submitted successfully! Your complaint ID is: " +
            complaint.id;

        complaintForm.reset();

    } catch (error) {
        formMessage.textContent =
            "Submission failed. Please try again.";
        console.error(error);
    }
});

trackButton.addEventListener("click", async function () {
    const id = document.getElementById("complaintId").value.trim();

    if (!id) {
        trackResult.textContent = "Please enter a complaint ID.";
        return;
    }

    try {
        trackResult.textContent = "Checking complaint...";

        const response = await fetch(`${API_URL}/${encodeURIComponent(id)}`);

        if (response.status === 404) {
            trackResult.textContent = "Complaint ID not found.";
            return;
        }

        if (!response.ok) {
            throw new Error("Unable to track complaint.");
        }

        const complaint = await response.json();

        trackResult.textContent =
            `Complaint ID: ${complaint.id} | Status: ${complaint.status}`;

    } catch (error) {
        trackResult.textContent =
            "Unable to connect to the server. Please try again.";
        console.error(error);
    }
});
