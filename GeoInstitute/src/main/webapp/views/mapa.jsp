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
		
		<script src="<c:url value="/resources/js/jquery-2.1.4.js" />"></script>
		<script src="<c:url value="/resources/js/ol.js" />"></script>
		<script src="<c:url value="/resources/js/main.js" />"></script>
		<!-- <script src='http://ol3js.org/en/master/build/ol.js'></script> -->
	
		<style>
			#map{
        		height:98%;
        		width:100%;
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
	<body onload='init()'>
		<div class="container">
			<div class="jumbotron">
				<h2>Mapa de Testes</h2>
				<p>Bootstrap is the most popular HTML, CSS, and JS framework for developing responsive, mobile-first projects on the web.</p>
			</div>				
		</div>
		
		<div id='map'></div>
		<button class='draw-point' onclick='startDraw("Point")' style='position: absolute; top:300px;'>Draw Points</button>
        <button class='draw-line' onclick='startDraw("LineString")' style='position: absolute; top:350px;'>Draw Lines</button>
        <button class='draw-polygon' onclick='startDraw("Polygon")' style='position: absolute; top:400px;'>Draw Polygon</button>
	</body>
</html>
