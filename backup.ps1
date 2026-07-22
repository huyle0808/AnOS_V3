$DATE = Get-Date -Format "yyyyMMdd_HHmmss"
$NAME = "AnOS_V3_$DATE"

Write-Host ""
Write-Host "================================"
Write-Host "BACKUP AnOS_V3"
Write-Host "================================"
Write-Host ""

if (!(Test-Path "backup")) {
    New-Item -ItemType Directory -Path "backup" | Out-Null
}

Write-Host "Git Add..."
git add .

Write-Host "Git Commit..."
git commit -m "Backup $DATE"

Write-Host "Git Push..."
git push origin main

$zipFile = "backup\$NAME.zip"

if (Test-Path $zipFile) {
    Remove-Item $zipFile -Force
}

Write-Host "Creating ZIP..."

$items = Get-ChildItem -Force | Where-Object {
    $_.Name -ne ".git" -and
    $_.Name -ne "node_modules" -and
    $_.Name -ne "backup" -and
    $_.Name -ne ".env"
}

Compress-Archive `
    -Path $items.FullName `
    -DestinationPath $zipFile `
    -CompressionLevel Optimal

if (Test-Path $zipFile) {

    Write-Host ""
    Write-Host "================================"
    Write-Host "Backup completed"
    Write-Host "================================"
    Write-Host $zipFile

}
else {

    Write-Host "Could not create ZIP file."

}