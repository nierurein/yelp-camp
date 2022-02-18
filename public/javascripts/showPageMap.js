
const lat = parseFloat(latStr);
const lang = parseFloat(langStr);

mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [lang, lat], // starting position [lng, lat]
    zoom: 8 // starting zoom
});

new mapboxgl.Marker()
    .setLngLat([-74.5, 40])
    .addTo(map);