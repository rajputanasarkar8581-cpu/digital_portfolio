const loadingScreen = document.querySelector('.loading-screen');
const progressFill = document.querySelector('.progress-fill');
const navLinks = Array.from(document.querySelectorAll('.nav-links a'));
const sections = navLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
const navbar = document.querySelector('.navbar');
const mobileToggle = document.querySelector('.nav-toggle');
const mobileMenu = document.querySelector('.nav-links');
const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');
const magneticItems = document.querySelectorAll('.magnetic, .btn, .icon-chip, .project-links a');
const cards = document.querySelectorAll('.skill-card, .project-card, .service-card, .certificate-card, .contact-card, .contact-form');

const startLoading = () => {
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 16 + 8;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
      }, 450);
    }
    progressFill.style.width = `${progress}%`;
  }, 120);
};

if (loadingScreen) startLoading();

const setActiveLink = () => {
  const offset = window.scrollY + 180;
  let current = sections[0]?.id || '';

  sections.forEach((section, index) => {
    if (offset >= section.offsetTop) current = section.id;
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
};

window.addEventListener('scroll', setActiveLink, { passive: true });
window.addEventListener('load', setActiveLink);

mobileToggle?.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

const moveCursor = (e) => {
  cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  cursorRing.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
};

document.addEventListener('mousemove', moveCursor);

const handleHover = () => {
  document.body.classList.add('hovered');
  cursorRing.classList.add('expand');
};

const handleLeave = () => {
  document.body.classList.remove('hovered');
  cursorRing.classList.remove('expand');
};

magneticItems.forEach(item => {
  item.addEventListener('mouseenter', handleHover);
  item.addEventListener('mouseleave', handleLeave);
  item.addEventListener('mousemove', (e) => {
    const rect = item.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const moveX = (x - rect.width / 2) / 8;
    const moveY = (y - rect.height / 2) / 8;
    item.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
  item.addEventListener('mouseleave', () => {
    item.style.transform = '';
  });
});

document.addEventListener('click', (e) => {
  cursorRing.classList.remove('ripple');
  void cursorRing.offsetWidth;
  cursorRing.classList.add('ripple');
});

cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${y * -8}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

if (window.gsap) {
  gsap.from('.hero h1, .hero .lead, .hero-actions, .hero-socials', {
    y: 32,
    opacity: 0,
    duration: 1.1,
    stagger: 0.14,
    ease: 'power3.out'
  });
  gsap.from('.hero-visual', { scale: .94, opacity: 0, duration: 1.1, delay: .2, ease: 'power3.out' });
  gsap.utils.toArray('section').forEach(section => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: 'top 85%'
      },
      y: 38,
      opacity: 0,
      duration: .9,
      ease: 'power3.out'
    });
  });
}

if (window.AOS) AOS.init({ duration: 850, once: true, offset: 110 });

if (window.Typed) {
  new Typed('#typedText', {
    strings: ['Software Developer', 'Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'AI Enthusiast'],
    typeSpeed: 70,
    backSpeed: 45,
    loop: true
  });
}

if (window.VanillaTilt) {
  VanillaTilt.init(document.querySelectorAll('.skill-card, .project-card, .service-card'), {
    max: 22,
    speed: 400,
    glare: true,
    'max-glare': .14
  });
}

const initParticles = () => {
  const particleHost = document.getElementById('particles-js');
  if (!particleHost) return;

  if (window.particlesJS) {
    particlesJS('particles-js', {
      particles: {
        number: { value: 80 },
        color: { value: ['#00e5ff', '#7b2ff7', '#ff4ecd'] },
        opacity: { value: .35 },
        size: { value: 2.8 },
        line_linked: { enable: true, distance: 150, color: '#ffffff', opacity: .08, width: 1 },
        move: { enable: true, speed: 1.2 }
      },
      interactivity: { detectsOn: 'canvas', events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' } }, modes: { repulse: { distance: 120, duration: .5 } } },
      retina_detect: true
    });
  }
};
initParticles();

const initThree = () => {
  if (!window.THREE) return;
  const container = document.getElementById('three-scene');
  if (!container) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.z = 5.8;
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  const group = new THREE.Group();
  const geometry = new THREE.TorusKnotGeometry(0.95, 0.25, 140, 16);
  const material = new THREE.MeshPhysicalMaterial({ color: 0x00e5ff, emissive: 0x123a4f, metalness: 0.3, roughness: 0.2, transmission: 0.2 });
  const torus = new THREE.Mesh(geometry, material);
  torus.rotation.x = 1.2;
  group.add(torus);

  const sphere = new THREE.Mesh(new THREE.IcosahedronGeometry(0.8, 1), new THREE.MeshBasicMaterial({ color: 0x7b2ff7, wireframe: true }));
  group.add(sphere);

  const points = new THREE.Points(new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-2.7, 0.8, 0),
    new THREE.Vector3(2.1, -1, 0),
    new THREE.Vector3(0.4, 2.3, 0)
  ]), new THREE.PointsMaterial({ color: 0xff4ecd, size: 0.03, sizeAttenuation: true }));
  group.add(points);

  scene.add(group);

  const animate = () => {
    requestAnimationFrame(animate);
    group.rotation.y += 0.006;
    torus.rotation.z += 0.008;
    sphere.rotation.y -= 0.007;
    renderer.render(scene, camera);
  };
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
};
initThree();

if (window.Swiper) {
  new Swiper('.certificates-swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }
  });
}

const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox img');
const certificateCards = document.querySelectorAll('.certificate-card');

certificateCards.forEach(card => {
  card.addEventListener('click', () => {
    const img = card.querySelector('img');
    lightboxImg.src = img.src;
    lightbox.classList.add('open');
  });
});

document.querySelector('.lightbox .close')?.addEventListener('click', () => {
  lightbox.classList.remove('open');
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') lightbox.classList.remove('open');
});

const form = document.querySelector('form');
const recipientEmail = 'hardik@example.com';
const storageKey = 'portfolio-contact-messages';

const saveMessage = (data) => {
  const existing = JSON.parse(localStorage.getItem(storageKey) || '[]');
  existing.unshift({ ...data, createdAt: new Date().toISOString() });
  localStorage.setItem(storageKey, JSON.stringify(existing.slice(0, 50)));
};

const openMailDraft = (data) => {
  const subject = encodeURIComponent(`New portfolio message: ${data.subject}`);
  const body = encodeURIComponent(
    `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || 'N/A'}\nSubject: ${data.subject}\n\nMessage:\n${data.message}`
  );
  window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
};

form?.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  saveMessage(data);
  openMailDraft(data);

  const note = document.querySelector('.form-note');
  if (note) {
    note.textContent = 'Your message has been saved locally and your email app is opening with the details.';
  }
  form.reset();
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 80) navbar.style.boxShadow = '0 15px 40px rgba(0,0,0,0.2)';
  else navbar.style.boxShadow = 'none';
});
