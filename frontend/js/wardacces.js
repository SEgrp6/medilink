document.getElementById('fetch-patients-btn').addEventListener('click', async () => {
  const ward = document.getElementById('ward-select').value;

  const response = await fetch(`/patients/${ward}`);
  const data = await response.json();

  if (data.success) {
    const patientsList = document.getElementById('patients');
    patientsList.innerHTML = '';

    data.patients.forEach((patient) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${patient.name} (Ward: ${patient.ward})`;

      const profileBtn = document.createElement('button');
      profileBtn.textContent = 'View Profile';
      profileBtn.onclick = () => viewProfile(patient);

      const scheduleBtn = document.createElement('button');
      scheduleBtn.textContent = 'Schedule Appointment';
      scheduleBtn.onclick = () => showAppointmentForm(patient.id);

      listItem.appendChild(profileBtn);
      listItem.appendChild(scheduleBtn);

      patientsList.appendChild(listItem);
    });
  } else {
    alert('Error fetching patients');
  }
});

function viewProfile(patient) {
  alert(`Name: ${patient.name}\nWard: ${patient.ward}`);
}

function showAppointmentForm(patientId) {
  const form = document.getElementById('appointment-form');
  form.style.display = 'block';

  document.getElementById('schedule-appointment-btn').onclick = async () => {
    const appointmentDate = document.getElementById('appointment-date').value;
    const notes = document.getElementById('notes').value;

    const response = await fetch('/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ doctor_id: 1, patient_id: patientId, appointment_date: appointmentDate, notes }),
    });

    const result = await response.json();
    alert(result.message);
    if (result.success) {
      form.style.display = 'none';
    }
  };
}
