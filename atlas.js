const staty = document.getElementById('staty');
let countriesData = [];
let api =  "AIzaSyCLhp6yTCVsKI08tRpj2gGx8ZeCMQUyh4E"; 
let choose = document.getElementById('choose');
let num;

function kAndM(num) {
    if (num >= 1000 && num < 1000000) {
        return `${(num / 1000).toFixed(2)} K`;
    } else if (num >= 1000000 && num < 1000000000) {
        return `${(num / 1000000).toFixed(2)} M`;
    }
    else if(num >= 1000000000){
        return `${(num / 1000000000).toFixed(2)} B`;
    }
    else return num;
}

function km2(num) {
    if (num >= 1000) {
        return `${(num / 1000).toFixed(2)} `;
    }
    else return num;
}

choose.addEventListener('change', function () {
    showCountries();
});

function showCountries() {
    let region = choose.value;

    fetch(`https://restcountries.com/v3.1/region/${region}`)
        .then((response) => response.json())
        .then((data) => {
            // Clear the existing country cards
            staty.innerHTML = "";
            console.log(data);
            // Update countriesData with the new data
            countriesData = data;
            num = data.length; // Update num with the number of countries fetched
            // Iterate over the new data and display country cards
            data.forEach(country => {
                let stat = `<div class="col-xxl-2 col-xl-2 col-lg-3 col-md-4 col-sm-6 ">
                    <div class="card" onclick="showModal('${country.translations.ces.common}')">
                        <img class="card-img-top cvach" src="${country.flags.svg}" alt="${country.flags.alt}" />
                        <div class="card-body">
                            <h4 class="card-title">${country.translations.ces.common}</h4>
                            <p class="card-text">Počet obyvatel: ${kAndM(country.population)}
                            <p class="card-text">Rozloha: ${km2(country.area)} km²</p>
                            <p><strong>Hlavní město:</strong> ${country.capital ? country.capital[0] : 'N/A'}
                            </p>
                        </div>
                    </div>
                </div>`;
                staty.innerHTML += stat;
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}
function random() {
    let region = choose.value;

    fetch(`https://restcountries.com/v3.1/region/${region}`)
        .then((response) => response.json())
        .then((data) => {
            // Clear the existing country cards
            console.log(data.length);
            // Update countriesData with the new data
            const randomIndex = Math.floor(Math.random() * countriesData.length); // Generate random index
            const randomCountry = countriesData[randomIndex]; // Get random country data
            console.log(randomCountry);
        showModal(randomCountry.translations.ces.common); // Show modal for the random country
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}
function sortCountriesByPopulation() {
    countriesData.sort((a, b) => {
        return b.population - a.population;
    });

    // Re-render the country cards sorted by population
    staty.innerHTML = "";
    countriesData.forEach(country => {
        let stat = `<div class="col-xxl-2 col-xl-2 col-lg-3 col-md-4 col-sm-6 ">
            <div class="card" onclick="showModal('${country.translations.ces.common}')">
                <img class="card-img-top cvach" src="${country.flags.svg}" alt="${country.flags.alt}" />
                <div class="card-body">
                    <h4 class="card-title">${country.translations.ces.common}</h4>
                    <p class="card-text">Počet obyvatel: ${kAndM(country.population)}</p>
                    <p class="card-text">Rozloha: ${km2(country.area)} km²</p>
                    <p><strong>Hlavní město:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
                </div>
            </div>
        </div>`;
        staty.innerHTML += stat;
    });
}
function sortCountriesByArea() {
    countriesData.sort((a, b) => {
        return b.area - a.area;
    });

    // Re-render the country cards sorted by population
    staty.innerHTML = "";
    countriesData.forEach(country => {
        let stat = `<div class="col-xxl-2 col-xl-2 col-lg-3 col-md-4 col-sm-6 ">
            <div class="card" onclick="showModal('${country.translations.ces.common}')">
                <img class="card-img-top cvach" src="${country.flags.svg}" alt="${country.flags.alt}" />
                <div class="card-body">
                    <h4 class="card-title">${country.translations.ces.common}</h4>
                    <p class="card-text">Počet obyvatel: ${kAndM(country.population)}</p>
                    <p class="card-text">Rozloha: ${km2(country.area)} km²</p>
                    <p><strong>Hlavní město:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
                </div>
            </div>
        </div>`;
        staty.innerHTML += stat;
    });
}


function showModal(countryName) {
    let country = countriesData.find((data) => data.translations.ces.common === countryName);
    let modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = `
        <img src="${country.flags.svg}" alt="${country.flags.alt}" style="width: 100%; height: auto;" />
        <p><strong>Počet obyvatel:</strong> ${kAndM(country.population)}</p>
        <p><strong>Hlavní město:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Subregion:</strong> ${country.subregion}</p>
        <p><strong>Rozloha:</strong> ${km2(country.area)} km²</p>
        <p><strong>Jazyky:</strong> ${Object.values(country.languages).join(', ')}</p>
        <iframe
            width="450"
            height="450"
            style="border:0"
            loading="lazy"
            allowfullscreen
            referrerpolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed/v1/place?key=${api}&q=${country.name.common}">
        </iframe>
    `;
    $('#myModal').modal('show'); // Open Bootstrap modal
}

showCountries();
