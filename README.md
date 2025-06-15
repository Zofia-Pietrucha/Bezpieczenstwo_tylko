# Security Project

Projekt zabezpieczeń z integracją Keycloak, React frontend i Node.js backend.

## Architektura

- **Frontend:** React + React Router
- **Backend:** Node.js + Express
- **Identity Provider:** Keycloak
- **Konteneryzacja:** Docker + Docker Compose

## Wymagania

- Docker i Docker Compose
- Node.js 18+
- npm lub yarn

## Uruchamianie

```bash
# Uruchomienie całego stacku
docker-compose up -d

# Frontend: http://localhost:3000
# Backend: http://localhost:3001
# Keycloak: http://localhost:8080
```

## Uruchamianie developmentowe

### 1. Uruchom tylko Keycloak i bazę danych:

```bash
docker-compose up postgres keycloak -d
```
