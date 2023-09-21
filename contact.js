async function send() {
  var name = document.getElementById("name").value;
  console.log(name);
  var email = document.getElementById("email").value;
  console.log(email);
  var comment = document.getElementById("comment").value;

  fetch("http://localhost:8080/sendEmail", {
    method: "POST",
    body: JSON.stringify({
      name: name,
      email: email,
      comment: comment,
    }),
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
}
