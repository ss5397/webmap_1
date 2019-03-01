'use strict'

console.log('Loaded map.js')

mapboxgl.accessToken = 'pk.eyJ1Ijoic2tzaGluMjciLCJhIjoiY2pzcHhwMndxMTJoNjN5cnJyNnFyOWF5cyJ9.UFV4-Iru3DogkEQk0yZOcA'

let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v10',
    center: [-73.96024, 40.80877],
    zoom: 1
})

// create an instance of NavigationControl
let navigation = new mapboxgl.NavigationControl({
    showCompass: false
})

// add the navigation to your map
map.addControl(navigation, 'top-left')

// create an instance of ScaleControl
let scale = new mapboxgl.ScaleControl({
    maxWidth: 80,
    unit: 'imperial'
})

// add the scale to your map
map.addControl(scale, 'bottom-right')

let geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserLocation: true,
    fitBoundsOptions: {
    }
})

map.addControl(geolocate, 'top-left')

// this is an event handler
geolocate.on('geolocate', function(event) {

    // create new variables to store the attributes we're interested in from the event
    let lng = event.coords.longitude
    let lat = event.coords.latitude

    // debug
    console.log('geolocated:', lng, lat)

    // format lng lat values and display them on our 'info' element
    document.getElementById('info').innerHTML = lng.toFixed(5) + "," + lat.toFixed(5)

})

map.on('click', function(event) {

    let lng = event.lngLat.lng
    let lat = event.lngLat.lat

    console.log("clicked:", lng, lat)

    document.getElementById('info').innerHTML = lng.toFixed(5) + "," + lat.toFixed(5)

    let marker = new mapboxgl.Marker()
    marker.setLngLat([-73.96007,40.80871])
    marker.addTo(map)

    let popup = new mapboxgl.Popup()
    popup.setHTML('This is the Center for Spatial Research')
    marker.setPopup(popup)

})
let data = [
    {
        location: [-74.0090,40.71875],
        content: 'My Favorite Korean Restaurant in NYC, Jungsik'
    },
    {
        location: [-73.98451,40.74369],
        content: 'My Favorite Korean Restaurant in NYC, Atoboy'
    },
    {
        location: [-73.99127,40.74127],
        content: 'My Favorite Korean Restaurant in NYC, Cote'
    },
    {
        location: [127.04398,37.52250],
        content: 'My Favorite Korean Restaurant in Seoul, Joook'
    },
    {
        location: [127.00516,37.55600],
        content: 'My Favorite Korean Restaurant in Seoul, La Yeon'
    },
    ]

    data.forEach(function(d) {

        let marker = new mapboxgl.Marker()
        marker.setLngLat(d.location)
        marker.addTo(map)

        let popup = new mapboxgl.Popup()
        popup.setHTML(d.content)
        marker.setPopup(popup)

    })
