package br.com.geoinstitute.dao;

//import static br.com.helloworld.hibernate.HibernateUtil.getSessionFactory;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.criterion.DetachedCriteria;

import br.com.geoinstitute.domain.Dominio;
import br.com.geoinstitute.hibernate.HibernateUtil;

public abstract class Repositorio<T extends Dominio> implements IRepositorio<T> {

	private Session session;	

	public Repositorio() {
	}

	@Override
	public T salvar(T entity) {
		try {
			getSession().beginTransaction();
			getSession().save(entity);
			getSession().getTransaction().commit();
			getSession().close();
			return entity;
		} catch (Exception e) {
			getSession().getTransaction().rollback();
			getSession().close();
			return null;
		}
	}

	@Override
	public T atualizar(T entity) {
		try {
			getSession().beginTransaction();
			getSession().merge(entity);
			getSession().getTransaction().commit();
			getSession().close();
			return entity;
		} catch (Exception e) {
			getSession().getTransaction().rollback();
			getSession().close();
			return null;
		}
	}

	@Override
	public void deletar(T entity) {
		try {
			getSession().beginTransaction();
			getSession().delete(entity);
			getSession().getTransaction().commit();
		} catch (Exception e) {
			getSession().getTransaction().rollback();
		} finally {
			getSession().close();
		}
	}

	@Override
	@SuppressWarnings("unchecked")
	public T buscar(DetachedCriteria query) {
		T model = (T) query.getExecutableCriteria(getSession()).uniqueResult();
		return model;
	}

	@Override
	@SuppressWarnings("unchecked")
	public List<T> listar(DetachedCriteria query) {
		List<T> models = query.getExecutableCriteria(getSession()).list();
		return models;
	}

	private Session getSession() {
		if (session == null || !session.isOpen()) session = HibernateUtil.getSessionFactory().openSession();
		return session;
	}

}