// Sign Up
document.getElementById('signupForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    alert("Sign Up Successful! Redirecting to Sign In...");
    window.location.href = "signin.html";
});

// Sign In
document.getElementById('signinForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    alert("Sign In Successful! Redirecting to Voting Dashboard...");
    window.location.href = "dashboard.html";
});

// Voting
document.getElementById('voteForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const voter_id = document.getElementById('voter_id').value;
    const candidate = document.getElementById('candidate').value;

    const res = await fetch('http://127.0.0.1:5000/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ voter_id, candidate })
    });

    const data = await res.json();
    alert(data.message);
});

// View Results
document.getElementById('resultsBtn')?.addEventListener('click', async () => {
    const res = await fetch('http://127.0.0.1:5000/results');
    const data = await res.text();
    document.getElementById('results').innerHTML = data;
});
// Load saved theme
window.onload = () => {
    const theme = localStorage.getItem("theme");
    if (theme === "light") {
        document.body.classList.add("light-mode");
        document.getElementById("themeIcon").textContent = "☀️";
    }
};

// Toggle theme
function toggleTheme() {
    document.body.classList.toggle("light-mode");

    const isLight = document.body.classList.contains("light-mode");
    document.getElementById("themeIcon").textContent = isLight ? "☀️" : "🌙";
    localStorage.setItem("theme", isLight ? "light" : "dark");
}
