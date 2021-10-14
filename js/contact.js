// Get the modal
const modal = document.getElementById("myModal");

// Get the button that opens the modal
const btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function success() {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const date = document.getElementById("date").value;
  const message = document.getElementById("message").value;

  if (
    firstName != "" &&
    lastName != "" &&
    email != "" &&
    phone != "" &&
    date != "" &&
    message != ""
  ) {
    document.getElementById("submitBtn").classList.remove("disable");
    document.getElementById("submitBtn").classList.add("button");
  }
}

function addModal() {
  document.getElementById("submitBtn").classList.remove("button");
  document.getElementById("submitBtn").classList.add("disable");

  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const date = document.getElementById("date").value;
  const message = document.getElementById("message").value;

  document.getElementById("calMessage").textContent =
    "Meeting with " +
    firstName +
    " " +
    lastName +
    " on " +
    date +
    ". (Subject: " +
    message +
    ".)";

document.getElementById("firstName").value="";
document.getElementById("lastName").value="";
document.getElementById("email").value="";
document.getElementById("phone").value="";
document.getElementById("date").value="";
document.getElementById("message").value="";

}
