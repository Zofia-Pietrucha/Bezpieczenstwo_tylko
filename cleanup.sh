#!/bin/bash

# 🧹 Security Project - Cleanup Script
# Autor: Zofia Pietrucha
# Opis: Czyści wszystkie kontenery, obrazy i wolumeny projektu

echo "🧹 Security Project - Cleanup Script"
echo "===================================="
echo ""

# Sprawdź czy Docker działa
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker nie jest uruchomiony!"
    echo "   Uruchom Docker Desktop i spróbuj ponownie."
    exit 1
fi

echo "🛑 Zatrzymywanie wszystkich kontenerów..."
docker-compose down

echo ""
echo "🗑️  Usuwanie kontenerów projektu..."
docker-compose down --remove-orphans

echo ""
echo "💾 Usuwanie wolumenów (UWAGA: to usunie dane Keycloak)..."
read -p "Czy chcesz usunąć wszystkie dane? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    docker-compose down -v
    echo "✅ Wolumeny usunięte"
else
    echo "⏭️  Wolumeny zachowane"
fi

echo ""
echo "🖼️  Usuwanie obrazów projektu..."
# Usuń obrazy związane z projektem
docker images | grep -E "(security-|keycloak|postgres)" | awk '{print $3}' | xargs -r docker rmi -f

echo ""
echo "🧽 Czyszczenie nieużywanych obrazów i kontenerów..."
docker system prune -f

echo ""
echo "📊 Status po czyszczeniu:"
echo "========================"
docker ps -a
echo ""
docker images | head -5
echo ""

echo "✅ Czyszczenie zakończone!"
echo ""
echo "💡 Aby uruchomić projekt ponownie, użyj:"
echo "   ./start.sh"
echo ""