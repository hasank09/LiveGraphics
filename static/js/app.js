// Main application JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Live Data Dashboard initialized');

    // Initialize interactive elements
    const filterButton = document.querySelector('button:has(.bi-filter)');
    if (filterButton) {
        filterButton.addEventListener('click', function() {
            alert('Filter functionality will be implemented in the next version.');
        });
    }

    const addButton = document.querySelector('button:has(.bi-plus)');
    if (addButton) {
        addButton.addEventListener('click', function() {
            alert('Add new functionality will be implemented in the next version.');
        });
    }

    // Start periodic data refresh with AJAX
    startDataRefresh();
});

// Function to fetch data via AJAX
function fetchData() {
    return fetch('/get_data')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
}

// Function to update the table with new data
function updateTable(data) {
    const tableBody = document.querySelector('.dark-rider-table tbody');
    if (!tableBody) return;

    // Clear existing rows
    tableBody.innerHTML = '';

    // Update statistics
    document.querySelector('.dark-stat-value').textContent = data.length;
    const activeRiders = data.filter(item => item.delay < 5).length;
    const inactiveRiders = data.filter(item => item.delay >= 5).length;
    document.querySelectorAll('.dark-stat-value')[1].textContent = activeRiders;
    document.querySelectorAll('.dark-stat-value')[2].textContent = inactiveRiders;

    // Add new rows
    data.forEach(item => {
        const row = document.createElement('tr');
        row.className = 'dark-row';

        // Create and populate table cells
        row.innerHTML = `
            <td>
                <div class="dark-timestamp">${item.time_stamp}</div>
            </td>
            <td>
                <div class="dark-rider">
                    <div class="dark-avatar">
                        ${item.id[0].toUpperCase()}
                    </div>
                    <span class="dark-name">${item.id}</span>
                </div>
            </td>
            <td>
                ${item.delay < 5 ? 
                    `<div class="dark-chip dark-active">
                        <span class="dark-status-indicator"></span>
                        <span>Active</span>
                    </div>` : 
                    `<div class="dark-chip dark-inactive">
                        <span class="dark-status-indicator"></span>
                        <span>Inactive</span>
                    </div>`
                }
            </td>
            <td>
                <div class="dark-coords">${item.latitude}</div>
            </td>
            <td>
                <div class="dark-coords">${item.longitude}</div>
            </td>
            <td>
                <div class="dark-course">
                    <svg class="course-arrow" viewBox="0 0 24 24" width="24" height="24" style="transform: rotate(${item.course}deg)">
                        <path d="M12,2L4.5,20.29L5.21,21L12,18L18.79,21L19.5,20.29L12,2Z" fill="currentColor"/>
                    </svg>
                    <span>${item.course}°</span>
                </div>
            </td>
            <td>
                <div class="dark-altitude">
                    <span>${item.altitude}</span>
                    <small>m</small>
                </div>
            </td>
            <td>
                <div class="dark-speed">
                    <div class="speed-gauge">
                        <div class="speed-fill" style="width: ${Math.min((item.speed / item.max_speed) * 100, 100)}%"></div>
                    </div>
                    <span>${item.speed} <small>km/h</small></span>
                </div>
            </td>
            <td>
                ${item.delay > 5 ? 
                    `<div class="dark-delay dark-delay-high">
                        <i class="bi bi-exclamation-triangle"></i>
                        <span>${item.delay} sec</span>
                    </div>` : 
                    `<div class="dark-delay dark-delay-normal">
                        <i class="bi bi-check-circle"></i>
                        <span>${item.delay} sec</span>
                    </div>`
                }
            </td>
        `;

        tableBody.appendChild(row);
    });

    // Initialize course arrow animations
    const courseArrows = document.querySelectorAll('.course-arrow');
    courseArrows.forEach(arrow => {
        const initialRotation = arrow.style.transform;
        arrow.style.transform = 'rotate(0deg)';

        setTimeout(() => {
            arrow.style.transform = initialRotation;
        }, 300);
    });

    // Add a subtle flash effect to the table
    const table = document.querySelector('.dark-rider-table');
    table.classList.add('flash-update');
    setTimeout(() => {
        table.classList.remove('flash-update');
    }, 500);
}

// Function to start periodic data refresh
function startDataRefresh() {
    // Initial data load
    refreshData();

    // Set up interval for refresh
    setInterval(refreshData, 5000); // Refresh every 5 seconds
}

// Function to handle data refresh
function refreshData() {
    fetchData()
        .then(data => {
            updateTable(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

// Handle manual refresh button click
document.addEventListener('DOMContentLoaded', function() {
    const refreshBtn = document.querySelector('.dark-btn-primary');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            icon.classList.add('spin-animation');

            // Fetch fresh data
            fetchData()
                .then(data => {
                    updateTable(data);
                    setTimeout(() => {
                        icon.classList.remove('spin-animation');
                    }, 800);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    icon.classList.remove('spin-animation');
                });
        });
    }
});