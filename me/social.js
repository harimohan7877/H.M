document.addEventListener('DOMContentLoaded', async () => {
    const sidebar = document.getElementById('social-sidebar');
    const contentArea = document.getElementById('social-content');

    if (!sidebar || !contentArea) {
        console.error('Sidebar or Content Area not found in HTML.');
        return;
    }

    try {
        const response = await fetch('social_content.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        populateSocialUI(data);
    } catch (error) {
        contentArea.innerHTML = `<p style="color: #ff5555;">Could not load social_content.json.</p>`;
        console.error('Fetch error:', error);
    }

    function populateSocialUI(data) {
        sidebar.innerHTML = '';
        contentArea.innerHTML = '';

        Object.keys(data).forEach((key, index) => {
            const item = data[key];

            // Create Sidebar Link with Icon
            const link = document.createElement('a');
            link.href = '#';
            link.dataset.key = key;
            link.innerHTML = `<i class="${item.icon}"></i><span>${item.title}</span>`;
            sidebar.appendChild(link);
            
            // Create Content Section
const section = document.createElement('div');
section.className = 'content-section';
section.dataset.key = key;
// === यहाँ h2 हेडिंग जोड़ी गई है ===
section.innerHTML = `
    <h2><i class="${item.icon}"></i> ${item.title}</h2>
    <div class="embed-container">${item.embedCode}</div>
    <a href="${item.profileLink}" target="_blank" class="btn-visit">${item.visitText}</a>
`;
contentArea.appendChild(section);


            // Set the first item as active
            if (index === 0) {
                link.classList.add('active');
                section.classList.add('active');
            }
        });

        sidebar.addEventListener('click', (e) => {
            const clickedLink = e.target.closest('a');
            if (clickedLink) {
                e.preventDefault();
                const key = clickedLink.dataset.key;

                sidebar.querySelector('a.active').classList.remove('active');
                clickedLink.classList.add('active');
                
                contentArea.querySelector('.content-section.active').classList.remove('active');
                contentArea.querySelector(`.content-section[data-key="${key}"]`).classList.add('active');
            }
        });
    }
});