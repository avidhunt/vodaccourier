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