$DATE = Get-Date -Format "yyyyMMdd_HHmmss"
$NAME = "AnOS_V3_$DATE"

Write-Host "===== BACKUP AnOS ====="

git add .

git commit -m "Backup $DATE"

git push origin main

if (!(Test-Path "backup")) {
    New-Item -ItemType Directory -Path "backup" | Out-Null
}

Compress-Archive `
    -Path * `
    -DestinationPath "backup\$NAME.zip" `
    -Force

Write-Host ""
Write-Host "Đã backup:"
Write-Host "backup\$NAME.zip"
Write-Host "Hoàn thành!"