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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

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
      { src: 'Images/attic room.png', alt: 'Deluxe Room Interior' },
      { src: 'Images/washroom.png', alt: 'Deluxe Room Bathroom' },
      { src: 'Images/design.jpeg.jpg', alt: 'Deluxe Room Design' },
      { src: 'Images/IMG_0229.jpeg.jpg', alt: 'Deluxe Room View' },
      { src: 'Images/IMG_0679.jpg', alt: 'Deluxe Room Amenities' },
    ],
  },
  'super-deluxe': {
    title: 'Super Deluxe Room Gallery',
    images: [
      { src: 'Images/rajbari.jpeg.jpg', alt: 'Super Deluxe Room Interior' },
      {
        src: 'Images/kanchen junga.jpeg.jpg',
        alt: 'Super Deluxe Room - Kanchenjunga View',
      },
      {
        src: 'Images/kanchen junga (2).jpeg.jpg',
        alt: 'Super Deluxe Room - Mountain View',
      },
      { src: 'Images/IMG_2540.jpg.png', alt: 'Super Deluxe Room Design' },
      { src: 'Images/IMG_4112.JPG', alt: 'Super Deluxe Room Exterior' },
    ],
  },
  premium: {
    title: 'Premium Room Gallery',
    images: [
      { src: 'Images/washroom.png', alt: 'Premium Room Interior' },
      { src: 'Images/design.jpeg.jpg', alt: 'Premium Room Design' },
      { src: 'Images/IMG_0229.jpeg.jpg', alt: 'Premium Room View' },
      { src: 'Images/IMG_0679.jpg', alt: 'Premium Room Amenities' },
      { src: 'Images/IMG_2540.jpg.png', alt: 'Premium Room Features' },
    ],
  },
  attic: {
    title: 'Attic Room Gallery',
    images: [
      { src: 'Images/attic room.png', alt: 'Attic Room Interior' },
      { src: 'Images/design.jpeg.jpg', alt: 'Attic Room Design' },
      { src: 'Images/IMG_0229.jpeg.jpg', alt: 'Attic Room View' },
      { src: 'Images/IMG_0679.jpg', alt: 'Attic Room Features' },
      { src: 'Images/IMG_2540.jpg.png', alt: 'Attic Room Amenities' },
    ],
  },
};

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
