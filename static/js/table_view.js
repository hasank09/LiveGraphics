document.addEventListener('DOMContentLoaded', function() {
    const refreshBtn = document.getElementById('refreshBtn');

    if (refreshBtn) {
        refreshBtn.addEventListener('click', function() {
            // Simple refresh using current URL
            window.location.href = window.location.href;
        });
    }

    // Auto-refresh toggle
    let autoRefresh = true;
    let refreshInterval;

    toggleAutoRefresh(); // Start auto-refresh immediately

    function toggleAutoRefresh() {
        if (autoRefresh) {
            refreshInterval = setInterval(() => {
                window.location.href = window.location.href;
            }, 5000); // Refresh every 5 seconds
        } else {
            clearInterval(refreshInterval);
        }
    }
});