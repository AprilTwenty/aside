export function normalizeEmail(email) {
    if (typeof email !== "string") {
        return email;
    }
    return email.trim().toLowerCase();
}

export function normalizeDisplayName(name) {
    if (typeof name !== "string") {
        return name;
    }
    return name.replace(/\s+/g, " ").trim();
}