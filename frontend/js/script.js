document.addEventListener("DOMContentLoaded", () => {
    const dischargeOptions = document.querySelectorAll("input[name='discharge']");
    const dischargeColorGroup = document.querySelector(".discharge-color");
    
    dischargeOptions.forEach(option => {
        option.addEventListener("change", () => {
            dischargeColorGroup.style.display = option.value === "yes" ? "block" : "none";
        });
    });
    
    dischargeColorGroup.style.display = "none";
    
    const painLevelSlider = document.getElementById("pain-level");
    const painLevelValue = document.getElementById("pain-level-value");
    
    painLevelSlider.addEventListener("input", () => {
        painLevelValue.textContent = painLevelSlider.value;
    });
});
// Get the canvas context
const ctx = document.getElementById('myChart').getContext('2d');

// Define the datasets for each time frame
const dailyData = [10, 12, 15, 8, 20, 30, 26];
const weeklyData = [50, 60, 40, 80, 100, 90, 110];
const monthlyData = [200, 300, 250, 400, 450, 500, 550];

// Set the default data to dailyData
let currentData = dailyData;

// Function to update chart data and trigger smooth transition
function updateTimeFrame(data) {
    myChart.data.datasets[0].data = data;
    myChart.update(); // Smooth transition to the new data
}

// Instantiate the chart with enhanced options
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Point 1', 'Point 2', 'Point 3', 'Point 4', 'Point 5', 'Point 6', 'Point 7'],
        datasets: [{
            label: 'Patient Recovery Progress',
            data: currentData,
            backgroundColor: 'rgba(54, 162, 235, 0.2)', // Background color for the area under the line
            borderColor: 'rgba(54, 162, 235, 1)',       // Line color
            borderWidth: 2,
            tension: 0.3, // Smooth curves for the line
            pointBackgroundColor: '#fff',
            pointBorderColor: 'rgba(54, 162, 235, 1)',
            pointHoverRadius: 5,
        }]
    },
    options: {
        responsive: true,
        plugins: {
            tooltip: {
                enabled: true,      // Enable tooltips
                mode: 'index',      // Show tooltip for all points at same X-axis
                intersect: false,   // Show tooltip even if not directly hovering
                backgroundColor: 'rgba(0, 0, 0, 0.8)', // Tooltip background color
                titleColor: '#fff',
                bodyColor: '#fff',
            },
            legend: {
                display: true,
                labels: {
                    color: '#333' // Legend label color
                }
            }
        },
        animations: {
            tension: {
                duration: 1000,
                easing: 'easeInOutElastic',
                from: 0.5,
                to: 0.3,
                loop: false
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: '#333', // Y-axis tick color
                },
                grid: {
                    color: 'rgba(200, 200, 200, 0.2)', // Y-axis grid color
                }
            },
            x: {
                ticks: {
                    color: '#333', // X-axis tick color
                },
                grid: {
                    display: false // Remove X-axis grid
                }
            }
        }
    }
});

// Add event listeners to buttons for time frame controls
document.getElementById('daily').addEventListener('click', () => updateTimeFrame(dailyData));
document.getElementById('weekly').addEventListener('click', () => updateTimeFrame(weeklyData));
document.getElementById('monthly').addEventListener('click', () => updateTimeFrame(monthlyData));

function addReminder() {
    const reminderInput = document.getElementById('reminder-input');
    const reminderValue = reminderInput.value;

    if (reminderValue) {
        // Format the reminder text
        const dateTime = new Date(reminderValue);
        const formattedDate = dateTime.toLocaleDateString();
        const formattedTime = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        // Create new reminder element
        const newReminder = document.createElement('div');
        newReminder.classList.add('reminder');
        newReminder.innerHTML = `<p>Reminder: ${formattedDate} at ${formattedTime}</p>`;

        // Append new reminder to the list
        document.querySelector('.reminders').appendChild(newReminder);

        // Clear the input field after adding the reminder
        reminderInput.value = '';
    } else {
        alert('Please select a date and time for the reminder.');
    }
}
let startDate = new Date("2024-10-01"); // Set the start date of recovery
let currentDate = new Date(); // Current date

function loadCalendar() {
    const monthYear = document.getElementById("month-year");
    const daysContainer = document.getElementById("days");

    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    monthYear.innerText = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;

    // Clear previous days
    daysContainer.innerHTML = "";

    // Get the first day of the month
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    // Add blank days for the start of the month
    for (let i = 0; i < firstDay; i++) {
        const blankDay = document.createElement("div");
        daysContainer.appendChild(blankDay);
    }

    // Add days of the month
    for (let day = 1; day <= lastDate; day++) {
        const dayElement = document.createElement("div");
        dayElement.innerText = day;
        dayElement.onclick = () => selectDay(day);
        daysContainer.appendChild(dayElement);
    }

    // Update progress based on current date
    updateProgress();
}

function selectDay(day) {
    const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dayOfYear = Math.ceil((selectedDate - startDate) / (1000 * 60 * 60 * 24));
    
    updateProgress(dayOfYear);
}

function updateProgress(dayOfYear) {
    // Calculate days since start date
    const daysSinceStart = Math.ceil((currentDate - startDate) / (1000 * 60 * 60 * 24));
    
    // Ensure dayOfYear is set to daysSinceStart if it's not provided
    if (dayOfYear === undefined) {
        dayOfYear = daysSinceStart;
    }

    // Cap the dayOfYear to a maximum of 90
    const totalDays = 90; // Total days in the recovery timeline
    const cappedDayOfYear = Math.min(dayOfYear, totalDays); // Limit to 90 days

    // Calculate the progress width
    const progressWidth = (cappedDayOfYear / totalDays) * 100;

    // Update the progress bar width
    const progressBar = document.getElementById("progress-bar");
    progressBar.style.width = progressWidth + "%";
}

function changeMonth(change) {
    currentDate.setMonth(currentDate.getMonth() + change);
    loadCalendar();
}

// Load the calendar when the page loads
loadCalendar();

