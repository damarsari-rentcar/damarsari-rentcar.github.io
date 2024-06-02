document
   .getElementById("rentalForm")
   .addEventListener("submit", function (event) {
      event.preventDefault();

      const name = document.getElementById("name").value;
      const phone = document.getElementById("phone").value;
      const carType = document.getElementById("carType").value;
      const rentalType = document.getElementById("rentalType").value;
      const schedule = document.getElementById("schedule").value;

      const message = `Halo tim *Damarsari Rent Car*\n\nSaya ingin menyewa mobil dengan detail sebagai berikut:\n\n=============================\n         **Detail Pemesanan**\n=============================\n\n* Nama              : *${name}*\n* Nomor Telepon : *${phone}*\n* Model Mobil        : *${carType}*\n* Tipe Rental      : *${rentalType}*\n* Jadwal Rental  : *${schedule}*\n\n=============================\n\n> Mohon untuk dikonfirmasi. Terima kasih.`;

      const whatsappUrl = `https://wa.me/6287788332232?text=${encodeURIComponent(
         message
      )}`;

      window.open(whatsappUrl, "_blank");
   });
