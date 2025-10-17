document.getElementById('trackForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const id = document.getElementById('trackingID').value.trim();
  const result = document.getElementById('trackingResult');
  const progressContainer = document.getElementById('progressContainer');
  const progressBar = document.getElementById('progressBar');
  const steps = ['step1', 'step2', 'step3', 'step4'].map(id => document.getElementById(id));

  if (id === "") {
    result.textContent = "⚠ Please enter a tracking number.";
    result.style.color = "red";
    progressContainer.style.display = "none";
    return;
  }

  // Show tracking start message
  result.textContent = 🔎 Tracking number ${id} found. Please wait...;
  result.style.color = "#007bff";
  progressContainer.style.display = "block";

  // Reset progress
  progressBar.style.width = "0%";
  steps.forEach(step => step.classList.remove('active'));

  // Animate progress
  let progress = 0;
  const stages = [25, 50, 75, 100];
  const messages = [
    "📦 Package Picked Up",
    "🚚 In Transit",
    "🏙 Out for Delivery",
    "✅ Delivered Successfully!"
  ];

  let index = 0;
  const interval = setInterval(() => {
    progress = stages[index];
    progressBar.style.width = progress + "%";
    steps[index].classList.add('active');
    result.textContent = messages[index];
    result.style.color = progress === 100 ? "green" : "#007bff";
    index++;

    if (index === stages.length) clearInterval(interval);
  }, 1500);
});

// Real booking form with success message (Formspree)
const bookingForm = document.getElementById('bookingForm');
const bookingResponse = document.getElementById('bookingResponse');

if (bookingForm) {
  bookingForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    bookingResponse.textContent = "⏳ Sending your booking request...";
    bookingResponse.style.color = "#0072ff";

    const formData = new FormData(bookingForm);

    try {
      const response = await fetch(bookingForm.action, {
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        bookingResponse.textContent = "✅ Your booking was successfully sent! We'll contact you shortly.";
        bookingResponse.style.color = "green";
        bookingForm.reset();
      } else {
        bookingResponse.textContent = "⚠ Something went wrong. Please try again.";
        bookingResponse.style.color = "red";
      }
    } catch (error) {
      bookingResponse.textContent = "❌ Error sending booking. Check your internet and try again.";
      bookingResponse.style.color = "red";
    }
  });
}

