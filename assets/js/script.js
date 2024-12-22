let currentLang = localStorage.getItem("lang") || "id";

function changeLang(lang) {
   currentLang = lang;
   localStorage.setItem("lang", lang);
   updateContent();
   updateButtons();
}

function updateButtons() {
   document.querySelectorAll(".lang-btn").forEach((btn) => {
      const isActive = btn.dataset.lang === currentLang;
      btn.classList.toggle("bg-primary", isActive);
      btn.classList.toggle("text-white", isActive);
      btn.classList.toggle("bg-white", !isActive);
   });
}

// Fungsi untuk memperbarui konten
function updateContent() {
   // Update semua elemen dengan data-translate attribute
   document.querySelectorAll("[data-translate]").forEach((element) => {
      const key = element.dataset.translate;
      const keys = key.split(".");
      let value = translations[currentLang];
      keys.forEach((k) => {
         value = value[k];
      });
      if (value) {
         if (element.tagName === "INPUT") {
            element.placeholder = value;
         } else {
            element.textContent = value;
         }
      }
   });

   // Perbarui grid mobil
   populateCarGrid(cars);
}

// DOM elements
const carGrid = document.getElementById("carGrid"); // Grid container for car cards
const mobileMenuBtn = document.getElementById("mobileMenuBtn"); // Mobile menu toggle button
const mobileMenu = document.getElementById("mobileMenu"); // Mobile menu container
const carSearch = document.getElementById("carSearch"); // Car search input field
const noResults = document.getElementById("noResults"); // No results message element
const bookingForm = document.getElementById("bookingForm"); // Booking form element

// Common text classes for consistent typography
const textClasses = {
   heading:
      "text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 sm:mb-6 text-primary",
   subheading:
      "text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4 text-primary",
   description: "text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed",
   cardTitle: "text-lg sm:text-xl md:text-2xl font-semibold text-primary",
   cardDescription: "text-sm sm:text-base md:text-lg text-gray-600",
};

// Functions
// Toggle mobile menu visibility
function toggleMobileMenu() {
   const icon = mobileMenuBtn.querySelector("i");
   mobileMenu.classList.toggle("hidden");

   if (!mobileMenu.classList.contains("hidden")) {
      // Menu is open
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
      icon.classList.add("rotate-90");
   } else {
      // Menu is closed
      icon.classList.remove("fa-times");
      icon.classList.remove("rotate-90");
      icon.classList.add("fa-bars");
   }
}

// Close mobile menu when a link is clicked
function closeMobileMenu() {
   mobileMenu.classList.add("hidden");
   mobileMenuBtn.classList.remove("rotate-90");
}

// Populates the car grid in the "Our Premium Fleet" section
function populateCarGrid(carsToShow) {
   if (!carGrid) return;

   carGrid.innerHTML = carsToShow
      .map(
         (car) => `
            <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300 transform hover:scale-105 group">
                <!-- Image Container -->
                <div class="relative overflow-hidden h-36 sm:h-44 md:h-48 lg:h-56">
                    <img 
                        src="${car.image}" 
                        alt="${car.name}" 
                        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    >
                    <div class="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <button 
                            onclick="openCarDetailsModal('${car.name}')" 
                            class="bg-white text-primary px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs font-medium hover:bg-primary hover:text-white transition duration-300 transform hover:scale-105 shadow-sm"
                        >
                            ${translations[currentLang].cars.viewDetails}
                        </button>
                    </div>
                </div>

                <!-- Content Container -->
                <div class="p-3 sm:p-4">
                    <!-- Car Name -->
                    <h3 class="text-base sm:text-lg font-semibold text-primary group-hover:text-secondary transition-colors duration-300 mb-1 sm:mb-2">
                        ${car.name}
                    </h3>
                    
                    <!-- Description -->
                    <p class="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 group-hover:text-gray-800 transition-colors duration-300 line-clamp-2 min-h-[2.5rem]">
                        ${
                           currentLang === "id"
                              ? car.descriptionId
                              : car.description
                        }
                    </p>
                    
                    <!-- Price and Button -->
                    <div class="flex justify-between items-center gap-2 sm:gap-3">
                        <p class="text-sm sm:text-base font-medium whitespace-nowrap">
                            Rp. ${
                               car.price
                            } <span class="text-xs text-gray-500">${
            translations[currentLang].cars.perDay
         }</span>
                        </p>
                        <button onclick="openBookingModal('${car.name}');" 
                            class="bg-primary text-white px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-2.5 rounded-full text-sm sm:text-base font-medium hover:bg-secondary transition duration-300 transform hover:scale-105 shadow-md hover:shadow-lg whitespace-nowrap"
                        >
                            ${translations[currentLang].cars.bookNow}
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
      currentLang === "id" ? car.descriptionId : car.description;
   document.getElementById("carDetailsPrice").textContent = car.price;
   document.getElementById("carDetailsFeatures").innerHTML = car.features[
      currentLang
   ]
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
mobileMenuBtn.addEventListener("click", toggleMobileMenu);

// Close mobile menu when a link is clicked
document.querySelectorAll("#mobileMenu a").forEach((link) => {
   link.addEventListener("click", closeMobileMenu);
});

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

// Add scroll event listener for navbar
window.addEventListener("scroll", () => {
   const nav = document.querySelector("nav");
   if (window.scrollY > 0) {
      nav.classList.add("shadow-lg");
      nav.classList.remove("shadow-md");
   } else {
      nav.classList.remove("shadow-lg");
      nav.classList.add("shadow-md");
   }
});

// Initial setup
document.addEventListener("DOMContentLoaded", () => {
   // Initialize language
   updateContent();
   updateButtons();

   // Populate car grid
   populateCarGrid(cars);

   // Focus search input on scroll to car search section
   focusSearchOnScroll();

   // Hero section animation
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

   // Update text sizes for benefits and features sections
   document
      .querySelectorAll(".benefits-title, .features-title")
      .forEach((el) => {
         el.classList.add(...textClasses.heading.split(" "));
      });

   document.querySelectorAll(".benefits-desc, .features-desc").forEach((el) => {
      el.classList.add(...textClasses.description.split(" "));
   });
});
