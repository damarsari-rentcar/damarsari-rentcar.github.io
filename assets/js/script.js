document
   .getElementById("rentalForm")
   .addEventListener("submit", function (event) {
      event.preventDefault();

      const name = document.getElementById("name").value;
      const phone = document.getElementById("phone").value;
      const carType = document.getElementById("carType").value;
      const rentalType = document.getElementById("rentalType").value;
      const schedule = document.getElementById("schedule").value;

      const message = `Halo Damarsari Rent Car, saya ingin menyewa mobil dengan detail berikut:\n\nNama: ${name}\nNomor Telepon: ${phone}\nTipe Mobil: ${carType}\nTipe Rental: ${rentalType}\nJadwal Rental: ${schedule}`;

      const whatsappUrl = `https://wa.me/6287788332232?text=${encodeURIComponent(
         message
      )}`;

      window.open(whatsappUrl, "_blank");
   });
