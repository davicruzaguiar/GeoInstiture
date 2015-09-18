package br.com.geoinstitute.dao;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import br.com.geoinstitute.domain.Usuario;


@Repository
@Component
public class UsuarioDao extends Repositorio<Usuario> implements IUsuarioDao{

}
