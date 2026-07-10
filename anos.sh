#!/data/data/com.termux/files/usr/bin/bash

while true
do
    clear

    echo "======================================"
    echo "         AnOS Manager V2"
    echo "======================================"
    echo "1. Backup"
    echo "2. Restore"
    echo "3. Git Status"
    echo "4. Chạy Server"
    echo "5. Push GitHub"
    echo "6. Pull GitHub"
    echo "7. Danh sách Backup"
    echo "8. Commit gần nhất"
    echo "9. Mở AnOS trên trình duyệt"
    echo "0. Thoát"
    echo ""
    read -p "Chọn: " c

    case $c in

        1)
            bash backup.sh
            ;;

        2)
            bash restore.sh
            ;;

        3)
            git status
            ;;

        4)
            echo ""
            echo "Đang chạy server..."
            node server.js
            ;;

        5)
            git push origin main
            ;;

        6)
            git pull origin main
            ;;

        7)
            ls -lh backup
            ;;

        8)
            git log --oneline -10
            ;;

        9)
            echo ""
            echo "Mở trình duyệt:"
            echo "http://127.0.0.1:3000"
            ;;

        0)
            exit
            ;;

        *)
            echo ""
            echo "Lựa chọn không hợp lệ!"
            ;;

    esac

    echo ""
    read -p "Nhấn Enter để quay lại menu..."
done
