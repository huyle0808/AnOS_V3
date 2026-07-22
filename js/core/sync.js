import {
    exportMemory,
    importMemory
} from "./memory.js";


// Tự chọn API URL

function getAPI(){

    if(
        typeof window !== "undefined"
    ){

        return "";

    }


    return "http://localhost:3000";

}



// Nạp bộ nhớ từ server

// Nạp bộ nhớ từ server
export async function loadMemory() {

    try {

        const res = await fetch("http://127.0.0.1:3000/memory");

        if (!res.ok) {
            throw new Error("Không đọc được memory");
        }

        const data = await res.json();
        console.log("MEMORY DATA:", data);

        importMemory(data);

        console.log("✅ Đã nạp bộ nhớ.");

    } catch (e) {

        console.log(
            "❌ Không nạp được bộ nhớ:",
            e.message
        );

    }

}




// Lưu bộ nhớ lên server

// Lưu bộ nhớ lên server
export async function saveMemory() {

    try {

        await fetch("http://127.0.0.1:3000/memory", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(
                exportMemory()
            )

        });


        console.log("✅ Đã lưu bộ nhớ.");

    } catch (e) {

        console.log(
            "❌ Không lưu được bộ nhớ:",
            e.message
        );

    }

}