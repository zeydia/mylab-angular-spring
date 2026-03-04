#!/bin/bash

# Couleurs pour le terminal
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}==== StockManager : Initialisation du projet (Gradle & Angular) ====${NC}"

# 1. Vérification et Copie des fichiers d'environnement
echo -e "${BLUE}1. Configuration des environnements...${NC}"

if [ ! -d "./envs" ]; then
    echo -e "${RED}✘ Erreur critique: Le dossier source ./envs n'existe pas à la racine.${NC}"
    exit 1
fi

# Dossier de destination (Front avec Majuscule)
DEST_ENV="./Front/src/env"

if [ ! -d "$DEST_ENV" ]; then
    echo -e "${YELLOW}⚠ Le dossier de destination $DEST_ENV n'existe pas. Création...${NC}"
    mkdir -p "$DEST_ENV"
fi

cp -r ./envs/* "$DEST_ENV/"
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✔ Fichiers d'environnement synchronisés.${NC}"
else
    echo -e "${RED}✘ Erreur lors de la copie des fichiers.${NC}"
    exit 1
fi

# 2. Vérification de PostgreSQL
echo -e "${BLUE}2. Vérification de la base de données...${NC}"
nc -z localhost 5432 > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo -e "${RED}✘ PostgreSQL est injoignable sur le port 5432.${NC}"
    exit 1
fi
echo -e "${GREEN}✔ PostgreSQL est en ligne.${NC}"

# 3. Lancement du Backend (Gradle)
echo -e "${BLUE}3. Démarrage du Backend (Back avec Gradle)...${NC}"
cd Back
# On s'assure que le wrapper gradlew est exécutable
chmod +x gradlew
./gradlew bootRun > backend.log 2>&1 &
BACK_PID=$!
cd ..

# 4. Lancement du Frontend
echo -e "${BLUE}4. Démarrage du Frontend (Front)...${NC}"
cd Front
npm start > frontend.log 2>&1 &
FRONT_PID=$!
cd ..

echo -e "${GREEN}==== Serveurs en cours de lancement ====${NC}"
echo -e "Logs Backend : tail -f ./Back/backend.log"
echo -e "Logs Frontend : tail -f ./Front/frontend.log"

# Fonction de nettoyage pour couper les processus au Ctrl+C
function cleanup {
    echo -e "${RED}\nArrêt des serveurs...${NC}"
    kill $BACK_PID 2>/dev/null
    kill $FRONT_PID 2>/dev/null
    exit
}

trap cleanup SIGINT

# Vérification finale
echo "Attente de la mise en ligne des services (20s)..."
sleep 20

nc -z localhost 8080 && echo -e "${GREEN}✔ API (Gradle) prête sur http://localhost:8080${NC}" || echo -e "${RED}✘ API hors ligne${NC}"
nc -z localhost 4200 && echo -e "${GREEN}✔ App prête sur http://localhost:4200${NC}" || echo -e "${RED}✘ App hors ligne${NC}"

echo -e "${YELLOW}Utilisez Ctrl+C pour arrêter le projet.${NC}"

while true; do sleep 1; done