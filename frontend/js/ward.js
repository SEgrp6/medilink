document.addEventListener("DOMContentLoaded", function () {
            const wardForm = document.getElementById("wardForm");

            wardForm.addEventListener("submit", async function (event) {
                event.preventDefault();
                const wardName = document.getElementById("ward_name").value;
                const wardCode = document.getElementById("ward_code").value;
                const hospitalId = document.getElementById("hospital_id").value;
                const doctorId = document.getElementById("doctor_id").value;

                if (!wardName || !wardCode || !hospitalId || !doctorId) {
                    document.getElementById("message").innerText = "All fields are required.";
                    return;
                }

                const requestData = {
                    ward_name: wardName,
                    ward_code: wardCode,
                    hospital_id: hospitalId,
                    doctor_id: doctorId
                };

                try {
                    const response = await fetch("http://localhost:3000/api/wards", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(requestData)
                    });

                    const result = await response.json();

                    if (response.ok && result.success) {
                        document.getElementById("message").innerText = "Ward created successfully!";
                        wardForm.reset();
                       // const wardList = document.getElementById("wardList");
                      //  const newWardDiv = document.createElement("div");
                     //   newWardDiv.className = "ward-item";
                      //  newWardDiv.innerHTML = `<a href="/frontend/html/ward.html?ward_id=${result.ward_id}">${wardName}</a>`;
                     //   wardList.appendChild(newWardDiv);
                        window.location.href = "/frontend/html/homepage.html";

                    } else {
                        document.getElementById("message").innerText = "Error creating ward: " + (result.message || "Unknown error");
                    }
                } catch (error) {
                    console.error("Error:", error);
                    document.getElementById("message").innerText = "Error connecting to the server.";
                }
            });
        });