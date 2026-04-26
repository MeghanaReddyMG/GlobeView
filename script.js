let allCountries = [];
const container = document.getElementById('countriesContainer');
const searchName = document.getElementById('searchName');
const searchCode = document.getElementById('searchCode');
const filterRegion = document.getElementById('filterRegion');
const searchCapital = document.getElementById('searchCapital');
const clearBtn = document.getElementById('clearBtn');
const resultsCount = document.getElementById('resultsCount');
const loadingSpinner = document.getElementById('loadingSpinner');
const noResultsMsg = document.getElementById('noResultsMsg');
const inputs = document.querySelectorAll('.filter-input');

// API Endpoint - Using fallback mirror to ensure reliability since restcountries.com is frequently down
const API_URL = 'https://studies.cs.helsinki.fi/restcountries/api/all';

// Fetch countries data on load
async function fetchCountries() {
  try {
    loadingSpinner.style.display = 'block';
    resultsCount.textContent = 'Fetching world data...';
    container.innerHTML = '';
    
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    // Sort by name alphabetically
    allCountries = data.sort((a, b) => {
      const nameA = a.name?.common || '';
      const nameB = b.name?.common || '';
      return nameA.localeCompare(nameB);
    });
    
    renderCountries(allCountries);
  } catch (error) {
    console.error('Error fetching countries:', error);
    container.innerHTML = `
        <div class="col-12">
            <div class="alert alert-danger w-100 mt-4 glass-panel text-center" style="background: rgba(220, 53, 69, 0.2); border-color: rgba(220, 53, 69, 0.3);">
                <i class="bi bi-exclamation-triangle fs-3 d-block mb-2 text-danger"></i>
                <strong>Failed to load countries.</strong><br/>
                Please check your internet connection or try again later.
            </div>
        </div>`;
    resultsCount.textContent = 'Error loading data';
  } finally {
    loadingSpinner.style.display = 'none';
  }
}

// Render country cards
function renderCountries(countries) {
  container.innerHTML = '';
  resultsCount.textContent = `Showing ${countries.length} countries`;

  if (countries.length === 0) {
    noResultsMsg.classList.remove('d-none');
  } else {
    noResultsMsg.classList.add('d-none');
    
    const fragment = document.createDocumentFragment();
    countries.forEach((country, index) => {
      const col = document.createElement('div');
      col.className = 'col';

      // Safely extract properties
      const name = country.name?.common || 'Unknown';
      const flagUrl = country.flags?.svg || country.flags?.png || '';
      const capital = country.capital && country.capital.length > 0 ? country.capital[0] : 'N/A';
      const region = country.region || 'N/A';
      const code = country.cca3 || 'N/A';
      
      // Calculate delay class for staggered animation
      const delayClass = `delay-${index % 8}`;

      col.innerHTML = `
        <div class="card country-card animate-fade-in ${delayClass}">
          <div class="flag-container">
            <img src="${flagUrl}" class="flag-img" alt="Flag of ${name}" loading="lazy">
          </div>
          <div class="card-body">
            <h5 class="card-title" title="${name}">${name}</h5>
            <div class="info-row">
                <span class="info-label">Capital:</span>
                <span class="info-value" title="${capital}">${capital}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Region:</span>
                <span class="info-value" title="${region}">${region}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Code:</span>
                <span class="info-value" title="${code}">${code}</span>
            </div>
          </div>
        </div>
      `;
      fragment.appendChild(col);
    });
    container.appendChild(fragment);
  }
}

// Filter logic
function applyFilters() {
  const nameVal = searchName.value.toLowerCase().trim();
  const codeVal = searchCode.value.toLowerCase().trim();
  const regionVal = filterRegion.value.toLowerCase().trim();
  const capitalVal = searchCapital.value.toLowerCase().trim();

  const filtered = allCountries.filter(c => {
    const cName = (c.name?.common || '').toLowerCase();
    const cCode2 = (c.cca2 || '').toLowerCase();
    const cCode3 = (c.cca3 || '').toLowerCase();
    const cRegion = (c.region || '').toLowerCase();
    const cCapital = c.capital && c.capital.length > 0 ? c.capital[0].toLowerCase() : '';

    const matchName = cName.includes(nameVal);
    const matchCode = cCode2.includes(codeVal) || cCode3.includes(codeVal);
    const matchRegion = regionVal === '' || cRegion === regionVal;
    const matchCapital = cCapital.includes(capitalVal);

    return matchName && matchCode && matchRegion && matchCapital;
  });

  renderCountries(filtered);
}

// Event listeners for inputs
inputs.forEach(input => {
  // Use 'input' event for real-time filtering on keystroke, 'change' for select
  input.addEventListener('input', applyFilters);
});

// Clear filters button
clearBtn.addEventListener('click', () => {
  searchName.value = '';
  searchCode.value = '';
  filterRegion.value = '';
  searchCapital.value = '';
  applyFilters();
});

// Start application
fetchCountries();
