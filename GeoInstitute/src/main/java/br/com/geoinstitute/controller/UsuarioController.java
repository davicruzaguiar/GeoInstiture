package br.com.geoinstitute.controller;

import java.util.Objects;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.ModelAndView;

import br.com.geoinstitute.dao.UsuarioDao;
import br.com.geoinstitute.domain.Usuario;

@Controller
@RequestMapping("/usuario")
@SessionAttributes({ "usuario" })
public class UsuarioController {
	
	@Autowired
	private UsuarioDao usuarioDao;
	
	@RequestMapping(value = { "", "/" }, method = RequestMethod.GET)
	public ModelAndView indice(@ModelAttribute("usuario") Usuario usuario,
			HttpServletRequest request){
		
		ModelAndView modelAndView = null;
		
		if (Objects.nonNull(usuario)) {
			modelAndView = new ModelAndView("usuario/usuario");
		} else {
			modelAndView = new ModelAndView("usuario/usuario", "usuario",
					new Usuario());
		}
		
		return modelAndView;
	}
	
	@RequestMapping(value = { "", "/" }, method = RequestMethod.POST)
	public Usuario salvar(@ModelAttribute("usuario") Usuario usuario,
			HttpServletRequest request){
		
		if (Objects.nonNull(usuario)) {
			usuarioDao.salvar(usuario);
		}
		
		return usuario;
	}
	
	@RequestMapping("/listar")
	@ResponseBody
	public ModelAndView listar(){
		return new ModelAndView("usuario/usuario-lista");
	}
	
	@ModelAttribute("usuario")
	public Usuario populate() {
		return new Usuario();
	}

}
