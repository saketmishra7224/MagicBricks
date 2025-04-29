document.addEventListener('DOMContentLoaded', function() {
    // Navigation arrow functionality
    const setupScrollArrows = (containerSelector, prevArrowSelector, nextArrowSelector, scrollAmount = 300) => {
        const container = document.querySelector(containerSelector);
        const prevArrow = document.querySelector(prevArrowSelector);
        const nextArrow = document.querySelector(nextArrowSelector);

        if (container && prevArrow && nextArrow) {
            prevArrow.addEventListener('click', () => {
                container.scrollBy({
                    left: -scrollAmount,
                    behavior: 'smooth'
                });
            });

            nextArrow.addEventListener('click', () => {
                container.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            });

            // Show/hide arrows based on scroll position
            container.addEventListener('scroll', () => {
                prevArrow.style.opacity = container.scrollLeft > 0 ? '1' : '0.5';
                nextArrow.style.opacity = 
                    (container.scrollLeft + container.clientWidth) < container.scrollWidth - 10 
                        ? '1' : '0.5';
            });

            // Initialize arrow visibility
            prevArrow.style.opacity = '0.5';
            nextArrow.style.opacity = 
                (container.scrollLeft + container.clientWidth) < container.scrollWidth - 10 
                    ? '1' : '0.5';
        }
    };

    // Setup navigation arrows for different sections
    setupScrollArrows('.cities-grid', '.scroll-arrow.city-links.prev', '.scroll-arrow.city-links.next');
    setupScrollArrows('.projects-grid', '.scroll-arrow.trending-projects.prev', '.scroll-arrow.trending-projects.next');
    setupScrollArrows('.properties-grid', '.scroll-arrow.featured-properties.prev', '.scroll-arrow.featured-properties.next');
    
    // Tab functionality for search tabs
    const searchTabs = document.querySelectorAll('.search-tabs .tab');
    searchTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            searchTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Change form context based on tab (for demonstration)
            const tabType = tab.dataset.tab;
            updatePlaceholderText(tabType);
        });
    });
    
    // Update search placeholder based on the active tab
    function updatePlaceholderText(tabType) {
        const searchInput = document.querySelector('.search-input input');
        if (!searchInput) return;
        
        switch(tabType) {
            case 'rent':
                searchInput.placeholder = 'Enter City, Locality or Project to Rent';
                break;
            case 'pg':
                searchInput.placeholder = 'Enter City, Locality or PG Name';
                break;
            case 'commercial':
                searchInput.placeholder = 'Enter City, Locality or Commercial Property';
                break;
            case 'plot':
                searchInput.placeholder = 'Enter City, Locality for Plots/Land';
                break;
            case 'projects':
                searchInput.placeholder = 'Enter City, Locality or New Project Name';
                break;
            default:
                searchInput.placeholder = 'Enter City, Locality, Project or Landmark';
        }
    }
    
    // Property filter buttons
    const filterButtons = document.querySelectorAll('.property-filters .filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            // Filter functionality would go here in a real application
        });
    });
    
    // Add floating chat button to the page
    addFloatingElements();
    
    // Add sticky header behavior
    window.addEventListener('scroll', handleStickyHeader);
});

// Add floating help/chat elements
function addFloatingElements() {
    // Create chat button
    const floatingBadge = document.createElement('div');
    floatingBadge.className = 'floating-badge';
    floatingBadge.innerHTML = '<i class="fas fa-comments"></i>';
    
    // Create chat bubble
    const chatBubble = document.createElement('div');
    chatBubble.className = 'chat-bubble';
    chatBubble.style.display = 'none';
    chatBubble.innerHTML = '<p>Need help finding your dream home? Chat with our property experts!</p>';
    
    // Add notification badge
    const notificationBadge = document.createElement('span');
    notificationBadge.className = 'notification-badge';
    notificationBadge.innerText = '1';
    floatingBadge.appendChild(notificationBadge);
    
    // Toggle chat bubble on click
    floatingBadge.addEventListener('click', () => {
        chatBubble.style.display = chatBubble.style.display === 'none' ? 'block' : 'none';
        notificationBadge.style.display = 'none'; // Hide notification after click
    });
    
    // Add to body
    document.body.appendChild(chatBubble);
    document.body.appendChild(floatingBadge);
}

// Handle sticky header behavior
function handleStickyHeader() {
    const header = document.querySelector('header');
    if (!header) return;
    
    if (window.scrollY > 100) {
        header.classList.add('sticky-header');
    } else {
        header.classList.remove('sticky-header');
    }
}

// Add hover effects to cards
document.querySelectorAll('.city-card, .project-card, .property-card, .collection-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.boxShadow = '';
    });
});