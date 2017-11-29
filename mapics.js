
    // ajoute la map au div "map"
    var map = L.map('map');
    id='satellite-streets-v9'
    token='pk.eyJ1IjoianVsaWVuMTAxMCIsImEiOiJjajk5cHpkdjAxMHA1MzNuMm12aWd1OW5nIn0.DzPgmtGDquEzt1IyVb7yJQ'
    L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/'+id+'/tiles/{z}/{x}/{y}?access_token='+token).addTo(map);

    map.setView([54.5,-3], 6);

    map.on('dblclick', function(e){
         var marker = new L.marker([54.6357, -6.48193]);
         marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup(); //dans bindPopup mettre le texte de l'infoBulle en html
         marker.addTo(map);
    });
