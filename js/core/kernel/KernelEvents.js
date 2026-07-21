export const KernelEvents = {

    // Boot
    BOOT: "kernel.boot",
    READY: "kernel.ready",
    START: "kernel.start",
    STOP: "kernel.stop",
    SHUTDOWN: "kernel.shutdown",
    RESTART: "kernel.restart",

    // Modules
    MODULE_LOADING: "kernel.module.loading",
    MODULE_LOADED: "kernel.module.loaded",
    MODULE_FAILED: "kernel.module.failed",

    // Services
    SERVICE_REGISTERED: "kernel.service.registered",
    SERVICE_REMOVED: "kernel.service.removed",

    // Lifecycle
    INITIALIZING: "kernel.initializing",
    RUNNING: "kernel.running",
    PAUSED: "kernel.paused",
    RESUMED: "kernel.resumed",

    // Errors
    ERROR: "kernel.error",
    WARNING: "kernel.warning",

    // Logs
    LOG: "kernel.log",

    // Version
    VERSION_CHANGED: "kernel.version.changed"

};