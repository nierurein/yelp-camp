
const lat = parseFloat(latStr);
const lang = parseFloat(langStr);

mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/light-v10', // style URL
    center: [lang, lat], // starting position [lng, lat]
    zoom: 4 // starting zoom
});

new mapboxgl.Marker()
    .setLngLat([lang, lat])
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h3>${title}</h3><p>${campgroundLocation}</p>`
            )
    )
    .addTo(map);

