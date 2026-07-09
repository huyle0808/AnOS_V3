#!/data/data/com.termux/files/usr/bin/bash

DATE=$(date +"%Y%m%d_%H%M%S")
NAME="AnOS_V3_$DATE"

echo "===== BACKUP AnOS ====="

git add .
git commit -m "Backup $DATE"

git push origin main

mkdir -p backup

zip -r "backup/$NAME.zip" . \
-x "backup/*" \
-x ".git/*" \
-x "node_modules/*"

echo ""
echo "Đã backup:"
echo "backup/$NAME.zip"
echo "Hoàn thành!"
