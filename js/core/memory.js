const profile = {};
const history = [];

export function remember(key, value) {
    profile[key] = value;
}

export function recall(key) {
    return profile[key];
}

export function getProfile() {
    return { ...profile };
}

export function setProfile(data) {

    Object.keys(profile).forEach(key => delete profile[key]);

    Object.assign(profile, data || {});

}

export function addHistory(text) {

    history.push(text);

    // Chỉ giữ 100 dòng gần nhất
    if (history.length > 100) {
        history.shift();
    }

}

export function getHistory() {
    return [...history];
}

export function setHistory(data) {

    history.length = 0;

    if (Array.isArray(data)) {
        history.push(...data);
    }

}

export function clearHistory() {
    history.length = 0;
}
// Lấy tất cả các khóa đang nhớ
export function getMemoryKeys() {
    return Object.keys(profile);
}

// Kiểm tra có nhớ khóa nào không
export function hasMemory(key) {
    return Object.prototype.hasOwnProperty.call(profile, key);
}

// Xóa một thông tin đã nhớ
export function forget(key) {

    if (hasMemory(key)) {
        delete profile[key];
        return true;
    }

    return false;
}
// Xóa toàn bộ thông tin đã nhớ
export function clearProfile() {

    Object.keys(profile).forEach(key => delete profile[key]);

}