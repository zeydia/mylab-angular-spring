#!/bin/bash

# Couleurs pour le terminal
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}==== StockManager : Initialisation du projet ====${NC}"

# 1. Copie des fichiers d'environnement
echo -e "${BLUE}1. Configuration des environnements...${NC}"
if [ -d "./envs" ]; then
    cp -r ./envs/* ./front/src/env/ 2>/dev/null || mkdir -p ./front/src/env && cp -r ./envs/* ./front/src/env/
    echo -e "${GREEN}✔ Dossier envs copié dans le frontend.${NC}"
else
    echo -e "${RED}✘ Erreur: Dossier ./envs introuvable à la racine.${NC}"
fi

# 2. Vérification du Backend (Spring Boot)
echo -e "${BLUE}2. Lancement du Backend (Spring Boot)...${NC}"
cd back
# On lance Maven en arrière-plan
./mvnw spring-boot:run > backend.log 2>&1 &
BACK_PID=$!
cd ..

# 3. Vérification du Frontend (Angular)
echo -e "${BLUE}3. Lancement du Frontend (Angular)...${NC}"
cd front
# On lance npm start en arrière-plan
npm start > frontend.log 2>&1 &
FRONT_PID=$!
cd ..

echo -e "${GREEN}==== Serveurs en cours de démarrage ====${NC}"
echo -e "Backend log: ./back/backend.log"
echo -e "Frontend log: ./front/frontend.log"

# Fonction pour stopper les serveurs proprement à la fermeture du script
function cleanup {
    echo -e "${RED}\nArrêt des serveurs...${NC}"
    kill $BACK_PID
    kill $FRONT_PID
    exit
}

trap cleanup SIGINT

# Boucle de vérification de santé (Health Check)
echo "Attente de la mise en ligne des services..."
sleep 10

# Vérification simple du port 8080 (Back) et 4200 (Front)
nc -z localhost 8080 && echo -e "${GREEN}✔ Backend est en ligne sur port 8080${NC}" || echo -e "${RED}✘ Backend ne répond pas encore${NC}"
nc -z localhost 4200 && echo -e "${GREEN}✔ Frontend est en ligne sur port 4200${NC}" || echo -e "${RED}✘ Frontend ne répond pas encore${NC}"

echo -e "${BLUE}Appuyez sur Ctrl+C pour arrêter les deux serveurs.${NC}"

# Garde le script en vie
while true; do sleep 1; done