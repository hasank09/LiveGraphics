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
});

// to refresh the page
setInterval(() => {
    window.location.reload();
}, 5000);  // Refresh every 5 seconds

// for table2-start
// Rider Table Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    // Simulate auto-refresh functionality
    const refreshToggle = document.getElementById('refreshToggle');
    const refreshBtn = document.querySelector('.rider-refresh-btn');
    let refreshInterval;

    function startAutoRefresh() {
        refreshInterval = setInterval(() => {
            console.log('Auto-refreshing data...');
            // In a real app, you would fetch new data here
            // and update the table
            // window.location.reload();
            // Visual feedback for refresh
            refreshBtn.classList.add('refreshing');
            setTimeout(() => {
                refreshBtn.classList.remove('refreshing');
            }, 500);
        }, 5000); // Refresh every 10 seconds
    }

    function stopAutoRefresh() {
        clearInterval(refreshInterval);
    }

    // Initialize auto-refresh based on toggle state
    if (refreshToggle && refreshToggle.checked) {
        startAutoRefresh();
    }

    // Toggle auto-refresh
    if (refreshToggle) {
        refreshToggle.addEventListener('change', function() {
            if (this.checked) {
                startAutoRefresh();
            } else {
                stopAutoRefresh();
            }
        });
    }

    // Manual refresh button
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function() {
            console.log('Manual refresh triggered');
            // In a real app, you would fetch new data here
            window.location.reload();
            // Visual feedback for refresh
            this.classList.add('refreshing');
            setTimeout(() => {
                this.classList.remove('refreshing');
            }, 500);
        });
    }

    // Additional animation for compass during page load
    document.querySelectorAll('.course-indicator i').forEach(compass => {
        const initialRotation = parseInt(compass.style.transform.replace('rotate(', '').replace('deg)', '')) || 0;
        compass.style.transform = 'rotate(0deg)';

        setTimeout(() => {
            compass.style.transition = 'transform 1s ease';
            compass.style.transform = `rotate(${initialRotation}deg)`;
        }, 300);
    });
});

// for table2-end

// for table3-start
// Rider Table Interactive Features
// Dark Mode Rider Table Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    // Initialize course arrow animations
    const courseArrows = document.querySelectorAll('.course-arrow');
    courseArrows.forEach(arrow => {
        const initialRotation = arrow.style.transform;
        arrow.style.transform = 'rotate(0deg)';

        setTimeout(() => {
            arrow.style.transform = initialRotation;
        }, 300);
    });

    // Search functionality
    const searchInput = document.querySelector('.dark-search input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const rows = document.querySelectorAll('.dark-row');

            rows.forEach(row => {
                const riderName = row.querySelector('.dark-name').textContent.toLowerCase();
                if (riderName.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }

    // Refresh button animation
    const refreshBtn = document.querySelector('.dark-btn-primary');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            icon.classList.add('spin-animation');

            // Simulate data refresh
            setTimeout(() => {
                icon.classList.remove('spin-animation');
                // Here you would actually refresh the data
                window.location.reload();
                // Add a subtle flash effect to the table
                const table = document.querySelector('.dark-rider-table');
                table.classList.add('flash-update');
                setTimeout(() => {
                    table.classList.remove('flash-update');
                }, 500);
            }, 800);
        });
    }
});
// for table3-end

// table selection - Start

document.addEventListener('DOMContentLoaded', function() {
        // Make entire card clickable
        document.querySelectorAll('.format-card').forEach(card => {
            card.addEventListener('click', function() {
                const format = this.dataset.format;
                window.location.href = `/rider-tracking?format=${format}`;
            });
        });

        // Stop propagation on buttons to prevent double navigation
        document.querySelectorAll('.format-card .btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        });

        // Load saved preferences
        const savedFormat = localStorage.getItem('preferredFormat') || '1';
        const savedInterval = localStorage.getItem('refreshInterval') || '0';

        document.getElementById(`format${savedFormat}`).checked = true;
        document.getElementById('refreshInterval').value = savedInterval;

        // Save preferences
        document.getElementById('preferencesForm').addEventListener('submit', function(e) {
            e.preventDefault();

            const selectedFormat = document.querySelector('input[name="defaultFormat"]:checked').value;
            const selectedInterval = document.getElementById('refreshInterval').value;

            localStorage.setItem('preferredFormat', selectedFormat);
            localStorage.setItem('refreshInterval', selectedInterval);

            // Show success message
            const alert = document.createElement('div');
            alert.className = 'alert alert-success mt-3';
            alert.textContent = 'Preferences saved successfully!';
            this.appendChild(alert);

            setTimeout(() => {
                alert.remove();
            }, 3000);
        });
    });

// table selection - End