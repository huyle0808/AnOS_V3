const profile = {};
const history = [];
const tasks = [];
export function remember(key, value) {
    profile[key] = value;
}
export function rememberList(key, value) {

    if (!Array.isArray(profile[key])) {
        profile[key] = [];
    }

    if (!profile[key].includes(value)) {
        profile[key].push(value);
    }

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
export function getTasks() {
    return [...tasks];
}

export function setTasks(data) {

    tasks.length = 0;

    if (Array.isArray(data)) {
        tasks.push(...data);
    }

}
// ==============================
// Persistent Memory
// ==============================

export function exportMemory(){

    return {
        profile,
        history,
        tasks
    };

}


export function importMemory(data){

    if(!data) return;


    setProfile(
        data.profile || {}
    );


    setHistory(
        data.history || []
    );


    setTasks(
        data.tasks || []
    );

}