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