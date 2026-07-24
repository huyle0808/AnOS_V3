export default class WorldModel {

    constructor() {

        this.user = {};

        this.environment = {};

        this.tasks = [];

        this.apps = [];

    }

    updateUser(profile) {

        this.user = {

            ...this.user,

            ...profile

        };

    }

    updateTask(task) {

        this.tasks.push(task);

    }

    updateEnvironment(data) {

        this.environment = {

            ...this.environment,

            ...data

        };

    }

    snapshot() {

        return {

            user: this.user,

            tasks: this.tasks,

            environment: this.environment,

            apps: this.apps

        };

    }

}