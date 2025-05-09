document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  emailjs.send("gmail_service", "contact_template", {
    from_name: this.name.value,
    from_email: this.email.value,
    message: this.message.value,
  })
  .then(function () {
    alert("Message sent successfully!");
    document.getElementById("contact-form").reset();
  }, function (error) {
    console.error("Failed to send message:", error);
    alert("Failed to send message. Please try again later.");
  });
});
