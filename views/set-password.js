document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");
  const tokenInput = document.getElementById("token");
  tokenInput.value = token;

  console.log("Token récupéré :", token); // Debugging
});
