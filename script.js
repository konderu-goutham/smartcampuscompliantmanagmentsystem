const API_URL = "https://smart-campus-backend-abcd.onrender.com/api/complaints";

const complaintForm = document.getElementById("complaintForm");
const formMessage = document.getElementById("formMessage");
const trackButton = document.getElementById("trackButton");
const trackResult = document.getElementById("trackResult");

complaintForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const complaint = {
        studentName: document.getElementById("studentName").value.trim(),
        rollNumber: document.getElementById("rollNumber").value.trim(),
        category: document.getElementById("category").value,
        description: document.getElementById("description").value.trim()
    };

    try {
        formMessage.textContent = "Submitting complaint...";

        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(complaint)
        });

        if (!response.ok) {
            throw new Error("Server returned error " + response.status);
        }

        const savedComplaint = await response.json();

        formMessage.textContent =
            "Complaint submitted successfully! Your Complaint ID is " +
            savedComplaint.id;

        complaintForm.reset();

    } catch (error) {
        formMessage.textContent =
            "Could not submit complaint. Please try again.";
        console.error(error);
    }
});

trackButton.addEventListener("click", async function () {
    const id = document.getElementById("complaintId").value.trim();

    if (!id || Number(id) < 1) {
        trackResult.textContent = "Please enter a valid complaint ID.";
        return;
    }

    try {
        trackResult.textContent = "Checking complaint...";

        const response = await fetch(
            `${API_URL}/${encodeURIComponent(id)}`
        );

        if (response.status === 404) {
            trackResult.textContent = "Complaint ID not found.";
            return;
        }

        if (!response.ok) {
            throw new Error("Server returned error " + response.status);
        }

        const complaint = await response.json();

        trackResult.textContent =
            "Complaint ID: " + complaint.id +
            " | Status: " + complaint.status;

    } catch (error) {
        trackResult.textContent =
            "Could not connect to the server. Please try again.";
        console.error(error);
    }
});

