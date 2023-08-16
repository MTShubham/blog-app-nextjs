export function setLocalStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event("storage"));
}

export function getLocalStorage(key: string) {
    let value = localStorage.getItem(key);
    if (value) {
        JSON.parse(value);
    }
    return value ? value : '';
}

export function removeLocalStorage(key: string) {
    localStorage.removeItem(key);
    window.dispatchEvent(new Event("storage"));
}