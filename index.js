// Dark Mode Toggle Script with Persistence
const toggleButton = document.getElementById('toggleDarkMode');
const body = document.body;
const darkModeKey = 'darkModeEnabled';

// Function to initialize dark mode based on localStorage
const initializeDarkMode = () => {
  const isDarkMode = localStorage.getItem(darkModeKey) === 'true';
  if (isDarkMode) {
    body.classList.add('dark-mode');
  }
};

// Function to toggle dark mode and save preference to localStorage
const toggleDarkMode = () => {
  body.classList.toggle('dark-mode');
  const darkModeEnabled = body.classList.contains('dark-mode');
  localStorage.setItem(darkModeKey, darkModeEnabled);
};

// Initialize dark mode on page load
initializeDarkMode();

// Add event listener for the toggle button
if (toggleButton) {
  toggleButton.addEventListener('click', toggleDarkMode);
} else {
  console.error('Toggle button for dark mode not found.');
}

// Language Toggle Script
const toggleLanguageButton = document.getElementById('toggleLanguage');
const japaneseVersionKey = 'japaneseVersionEnabled';

// Function to switch between English and Japanese versions
const toggleLanguage = () => {
  const isJapaneseVersion = body.classList.contains('japanese-version');

  if (isJapaneseVersion) {
    body.classList.remove('japanese-version');
    if (toggleLanguageButton) {
      toggleLanguageButton.textContent = 'Switch to Japanese';
    }
    translateToEnglish();
  } else {
    body.classList.add('japanese-version');
    if (toggleLanguageButton) {
      toggleLanguageButton.textContent = 'Switch to English';
    }
    translateToJapanese();
  }

  localStorage.setItem(japaneseVersionKey, !isJapaneseVersion);
};

const translateToJapanese = () => {
  document.querySelectorAll('[data-en]').forEach((element) => {
    const jpText = element.getAttribute('data-jp');
    if (jpText) {
      element.textContent = jpText;
    }
  });
};

const translateToEnglish = () => {
  document.querySelectorAll('[data-en]').forEach((element) => {
    const enText = element.getAttribute('data-en');
    if (enText) {
      element.textContent = enText;
    }
  });
};

// Check if Japanese version is enabled in localStorage
const isJapaneseVersionEnabled = localStorage.getItem(japaneseVersionKey) === 'true';
if (isJapaneseVersionEnabled && toggleLanguageButton) {
  body.classList.add('japanese-version');
  toggleLanguageButton.textContent = 'Switch to English';
  translateToJapanese();
}

if (toggleLanguageButton) {
  toggleLanguageButton.addEventListener('click', toggleLanguage);
} else {
  console.error('Toggle button for language not found.');
}

// Function to toggle all collapse sections
const toggleCollapseAll = () => {
  const collapses = document.querySelectorAll('.collapse');
  const isAnyCollapsed = Array.from(collapses).some((collapse) =>
    collapse.classList.contains('show')
  );

  collapses.forEach((collapse) => {
    if (isAnyCollapsed) {
      collapse.classList.remove('show');
    } else {
      collapse.classList.add('show');
    }
  });
};

// Create and insert toggle all button
const createToggleAllButton = () => {
  const toggleAllButton = document.createElement('button');
  toggleAllButton.classList.add('btn', 'btn-primary', 'w-100', 'text-left', 'mb-3');
  toggleAllButton.innerHTML = '<i class="fas fa-chevron-down"></i> Expand/Collapse All Sections';
  toggleAllButton.addEventListener('click', toggleCollapseAll);

  const firstSection = document.querySelector('section');
  if (firstSection) {
    firstSection.parentNode.insertBefore(toggleAllButton, firstSection);
  } else {
    console.error('No section found to insert the toggle all button.');
  }
};

createToggleAllButton();