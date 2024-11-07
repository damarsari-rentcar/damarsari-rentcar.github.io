// Car data
const cars = [
   {
      name: "Alphard",
      price: "2,500,000",
      image: "/assets/img/alphard.png",
      description: "Luxury MPV with spacious interior and premium features",
      features: [
         "7-8 seats",
         "Automatic transmission",
         "Premium sound system",
         "Leather seats",
         "Dual sunroof",
         "Power sliding doors",
      ],
   },
   {
      name: "Fortuner",
      price: "1,500,000",
      image: "/assets/img/fortuner.png",
      description: "Robust SUV perfect for both city and off-road adventures",
      features: [
         "7 seats",
         "4WD option",
         "Advanced safety features",
         "Touchscreen infotainment",
         "Rear parking camera",
         "Hill-start assist control",
      ],
   },
   {
      name: "Pajero",
      price: "1,500,000",
      image: "/assets/img/pajero.png",
      description: "Powerful SUV with excellent off-road capabilities",
      features: [
         "7 seats",
         "4WD",
         "Spacious cargo area",
         "Rockford Fosgate premium audio system",
         "Multi-around monitor",
         "Leather-wrapped steering wheel",
      ],
   },
   {
      name: "Innova Zenix",
      price: "800,000",
      image: "/assets/img/innova-zenix.png",
      description: "Latest generation of the popular MPV with improved comfort",
      features: [
         "7-8 seats",
         "Fuel-efficient",
         "Modern infotainment system",
         "Captains seats option",
         "360-degree camera",
         "Wireless charging",
      ],
   },
   {
      name: "Innova Reborn",
      price: "600,000",
      image: "/assets/img/innova-reborn.png",
      description: "Reliable and spacious MPV for family trips",
      features: [
         "7-8 seats",
         "Comfortable ride",
         "Ample legroom",
         "Rear AC vents",
         "Fold-flat seats",
         "ECO driving mode",
      ],
   },
   {
      name: "Xpander",
      price: "500,000",
      image: "/assets/img/xpander.png",
      description: "Stylish MPV with modern design and practical features",
      features: [
         "7 seats",
         "Flexible seating arrangements",
         "Fuel-efficient engine",
         "Smartphone connectivity",
         "Keyless entry",
         "Best-in-class ground clearance",
      ],
   },
   {
      name: "Terios",
      price: "500,000",
      image: "/assets/img/terios.png",
      description: "Compact SUV ideal for city driving and light off-road use",
      features: [
         "7 seats",
         "Compact size",
         "Good ground clearance",
         "Rear parking sensors",
         "Dual airbags",
         "ABS with EBD",
      ],
   },
   {
      name: "Rush",
      price: "500,000",
      image: "/assets/img/rush.png",
      description: "Versatile SUV with sporty design and practical features",
      features: [
         "7 seats",
         "High ground clearance",
         "Spacious interior",
         "Rear AC vents",
         "Push start button",
         "6 SRS airbags",
      ],
   },
   {
      name: "Avanza (Matic)",
      price: "450,000",
      image: "/assets/img/avanza-matic.png",
      description:
         "Popular MPV with automatic transmission for easy city driving",
      features: [
         "7 seats",
         "Automatic transmission",
         "Fuel-efficient",
         "Touchscreen display audio",
         "Dual VVT-i engine",
         "LED headlamps",
      ],
   },
   {
      name: "Avanza (Manual)",
      price: "350,000",
      image: "/assets/img/avanza-manual.png",
      description: "Reliable MPV with manual transmission for more control",
      features: [
         "7 seats",
         "Manual transmission",
         "Economical to run",
         "Spacious cabin",
         "Adjustable steering wheel",
         "Power windows",
      ],
   },
   {
      name: "Xenia (Manual)",
      price: "350,000",
      image: "/assets/img/xenia.png",
      description: "Affordable MPV with good fuel economy and practicality",
      features: [
         "7 seats",
         "Manual transmission",
         "Compact size",
         "Digital AC",
         "2DIN audio system",
         "Dual SRS airbags",
      ],
   },
];

// DOM elements
const carGrid = document.getElementById("carGrid"); // Grid container for car cards
const mobileMenuBtn = document.getElementById("mobileMenuBtn"); // Mobile menu toggle button
const mobileMenu = document.getElementById("mobileMenu"); // Mobile menu container
const carSearch = document.getElementById("carSearch"); // Car search input field
const noResults = document.getElementById("noResults"); // No results message element
const bookingForm = document.getElementById("bookingForm"); // Booking form element

// Functions
// Populates the car grid in the "Our Premium Fleet" section
function populateCarGrid(carsToShow) {
   carGrid.innerHTML = carsToShow
      .map(
         (car) => `
      <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300 transform hover:scale-105 group">
        <div class="relative overflow-hidden">
          <img src="${car.image}" alt="${car.name}" class="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110">
          <div class="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button onclick="openCarDetailsModal('${car.name}')" class="bg-white text-primary px-4 py-2 rounded-full font-medium hover:bg-primary hover:text-white transition duration-300 transform hover:scale-105">
              View Details
            </button>
          </div>
        </div>
        <div class="p-6">
          <h3 class="text-lg sm:text-xl font-medium mb-2 text-primary group-hover:text-secondary transition-colors duration-300">${car.name}</h3>
          <p class="text-sm sm:text-base text-gray-600 mb-4 group-hover:text-gray-800 transition-colors duration-300 line-clamp-2">${car.description}</p>
          <div class="flex justify-between items-center">
            <p class="text-base sm:text-lg font-medium text-secondary group-hover:text-primary transition-colors duration-300">Rp. ${car.price} / day</p>
            <button onclick="openBookingModal('${car.name}');" class="bg-primary text-white px-4 py-2 rounded-full hover:bg-secondary transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 text-sm sm:text-base">
              Book Now
            </button>
          </div>
        </div>
      </div>
    `
      )
      .join("");
}

// Debounce function to limit the rate of search input processing
function debounce(func, delay) {
   let timeoutId;
   return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
   };
}

// Debounced search function for the car search input
const debouncedSearch = debounce((searchTerm) => {
   const filteredCars = cars.filter(
      (car) =>
         car.name.toLowerCase().includes(searchTerm) ||
         car.description.toLowerCase().includes(searchTerm)
   );
   populateCarGrid(filteredCars);
   noResults.classList.toggle("hidden", filteredCars.length > 0);
}, 300);

// Opens the booking modal when "Book Now" is clicked on a car card
function openBookingModal(carName) {
   document.getElementById("modalTitle").textContent = `Book ${carName}`;
   document.getElementById("carType").value = carName;
   document.getElementById("bookingModal").classList.remove("hidden");
   setTimeout(() => {
      document
         .getElementById("modalContent")
         .classList.remove("scale-95", "opacity-0");
   }, 10);
}

// Closes the booking modal
function closeModal() {
   const modalContent = document.getElementById("modalContent");
   modalContent.classList.add("scale-95", "opacity-0");
   setTimeout(() => {
      document.getElementById("bookingModal").classList.add("hidden");
   }, 300);
}

// Opens the car details modal when "View Details" is clicked on a car card
function openCarDetailsModal(carName) {
   const car = cars.find((c) => c.name === carName);
   document.getElementById("carDetailsTitle").textContent = car.name;
   document.getElementById("carDetailsImage").src = car.image;
   document.getElementById("carDetailsImage").alt = car.name;
   document.getElementById("carDetailsDescription").textContent =
      car.description;
   document.getElementById("carDetailsPrice").textContent = car.price;
   document.getElementById("carDetailsFeatures").innerHTML = car.features
      .map(
         (feature) =>
            `<li class="hover:text-primary transition-colors duration-300">${feature}</li>`
      )
      .join("");
   document.getElementById("carDetailsModal").classList.remove("hidden");
   setTimeout(() => {
      document
         .getElementById("carDetailsContent")
         .classList.remove("scale-95", "opacity-0");
   }, 10);
}

// Closes the car details modal
function closeCarDetailsModal() {
   const modalContent = document.getElementById("carDetailsContent");
   modalContent.classList.add("scale-95", "opacity-0");
   setTimeout(() => {
      document.getElementById("carDetailsModal").classList.add("hidden");
   }, 300);
}

// Opens the booking modal from the car details modal
function openBookingModalFromDetails() {
   const carName = document.getElementById("carDetailsTitle").textContent;
   closeCarDetailsModal();
   setTimeout(() => {
      openBookingModal(carName);
   }, 300);
}

// Validates the booking form fields
function validateForm() {
   const requiredFields = ["name", "phone", "rentalType", "rentalDate"];
   return requiredFields.every((field) => {
      const input = document.getElementById(field);
      const isValid = input.value.trim() !== "";
      input.classList.toggle("border-red-500", !isValid);
      return isValid;
   });
}

// Shows a confirmation message after successful booking
function showBookingConfirmation() {
   const confirmation = document.createElement("div");
   confirmation.className =
      "fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 translate-y-full";
   confirmation.textContent = "Booking successful! Check WhatsApp for details.";
   document.body.appendChild(confirmation);
   setTimeout(() => confirmation.classList.remove("translate-y-full"), 100);
   setTimeout(() => {
      confirmation.classList.add("translate-y-full");
      setTimeout(() => confirmation.remove(), 300);
   }, 5000);
}

// Smooth scroll function for navigation links
function smoothScroll(targetId) {
   const target = document.getElementById(targetId);
   if (target) {
      window.scrollTo({
         top: target.offsetTop - 60,
         behavior: "smooth",
      });
   }
}

// Highlights the current section in the navigation menu
function highlightCurrentSection() {
   const sections = document.querySelectorAll("section");
   const navLinks = document.querySelectorAll(".nav-link");
   let current = "";

   sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - 150) {
         current = section.getAttribute("id");
      }
   });

   navLinks.forEach((link) => {
      link.classList.toggle(
         "text-accent",
         link.getAttribute("href").substring(1) === current
      );
   });
}

// Animates elements when they come into view during scrolling
function animateOnScroll() {
   const elements = document.querySelectorAll(
      ".animate-fade-in-left, .animate-fade-in-right"
   );
   elements.forEach((element) => {
      const { top, bottom } = element.getBoundingClientRect();
      if (top < window.innerHeight && bottom > 0) {
         element.classList.add("animate-active");
      }
   });
}

// Focuses on the search input when scrolling to the car search section
function focusSearchOnScroll() {
   const searchSection = document.getElementById("car-search");
   const searchInput = document.getElementById("carSearch");

   window.addEventListener("scroll", () => {
      const rect = searchSection.getBoundingClientRect();
      if (rect.top <= 60 && rect.bottom >= 60) {
         searchInput.focus();
      }
   });
}

// Event Listeners
// Toggle mobile menu visibility
mobileMenuBtn.addEventListener("click", () =>
   mobileMenu.classList.toggle("hidden")
);

// Handle car search input
carSearch.addEventListener("input", (e) =>
   debouncedSearch(e.target.value.toLowerCase())
);

// Handle booking form submission
bookingForm.addEventListener("submit", (e) => {
   e.preventDefault();
   if (!validateForm()) return;

   const formData = new FormData(bookingForm);
  const message = `Halo tim Damarsari Rent Car,\n\nSaya ingin menyewa mobil dengan rincian berikut:\n\n============================\n      Detail Pemesanan\n============================\n\n* Nama: *${formData.get(
      "name"
   )}*\n* Nomor Telepon: *${formData.get(
      "phone"
   )}*\n* Model Mobil: *${formData.get(
      "carType"
   )}*\n* Jenis Sewa: *${formData.get(
      "rentalType"
   )}*\n* Tanggal Sewa: *${formData.get(
      "rentalDate"
   )}*\n\n============================\n\nMohon konfirmasi pemesanan saya. Terima kasih.`;
   window.open(
      `https://wa.me/6287788332232?text=${encodeURIComponent(message)}`,
      "_blank"
   );
   closeModal();
   showBookingConfirmation();
});

// Add smooth scroll behavior to navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
   anchor.addEventListener("click", (e) => {
      e.preventDefault();
      smoothScroll(anchor.getAttribute("href").substring(1));
   });
});

// Handle scroll events for section highlighting and animations
window.addEventListener("scroll", () => {
   highlightCurrentSection();
   animateOnScroll();
});

// Initial setup
populateCarGrid(cars);
animateOnScroll();
focusSearchOnScroll();

// Hero section animation
document.addEventListener("DOMContentLoaded", () => {
   const heroContent = document.getElementById("heroContent");
   const heroElements = heroContent.children;
   const scrollIndicator = document.querySelector("#home a[href='#cars']");

   // Animate hero content elements on page load
   setTimeout(() => {
      Array.from(heroElements).forEach((el, index) => {
         setTimeout(() => {
            el.classList.remove("opacity-0", "translate-y-4");
         }, index * 200);
      });
   }, 100);

   // Parallax effect for hero content on scroll
   window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;
      const translateY = scrollY * 0.5;
      const opacity = 1 - scrollY / (window.innerHeight * 0.5);

      heroContent.style.transform = `translateY(${translateY}px)`;
      heroContent.style.opacity = Math.max(opacity, 0);

      // Update scroll indicator opacity
      scrollIndicator.style.opacity = Math.max(opacity, 0);

      if (scrollY > 100) {
         scrollIndicator.classList.add("pointer-events-none");
      } else {
         scrollIndicator.classList.remove("pointer-events-none");
      }
   });

   // Smooth scroll for the scroll indicator in the hero section
   scrollIndicator.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = scrollIndicator.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
         targetElement.scrollIntoView({ behavior: "smooth" });
      }
   });
});
