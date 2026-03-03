package sn.edu.ugb.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sn.edu.ugb.entities.Produit;

@Repository
public interface ProduitRepository extends JpaRepository<Produit, Long> {

    List<Produit> findAllByOwnerId(Long ownerId);
    List<Produit> findByOwnerId(Long ownerId);
}
