function showModal(message, canResubmit) {
  var modal = document.getElementById("myModal");
  var modalNote = document.getElementById("modalNote");

  // Set the message in the modal
  modalNote.textContent = message;

  // Show the modal
  modal.style.display = "block";

  // Add event listener to close the modal when the close button is clicked
  var closeButton = document.getElementsByClassName("close")[0];
  closeButton.addEventListener("click", function() {
    modal.style.display = "none";
  });

  // Add a button to allow resubmission (if applicable)
  if (canResubmit) {
    var submitButton = document.createElement("button");
    submitButton.textContent = "Resubmit";
    submitButton.addEventListener("click", function() {
      document.getElementById("myForm").submit();
      modal.style.display = "none";
    });
    modalNote.appendChild(submitButton);
  }
}

// Add event listener to the form submission
document.getElementById("myForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent the default form submission

  // Show a message indicating submission in progress
  showModal("Submitting form...");

  // Perform an AJAX request to submit the form
  var xhr = new XMLHttpRequest();
  xhr.open("POST", this.action);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        // Successful response
        var response = xhr.responseText;
        showModal("Success: " + response); // Show success message with response
        document.getElementById("myForm").reset(); // Clear the form fields
      } else {
        // Error response
        showModal("Error: Something went wrong. Do you want to resubmit?", true); // Show error with resubmit option
      }
    }
  };
  xhr.send(new FormData(this));
});
