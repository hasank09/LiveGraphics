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