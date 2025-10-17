document.getElementById('trackForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const id = document.getElementById('trackingID').value.trim();
  const result = document.getElementById('trackingResult');
  const steps = document.getElementById('trackingSteps');

  steps.innerHTML = '';
  result.textContent = '';

  if (id === '') {
    result.textContent = '⚠ Please enter a tracking number.';
    result.style.color = 'red';
    return;
  }

  result.textContent = Tracking number ${id} found. Fetching delivery status...;
  result.style.color = '#0072ff';

  const trackingProgress = [
    'Package picked up from sender 📦',
    'In transit between courier hubs 🚚',
    'Out for delivery to recipient 🏠',
    'Delivered successfully ✅'
  ];

  let step = 0;
  const interval = setInterval(() => {
    if (step < trackingProgress.length) {
      const li = document.createElement('li');
      li.textContent = trackingProgress[step];
      li.className = 'tracking-step';
      steps.appendChild(li);
      step++;
    } else {
      clearInterval(interval);
      result.textContent = ✅ Package ${id} delivered successfully!;
      result.style.color = 'green';
    }
  }, 2000);

});

// Booking form functionality
document.getElementById('bookingForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('fullname').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const address = document.getElementById('address').value.trim();
  const details = document.getElementById('packageDetails').value.trim();
  const response = document.getElementById('bookingResponse');

  if (!name || !email || !phone || !address || !details) {
    response.textContent = '⚠ Please fill in all fields before submitting.';
    response.style.color = 'red';
    return;
  }

  // Simulate success
  response.textContent = ✅ Thank you, ${name}! Your pickup has been scheduled. We’ll contact you at ${phone}.;
  response.style.color = 'green';

  // Reset form
  document.getElementById('bookingForm').reset();
});
