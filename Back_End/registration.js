document.getElementById("registrationForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const voter_id = document.getElementById("voter_id").value;
    const age = document.getElementById("age").value;
    const address = document.getElementById("address").value;

    const message = document.getElementById("message");
    const loader = document.getElementById("loader");
    const btn = document.getElementById("submitBtn");

    // Frontend validation
    if (!name || !voter_id || !age || !address) {
        message.style.color = "red";
        message.innerText = "⚠️ All fields are required!";
        return;
    }

    if (age < 18) {
        message.style.color = "red";
        message.innerText = "❌ You must be 18+ to register";
        return;
    }

    // Show loader
    loader.classList.remove("hidden");
    btn.disabled = true;
    btn.innerText = "Registering...";
    message.innerText = "";

    try {
        const response = await fetch("http://127.0.0.1:5000/register_voter", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, voter_id, age, address })
        });

        const result = await response.json();

        message.style.color = response.ok ? "lightgreen" : "red";
        message.innerText = result.message;

    } catch (error) {
        message.style.color = "red";
        message.innerText = "❌ Server error. Try again!";
    }

    // Hide loader
    loader.classList.add("hidden");
    btn.disabled = false;
    btn.innerText = "Register";
});
