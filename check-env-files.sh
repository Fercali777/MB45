#!/bin/bash

# 🔒 Script de Verificación de Archivos de Entorno - MB45 Furniture
# Este script verifica que los archivos de entorno estén protegidos y existan

echo "🔒 Verificando archivos de entorno..."

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para verificar archivo
check_env_file() {
    local file_path=$1
    local description=$2
    
    if [ -f "$file_path" ]; then
        echo -e "${GREEN}✅ $description existe: $file_path${NC}"
        return 0
    else
        echo -e "${RED}❌ $description NO existe: $file_path${NC}"
        return 1
    fi
}

# Función para verificar que archivo esté en .gitignore
check_gitignore() {
    local file_pattern=$1
    local description=$2
    
    if grep -q "$file_pattern" .gitignore; then
        echo -e "${GREEN}✅ $description está protegido en .gitignore${NC}"
        return 0
    else
        echo -e "${RED}❌ $description NO está protegido en .gitignore${NC}"
        return 1
    fi
}

echo ""
echo "📁 Verificando existencia de archivos de entorno..."

# Verificar archivos de entorno
check_env_file "./server/.env" "Archivo de entorno del backend"
check_env_file "./clientnpm/.env" "Archivo de entorno del frontend (desarrollo)"
check_env_file "./clientnpm/.env.production" "Archivo de entorno del frontend (producción)"

echo ""
echo "🛡️ Verificando protección en .gitignore..."

# Verificar protección en .gitignore
check_gitignore "**/.env" "Archivos .env"
check_gitignore "**/.env.*" "Archivos .env.*"

echo ""
echo "📋 Verificando contenido de archivos..."

# Verificar que los archivos tengan contenido
if [ -f "./server/.env" ]; then
    echo -e "${GREEN}✅ Backend .env tiene contenido:${NC}"
    echo "   - MONGO_URI: $(grep -q "MONGO_URI" ./server/.env && echo "✅ Configurado" || echo "❌ No encontrado")"
    echo "   - JWT_SECRET: $(grep -q "JWT_SECRET" ./server/.env && echo "✅ Configurado" || echo "❌ No encontrado")"
    echo "   - CLOUDINARY: $(grep -q "CLOUDINARY" ./server/.env && echo "✅ Configurado" || echo "❌ No encontrado")"
fi

if [ -f "./clientnpm/.env" ]; then
    echo -e "${GREEN}✅ Frontend .env tiene contenido:${NC}"
    echo "   - VITE_API_URL: $(grep -q "VITE_API_URL" ./clientnpm/.env && echo "✅ Configurado" || echo "❌ No encontrado")"
fi

if [ -f "./clientnpm/.env.production" ]; then
    echo -e "${GREEN}✅ Frontend .env.production tiene contenido:${NC}"
    echo "   - VITE_API_URL: $(grep -q "VITE_API_URL" ./clientnpm/.env.production && echo "✅ Configurado" || echo "❌ No encontrado")"
fi

echo ""
echo "🔒 Verificando reglas de Cursor AI..."

# Verificar que las reglas de Cursor AI estén configuradas
if [ -f ".cursorrules" ]; then
    if grep -q "PROTECCIÓN DE ARCHIVOS DE ENTORNO" .cursorrules; then
        echo -e "${GREEN}✅ Reglas de protección configuradas en .cursorrules${NC}"
    else
        echo -e "${YELLOW}⚠️  Reglas de protección no encontradas en .cursorrules${NC}"
    fi
else
    echo -e "${RED}❌ Archivo .cursorrules no existe${NC}"
fi

echo ""
echo "📝 Resumen de verificación:"
echo "   - Los archivos .env* deben existir localmente"
echo "   - Los archivos .env* deben estar en .gitignore"
echo "   - Las reglas de Cursor AI deben estar configuradas"
echo "   - Los valores deben estar configurados en Vercel"
echo ""
echo "🔗 Para configurar en Vercel, usa los valores de los archivos .env*"
echo "📖 Consulta ENVIRONMENT_PROTECTION.md para más detalles" 