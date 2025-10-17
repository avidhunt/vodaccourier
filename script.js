// Generate random tracking IDs like VCX-483920
function generateTrackingID() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let id = "VCX-";
  for (let i = 0; i < 6; i++) id += chars.charAt(Math.floor(Math.random() * chars.length));
  return id;
}

// ================== BOOKING FORM ==================
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
  bookingForm.addEventListener('submit', e => {
    e.preventDefault();

    const sender = document.getElementById('senderName').value;
    const receiver = document.getElementById('receiverName').value;
    const pickup = document.getElementById('pickupAddress').value;
    const delivery = document.getElementById('deliveryAddress').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('bookingMessage');

    const trackingID = generateTrackingID();

    message.style.color = "green";
    message.innerHTML = `✅ Booking successful!<br>
    Tracking ID: <strong>${trackingID}</strong><br>
    <a href="track.html?track=${trackingID}">Click here to track your shipment</a>`;

    // Save booking locally for testing
    localStorage.setItem(trackingID, JSON.stringify({
      sender, receiver, pickup, delivery, phone, status: "Booked"
    }));

    bookingForm.reset();
  });
}

// ================== TRACKING FORM ==================
const trackForm = document.getElementById('trackForm');
if (trackForm) {
  trackForm.addEventListener('submit', e => {
    e.preventDefault();

    const id = document.getElementById('trackingID').value.trim();
    const result = document.getElementById('trackingResult');
    const progressContainer = document.getElementById('progressContainer');
    const progressBar = document.getElementById('progressBar');
    const steps = ['step1', 'step2', 'step3', 'step4'].map(id => document.getElementById(id));

    if (!id) {
      result.textContent = "⚠ Please enter a valid tracking ID.";
      result.style.color = "red";
      return;
    }

    const booking = localStorage.getItem(id);
    if (!booking) {
      result.textContent = "❌ Tracking ID not found.";
      result.style.color = "red";
      progressContainer.style.display = "none";
      return;
    }

    result.textContent = 🔎 Tracking number ${id} found!;
    result.style.color = "#007bff";
    progressContainer.style.display = "block";

    // Reset progress
    progressBar.style.width = "0%";
    steps.forEach(step => step.classList.remove('active'));

    let index = 0;
    const stages = [25, 50, 75, 100];
    const messages = [
      "📦 Package Picked Up",
      "🚚 In Transit",
      "🏙 Out for Delivery",
      "✅ Delivered Successfully!"
    ];

    const interval = setInterval(() => {
      progressBar.style.width = stages[index] + "%";
      steps[index].classList.add('active');
      result.textContent = messages[index];
      result.style.color = stages[index] === 100 ? "green" : "#007bff";
      index++;
      if (index === stages.length) clearInterval(interval);
    }, 1500);
  });

  // Auto-load tracking ID from URL if present
  const params = new URLSearchParams(window.location.search);
  const autoID = params.get("track");
  if (autoID) {
    document.getElementById('trackingID').value = autoID;
    trackForm.dispatchEvent(new Event('submit'));
  }
}
