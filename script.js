// Smart Loading Screen Management
class LoadingManager {
  constructor() {
    this.loadingScreen = document.getElementById('loadingScreen');
    this.mainContent = document.getElementById('mainContent');
    this.loadingText = document.getElementById('loadingText');

    this.loadedResources = 0;
    this.totalResources = 0;
    this.minLoadingTime = 2000; // Minimum 2 seconds
    this.maxLoadingTime = 5000; // Maximum 5 seconds
    this.startTime = Date.now();

    this.criticalResources = [
      'Images/ui/logo.jpg',
      'Images/rooms/super-deluxe/IMG_4112.JPG',
      'Images/rooms/super-deluxe/IMG_2540.jpg.png',
    ];

    // Random Darjeeling facts
    this.darjeelingFacts = [
      "Darjeeling produces less than 1% of India's tea, but is world-famous as the 'Champagne of Teas.'",
      'The Darjeeling Himalayan Railway, built in the 1880s, is a UNESCO World Heritage toy train climbing from 100m to over 2,000m in 80 km.',
      'The first commercial tea garden, Steinthal Tea Estate, was planted in 1852.',
      "On clear mornings, Tiger Hill reveals golden sunrise views of Mt. Kanchenjunga, the world's third-highest peak.",
      'Everest legend Tenzing Norgay lived in Darjeeling and founded the Himalayan Mountaineering Institute.',
      "The Padmaja Naidu Himalayan Zoological Park (7,000 ft) is the world's highest-altitude zoo.",
      'Darjeeling Zoo is famous for breeding the rare red panda, symbol of the Eastern Himalayas.',
      'Darjeeling blends Tibetan, Nepali, Lepcha, and British heritage in its food, monasteries, and architecture.',
      "Glenary's, a colonial-era bakery, has been serving cakes and tea for over 100 years.",
      'The Batasia Loop lets the toy train make a full circle with stunning views of Kanchenjunga.',
      'Darjeeling and its hills are home to over 600 species of orchids.',
      'Locals mix Nepali, Hindi, Tibetan, Bengali, and English in their daily speech.',
    ];

    this.init();
  }

  init() {
    this.totalResources = this.criticalResources.length;
    // Show a random fact immediately
    this.showRandomFact();
    this.preloadCriticalResources();
    this.startFactRotation();
    this.setMaxTimeout();
  }

  preloadCriticalResources() {
    this.criticalResources.forEach((src) => {
      const img = new Image();
      img.onload = () => this.resourceLoaded();
      img.onerror = () => this.resourceLoaded(); // Count as loaded even if error
      img.src = src;
    });
  }

  resourceLoaded() {
    this.loadedResources++;

    if (this.loadedResources >= this.totalResources) {
      this.checkMinTime();
    }
  }

  startFactRotation() {
    // Rotate facts every 3 seconds (shorter facts are easier to read)
    this.factInterval = setInterval(() => {
      this.showRandomFact();
    }, 3000);
  }

  showRandomFact() {
    let randomIndex;
    let fact;

    // Ensure we don't show the same fact twice in a row
    do {
      randomIndex = Math.floor(Math.random() * this.darjeelingFacts.length);
      fact = this.darjeelingFacts[randomIndex];
    } while (fact === this.currentFact && this.darjeelingFacts.length > 1);

    this.currentFact = fact;

    // Fade out, change text, fade in
    this.loadingText.style.opacity = '0';
    setTimeout(() => {
      this.loadingText.textContent = fact;
      this.loadingText.style.opacity = '1';
    }, 300);
  }

  checkMinTime() {
    const elapsed = Date.now() - this.startTime;
    if (elapsed >= this.minLoadingTime) {
      this.hideLoadingScreen();
    } else {
      setTimeout(() => this.hideLoadingScreen(), this.minLoadingTime - elapsed);
    }
  }

  setMaxTimeout() {
    setTimeout(() => {
      this.hideLoadingScreen();
    }, this.maxLoadingTime);
  }

  hideLoadingScreen() {
    // Clear fact rotation interval
    if (this.factInterval) {
      clearInterval(this.factInterval);
    }

    // Show main content
    this.mainContent.classList.add('loaded');

    // Hide loading screen after a short delay
    setTimeout(() => {
      this.loadingScreen.classList.add('hidden');

      // Remove from DOM after animation
      setTimeout(() => {
        this.loadingScreen.remove();
      }, 500);
    }, 300);
  }
}

// Initialize loading manager when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  new LoadingManager();
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach((n) =>
  n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  })
);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });
});

// Navbar background change on scroll (optimized)
let lastScrollY = 0;
let ticking = false;

function updateNavbar() {
  const navbar = document.querySelector('.navbar');
  if (lastScrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  ticking = false;
}

function requestNavbarUpdate() {
  if (!ticking) {
    requestAnimationFrame(updateNavbar);
    ticking = true;
  }
}

window.addEventListener(
  'scroll',
  () => {
    lastScrollY = window.scrollY;
    requestNavbarUpdate();
  },
  { passive: true }
);

// Active navigation link highlighting (optimized)
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
let currentSection = '';

function updateActiveNav() {
  let current = '';
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  if (current !== currentSection) {
    currentSection = current;
    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }
}

// Use the same optimized scroll handler
window.addEventListener(
  'scroll',
  () => {
    lastScrollY = window.scrollY;
    requestNavbarUpdate();
    updateActiveNav();
  },
  { passive: true }
);

// Contact form handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const phone = this.querySelector('input[type="tel"]').value;
    const message = this.querySelector('textarea').value;

    // Simple validation
    if (!name || !email || !message) {
      showNotification('Please fill in all required fields.', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showNotification('Please enter a valid email address.', 'error');
      return;
    }

    // Simulate form submission
    showNotification(
      'Thank you for your message! We will get back to you soon.',
      'success'
    );
    this.reset();
  });
}

// Email validation function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${
          type === 'success'
            ? '#4CAF50'
            : type === 'error'
            ? '#f44336'
            : '#2196F3'
        };
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;

  // Add to page
  document.body.appendChild(notification);

  // Close button functionality
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.addEventListener('click', () => {
    notification.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  });

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background-color 0.2s ease;
    }
    
    .notification-close:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
`;
document.head.appendChild(style);

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
  const animateElements = document.querySelectorAll(
    '.room-card, .amenity-card, .attraction-card, .gallery-item, .review-item, .contact-item'
  );
  animateElements.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});

// Parallax effect for hero section (disabled to prevent image from going outside container)
// window.addEventListener('scroll', () => {
//   const scrolled = window.pageYOffset;
//   const heroImage = document.querySelector('.hero-image');
//   if (heroImage) {
//     heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
//   }
// });

// Room card hover effects
document.addEventListener('DOMContentLoaded', () => {
  const roomCards = document.querySelectorAll('.room-card');
  roomCards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });
});

// Amenity card click effects
document.addEventListener('DOMContentLoaded', () => {
  const amenityCards = document.querySelectorAll('.amenity-card');
  amenityCards.forEach((card) => {
    card.addEventListener('click', () => {
      // Add ripple effect
      const ripple = document.createElement('div');
      ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(102, 126, 234, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;

      const rect = card.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = rect.width / 2 - size / 2 + 'px';
      ripple.style.top = rect.height / 2 - size / 2 + 'px';

      card.style.position = 'relative';
      card.style.overflow = 'hidden';
      card.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });
});

// Add ripple animation CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Loading animation
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';

  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});

// Back to top button
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopBtn.className = 'back-to-top';
backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #d4af37 0%, #b8860b 100%);
    color: #2c2c2c;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.2rem;
    box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
`;

document.body.appendChild(backToTopBtn);

// Show/hide back to top button
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.style.opacity = '1';
    backToTopBtn.style.visibility = 'visible';
  } else {
    backToTopBtn.style.opacity = '0';
    backToTopBtn.style.visibility = 'hidden';
  }
});

// Back to top functionality
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

// Hover effect for back to top button
backToTopBtn.addEventListener('mouseenter', () => {
  backToTopBtn.style.transform = 'translateY(-3px)';
  backToTopBtn.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2)';
});

backToTopBtn.addEventListener('mouseleave', () => {
  backToTopBtn.style.transform = 'translateY(0)';
  backToTopBtn.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
});

// Gallery Modal Functionality
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const modalCaption = document.querySelector('.modal-caption');
  const closeBtn = document.querySelector('.close');
  const galleryItems = document.querySelectorAll('.gallery-item');

  // Open modal when gallery item is clicked
  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      const img = item.querySelector('.gallery-img');
      modal.style.display = 'block';
      modalImg.src = img.src;
      modalImg.alt = img.alt;
      modalCaption.textContent = img.alt;
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
  });

  // Close modal when close button is clicked
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
  });

  // Close modal when clicking outside the image
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto'; // Restore scrolling
    }
  });

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto'; // Restore scrolling
    }
  });
});

// Room Gallery Data
const roomGalleries = {
  deluxe: {
    title: 'Deluxe Room Gallery',
    images: [
      { src: 'Images/rooms/deluxe/deluxe-room.webp', alt: 'Deluxe Room' },
    ],
  },
  'super-deluxe': {
    title: 'Super Deluxe Room Gallery',
    images: [
      {
        src: 'Images/rooms/super-deluxe/super-deluxe (1).webp',
        alt: 'Super Deluxe Room 1',
      },
      {
        src: 'Images/rooms/super-deluxe/super-deluxe (2).webp',
        alt: 'Super Deluxe Room 2',
      },
      {
        src: 'Images/rooms/super-deluxe/super-deluxe (3).webp',
        alt: 'Super Deluxe Room 3',
      },
      {
        src: 'Images/rooms/super-deluxe/super-deluxe (4).webp',
        alt: 'Super Deluxe Room 4',
      },
    ],
  },
  premium: {
    title: 'Premium Room Gallery',
    images: [
      { src: 'Images/rooms/premium/premium (1).webp', alt: 'Premium Room 1' },
      { src: 'Images/rooms/premium/premium (2).webp', alt: 'Premium Room 2' },
      { src: 'Images/rooms/premium/premium (3).webp', alt: 'Premium Room 3' },
      { src: 'Images/rooms/premium/premium (4).webp', alt: 'Premium Room 4' },
      { src: 'Images/rooms/premium/premium (5).webp', alt: 'Premium Room 5' },
    ],
  },
  attic: {
    title: 'Attic Room Gallery',
    images: [
      { src: 'Images/rooms/attic/attic (1).webp', alt: 'Attic Room 1' },
      { src: 'Images/rooms/attic/attic (2).webp', alt: 'Attic Room 2' },
      { src: 'Images/rooms/attic/attic (3).webp', alt: 'Attic Room 3' },
      { src: 'Images/rooms/attic/attic (4).webp', alt: 'Attic Room 4' },
    ],
  },
};

// Contact Form Functionality
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Get form data
      const name = document.getElementById('contact-name').value;
      const email = document.getElementById('contact-email').value;
      const phone = document.getElementById('contact-phone').value;
      const message = document.getElementById('contact-message').value;

      // Create email subject and body
      const subject = `Contact from ${name} - Hotel Norling Retreat`;
      const body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`;

      // Create mailto link
      const mailtoLink = `mailto:thundupttb@gmail.com?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;

      // Open email client
      window.location.href = mailtoLink;

      // Show success message
      alert(
        'Your email client will open with a pre-filled message. Please send the email to complete your inquiry.'
      );

      // Reset form
      contactForm.reset();
    });
  }
});

// Room Gallery Functionality
document.addEventListener('DOMContentLoaded', () => {
  const roomGalleryModal = document.getElementById('roomGalleryModal');
  const roomGalleryImage = document.getElementById('roomGalleryImage');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const roomGalleryDots = document.getElementById('roomGalleryDots');
  const roomGalleryClose = document.querySelector('.room-gallery-close');
  const roomCards = document.querySelectorAll('.room-card[data-room-type]');

  let currentGallery = null;
  let currentImageIndex = 0;

  // Open room gallery when room card is clicked
  roomCards.forEach((card) => {
    const roomType = card.getAttribute('data-room-type');
    const overlay = card.querySelector('.room-gallery-overlay');

    if (overlay) {
      overlay.addEventListener('click', () => {
        openRoomGallery(roomType);
      });
    }
  });

  // Open room gallery function
  function openRoomGallery(roomType) {
    if (!roomGalleries[roomType]) return;

    currentGallery = roomGalleries[roomType];
    currentImageIndex = 0;

    // Show modal
    roomGalleryModal.style.display = 'block';
    roomGalleryModal.style.visibility = 'visible';
    document.body.style.overflow = 'hidden';

    // Add show class for animation
    setTimeout(() => {
      roomGalleryModal.classList.add('show');
    }, 10);

    // Load first image and dots
    loadCurrentImage();
    loadDots();
  }

  // Load current image
  function loadCurrentImage() {
    if (!currentGallery) return;

    const currentImage = currentGallery.images[currentImageIndex];
    roomGalleryImage.src = currentImage.src;
    roomGalleryImage.alt = currentImage.alt;

    // Update dot active state
    updateDotActiveState();
  }

  // Load dots
  function loadDots() {
    if (!currentGallery) return;

    roomGalleryDots.innerHTML = '';

    currentGallery.images.forEach((image, index) => {
      const dot = document.createElement('button');
      dot.className = `room-gallery-dot ${
        index === currentImageIndex ? 'active' : ''
      }`;
      dot.addEventListener('click', () => {
        currentImageIndex = index;
        loadCurrentImage();
      });
      roomGalleryDots.appendChild(dot);
    });
  }

  // Update dot active state
  function updateDotActiveState() {
    const dots = roomGalleryDots.querySelectorAll('.room-gallery-dot');
    dots.forEach((dot, index) => {
      dot.className = `room-gallery-dot ${
        index === currentImageIndex ? 'active' : ''
      }`;
    });
  }

  // Navigation functions
  function showNextImage() {
    if (!currentGallery) return;
    currentImageIndex = (currentImageIndex + 1) % currentGallery.images.length;
    loadCurrentImage();
  }

  function showPrevImage() {
    if (!currentGallery) return;
    currentImageIndex =
      currentImageIndex === 0
        ? currentGallery.images.length - 1
        : currentImageIndex - 1;
    loadCurrentImage();
  }

  // Event listeners
  nextBtn.addEventListener('click', showNextImage);
  prevBtn.addEventListener('click', showPrevImage);

  // Close modal (desktop only)
  roomGalleryClose.addEventListener('click', () => {
    if (window.innerWidth > 768) {
      roomGalleryModal.classList.remove('show');
      setTimeout(() => {
        roomGalleryModal.style.display = 'none';
        roomGalleryModal.style.visibility = 'hidden';
        document.body.style.overflow = 'auto';
      }, 400);
    }
  });

  // Close modal when clicking outside (desktop only)
  roomGalleryModal.addEventListener('click', (e) => {
    if (e.target === roomGalleryModal && window.innerWidth > 768) {
      roomGalleryModal.classList.remove('show');
      setTimeout(() => {
        roomGalleryModal.style.display = 'none';
        roomGalleryModal.style.visibility = 'hidden';
        document.body.style.overflow = 'auto';
      }, 400);
    }
  });

  // Touch events for mobile swipe-down to close
  let startY = 0;
  let currentY = 0;
  let isDragging = false;
  let initialTransform = 0;

  roomGalleryModal.addEventListener('touchstart', (e) => {
    if (window.innerWidth <= 768) {
      startY = e.touches[0].clientY;
      isDragging = true;
      initialTransform = 0;
    }
  });

  roomGalleryModal.addEventListener('touchmove', (e) => {
    if (!isDragging || window.innerWidth > 768) return;

    currentY = e.touches[0].clientY;
    const deltaY = currentY - startY;

    // Only allow downward swipes
    if (deltaY > 0) {
      e.preventDefault();
      // Add visual feedback by moving the modal
      const translateY = Math.min(deltaY, 200);
      roomGalleryModal.style.transform = `translateY(${translateY}px)`;
      initialTransform = translateY;
    }
  });

  roomGalleryModal.addEventListener('touchend', (e) => {
    if (!isDragging || window.innerWidth > 768) return;

    const deltaY = currentY - startY;
    const threshold = 100; // Minimum swipe distance to close

    if (deltaY > threshold) {
      // Close the modal
      roomGalleryModal.classList.remove('show');
      setTimeout(() => {
        roomGalleryModal.style.display = 'none';
        roomGalleryModal.style.visibility = 'hidden';
        document.body.style.overflow = 'auto';
        roomGalleryModal.style.transform = 'translateY(100%)';
      }, 400);
    } else {
      // Snap back to original position
      roomGalleryModal.style.transform = 'translateY(0)';
    }

    isDragging = false;
    startY = 0;
    currentY = 0;
    initialTransform = 0;
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (roomGalleryModal.style.display === 'block') {
      switch (e.key) {
        case 'Escape':
          roomGalleryModal.classList.remove('show');
          setTimeout(() => {
            roomGalleryModal.style.display = 'none';
            roomGalleryModal.style.visibility = 'hidden';
            document.body.style.overflow = 'auto';
          }, 400);
          break;
        case 'ArrowLeft':
          showPrevImage();
          break;
        case 'ArrowRight':
          showNextImage();
          break;
      }
    }
  });
});

// Console welcome message
console.log(
  '%c🏨 Welcome to Hotel Norling Retreat! 🏨',
  'color: #d4af37; font-size: 20px; font-weight: bold;'
);
console.log(
  '%cThank you for visiting our website. We hope you enjoy your virtual tour!',
  'color: #2c2c2c; font-size: 14px;'
);
