var map, popup, marcador1, marcador2, selectControl, markers, selectControl;
var gmapsHybrid, terreo_ok;

var imgMarker1 = "<img src='/resources/img/marker.png' height='50' width='50'>";
var imgMarker2 = "<img src='/resources/img/marker2.png' height='50' width='50'>";

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

	/*
	 * var imageUrl = "http://1.bp.blogspot.com/-DnDNvJs_V4g/TqsDw8DyZLI/AAAAAAAAAXw/JMtrvvIaTnI/s1600/liberdade.jpg";
	 * var imgTag = "<img src='"+imageUrl+"' alt='The Statue of Liberty Image' height='150' width='150'>"; 
	 * addMarker(-74.04457, 40.68960, "<p>The Statue of Liberty</p>" + imgTag);
	 */

	// Select Control to control markers
	selectControl = new OpenLayers.Control.SelectFeature([ markers ], {
		toggle : true
	});

	map.addControl(selectControl);
	selectControl.activate();

	// Initial Location
	var mapextent = new OpenLayers.Bounds(-34.9508094787598, -8.0592212677002, -34.9495811462402, -8.05866527557373).transform(
			WGS84, map.getProjectionObject());
	map.zoomToExtent(mapextent);
	
	document.getElementById("map").style.marginLeft = "350px";
}

function addLayers() {
	// Google Layer
	gmapsHybrid = new OpenLayers.Layer.Google("Google Hybrid", {
		type : google.maps.MapTypeId.HYBRID,
		numZoomLevels : 20
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
	terreo_ok = new OpenLayers.Layer.WMS("terreo_ok",
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
	markers = new OpenLayers.Layer.Vector('Markers', {
		displayInLayerSwitcher : true
	// visibility: false
	});

	markers.events.on({
		"featureselected" : onFeatureSelect,
		"featureunselected" : onFeatureUnselect
	});

	map.addLayers([ markers, terreo_ok, gmapsSattelite, gmapsHybrid ]);
}

function addMarker(longg, lat, description) {
	var marker = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point(
			longg, lat).transform('EPSG:4326', 'EPSG:3857'), {
		// You can add more attributes here.
		description : description
	}, {
		externalGraphic : imgMarker1,
		graphicWidth : 32,
		graphicHeight : 32,
		fillOpacity : 1
	});
	markers.addFeatures([ marker ]);
}

function onPopupClose(evt) {
	selectControl.unselectAll();
}

function onFeatureSelect(event) {
	var feature = event.feature;
	var content = "<div>" + feature.attributes.description + "</div>";
	feature.style.externalGraphic = imgMarker2;
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
	feature.style.externalGraphic = imgMarker1;
	markers.drawFeature(feature);
}

