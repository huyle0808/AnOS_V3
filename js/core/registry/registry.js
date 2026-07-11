const registry = {
    engine: {},
    agent: {},
    plugin: {}
};

// Đăng ký module
export function register(type, name, module) {

    if (!registry[type]) {
        return;
    }

    registry[type][name] = module;

}

// Lấy module
export function get(type, name) {

    if (!registry[type]) {
        return null;
    }

    return registry[type][name] || null;

}

// Kiểm tra tồn tại
export function has(type, name) {

    if (!registry[type]) {
        return false;
    }

    return name in registry[type];

}

// Xóa module
export function remove(type, name) {

    if (!registry[type]) {
        return;
    }

    delete registry[type][name];

}

// Lấy danh sách
export function list(type) {

    if (!registry[type]) {
        return [];
    }

    return Object.keys(registry[type]);

}