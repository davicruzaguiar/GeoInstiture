<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<script src="<c:url value="/resources/css/bootstrap.css" />"></script>

<html>
	<head>
		<title>Lista de Usu�rios</title>
		<link rel="stylesheet" href="<c:url value="/resources/css/bootstrap.css" />">
	</head>
	<body>
		<div class="container">
		  <h2>Lista de Usu�rios</h2>
		  <p>Todos usu�rios cadastrados no sistema.</p>
		  <br />            
		  <table class="table table-striped">
		    <thead>
		      <tr>
		        <th>Primeiro Nome</th>
		        <th>�ltimo Nome</th>
		        <th>Email</th>
		      </tr>
		    </thead>
		    <tbody>
		      <tr>
		        <td>John</td>
		        <td>Doe</td>
		        <td>john@example.com</td>
		      </tr>
		      <tr>
		        <td>Mary</td>
		        <td>Moe</td>
		        <td>mary@example.com</td>
		      </tr>
		      <tr>
		        <td>July</td>
		        <td>Dooley</td>
		        <td>july@example.com</td>
		      </tr>
		    </tbody>
		  </table>
		</div>
	</body>
</html>
