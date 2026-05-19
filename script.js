// Title Canvas Animation - Interactive Network
(function () {
    const canvas = document.getElementById('title-canvas');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = canvas.parentElement.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const nodes = [];
    const nodeCount = 30;
    const connectionDistance = 150;

    // Cyan-focused color palette for title section
    const colors = [{
        r: 0,
        g: 255,
        b: 255
    }, // cyan (primary)
    {
        r: 0,
        g: 200,
        b: 255
    }, // light cyan
    {
        r: 0,
        g: 150,
        b: 200
    }, // darker cyan
    {
        r: 100,
        g: 255,
        b: 255
    }, // bright cyan
    ];

    for (let i = 0; i < nodeCount; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 1.2,
            vy: (Math.random() - 0.5) * 1.2,
            size: Math.random() * 2.5 + 1.5,
            color: color,
            pulsePhase: Math.random() * Math.PI * 2
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw nodes
        nodes.forEach((node, i) => {
            node.x += node.vx;
            node.y += node.vy;

            // Bounce off edges
            if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

            // Keep within bounds
            node.x = Math.max(0, Math.min(canvas.width, node.x));
            node.y = Math.max(0, Math.min(canvas.height, node.y));

            // Pulse effect
            node.pulsePhase += 0.03;
            const pulse = Math.sin(node.pulsePhase) * 0.4 + 0.6;

            // Draw node
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.size * pulse, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${node.color.r}, ${node.color.g}, ${node.color.b}, 0.9)`;
            ctx.fill();

            // Draw glow
            const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.size * 4);
            gradient.addColorStop(0, `rgba(${node.color.r}, ${node.color.g}, ${node.color.b}, 0.4)`);
            gradient.addColorStop(1, `rgba(${node.color.r}, ${node.color.g}, ${node.color.b}, 0)`);
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.size * 4, 0, Math.PI * 2);
            ctx.fill();

            // Draw connections
            nodes.slice(i + 1).forEach(otherNode => {
                const dx = node.x - otherNode.x;
                const dy = node.y - otherNode.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDistance) {
                    const opacity = (1 - distance / connectionDistance) * 0.5;

                    // Create gradient line
                    const gradient = ctx.createLinearGradient(node.x, node.y, otherNode.x, otherNode.y);
                    gradient.addColorStop(0, `rgba(${node.color.r}, ${node.color.g}, ${node.color.b}, ${opacity})`);
                    gradient.addColorStop(1, `rgba(${otherNode.color.r}, ${otherNode.color.g}, ${otherNode.color.b}, ${opacity})`);

                    ctx.beginPath();
                    ctx.moveTo(node.x, node.y);
                    ctx.lineTo(otherNode.x, otherNode.y);
                    ctx.strokeStyle = gradient;
                    ctx.lineWidth = 1.5;
                    ctx.stroke();
                }
            });
        });

        requestAnimationFrame(animate);
    }

    animate();
})();

// Network Canvas Animation - Data Network
(function () {
    const canvas = document.getElementById('network-canvas');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const nodes = [];
    const nodeCount = 60;
    const connectionDistance = 200;

    const colors = [{
        r: 0,
        g: 255,
        b: 255
    }, // cyan
    {
        r: 255,
        g: 0,
        b: 255
    }, // magenta
    {
        r: 138,
        g: 43,
        b: 226
    }, // purple
    {
        r: 255,
        g: 107,
        b: 53
    }, // orange
    {
        r: 0,
        g: 255,
        b: 136
    }, // green
    {
        r: 65,
        g: 105,
        b: 225
    }, // blue
    {
        r: 255,
        g: 68,
        b: 68
    }, // red
    {
        r: 255,
        g: 215,
        b: 0
    }, // yellow
    {
        r: 32,
        g: 178,
        b: 170
    }, // teal
    {
        r: 255,
        g: 105,
        b: 180
    }, // pink
    {
        r: 50,
        g: 205,
        b: 50
    }, // lime
    {
        r: 75,
        g: 0,
        b: 130
    }, // indigo
    {
        r: 255,
        g: 127,
        b: 80
    } // coral
    ];

    for (let i = 0; i < nodeCount; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.8,
            vy: (Math.random() - 0.5) * 0.8,
            size: Math.random() * 3 + 2,
            color: color,
            pulsePhase: Math.random() * Math.PI * 2
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw nodes
        nodes.forEach((node, i) => {
            node.x += node.vx;
            node.y += node.vy;

            // Bounce off edges
            if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

            // Keep within bounds
            node.x = Math.max(0, Math.min(canvas.width, node.x));
            node.y = Math.max(0, Math.min(canvas.height, node.y));

            // Pulse effect
            node.pulsePhase += 0.02;
            const pulse = Math.sin(node.pulsePhase) * 0.3 + 0.7;

            // Draw node
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.size * pulse, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${node.color.r}, ${node.color.g}, ${node.color.b}, 0.8)`;
            ctx.fill();

            // Draw glow
            const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.size * 3);
            gradient.addColorStop(0, `rgba(${node.color.r}, ${node.color.g}, ${node.color.b}, 0.3)`);
            gradient.addColorStop(1, `rgba(${node.color.r}, ${node.color.g}, ${node.color.b}, 0)`);
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.size * 3, 0, Math.PI * 2);
            ctx.fill();

            // Draw connections
            nodes.slice(i + 1).forEach(otherNode => {
                const dx = node.x - otherNode.x;
                const dy = node.y - otherNode.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDistance) {
                    const opacity = (1 - distance / connectionDistance) * 0.4;

                    // Create gradient line
                    const gradient = ctx.createLinearGradient(node.x, node.y, otherNode.x, otherNode.y);
                    gradient.addColorStop(0, `rgba(${node.color.r}, ${node.color.g}, ${node.color.b}, ${opacity})`);
                    gradient.addColorStop(1, `rgba(${otherNode.color.r}, ${otherNode.color.g}, ${otherNode.color.b}, ${opacity})`);

                    ctx.beginPath();
                    ctx.moveTo(node.x, node.y);
                    ctx.lineTo(otherNode.x, otherNode.y);
                    ctx.strokeStyle = gradient;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            });
        });

        requestAnimationFrame(animate);
    }

    animate();
})();




// Slideshow Logic
(function () {
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    let currentSlideIndex = 0;
    let slideOrder = [];
    let autoplayInterval;
    const AUTOPLAY_DELAY = 3000; // 7 seconds per slide
    // const AUTOPLAY_DELAY = 7000; // 7 seconds per slide

    // Generate random slide order using Fisher-Yates shuffle
    function generateRandomOrder() {
        slideOrder = Array.from({
            length: totalSlides
        }, (_, i) => i);
        for (let i = slideOrder.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [slideOrder[i], slideOrder[j]] = [slideOrder[j], slideOrder[i]];
        }
    }

    // Show specific slide
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        const slideToShow = slideOrder[index];
        slides[slideToShow].classList.add('active');
        updateIndicators(index);
    }

    // Next slide
    function nextSlide() {
        currentSlideIndex++;
        if (currentSlideIndex >= totalSlides) {
            currentSlideIndex = 0;
            generateRandomOrder(); // Generate new random order for next cycle
        }
        showSlide(currentSlideIndex);
    }

    // Previous slide
    function prevSlide() {
        currentSlideIndex--;
        if (currentSlideIndex < 0) {
            currentSlideIndex = totalSlides - 1;
        }
        showSlide(currentSlideIndex);
    }

    // Go to specific slide
    function goToSlide(index) {
        currentSlideIndex = index;
        showSlide(currentSlideIndex);
        resetAutoplay();
    }

    // Create indicators
    function createIndicators() {
        const indicatorsContainer = document.getElementById('indicators');
        for (let i = 0; i < totalSlides; i++) {
            const indicator = document.createElement('div');
            indicator.className = 'indicator';
            indicator.addEventListener('click', () => goToSlide(i));
            indicatorsContainer.appendChild(indicator);
        }
    }

    // Update indicators
    function updateIndicators(activeIndex) {
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            if (index === activeIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    // Start autoplay
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, AUTOPLAY_DELAY);
    }

    // Reset autoplay (restart timer)
    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }

    // Navigation button handlers
    document.getElementById('prevBtn').addEventListener('click', () => {
        prevSlide();
        resetAutoplay();
    });

    document.getElementById('nextBtn').addEventListener('click', () => {
        nextSlide();
        resetAutoplay();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetAutoplay();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            resetAutoplay();
        }
    });

    // Initialize slideshow
    generateRandomOrder();
    createIndicators();
    showSlide(0);
    startAutoplay();

    // Pause autoplay on hover
    const slideshowContainer = document.querySelector('.slideshow-container');
    slideshowContainer.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });
    slideshowContainer.addEventListener('mouseleave', () => {
        startAutoplay();
    });
})();