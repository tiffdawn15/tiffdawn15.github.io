document
  .getElementById("contactForm")
  .addEventListener("submit", async function (event) {

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    try {
      const response = await fetch("http://node-nation.netlify.app/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          message: message,
        }),
      });
      if (response.ok) {
        showToast("Email sent successfully");
      } else {
        showToast("Error sending email");
      }
    } catch (error) {
      showToast("Error sending email");
    }
  });

// Add this JavaScript to your script file
function showToast(message) {
  var toast = document.getElementById("toast");
  toast.textContent = message;
  toast.className = "toast show";
  setTimeout(function () {
    toast.className = toast.className.replace("show", "");
  }, 3000);
}
