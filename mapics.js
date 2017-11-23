var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
stamenUrl = 'https://{s}.tiles.mapbox.com/v3/mslee.h1kk2o6r/{z}/{x}/{y}.png',
main = L.tileLayer(stamenUrl, {maxZoom: 18}),
map = new L.Map('map', {
	layers: [main],
	center: [43.65009,3.57468],
	zoom: 10 
}),
overlay = L.tileLayer(osmUrl).addTo(map);
overlay.getContainer().style.display = "none";

var drawnItems = new L.FeatureGroup(); //group des polygones
map.addLayer(drawnItems);

var drawControl = new L.Control.Draw({
	draw: {
		position: 'topleft',
		polygon: false,
		rectangle: false,		
		polyline: {
			shapeOptions: {
				color: '#fff',
				weight: 2,
				opacity: 0.8,
				fill: false
				}
			},
		marker: false,
		circle: {
			shapeOptions: {
				color: '#fff',
				weight: 2,
				opacity: 0.8,
				fill: false
			}
		}	
	},
	edit: {
		featureGroup: drawnItems,
		remove: true,
		buffer: {
		  replacePolylines: false,
		  separateBuffer: false,
		},
	},
});
map.addControl(drawControl);

map.on('draw:created', function (e) {
	layer = e.layer; //layer = polygone dessiné
	drawnItems.addLayer(layer);
});

	/*
//Clipping or masking change code accordingly
function clip() {
	var clippingPaths =  clipPath.selectAll("path");
	clippingPaths.attr("d", path);
	
	if (clippingPaths.size() > 0) {
		overlay.getContainer().style.display = "inline";
		overlay.getContainer().style.clipPath = 'url(#clipPath)';
		overlay.getContainer().style.WebkitClipPath = 'url(#clipPath)';
	} else {
		overlay.getContainer().style.display = "none";
		overlay.getContainer().style.clipPath = 'none';
		overlay.getContainer().style.WebkitClipPath = 'none';
	};
};



*/
map.on('dblclick',function (e) {
	console.log(drawnItems._layers);
  });
/*
  map.on('dblclick',function (e) {
	for (var element in drawnItems._layers){
		for (var elt in drawnItems._layers[element]){
			console.log(`drawnItems._layers[element].${elt} = ${drawnItems._layers[element][elt]}`);
		}
	}
  });

  map.on('dblclick',function (e) {
	for (var element in drawnItems._layers){
		for (var elt in drawnItems._layers[element]){
			console.log(JSON.stringify(elt));
		}
	}
  });
  */