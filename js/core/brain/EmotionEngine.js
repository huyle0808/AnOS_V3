export default class EmotionEngine{

    detect(text){

        text=text.toLowerCase();

        if(text.includes("buồn")){

            return{

                mood:"sad",

                energy:20

            };

        }

        if(text.includes("vui")){

            return{

                mood:"happy",

                energy:90

            };

        }

        return{

            mood:"neutral",

            energy:60

        };

    }

}