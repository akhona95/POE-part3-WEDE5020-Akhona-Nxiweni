// js/search.js

document.addEventListener("DOMContentLoaded", () => {
    // Comprehensive site content index for all pages
    const siteIndex = [
        {
            title: "Home - Akhona Clinic",
            url: getRelativePath("index.html"),
            content: "Akhona Clinic quality healthcare for everyone accessible professional patient-centered medical services Mayfair community family health well-being team compassionate confidential care."
        },
        {
            title: "About Us - Akhona Clinic",
            url: getRelativePath("pages/about us.html"),
            content: "Who we are commitment to community wellness primary healthcare services mission high-quality affordable comprehensive healthcare disease prevention vision leading community-focused clinic standards."
        },
        {
            title: "Services - Akhona Clinic",
            url: getRelativePath("pages/Services.html"),
            content: "Medical services appointment online telehealth consultations virtual appointments nutritional counseling dietary plans general consultations emergency care health screenings prescriptions."
        },
        {
            title: "Enquiry - Akhona Clinic",
            url: getRelativePath("pages/Enquiry.html"),
            content: "General enquiry form clinic hours medical services appointments feedback complaints contact support full name email phone subject message."
        },
        {
            title: "Contact Us - Akhona Clinic",
            url: getRelativePath("pages/contactus.html"),
            content: "Contact details phone +27 11 123 4567 location address 18 Bartlett Rd Mayfair Johannesburg email info@akhonaclinic.co.za operating hours Monday Friday Saturday Sunday map message form."
        }
    ];

    // Helper to resolve relative path differences between root and pages/ directory
    function getRelativePath(path) {
        const isInPages = window.location.pathname.includes('/pages/');
        if (isInPages) {
            return path.startsWith('pages/') ? path.replace('pages/', '') : '../' + path;
        } else {
            return path;
        }
    }

    // Build search modal DOM structure dynamically
    let resultsModal = document.getElementById("searchResultsModal");
    if (!resultsModal) {
        resultsModal = document.createElement("div");
        resultsModal.id = "searchResultsModal";
        resultsModal.className = "search-results-modal";
        resultsModal.innerHTML = `
            <div class="search-modal-content">
                <div class="search-modal-header">
                    <h3>Search Results</h3>
                    <button id="closeSearchModal" class="close-btn">&times;</button>
                </div>
                <div id="searchResultsList" class="search-results-list"></div>
            </div>
        `;
        document.body.appendChild(resultsModal);
    }

    const searchForm = document.getElementById("searchForm");
    const siteSearchInput = document.getElementById("siteSearch");
    const closeSearchModal = document.getElementById("closeSearchModal");
    const searchResultsList = document.getElementById("searchResultsList");

    if (searchForm) {
        searchForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const query = siteSearchInput.value.toLowerCase().trim();
            if (!query) return;

            // Filter index for matching items
            const matches = siteIndex.filter(item => 
                item.title.toLowerCase().includes(query) || 
                item.content.toLowerCase().includes(query)
            );

            renderResults(matches, query);
        });
    }

    function renderResults(matches, query) {
        searchResultsList.innerHTML = "";
        
        if (matches.length === 0) {
            searchResultsList.innerHTML = `<p>No results found for "<strong>${query}</strong>". Try searching for keywords like <em>services</em>, <em>contact</em>, <em>appointment</em>, or <em>hours</em>.</p>`;
        } else {
            matches.forEach(match => {
                const itemDiv = document.createElement("div");
                itemDiv.className = "search-result-item";
                itemDiv.innerHTML = `
                    <h4><a href="${match.url}">${match.title}</a></h4>
                    <p>${highlightSnippet(match.content, query)}</p>
                `;
                searchResultsList.appendChild(itemDiv);
            });
        }

        resultsModal.style.display = "flex";
    }

    function highlightSnippet(text, query) {
        const lowerText = text.toLowerCase();
        const index = lowerText.indexOf(query);
        if (index === -1) return text.substring(0, 100) + "...";
        
        const start = Math.max(0, index - 35);
        const end = Math.min(text.length, index + 75);
        let snippet = text.substring(start, end);
        if (start > 0) snippet = "..." + snippet;
        if (end < text.length) snippet = snippet + "...";
        return snippet;
    }

    // Close modal handlers
    if (closeSearchModal) {
        closeSearchModal.addEventListener("click", () => {
            resultsModal.style.display = "none";
        });
    }

    window.addEventListener("click", (e) => {
        if (e.target === resultsModal) {
            resultsModal.style.display = "none";
        }
    });
});