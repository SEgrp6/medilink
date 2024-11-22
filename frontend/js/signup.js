document.addEventListener('DOMContentLoaded', function () {
    const form1 = document.getElementById('initialForm');
    const form2 = document.getElementById('signupForm1');
    const form3 = document.getElementById('signupForm3');
    const switchToForm1Btn = document.getElementById('doctor-button');
    const switchToForm2Btn = document.getElementById('patient-button');

    switchToForm1Btn.addEventListener('click', function() {
        form2.style.display = 'block';
        form1.style.display = 'none';
        form3.style.display = 'none';
    });

    switchToForm2Btn.addEventListener('click', function() {
        form1.style.display = 'none';
        form3.style.display = 'block';
        form2.style.display = 'none';
    });

    // Initially show the first form and hide the second form
    form1.style.display = 'block';
    form2.style.display = 'none';
    form3.style.display = 'none';
});
document.getElementById("signupForm1").addEventListener("submit", async function (event) {
                event.preventDefault();

                const doctorData = {
                    name: document.getElementById("doctorName").value,
                    specialization: document.getElementById("specialization").value,
                    password: document.getElementById("password").value,
                    hospitalName: document.getElementById("hospitalName").value,
                    hospitalCode: document.getElementById("hospitalCode").value,
                };

                try {
                    const response = await fetch("http://localhost:3000/registerDoctor", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(doctorData),
                    });

                    const result = await response.json();
                    alert(result.message);
                  //   window.location.href = "doctor-homepage.html"; should add functionality to redirect to doctor homepage
                } catch (error) {
                    console.error("Error:", error);
                    alert("Error registering doctor.");
                }
});
document.getElementById("signupForm3").addEventListener("submit", async function (event) {
                event.preventDefault();

                const patientdata = {
                    name: document.getElementById("patientName").value,
                    email: document.getElementById("signupEmail").value,
                    password: document.getElementById("signupPassword").value,
                    WardCode: document.getElementById("wardcode").value,
                };

                try {
                    const response = await fetch("http://localhost:3000/patientdata", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(patientdata),
                    });

                    const result = await response.json();
                    alert(result.message);
                    //implement funcitonality to load patients details
                } catch (error) {
                    console.error("Error:", error);
                    alert("Error Occured during registration.");
                }
            });