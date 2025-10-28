#!/bin/bash

# Script de limpeza pós-fix do sistema de temas
# Execute: chmod +x cleanup-theme-fix.sh && ./cleanup-theme-fix.sh

echo "🧹 Limpando arquivos antigos do sistema de temas..."

# Remover arquivo antigo (opcional)
if [ -f "lib/theme.ts" ]; then
    echo "📁 Removendo lib/theme.ts (substituído por theme-context.tsx)..."
    rm lib/theme.ts
    echo "✅ lib/theme.ts removido"
else
    echo "ℹ️  lib/theme.ts já foi removido ou não existe"
fi

echo ""
echo "🧹 Limpando cache do Metro Bundler..."
npx expo start --clear &

echo ""
echo "✅ Limpeza concluída!"
echo ""
echo "📱 O app está reiniciando com cache limpo..."
echo "   Aguarde o servidor Metro inicializar e teste o sistema de temas."
echo ""
echo "🎨 Como testar:"
echo "   1. Abra o app"
echo "   2. Vá em Perfil > Tema"
echo "   3. Teste: ☀️ Claro | 🌙 Escuro | ⚙️ Sistema"
echo "   4. TODO o app deve mudar de cor instantaneamente!"
