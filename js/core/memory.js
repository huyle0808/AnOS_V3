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