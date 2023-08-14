export function setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStorage(key) {
    let value = localStorage.getItem(key);
    if (value) {
        JSON.parse(value);
    }
    return value ? value : '';
}

export function removeLocalStorage(key) {
    localStorage.removeItem(key);
}