export default class GoalManager {

    constructor() {

        this.goals=[];

    }

    add(goal){

        this.goals.push({

            id:Date.now(),

            ...goal,

            status:"pending"

        });

    }

    current(){

        return this.goals.find(

            x=>x.status==="pending"

        );

    }

    complete(id){

        const goal=this.goals.find(

            x=>x.id===id

        );

        if(goal){

            goal.status="done";

        }

    }

}