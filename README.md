# 📦 StockManager - Système de Gestion d'Inventaire

Ce projet est une application complète de gestion de stock utilisant **Angular 19** pour le frontend et **Spring Boot** avec **PostgreSQL** pour le backend.

## 🚀 Démarrage Rapide

### Pré-requis
* Java 17 ou supérieur
* Node.js v18+ et npm
* Une instance PostgreSQL en cours d'exécution

### Installation et Lancement Automatique
Nous avons inclus un script pour automatiser la configuration des environnements et le lancement des serveurs.

1.  **Rendre le script exécutable** (à faire une seule fois) :
    ```bash
    chmod +x start.sh
    ```

2.  **Lancer l'application** :
    ```bash
    ./start.sh
    ```

Le script va :
* Copier tes fichiers de configuration depuis `./envs` vers le dossier source d'Angular.
* Démarrer le backend Spring Boot (Port 8080).
* Démarrer le serveur de développement Angular (Port 4200).

---

## 🛠 Structure du Projet

* `/back` : API REST Spring Boot (PostgreSQL).
* `/front` : Application Angular avec gestion des States via **Signals**.
* `/envs` : Contient les fichiers `env.dev.ts` et `env.prod.ts`.

## ⚙️ Configuration Base de Données
Assurez-vous que votre base de donnée Postgres `labframdev` est disponible et que votre fichier `Back/src/main/resources/application.properties` contient les bonnes informations de connexion :
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/labframdev
spring.datasource.username=test
spring.datasource.password=test