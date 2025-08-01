document.addEventListener('DOMContentLoaded', async () => {
    // जरूरी HTML एलिमेंट्स को खोजना
    const sidebar = document.getElementById('about-sidebar');
    const contentArea = document.getElementById('about-content');
    const container = document.getElementById('about-container');

    // **नया सेफ्टी चेक:** अगर जरूरी div मौजूद नहीं हैं, तो एरर दिखाएँ
    if (!sidebar || !contentArea || !container) {
        if(container) {
            container.innerHTML = '<p style="color: #ff5555; font-size: 1.2rem; text-align: center;">Error: HTML structure is missing. Please check about.html file for sidebar and content elements.</p>';
        }
        console.error('Essential HTML elements (#about-sidebar or #about-content) not found.');
        return; // आगे का कोड न चलाएँ
    }

    // JSON फाइल से कंटेंट लाना
    try {
        const response = await fetch('content.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        populateUI(data); // UI बनाने वाले फंक्शन को कॉल करें
    } catch (error) {
        contentArea.innerHTML = `<p style="color: #ff5555;">Could not load content.json. Please check the file and console for errors.</p>`;
        console.error('Fetch error:', error);
    }

    function populateUI(data) {
        sidebar.innerHTML = '';
        contentArea.innerHTML = '';

        // साइडबार लिंक और कंटेंट सेक्शन बनाएँ
        Object.keys(data).forEach((key, index) => {
            const item = data[key];
            const contentHtml = item.content.replace(/\n/g, '<br><br>');

            const link = document.createElement('a');
            link.href = '#';
            link.textContent = item.title;
            link.dataset.key = key;
            sidebar.appendChild(link);
            
            const section = document.createElement('div');
            section.className = 'content-section';
            section.dataset.key = key;
            section.innerHTML = `<h2>${item.title}</h2><p>${contentHtml}</p>`;
            contentArea.appendChild(section);

            // पहले आइटम को डिफ़ॉल्ट रूप से एक्टिव सेट करें
            if (index === 0) {
                link.classList.add('active');
                section.classList.add('active');
            }
        });

        // साइडबार क्लिक को मैनेज करें
        sidebar.addEventListener('click', (e) => {
            e.preventDefault();
            if (e.target.tagName === 'A') {
                const key = e.target.dataset.key;
                sidebar.querySelector('a.active').classList.remove('active');
                e.target.classList.add('active');
                
                contentArea.querySelector('.content-section.active').classList.remove('active');
                contentArea.querySelector(`.content-section[data-key="${key}"]`).classList.add('active');
            }
        });
    }
});