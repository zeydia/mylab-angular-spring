package sn.edu.ugb.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sn.edu.ugb.dtos.ProduitDTO;
import sn.edu.ugb.entities.Produit;
import sn.edu.ugb.entities.User;
import sn.edu.ugb.repositories.ProduitRepository;
import sn.edu.ugb.repositories.UserRepository;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/produits")
@CrossOrigin(origins = "http://localhost:4200")
public class ProduitController {

    private final ProduitRepository productRepository;
    private final UserRepository userRepository;

    public ProduitController(ProduitRepository productRepository, UserRepository userRepository) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<ProduitDTO> getProductsByUser(@RequestBody Map<String, String> body) {
        Long ownerId = Long.parseLong(body.get("userId"));

        return productRepository.findAllByOwnerId(ownerId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @PostMapping
    public ResponseEntity<ProduitDTO> createProduct(@RequestBody ProduitDTO dto) {

        User user = userRepository.findById(dto.getOwnerId())
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        Produit product = new Produit();
        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
        product.setQuantity(dto.getQuantity());
        product.setOwner(user);

        Produit saved = productRepository.save(product);
        return ResponseEntity.ok(convertToDTO(saved));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProduitDTO> updateProfile(@PathVariable Long id, @RequestBody ProduitDTO produitDTO) {
        return productRepository.findById(id)
                .map(produit -> {
                    produit.setId(produitDTO.getId());
                    produit.setDescription(produitDTO.getDescription());
                    produit.setName(produitDTO.getName());
                    produit.setOwner(userRepository.findById(produitDTO.getOwnerId()).orElse(null));
                    produit.setQuantity(produitDTO.getQuantity());

                    
                    Produit updatedProduit = productRepository.save(produit);
                    return ResponseEntity.ok(new ProduitDTO(
                            updatedProduit.getId(),
                            updatedProduit.getName(),
                            updatedProduit.getDescription(),
                            updatedProduit.getPrice(),
                            updatedProduit.getQuantity(),
                            updatedProduit.getOwner().getId()
                    ));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    private ProduitDTO convertToDTO(Produit p) {
        return new ProduitDTO(
            p.getId(), p.getName(), p.getDescription(), 
            p.getPrice(), p.getQuantity(), 
            p.getOwner().getId()
        );
    }
}