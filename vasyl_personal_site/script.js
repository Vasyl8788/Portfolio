const themeToggleButton = document.getElementById('theme-toggle');

themeToggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('light-theme');

    if (document.body.classList.contains('dark-theme')) {
        themeToggleButton.textContent = '🌞';  // Змінюємо кнопку на сонце
    } else {
        themeToggleButton.textContent = '🌙';  // Змінюємо кнопку на місяць
    }
});



document.getElementById("contact-form").addEventListener("submit", function (e) {
      e.preventDefault();
      emailjs.send("service_kuqohld", "template_toe3hhf", {
        from_name: this.from_name.value,
        from_email: this.from_email.value,
        message: this.message.value,
      }).then(function () {
        alert("Message sent successfully!");
        document.getElementById("contact-form").reset();
      }, function (error) {
        console.error("Failed to send message:", error);
        alert("Failed to send message. Please try again later.");
      });
    });