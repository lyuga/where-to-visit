// Foursquare API
const clientId = '';
const clientSecret = '';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';

// OpenWeather API
const openWeatherKey = '';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $select = $('#category');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDiv = $("#weather1");
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let selectedVenues;

// Get functions
const getVenues = async () => {
    const city = $input.val();
    const category = $select.val();
    const urlToFetch = `${url}${city}&section=${category}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=20200412`;
    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const jsonResponse = await response.json();
            const venues = jsonResponse.response.groups[0].items
                .map(element => {
                    return element.venue;
                });
            return venues;
        }
    } catch (error) {
        console.log(`${venues}`);
    }
}

const getForecast = async () => {
    const urlToFetch = `${weatherUrl}?q=${$input.val()}&APPID=${openWeatherKey}`;
    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse;
        }
    } catch (error) {
        console.log(error);
    }
}

const getPhotos = async (venueId) => {
    const response = await fetch(`https://api.foursquare.com/v2/venues/${venueId}/photos?client_id=${clientId}&client_secret=${clientSecret}&v=20200412`);
    try {
        if (response.ok) {
            const jsonResponse = await response.json();
            const photoSrc = `${jsonResponse.response.photos.items[0].prefix}width275${jsonResponse.response.photos.items[0].suffix}`;
            return photoSrc;
        }
    } catch (error) {
        console.log(error);
    }
}

// Render functions
const renderVenues = (venues) => {
    selectedVenues = getRandom(venues, 4);
    $venueDivs.forEach(async ($venue, index) => {
        const venue = selectedVenues[index];
        const photoSrc = await getPhotos(venue.id);
        const venueIcon = venue.categories[0].icon;
        const venueImgSrc = `${venueIcon.prefix}bg_64${venueIcon.suffix}`;
        const venueContent = createVenueHTML(venue.name, venue.location, venueImgSrc);
        $venue.append(venueContent);
        $venue.append(`<img src="${photoSrc}">`)
    });
    $destination.append(`<h2>${venues[0].location.city}</h2>`);
}

const renderForecast = (day) => {
    let weatherContent = '';
    weatherContent = createWeatherHTML(day);
    $weatherDiv.append(weatherContent);
}

const convertTemp = () => {
    $("#convToggle").on("click", function () {
        let isCelsius = $("#temp").data("units") === "c";
        $("#temp").text(isCelsius ? fahrenheit + "°F" : celsius + "°C");

        let newUnits = isCelsius ? "f" : "c";
        $("#temp").data("units", newUnits).attr("data-units", newUnits);
    });
}

const executeSearch = () => {
    $venueDivs.forEach(venue => venue.empty());
    $weatherDiv.empty();
    $destination.empty();
    $container.css("visibility", "visible");
    getVenues().then(venues => renderVenues(venues));
    getForecast().then(forecast => renderForecast(forecast)).then(() => convertTemp());
    return false;
}

$submit.click(executeSearch);

