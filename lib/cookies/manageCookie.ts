export function setCookie(name: string, value: string, maxAgeSeconds = 3600, path = "/") {
    const cookie = `${name}=${value}; path=${path}; max-age=${maxAgeSeconds}; secure; samesite=strict;`
    document.cookie = cookie;
}

export function getCookie(name: string) {
    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return match ? decodeURIComponent(match[2]) : null; 
}

export function deleteCookie(name: string, path = "/") {
    document.cookie = `${name}=; path=${path}; max-age=0; secure; samesite=strict;`
}