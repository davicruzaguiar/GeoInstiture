package br.com.geoinstitute.dao;

import java.util.List;

import org.hibernate.criterion.DetachedCriteria;

import br.com.geoinstitute.domain.Dominio;

public interface IRepositorio<T extends Dominio> {
	
	T salvar(T entity);
	
	T atualizar(T entity);
	
	void deletar(T entity);
	
	T buscar(DetachedCriteria query);
	
	List<T> listar(DetachedCriteria query);
	
}
