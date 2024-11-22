const doctorId = 1;

fetch(`/appointments/${doctorId}`)
    .then(response => response.json())
    .then(data => {
        const appointmentsContainer = document.getElementById('appointments');
        
        if (data.success && data.appointments.length > 0) {
            appointmentsContainer.innerHTML = '';
            data.appointments.forEach(appointment => {
                const appointmentCard = document.createElement('div');
                appointmentCard.className = 'appointment-card';
                appointmentCard.innerHTML = `
                    <h2>Appointment with ${appointment.patient_name}</h2>
                    <p class="appointment-details">
                        <strong>Date:</strong> ${new Date(appointment.appointment_date).toLocaleDateString()}<br>
                        <strong>Ward:</strong> ${appointment.ward}<br>
                        <strong>Notes:</strong> ${appointment.notes || 'No additional notes'}
                    </p>
                `;
                appointmentsContainer.appendChild(appointmentCard);
            });
        } else {
            appointmentsContainer.innerHTML = '<p class="no-appointments">No upcoming appointments.</p>';
        }
    })
    .catch(error => {
        console.error('Error fetching appointments:', error);
        document.getElementById('appointments').innerHTML = '<p class="no-appointments">Unable to load appointments. Please try again later.</p>';
    });
