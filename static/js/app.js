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

// // to refresh the page
// setInterval(() => {
//     window.location.reload();
// }, 5000);  // Refresh every 5 seconds

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
            window.location.reload();
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
