const staty = document.getElementById('staty');

fetch('https://restcountries.com/v3.1/region/europe')
    .then(response => response.json())
    .then(data => {
        data.forEach(country => {
            let stat = `
                <div class="col-xxl-2 col-xl-2 col-lg-3 col-md-4 col-sm-6">
                    <div class="card" data-country='${JSON.stringify(country)}'>
                        <img class="card-img-top cvach" src="${country.flags.svg}" alt="${country.flags.alt}" />
                        <div class="card-body">
                            <h4 class="card-title">${country.translations.ces.common}</h4>
                            <p class="card-text">
                                Počet obyvatel: ${country.population}<br>
                                Hlavní město: ${country.capital ? country.capital[0] : 'N/A'}
                            </p>
                        </div>
                    </div>
                </div>`;
            staty.innerHTML += stat;
        });

        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('click', () => {
                const country = JSON.parse(card.getAttribute('data-country')); // Accessing the country directly without JSON.parse()
                openModal(country);
            });
        });
        
    });

const modal = new bootstrap.Modal(document.getElementById('countryModal'));

function openModal(country) {
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <img src="${country.flags.svg}" alt="${country.flags.alt}" style="width: 100%; height: auto;" />
        <p><strong>Počet obyvatel:</strong> ${country.population}</p>
        <p><strong>Hlavní město:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Subregion:</strong> ${country.subregion}</p>
        <p><strong>Rozloha:</strong> ${country.area} km²</p>
        <p><strong>Jazyky:</strong> ${Object.values(country.languages).join(', ')}</p>
    `;
    modal.show();
}
