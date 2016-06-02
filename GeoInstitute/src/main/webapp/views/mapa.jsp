<%@page contentType="text/html" pageEncoding="UTF-8" %>
<!DOCTYPE html>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<html>
	<head>
		<title>Mapa</title>
		
		<!-- CSS -->
		<link href="<c:url value='/resources/css/bootstrap.css' />" rel="stylesheet" type="text/css" />
		<link href="<c:url value='/resources/css/ol.css' />" rel="stylesheet" type="text/css" />
		<!-- <link rel='stylesheet' href='http://ol3js.org/en/master/css/ol.css'> -->
		
		<!-- JS -->
		
		<script type="text/javascript" src="<c:url value="/resources/js/jquery-2.1.4.js" />"></script>
		<script type="text/javascript" src="<c:url value="/resources/js/mapa.js" />"></script>
		<script type="text/javascript" src="http://openlayers.org/api/OpenLayers.js"></script>
        <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?v=3.5&sensor=false"></script>
        <script type="text/javascript" src="https://www.google.com/jsapi"></script>
        
        <!--<script type="text/javascript" src="<c:url value="/resources/js/OpenLayers.js" />"></script>-->
		<!-- <script src='http://ol3js.org/en/master/build/ol.js'></script> -->
	
		<style>
			#map{
        		height:98%;
        		width:100%;
        		float: left; width: 30%;
        		
        	}
        	
        	body{
        		height:100%;
        	}
        	
        	html{
        		height:100%;
        	}
        	
        	.popup{
        		background:white;
        		border-radius:5px;
        		width:240px;
        		height:200px;
        	}
        	
        	.closebtn{
        		position:absolute;
        		right:4px;
        		
        	}
		</style>
		
	</head>
	<body>
		<div class="container">
			<div class="jumbotron">
				<h2>Mapa do Bloco A - IFPE</h2>
				<p>Bootstrap is the most popular HTML, CSS, and JS framework for developing responsive, mobile-first projects on the web.</p>
			</div>				
		</div>
		
		<div id="map" style="height: 400px; width: 800px;"></div>    
        <div id="coordinates"></div>
		
	</body>
</html>
