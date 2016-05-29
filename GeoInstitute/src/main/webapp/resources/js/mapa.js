var map, popup, marcador1, marcador2, selectControl;

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
	
	// Google Layer
	var gmapsHybrid = new OpenLayers.Layer.Google("Google Hybrid", {
		type : google.maps.MapTypeId.HYBRID,
		numZoomLevels : 20
	});

	var terreo_ok = new OpenLayers.Layer.WMS("terreo_ok",
            "http://localhost:8086/geoserver/geo/wms",
            {
                'layers': 'geo:terreo_ok',
                transparent: true,
                format: 'image/png'
            }
    , {
        displayInLayerSwitcher: false,
        isBaseLayer: false,
        opacity: 0.5,
        strokeWidth: 111,
        visibility: false
    }

    );
	
	marcador1 = new OpenLayers.Layer.Vector('marcador1', {
        displayInLayerSwitcher: false,
        visibility: false
    });
    marcador2 = new OpenLayers.Layer.Vector('marcador2', {
        displayInLayerSwitcher: false,
        visibility: false
    });
	
	marcador1.events.on({
        "featureselected": onFeatureSelect,
        "featureunselected": onFeatureUnselect
    });
    marcador2.events.on({
        "featureselected": onFeatureSelect,
        "featureunselected": onFeatureUnselect
    });
	
	map.addLayers([terreo_ok, marcador1, marcador2, gmapsHybrid]);

    map.addControl(new OpenLayers.Control.LayerSwitcher());
    selectControl = new OpenLayers.Control.SelectFeature([marcador1, marcador2],
            {
                toggle: true
            });
    
    map.addControl(selectControl);
    selectControl.activate();
    
    // Initial Location
    var mapextent = new OpenLayers.Bounds(-34,9508094787598, -8,0592212677002, -34,9495811462402, -8,05866527557373).transform(WGS84, map.getProjectionObject());
    map.zoomToExtent(mapextent);
}


