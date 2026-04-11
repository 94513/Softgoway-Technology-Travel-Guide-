const destinations = [
  {
    id: "goa",
    name: "Goa Beaches",
    city: "Goa",
    type: "beach",
    description: "Sunset coastlines, beach shacks, water sports, and lively evening spots.",
    image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=900&q=80",
    locationLabel: "Calangute Beach, Goa",
    mapSrc: "https://maps.google.com/maps?q=Calangute%20Beach%20Goa&t=&z=13&ie=UTF8&iwloc=&output=embed"
  },
  {
    id: "jaipur",
    name: "Jaipur Heritage",
    city: "Jaipur",
    type: "heritage",
    description: "Forts, royal architecture, colorful bazaars, and cultural walking routes.",
    image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=900&q=80",
    locationLabel: "Hawa Mahal, Jaipur",
    mapSrc: "https://maps.google.com/maps?q=Hawa%20Mahal%20Jaipur&t=&z=13&ie=UTF8&iwloc=&output=embed"
  },
  {
    id: "manali",
    name: "Manali Escape",
    city: "Manali",
    type: "nature",
    description: "Snow views, river valleys, fresh air, and scenic adventure experiences.",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=80",
    locationLabel: "Manali, Himachal Pradesh",
    mapSrc: "https://maps.google.com/maps?q=Manali%20Himachal%20Pradesh&t=&z=13&ie=UTF8&iwloc=&output=embed"
  },
  {
    id: "mumbai",
    name: "Mumbai Highlights",
    city: "Mumbai",
    type: "city",
    description: "Landmarks, sea-facing drives, shopping streets, and nonstop city energy.",
    image: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?auto=format&fit=crop&w=900&q=80",
    locationLabel: "Gateway of India, Mumbai",
    mapSrc: "https://maps.google.com/maps?q=Gateway%20of%20India%20Mumbai&t=&z=13&ie=UTF8&iwloc=&output=embed"
  }
];

const hotels = [
  {
    destinationId: "goa",
    name: "Azure Coast Resort",
    price: "Rs 6,500 / night",
    rating: "4.7",
    description: "Sea-view rooms, pool access, and walking distance from the beach."
  },
  {
    destinationId: "jaipur",
    name: "Amber Courtyard Hotel",
    price: "Rs 5,200 / night",
    rating: "4.6",
    description: "Traditional interiors, rooftop dining, and guided heritage tours."
  },
  {
    destinationId: "manali",
    name: "Pine Mist Retreat",
    price: "Rs 4,800 / night",
    rating: "4.8",
    description: "Mountain-facing rooms, bonfire evenings, and local adventure support."
  },
  {
    destinationId: "mumbai",
    name: "Harbor Grand",
    price: "Rs 7,400 / night",
    rating: "4.5",
    description: "Comfort stay with city access, waterfront views, and quick transport links."
  }
];

const reviews = [
  {
    user: "Aarav",
    destinationId: "goa",
    rating: 5,
    text: "Easy to browse, and the place cards feel perfect for quick travel planning on phone."
  },
  {
    user: "Diya",
    destinationId: "jaipur",
    rating: 4.8,
    text: "The hotel and map sections are simple to use and help when planning a day trip."
  },
  {
    user: "Rohan",
    destinationId: "manali",
    rating: 4.9,
    text: "Loved how the app shows destination details and reviews in one compact layout."
  },
  {
    user: "Sara",
    destinationId: "mumbai",
    rating: 4.6,
    text: "Feels like a travel mobile app instead of a normal web page. Very clear and usable."
  }
];

const spotsGrid = document.getElementById("spotsGrid");
const hotelsGrid = document.getElementById("hotelsGrid");
const reviewsList = document.getElementById("reviewsList");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");
const mapSelect = document.getElementById("mapSelect");
const mapFrame = document.getElementById("mapFrame");
const mapCaption = document.getElementById("mapCaption");
const averageRating = document.getElementById("averageRating");
const reviewCount = document.getElementById("reviewCount");
const bottomNavItems = document.querySelectorAll(".nav-item");

let activeFilter = "all";
let searchTerm = "";

function getDestinationById(id) {
  return destinations.find((destination) => destination.id === id);
}

function renderHotels(filteredDestinations) {
  const destinationIds = filteredDestinations.map((destination) => destination.id);
  const visibleHotels = hotels.filter((hotel) => destinationIds.includes(hotel.destinationId));

  if (!visibleHotels.length) {
    hotelsGrid.innerHTML = '<div class="empty-state">No hotels found for this selection.</div>';
    return;
  }

  hotelsGrid.innerHTML = visibleHotels.map((hotel) => {
    const destination = getDestinationById(hotel.destinationId);
    return `
      <article class="hotel-card">
        <div class="hotel-body">
          <div class="hotel-meta">
            <span class="price-tag">${hotel.price}</span>
            <span class="rating-tag">${hotel.rating} rating</span>
          </div>
          <h3>${hotel.name}</h3>
          <p><strong>Near:</strong> ${destination.name}</p>
          <p>${hotel.description}</p>
          <button class="book-btn" type="button">Book now</button>
        </div>
      </article>
    `;
  }).join("");
}

function renderReviews(filteredDestinations) {
  const destinationIds = filteredDestinations.map((destination) => destination.id);
  const visibleReviews = reviews.filter((review) => destinationIds.includes(review.destinationId));

  if (!visibleReviews.length) {
    reviewsList.innerHTML = '<div class="empty-state">No reviews found for this selection.</div>';
    reviewCount.textContent = "0";
    averageRating.textContent = "0.0";
    return;
  }

  const avg = visibleReviews.reduce((sum, review) => sum + review.rating, 0) / visibleReviews.length;
  reviewCount.textContent = String(visibleReviews.length);
  averageRating.textContent = avg.toFixed(1);

  reviewsList.innerHTML = visibleReviews.map((review) => {
    const destination = getDestinationById(review.destinationId);
    return `
      <article class="review-card">
        <div class="review-meta">
          <span class="rating-tag">${review.rating.toFixed(1)} / 5</span>
          <span class="tag">${destination.city}</span>
        </div>
        <h3>${review.user}</h3>
        <p>${review.text}</p>
      </article>
    `;
  }).join("");
}

function renderDestinations() {
  const filteredDestinations = destinations.filter((destination) => {
    const matchesFilter = activeFilter === "all" || destination.type === activeFilter;
    const haystack = `${destination.name} ${destination.city} ${destination.description}`.toLowerCase();
    const matchesSearch = haystack.includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (!filteredDestinations.length) {
    spotsGrid.innerHTML = '<div class="empty-state">No destinations matched your search.</div>';
    hotelsGrid.innerHTML = '<div class="empty-state">No hotels found for this selection.</div>';
    reviewsList.innerHTML = '<div class="empty-state">No reviews found for this selection.</div>';
    reviewCount.textContent = "0";
    averageRating.textContent = "0.0";
    return;
  }

  spotsGrid.innerHTML = filteredDestinations.map((destination) => `
    <article class="spot-card">
      <div class="spot-image" style="background-image: url('${destination.image}')"></div>
      <div class="spot-body">
        <div class="tag-row">
          <span class="tag">${destination.type}</span>
          <span class="price-tag">${destination.city}</span>
        </div>
        <h3>${destination.name}</h3>
        <p>${destination.description}</p>
      </div>
    </article>
  `).join("");

  renderHotels(filteredDestinations);
  renderReviews(filteredDestinations);
}

function initializeMapSelector() {
  mapSelect.innerHTML = destinations.map((destination) => `
    <option value="${destination.id}">${destination.name}</option>
  `).join("");

  updateMap(destinations[0].id);
}

function updateMap(destinationId) {
  const destination = getDestinationById(destinationId);
  if (!destination) {
    return;
  }

  mapFrame.src = destination.mapSrc;
  mapCaption.textContent = `Previewing ${destination.locationLabel}.`;
}

function updateActiveNav() {
  const sections = document.querySelectorAll(".app-section");
  let currentId = "spots";

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 180 && rect.bottom >= 180) {
      currentId = section.id;
    }
  });

  bottomNavItems.forEach((item) => {
    const isActive = item.getAttribute("href") === `#${currentId}`;
    item.classList.toggle("active", isActive);
  });
}

searchInput.addEventListener("input", (event) => {
  searchTerm = event.target.value.trim();
  renderDestinations();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderDestinations();
  });
});

mapSelect.addEventListener("change", (event) => {
  updateMap(event.target.value);
});

window.addEventListener("scroll", updateActiveNav);

initializeMapSelector();
renderDestinations();
updateActiveNav();
