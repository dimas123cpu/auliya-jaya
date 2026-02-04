/* ==========================================================================
   1. PENDEFINISIAN ELEMEN & VARIABEL
   ========================================================================== */
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
const overlay = document.getElementById("overlay");
const floatingContact = document.querySelector(".floating-contact");
const dot = document.querySelector(".cursor-dot");
const outline = document.querySelector(".cursor-outline");

/* ==========================================================================
   2. LOGIKA HAMBURGER MENU & NAVIGASI
   ========================================================================== */
// Fungsi untuk menyembunyikan/menampilkan tombol kontak saat menu terbuka
const handleFloatingButton = () => {
  if (floatingContact) {
    if (navLinks.classList.contains("active")) {
      floatingContact.style.opacity = "0";
      floatingContact.style.pointerEvents = "none";
    } else {
      floatingContact.style.opacity = "1";
      floatingContact.style.pointerEvents = "auto";
    }
  }
};

// Fungsi untuk Toggle (Buka/Tutup) Menu
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
  overlay.classList.toggle("active");

  // Panggil fungsi handle tombol kontak
  handleFloatingButton();
});

// Fungsi untuk menutup menu saat area luar (overlay) diklik
overlay.addEventListener("click", () => {
  hamburger.classList.remove("active");
  navLinks.classList.remove("active");
  overlay.classList.remove("active");

  // Munculkan kembali tombol kontak
  if (floatingContact) {
    floatingContact.style.opacity = "1";
    floatingContact.style.pointerEvents = "auto";
  }
});

// GANTI HANYA BAGIAN INI
const navItems = document.querySelectorAll(".nav-links a");
navItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    // Pengecekan khusus untuk tombol Insights
    if (item.classList.contains("dropbtn")) {
      // Jika di layar mobile
      if (window.innerWidth <= 992) {
        e.preventDefault();
        e.stopPropagation(); // Mencegah klik menutup hamburger

        const dropdownContent = item.nextElementSibling; // Mengambil ul.dropdown-content

        // Toggle tampilan sub-menu
        if (dropdownContent.style.display === "block") {
          dropdownContent.style.display = "none";
        } else {
          dropdownContent.style.display = "block";
        }

        return; // Keluar dari fungsi agar hamburger TIDAK menutup
      }
    }

    // Untuk link lainnya, tutup hamburger seperti biasa
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
    overlay.classList.remove("active");
  });
});

// PERBAIKAN: Menutup menu saat klik di area manapun (termasuk Section About)
document.addEventListener("click", (e) => {
  // Jika menu sedang terbuka AND klik bukan di area hamburger AND klik bukan di area navLinks
  if (
    navLinks.classList.contains("active") &&
    !hamburger.contains(e.target) &&
    !navLinks.contains(e.target)
  ) {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
    overlay.classList.remove("active");

    // Munculkan kembali tombol kontak
    if (floatingContact) {
      floatingContact.style.opacity = "1";
      floatingContact.style.pointerEvents = "auto";
    }
  }
});

/* ==========================================================================
   4. FITUR TAMBAHAN (Read More, Scroll Animation, Form)
   ========================================================================== */
// Logika Baca Selengkapnya
document.querySelectorAll(".read-more-btn").forEach((button) => {
  button.addEventListener("click", function () {
    const content = this.previousElementSibling; // Mengambil div .extra-content
    content.classList.toggle("active");

    if (content.classList.contains("active")) {
      this.innerHTML = "Tampilkan Sedikit ↑";
    } else {
      this.innerHTML = "Baca Selengkapnya →";
    }
  });
});

// LOGIKA KHUSUS HALAMAN RISET (Opsional: Animasi kartu saat scroll)
const researchCards = document.querySelectorAll(".research-card");
if (researchCards.length > 0) {
  window.addEventListener("scroll", () => {
    researchCards.forEach((card) => {
      const cardTop = card.getBoundingClientRect().top;
      if (cardTop < window.innerHeight - 100) {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }
    });
  });
}

/* ==========================================================================
   5. LOGIKA FORM KONTAK
   ========================================================================== */
const form = document.querySelector(".contact-form");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const response = await fetch(form.action, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      alert("Terima kasih! Pesan Anda telah berhasil terkirim.");
      form.reset();
    } else {
      alert("Oops! Terjadi kesalahan, silakan coba lagi nanti.");
    }
  });
}

// Validasi input telepon & Formspree
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // Mencegah pindah halaman default Formspree

    const btn = contactForm.querySelector(".btn-send");
    btn.innerText = "Mengirim...";
    btn.disabled = true;

    const formData = new FormData(contactForm);

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        alert("Terima kasih! Pesan telah terkirim ke email kami.");
        // RELOAD HALAMAN OTOMATIS
        window.location.reload();
      } else {
        alert("Maaf, terjadi kesalahan. Silakan coba lagi.");
        btn.innerText = "Kirim Pesan";
        btn.disabled = false;
      }
    } catch (error) {
      alert("Koneksi bermasalah. Pastikan Anda terhubung ke internet.");
      btn.innerText = "Kirim Pesan";
      btn.disabled = false;
    }
  });
}
