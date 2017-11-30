
    // ajoute la map au div "map"
    var map = L.map('map');
    id='satellite-streets-v9'
    token='pk.eyJ1IjoianVsaWVuMTAxMCIsImEiOiJjajk5cHpkdjAxMHA1MzNuMm12aWd1OW5nIn0.DzPgmtGDquEzt1IyVb7yJQ'
    L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/'+id+'/tiles/{z}/{x}/{y}?access_token='+token).addTo(map);

    map.setView([54.5,-3], 6);

    map.on('click', function(e){
        if (typeof(marker)!='undefined'){
            map.removeLayer(marker);
        }
        document.getElementById("lat").value=e.latlng.lat;
        document.getElementById("long").value=e.latlng.lng;
        marker = new L.marker(e.latlng).addTo(map);        
   });