const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

// We houden een timeout bij per section
const activeTimers = new Map();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const id = entry.target.id;

    // Als een sectie in beeld komt
    if (entry.isIntersecting) {
      // Zet een timer om pas na 300ms te checken
      const timer = setTimeout(() => {
        // Check of de sectie nog steeds zichtbaar is
        if (entry.isIntersecting) {
          // Verwijder alle active classes
          navLinks.forEach(link => {
            link.classList.remove('active');
          });

          // Voeg active toe aan de juiste link
          const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
          if (activeLink) {
            activeLink.classList.add('active');
          }
        }
      }, 100);

      // Sla de timer op zodat we hem eventueel later kunnen annuleren
      activeTimers.set(id, timer);
    } else {
      // Als de sectie uit beeld verdwijnt, cancel de timer (als die nog loopt)
      if (activeTimers.has(id)) {
        clearTimeout(activeTimers.get(id));
        activeTimers.delete(id);
      }
    }
  });
}, {
  threshold: 0.3
});

sections.forEach(section => {
  observer.observe(section);
});

const blocks = document.querySelectorAll('.text-images');
blocks.forEach((block, i) => {
  if (i % 2 !== 0) {
    block.classList.add('reverse');
  }
});

const lightbox = document.getElementById('lightbox');
const lightboxImage = lightbox.querySelector('img');
const closeBtn = document.getElementById('lightboxClose');

document.querySelectorAll('.images img').forEach(img => {
  img.style.cursor = 'pointer'; // Maak het duidelijk dat het klikbaar is
  img.addEventListener('click', () => {
    lightboxImage.src = img.src;
    lightbox.classList.add('active');
  });
});

closeBtn.addEventListener('click', () => {
  lightbox.classList.remove('active');
  lightboxImage.src = '';
});

lightbox.addEventListener('click', e => {
  if (e.target === lightbox) { // Klik buiten de afbeelding sluit de lightbox
    lightbox.classList.remove('active');
    lightboxImage.src = '';
  }
});
