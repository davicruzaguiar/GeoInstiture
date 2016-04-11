<%@page contentType="text/html" pageEncoding="UTF-8" %>
<!DOCTYPE html>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>


<html >
	<head>
		<title>Cadastro de Usuário</title>
				<script src="<spring:url value="/resources/js/jquery-2.1.4.js" />"></script>
		<link href="<spring:url value='/resources/css/bootstrap.css' />" rel="stylesheet" type="text/css" />
		
	</head>
	<body>
		<form:form method="POST" commandName="usuario" id="usuario_form" modelAttribute="usuario" >
			<div class="page-header">
			   <h1>Cadastro de Usuário 
			      <small>GeoInstitute</small>
			   </h1>
			</div>
			<p>Página de cadastro do usuário. Necessário para acesso a todos as funcionalidades
			do sistema.</p>
			
			<br>

			<div class="form-group">
				<form:label path="primeiroNome">Primeiro Nome</form:label>
				<form:input type="text" id="primeiroNome" class="form-control" placeholder="Primeiro Nome" path="primeiroNome" minlength="2" maxlength="14" />
			</div>
			
			<div class="form-group">
				<form:label path="ultimoNome">Último Nome</form:label>
				<form:input type="text" id="ultimoNome" class="form-control" placeholder="Último Nome" path="ultimoNome" minlength="2" maxlength="14" />
			</div>

			<div class="form-group">
				<form:label path="email">Email</form:label><br>
				<form:input type="email" id="email" path="email" minlength="2" maxlength="60" placeholder="Email"  class="form-control" />
			</div>	
			
			<div class="form-group">
				<form:button type="submit" class="btn btn-primary">Cadastrar</form:button>
				<--<button type="button" onclick="listar()" class="btn btn-warning">Listar</button>
			</div>
			 	
		</form:form>
		
		<script type="text/javascript">
			function listar() {
				$.ajax({
					url: '/GeoInstitute/usuario/listar'
				});
			}
		
		</script>
		
	</body>
</html>
