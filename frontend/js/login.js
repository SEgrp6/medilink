document.getElementById('login-btn').addEventListener('click', async () => {
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (result.success) {
        alert(result.message);
        window.location.href = result.role === 'doctor' ? '/frontend/html/homepage' : 'patient_dashboard.html';
      } else {
        alert(result.message);
      }
    });
