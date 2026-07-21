import AIGateway from "../ai/AIGateway.js";

export default class ServiceInstaller {

    constructor(kernel) {
        this.kernel = kernel;
    }

    install() {

        console.log("📦 Installing Services...");

        if (!this.kernel.has("ai")) {
            this.kernel.register("ai", new AIGateway(this.kernel));
            console.log("✅ AI Service Installed");
        }

        // Sau này thêm:
        // this.kernel.register("memory", new MemoryService());
        // this.kernel.register("knowledge", new KnowledgeService());
        // this.kernel.register("workflow", new WorkflowEngine(this.kernel));

        console.log("✅ Services Installed");

    }

}