document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.page-section');
    const navButtons = document.querySelectorAll('.nav-btn');
    const links = document.querySelectorAll('a[href^="#"]');
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    // თითოეული გვერდის შესაბამისი ფონის კლასი
    const bgClasses = {
        'home': 'bg-home',
        'm3': 'bg-m3',
        'm5f90': 'bg-m5f90',
        'm5f10': 'bg-m5f10'
    };

    function switchPage(pageId) {
        // ვმალავთ ყველა გვერდს და ვაჩენთ არჩეულს
        pages.forEach(page => page.classList.remove('active'));
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
        }

        // ვცვლით აქტიურ ღილაკს მენიუში
        navButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('href') === `#${pageId}`) {
                btn.classList.add('active');
            }
        });

        // ვცვლით მთლიანი საიტის Background ფოტოს
        document.body.className = bgClasses[pageId] || 'bg-home';

        // მობილურზე მენიუს დახურვა გადასვლის შემდეგ
        if (navLinks) navLinks.classList.remove('open');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // ყველა <a href="#..."> ლინკზე დაჭერის დამუშავება
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').replace('#', '');
            window.location.hash = targetId;
            switchPage(targetId);
        });
    });

    // მობილურის ჰამბურგერ მენიუ
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });
    }

    // თუ ბრაუზერში პირდაპირ ლინკით შემოვიდა (მაგ. #m3)
    const initialHash = window.location.hash.replace('#', '');
    if (initialHash && bgClasses[initialHash]) {
        switchPage(initialHash);
    }
});