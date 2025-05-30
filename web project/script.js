// Test Questions
const testQuestions = [
  {
    question: "Saya merasa sedih atau murung tanpa alasan yang jelas.",
    options: ["Tidak Pernah", "Jarang", "Kadang-kadang", "Sering", "Selalu"]
  },
  {
    question: "Saya merasa cemas atau khawatir berlebihan.",
    options: ["Tidak Pernah", "Jarang", "Kadang-kadang", "Sering", "Selalu"]
  },
  {
    question: "Saya sulit tidur atau sering terbangun di malam hari.",
    options: ["Tidak Pernah", "Jarang", "Kadang-kadang", "Sering", "Selalu"]
  },
  {
    question: "Saya merasa kehilangan minat dalam aktivitas sehari-hari.",
    options: ["Tidak Pernah", "Jarang", "Kadang-kadang", "Sering", "Selalu"]
  }
];

// Create Test Form
function createTest() {
  const form = document.getElementById("mentalHealthTestForm");
  form.innerHTML = ''; // Clear previous form
  
  testQuestions.forEach((q, index) => {
    const fieldset = document.createElement("fieldset");
    const legend = document.createElement("legend");
    legend.textContent = q.question;
    fieldset.appendChild(legend);

    q.options.forEach((opt, i) => {
      const div = document.createElement("div");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question${index}`;
      input.value = i;
      input.id = `question${index}_option${i}`;
      input.required = true;
      
      const label = document.createElement("label");
      label.htmlFor = `question${index}_option${i}`;
      label.textContent = opt;
      
      div.appendChild(input);
      div.appendChild(label);
      fieldset.appendChild(div);
    });

    form.appendChild(fieldset);
  });
}

// Submit Test
function submitTest() {
  let score = 0;
  for (let i = 0; i < testQuestions.length; i++) {
    const radios = document.getElementsByName(`question${i}`);
    for (const r of radios) {
      if (r.checked) {
        score += parseInt(r.value) + 1; // +1 because array starts at 0
      }
    }
  }

  const resultDiv = document.getElementById("result");
  let message = "";
  let recommendation = "";

  if (score <= 6) {
    message = "Kesehatan mental Anda tampaknya stabil.";
    recommendation = "Pertahankan kebiasaan baik Anda dan terus pantau perasaan Anda.";
  } else if (score <= 12) {
    message = "Anda mungkin mengalami sedikit stres.";
    recommendation = "Cobalah teknik relaksasi atau berbicara dengan teman tentang perasaan Anda.";
  } else {
    message = "Anda menunjukkan tanda-tanda stres yang tinggi.";
    recommendation = "Pertimbangkan untuk berkonsultasi dengan konselor atau profesional kesehatan mental.";
  }

  resultDiv.innerHTML = `
    <div class="test-result">
      <h3>Hasil Tes Anda</h3>
      <p><strong>Skor:</strong> ${score} dari ${testQuestions.length * 5} (semakin tinggi skor, semakin tinggi tingkat stres)</p>
      <p><strong>Evaluasi:</strong> ${message}</p>
      <p><strong>Rekomendasi:</strong> ${recommendation}</p>
      <button onclick="window.location.href='#layanan'" class="btn">Lihat Layanan Kami</button>
    </div>
  `;
  
  // Scroll to results
  resultDiv.scrollIntoView({ behavior: 'smooth' });
}

// Show Test Section
function tampilkanTes() {
  const tesSection = document.getElementById("tes");
  tesSection.style.display = "block";
  document.getElementById("result").innerHTML = ""; // Clear previous results
  tesSection.scrollIntoView({ behavior: "smooth" });
  createTest(); // Recreate test each time it's shown
}

// Close Test Section
function tutupTes() {
  const tesSection = document.getElementById("tes");
  tesSection.style.display = "none";
  document.getElementById("result").innerHTML = ""; // Clear results
}

// Toggle Dark Mode
function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle('dark-mode');
  
  // Save preference to localStorage
  const isDarkMode = body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isDarkMode);
  
  // Update button
  const toggleBtn = document.getElementById('toggleThemeBtn');
  if (isDarkMode) {
    toggleBtn.textContent = '☀️ Light Mode';
    toggleBtn.style.color = '#ffcc00';
  } else {
    toggleBtn.textContent = '🌙 Dark Mode';
    toggleBtn.style.color = '';
  }
}

// Check Dark Mode Preference on Load
function checkDarkModePreference() {
  const darkModeEnabled = localStorage.getItem('darkMode') === 'true';
  const body = document.body;
  const toggleBtn = document.getElementById('toggleThemeBtn');
  
  if (darkModeEnabled) {
    body.classList.add('dark-mode');
    toggleBtn.textContent = '☀️ Light Mode';
    toggleBtn.style.color = '#ffcc00';
  }
}

// Initialize Journal Toggle Buttons
document.addEventListener('DOMContentLoaded', function() {
  // Setup tombol jurnal
  document.querySelectorAll('.toggle-journal-btn').forEach(button => {
    button.addEventListener('click', function () {
      const journalEntries = this.nextElementSibling;
      const isVisible = journalEntries.style.display === "block";

      journalEntries.style.display = isVisible ? "none" : "block";
      this.textContent = isVisible ? "Lihat" : "Sembunyikan";
      this.classList.toggle('active', !isVisible);
    });
  });

  // Cek dark mode
  checkDarkModePreference();

  // Setup tombol tema
  document.getElementById('toggleThemeBtn').addEventListener('click', toggleDarkMode);

  // Setup menu mobile
  setupMobileMenu();
});


// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Check dark mode preference
  checkDarkModePreference();
  
  // Add event listener for theme toggle button
  document.getElementById('toggleThemeBtn').addEventListener('click', toggleDarkMode);
  
  // Initialize journal buttons
  initJournalButtons();
  
  // Create test (but don't show it yet)
  createTest();
});
// Scroll Animation Handler
function handleScrollAnimations() {
  const elements = document.querySelectorAll('[data-animate]');
  
  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.2;
    
    if (elementPosition < screenPosition) {
      element.classList.add('animate');
    }
  });
}

// Initialize scroll animations
window.addEventListener('scroll', handleScrollAnimations);
window.addEventListener('load', handleScrollAnimations);

// Navbar Scroll Effects
let lastScroll = 0;
window.addEventListener('scroll', function() {
  const currentScroll = window.pageYOffset;
  const header = document.querySelector('header');
  
  if (currentScroll <= 0) {
    header.classList.remove('scrolled');
    header.classList.remove('hidden');
    return;
  }
  
  if (currentScroll > lastScroll && currentScroll > 100) {
    // Scroll down
    header.classList.add('hidden');
  } else {
    // Scroll up
    header.classList.remove('hidden');
  }
  
  if (currentScroll > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// Active Nav Link on Scroll
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', function() {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (pageYOffset >= (sectionTop - 100)) {
      current = section.getAttribute('id');
    }
  });
  
  document.querySelectorAll('nav a').forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === `#${current}`) {
      a.classList.add('active');
    }
  });
});
// Mobile Menu Toggle
function setupMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  
  // Create overlay element
  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  document.body.appendChild(overlay);
  
  // Toggle menu function
  function toggleMenu() {
    mainNav.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  }
  
  // Event listeners
  menuToggle.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', toggleMenu);
  
  // Close menu when clicking on nav links
  document.querySelectorAll('#mainNav a').forEach(link => {
    link.addEventListener('click', () => {
      if (mainNav.classList.contains('active')) {
        toggleMenu();
      }
    });
  });
  
  // Close menu when resizing to desktop
  function checkScreenSize() {
    if (window.innerWidth > 992) {
      mainNav.classList.remove('active');
      overlay.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }
  }
  
  window.addEventListener('resize', checkScreenSize);
}

// Add no-scroll class to body when menu is open
const noScrollCSS = `
  .no-scroll {
    overflow: hidden;
  }
`;

const style = document.createElement('style');
style.innerHTML = noScrollCSS;
document.head.appendChild(style);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  setupMobileMenu();
});