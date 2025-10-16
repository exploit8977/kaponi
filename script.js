function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  // Zavření mobilního menu po kliknutí na odkaz
  document.getElementById('navLinks').classList.remove('active');
}

// Mobilní menu
document.getElementById('mobileMenuBtn').addEventListener('click', function() {
  document.getElementById('navLinks').classList.toggle('active');
});

// Zavření menu při kliknutí mimo něj
document.addEventListener('click', function(event) {
  const navLinks = document.getElementById('navLinks');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  
  if (!navLinks.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
    navLinks.classList.remove('active');
  }
});

// Color Editor Functionality
const colorEditor = document.getElementById('colorEditor');
const editorToggle = document.getElementById('editorToggle');

editorToggle.addEventListener('click', function() {
  colorEditor.classList.toggle('collapsed');
  editorToggle.textContent = colorEditor.classList.contains('collapsed') ? '🎨' : '✕';
});

// Color selection
function setupColorSelector(selectorId, cssVar) {
  const options = document.querySelectorAll(`#${selectorId} .color-option`);
  
  options.forEach(option => {
    option.addEventListener('click', function() {
      // Remove active class from all options
      options.forEach(opt => opt.classList.remove('active'));
      // Add active class to clicked option
      this.classList.add('active');
      // Update CSS variable
      document.documentElement.style.setProperty(cssVar, this.dataset.color);
      
      // Special handling for primary color
      if (cssVar === '--primary') {
        // Update primary-dark (darker version)
        const primaryColor = this.dataset.color;
        const darkerColor = shadeColor(primaryColor, -30);
        document.documentElement.style.setProperty('--primary-dark', darkerColor);
        
        // Update primary-light (lighter version)
        const lighterColor = shadeColor(primaryColor, 40);
        document.documentElement.style.setProperty('--primary-light', lighterColor);
        
        // Update secondary (very light version)
        const veryLightColor = shadeColor(primaryColor, 90);
        document.documentElement.style.setProperty('--secondary', veryLightColor);
      }
    });
  });
}

// Helper function to lighten/darken colors
function shadeColor(color, percent) {
  let R = parseInt(color.substring(1,3),16);
  let G = parseInt(color.substring(3,5),16);
  let B = parseInt(color.substring(5,7),16);

  R = parseInt(R * (100 + percent) / 100);
  G = parseInt(G * (100 + percent) / 100);
  B = parseInt(B * (100 + percent) / 100);

  R = (R<255)?R:255;  
  G = (G<255)?G:255;  
  B = (B<255)?B:255;  

  R = Math.round(R);
  G = Math.round(G);
  B = Math.round(B);

  const RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
  const GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
  const BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

  return "#"+RR+GG+BB;
}

// Initialize color selectors
setupColorSelector('headingColors', '--heading-color');
setupColorSelector('backgroundColors', '--background');
setupColorSelector('primaryColors', '--primary');

// Set initial active states
document.querySelector('#headingColors .color-option:nth-child(1)').classList.add('active');
document.querySelector('#backgroundColors .color-option:nth-child(1)').classList.add('active');
document.querySelector('#primaryColors .color-option:nth-child(1)').classList.add('active');

// Logo upload functionality
document.addEventListener('DOMContentLoaded', function() {
  // Create a file input for logo
  const logoInput = document.createElement('input');
  logoInput.type = 'file';
  logoInput.accept = 'image/*';
  logoInput.style.display = 'none';
  document.body.appendChild(logoInput);
  
  // Handle logo click to upload
  document.getElementById('logoPreview').addEventListener('click', function() {
    logoInput.click();
  });
  
  // Handle logo image upload
  logoInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const logoPreview = document.getElementById('logoPreview');
        logoPreview.innerHTML = `<img src="${e.target.result}" class="logo-preview" alt="Kaponi logo">`;
      }
      reader.readAsDataURL(file);
    }
  });
  
  // Create a file input for header background
  const bgInput = document.createElement('input');
  bgInput.type = 'file';
  bgInput.accept = 'image/*';
  bgInput.style.display = 'none';
  document.body.appendChild(bgInput);
  
  // Handle header background click to upload
  document.getElementById('headerBackground').addEventListener('click', function() {
    bgInput.click();
  });
  
  // Handle background image upload
  bgInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        document.getElementById('headerBackground').style.backgroundImage = `url(${e.target.result})`;
      }
      reader.readAsDataURL(file);
    }
  });
});