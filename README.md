# 🔐 Security Project - Keycloak Authentication Demo

Bezpieczna aplikacja webowa demonstrująca uwierzytelnianie JWT, kontrolę dostępu opartą na rolach (RBAC) oraz konteneryzowane wdrożenie z Keycloak.

## 🏗️ Architektura

- **Frontend:** React 18 + TypeScript + React Router + Keycloak.js
- **Backend:** Node.js + Express + JWT Authentication + Helmet Security
- **Identity Provider:** Keycloak 22.0 z PostgreSQL 15
- **Konteneryzacja:** Docker + Docker Compose
- **Bezpieczeństwo:** JWT tokens, Role-based access, CORS protection

## 🚀 Szybki Start

### Wymagania

- Docker i Docker Compose
- Node.js 18+ (tylko do developmentu)
- Git

### 1. Sklonuj i skonfiguruj

```bash
git clone <repository-url>
cd security-project

# Skopiuj pliki środowiskowe (opcjonalne - mają sensowne defaulty)
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
```

### 2. Uruchom aplikację
```bash
# Uruchom cały stack
docker-compose up -d

# Sprawdź status serwisów
docker-compose ps
```

### 3. Dostęp do aplikacji
- 🌐 Frontend: http://localhost:3000
- 🔌 Backend API: http://localhost:3001/health
- 👑 Keycloak Admin: http://localhost:8080 (login: admin / hasło: admin)

### Testowi użytkownicy
- 👤 Zwykły użytkownik: user / user123
- 👑 Administrator: admin / admin123


### Testowanie
# 🌐 Publiczne endpointy (bez uwierzytelnienia)
```bash
# Health check
curl http://localhost:3001/health

# Publiczne informacje
curl http://localhost:3001/api/public/info
```

# 🔒 Chronione endpointy (wymagają logowania)
```bash
# Profil użytkownika
curl -H "Authorization: Bearer <token>" http://localhost:3001/api/user/profile

# Dashboard użytkownika  
curl -H "Authorization: Bearer <token>" http://localhost:3001/api/user/dashboard

# Produkty (różne dane dla user/admin)
curl -H "Authorization: Bearer <token>" http://localhost:3001/api/products
```

# 👑 Endpointy tylko dla adminów
```bash
# Statystyki systemu
curl -H "Authorization: Bearer <token>" http://localhost:3001/api/admin/stats

# Zarządzanie użytkownikami
curl -H "Authorization: Bearer <token>" http://localhost:3001/api/admin/users

# Statystyki produktów
curl -H "Authorization: Bearer <token>" http://localhost:3001/api/products/stats
```

