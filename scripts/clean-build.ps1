# Script de nettoyage complet pour éviter les problèmes de cache lors du build
Write-Host "🧹 Nettoyage complet du projet HRNet..." -ForegroundColor Yellow

# Supprimer le dossier dist
if (Test-Path "dist") {
    Write-Host "❌ Suppression du dossier dist..." -ForegroundColor Red
    Remove-Item "dist" -Recurse -Force
}

# Supprimer les caches Vite
if (Test-Path "node_modules/.vite") {
    Write-Host "❌ Suppression du cache Vite..." -ForegroundColor Red
    Remove-Item "node_modules/.vite" -Recurse -Force
}

if (Test-Path ".vite") {
    Write-Host "❌ Suppression du cache Vite local..." -ForegroundColor Red
    Remove-Item ".vite" -Recurse -Force
}

# Nettoyer le cache npm
Write-Host "🧽 Nettoyage du cache npm..." -ForegroundColor Blue
npm cache clean --force

Write-Host "✅ Nettoyage terminé !" -ForegroundColor Green
Write-Host "🏗️  Vous pouvez maintenant exécuter 'npm run build' pour un build propre." -ForegroundColor Cyan