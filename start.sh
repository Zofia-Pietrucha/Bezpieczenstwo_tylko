#!/bin/bash

# 🚀 Security Project - Start Script
# Autor: Zofia Pietrucha  
# Opis: Uruchamia pełną aplikację i przeprowadza testy

echo "🚀 Security Project - Start Script"
echo "=================================="
echo ""

# Sprawdź czy Docker działa
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker nie jest uruchomiony!"
    echo "   Uruchom Docker Desktop i spróbuj ponownie."
    exit 1
fi

# Sprawdź czy docker-compose.yml istnieje
if [ ! -f "docker-compose.yml" ]; then
    echo "❌ Plik docker-compose.yml nie został znaleziony!"
    echo "   Upewnij się, że jesteś w głównym folderze projektu."
    exit 1
fi

echo "🏗️  Budowanie obrazów (może potrwać kilka minut)..."
docker-compose build

echo ""
echo "🚀 Uruchamianie wszystkich serwisów..."
docker-compose up -d

echo ""
echo "⏳ Czekam na uruchomienie serwisów..."
sleep 10

# Funkcja do sprawdzania statusu serwisu
check_service() {
    local service_name=$1
    local url=$2
    local expected=$3
    
    echo -n "   Sprawdzam $service_name... "
    
    for i in {1..30}; do
        if curl -s "$url" | grep -q "$expected" > /dev/null 2>&1; then
            echo "✅ OK"
            return 0
        fi
        sleep 2
        echo -n "."
    done
    
    echo "❌ BŁĄD"
    return 1
}

echo "🔍 Sprawdzanie statusu serwisów:"
echo "==============================="

# Sprawdź backend
check_service "Backend API" "http://localhost:3001/health" "OK"

# Sprawdź frontend  
check_service "Frontend" "http://localhost:3000" "Security Project"

# Sprawdź Keycloak
check_service "Keycloak" "http://localhost:8080" "Keycloak"

echo ""
echo "📊 Status kontenerów:"
echo "===================="
docker-compose ps

echo ""
echo "🧪 Podstawowe testy API:"
echo "======================="

echo -n "📡 Test publicznego endpointu... "
if curl -s http://localhost:3001/api/public/info | grep -q "public" > /dev/null 2>&1; then
    echo "✅ OK"
else
    echo "❌ BŁĄD"
fi

echo -n "🔒 Test chronionego endpointu (oczekiwany 401)... "
if curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/api/user/profile | grep -q "401"; then
    echo "✅ OK (401 Unauthorized)"
else
    echo "❌ BŁĄD"
fi

echo ""
echo "🎉 Aplikacja jest gotowa!"
echo "========================"
echo ""
echo "🌐 Dostępne adresy:"
echo "   Frontend:      http://localhost:3000"
echo "   Backend API:   http://localhost:3001/health"  
echo "   Keycloak:      http://localhost:8080"
echo ""
echo "👤 Testowi użytkownicy:"
echo "   Użytkownik:    user / user123"
echo "   Administrator: admin / admin123"
echo "   Keycloak Admin: admin / admin"
echo ""
echo "🎬 Demo Flow dla prezentacji:"
echo "=============================="
echo "1. Otwórz http://localhost:3000"
echo "2. Sprawdź stronę About (API Status = ✅)"
echo "3. Zaloguj się jako 'user' → Dashboard"
echo "4. Spróbuj wejść na /admin → Access Denied"
echo "5. Wyloguj i zaloguj jako 'admin'"
echo "6. Sprawdź panel admina → Full Access"
echo ""
echo "📋 Dodatkowe komendy:"
echo "   docker-compose logs -f     # Zobacz logi na żywo"
echo "   docker-compose down        # Zatrzymaj aplikację"
echo "   ./cleanup.sh               # Wyczyść wszystko"
echo ""

# Opcjonalnie otwórz przeglądarkę (Linux/macOS)
if command -v xdg-open > /dev/null; then
    echo "🌐 Otwieranie przeglądarki..."
    xdg-open http://localhost:3000 > /dev/null 2>&1 &
elif command -v open > /dev/null; then
    echo "🌐 Otwieranie przeglądarki..."
    open http://localhost:3000 > /dev/null 2>&1 &
fi

echo "✨ Gotowe do prezentacji! ✨"