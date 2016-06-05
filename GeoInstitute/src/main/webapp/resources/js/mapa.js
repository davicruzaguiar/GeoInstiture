var map, popup, marcador1, marcador2, selectControl, markers;
var terreo_ok, primeiro_ok;

var imageMarker1 = "../resources/img/marker.png";
var imageMarker2 = "../resources/img/marker2.png";
var imageAdmin = "../resources/img/admin.png";
var imageAdmin2 = "../resources/img/admin2.jpg";

var imgTag = "<img src='"+imageMarker1+"' alt='Marcador' height='18' width='18'/>";
var imgTag2 = "<img src='"+imageMarker2+"' alt='Marcador' height='18' width='18'/>";
var imgAdminTag = "<img src='"+imageAdmin+"' alt='Marcador' height='30' width='30'/>";
var imgAdminTag2 = "<img src='"+imageAdmin2+"' alt='Marcador' height='30' width='30'/>";

//<img src="<c:url value="/resources/img/marker.png"/>"/>

$(document).ready(function() {
	loadMap();
});

function loadMap() {

	// Coordinate System
	var WGS84 = new OpenLayers.Projection("EPSG:4326");
	var WGS84_google_mercator = new OpenLayers.Projection("EPSG:900913");

	// Map options
	map = new OpenLayers.Map("map", {
		controls : [ new OpenLayers.Control.Navigation(),
				new OpenLayers.Control.PanZoom(),
				new OpenLayers.Control.LayerSwitcher(),
				new OpenLayers.Control.MousePosition({
					div : document.getElementById("coordinates")
				}) ],
		projection : WGS84_google_mercator,
		displayProjection : WGS84
	});

	addLayers();
	 
	map.addControl(new OpenLayers.Control.LayerSwitcher());
	selectControl = new OpenLayers.Control.SelectFeature([ markers ], {
		toggle : true
	});

	map.addControl(selectControl);
	selectControl.activate();

	// Initial Location
	var mapextent = new OpenLayers.Bounds(-34.9508094787598, -8.0592212677002, -34.9495811462402, -8.05866527557373)
	.transform(WGS84, map.getProjectionObject());
	map.zoomToExtent(mapextent);
	
}

function addLayers() {
	// Google Layer
	var gmapsHybrid = new OpenLayers.Layer.Google("Google Hybrid", {
		type : google.maps.MapTypeId.HYBRID,
		numZoomLevels : 30
	});
	
	var gmapsSattelite = new OpenLayers.Layer.Google("Google Satélite", {
        type: google.maps.MapTypeId.SATELLITE,
        numZoomLevels: 30
    });
	
	var gmapsTerrain = new OpenLayers.Layer.Google("Google Terreno", {
        type: google.maps.MapTypeId.TERRAIN,
        numZoomLevels: 30
    });
    var gmapsRoad = new OpenLayers.Layer.Google("Google Rodovias", {
        type: google.maps.MapTypeId.ROADMAP,
        numZoomLevels: 30
    });

	// Geoserver Layer
	terreo_ok = new OpenLayers.Layer.WMS("Térreo",
			"http://localhost:8086/geoserver/geo/wms", {
				'layers' : 'geo:terreo_ok',
				transparent : true,
				format : 'image/png'
			}, {
				displayInLayerSwitcher : true,
				isBaseLayer : false,
				opacity : 0.5,
				strokeWidth : 111,
				visibility : true
			});

	// Markers
	markers = new OpenLayers.Layer.Vector('Marcadores', {
		displayInLayerSwitcher : true,
	    visibility: true
	});

	addMarker(-34.95035, -8.05884, ""+imgAdminTag2+"" + "<p>Diretoria de Administração (DAD)</p>");

	map.addLayers([ terreo_ok, markers, gmapsSattelite, gmapsHybrid, gmapsTerrain, gmapsRoad ]);
}

function addMarker(longitude, latitude, description) {
	var marker = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point(
			longitude, latitude).transform('EPSG:4326', 'EPSG:3857'), {
		//EPSG:900913 ou EPSG:3857
		// aqui podemos adicionar mais atributos
		description : description
	}, {
		externalGraphic : '../resources/img/marker.png',
		graphicWidth : 30,
		graphicHeight : 30,
		fillOpacity : 1
	});
	
	markers.addFeatures([ marker ]);
	
	markers.events.on({
		"featureselected" : onFeatureSelect,
		"featureunselected" : onFeatureUnselect
	});
}

function onPopupClose(evt) {
	selectControl.unselectAll();
}

function onFeatureSelect(event) {
	var feature = event.feature;
	var content = "<div>" + feature.attributes.description + "</div>";
	feature.style.externalGraphic = '../resources/img/marker2.png';
	markers.drawFeature(feature);

	popup = new OpenLayers.Popup.FramedCloud("id", feature.geometry.getBounds()
			.getCenterLonLat(), new OpenLayers.Size(100, 100), content, null,
			true, onPopupClose);
	feature.popup = popup;
	map.addPopup(popup);
}

function onFeatureUnselect(event) {
	var feature = event.feature;
	if (feature.popup) {
		map.removePopup(feature.popup);
		feature.popup.destroy();
		delete feature.popup;
	}
	feature.style.externalGraphic = '../resources/img/marker.png';
	markers.drawFeature(feature);
}

