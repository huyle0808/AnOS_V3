export function applyEmotionRules(result){

    if(result.score >= 80){

        result.level = "Rất mạnh";

    }else if(result.score >= 50){

        result.level = "Trung bình";

    }else{

        result.level = "Nhẹ";

    }

}