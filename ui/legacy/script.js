document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. MOBILE MENU LOGIC
    // ==========================================
    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuLinks = document.querySelectorAll('#mobile-menu a');

    if (menuButton) {
        menuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    mobileMenuLinks.forEach(item => {
        item.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
        });
    });


    // ==========================================
    // 2. MAP INTEGRATION (Leaflet + Google Link)
    // ==========================================
    if (document.getElementById('map')) {
        
        // YOUR COORDINATES (Indore)
        const myLat = 22.788823636343622; 
        const myLng = 75.90781279395507;

        // Create Google Maps Link
        const googleMapsUrl = `http://googleusercontent.com/maps.google.com/?q=${myLat},${myLng}`;

        // Initialize Map
        const map = L.map('map').setView([myLat, myLng], 15);

        // Add Tiles
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
        }).addTo(map);

        // Add Marker
        const marker = L.marker([myLat, myLng]).addTo(map);

        // Add Popup
        marker.bindPopup(`
            <div style="text-align: center;">
                <b style="font-size: 14px;">Shri Nirmal Logistics</b><br>
                <span style="font-size: 12px; color: #666;">111/6, S. R. Compound, Indore</span><br><br>
                <a href="${googleMapsUrl}" target="_blank" 
                   style="background-color: #FF5722; color: white; padding: 6px 12px; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 12px; display: inline-block;">
                   📍 Open in Google Maps
                </a>
            </div>
        `).openPopup();
        
        // Click marker to open Google Maps
        marker.on('click', function() {
             window.open(googleMapsUrl, '_blank');
        });
    }


    // ==========================================
    // 3. FORM SUBMISSION (AJAX + Unique Subject)
    // ==========================================
    const quoteForm = document.getElementById('quote-form');
    const successModal = document.getElementById('success-modal');

    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            
            // A. STOP THE REDIRECT (Keeps user on your site)
            e.preventDefault(); 

            // B. FIX THREADING (Add time to subject line)
            const nameInput = quoteForm.querySelector('input[name="Customer Name"]');
            const subjectInput = quoteForm.querySelector('input[name="_subject"]');
            
            if(nameInput && subjectInput) {
                const timestamp = new Date().toLocaleTimeString();
                subjectInput.value = `Enquiry: ${nameInput.value} - ${timestamp}`;
            }

            // C. SHOW "SENDING..." STATUS
            const submitBtn = quoteForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = "Sending...";
            submitBtn.disabled = true;

            // D. SEND DATA (AJAX Fetch)
            const formData = new FormData(quoteForm);
            fetch(quoteForm.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            })
            .then(response => {
                if (response.ok) {
                    // Success! Show popup & reset form
                    if(successModal) successModal.classList.remove('hidden');
                    else alert("Message Sent Successfully!");
                    
                    quoteForm.reset();
                } else {
                    alert("Oops! There was a problem submitting your form.");
                }
            })
            .catch(error => {
                console.error(error);
                alert("Oops! Network error. Please check your connection.");
            })
            .finally(() => {
                // Reset button
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            });
        });
    }

    // ==========================================
    // 4. MODAL CLOSE LOGIC
    // ==========================================
    window.closeModal = function() {
        if(successModal) successModal.classList.add('hidden');
    }
    
    if (successModal) {
        successModal.addEventListener('click', function(e) {
            if (e.target === successModal) closeModal();
        });
    }
});