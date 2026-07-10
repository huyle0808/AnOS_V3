#!/data/data/com.termux/files/usr/bin/bash

echo "====== AnOS STATUS ======"

echo ""
git status

echo ""

echo "Commit mới nhất:"
git log --oneline -1

echo ""

echo "Backup gần nhất:"
ls -t backup/*.zip | head -1
