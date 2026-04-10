/* Functions for saving/loading connections in/from local storage.
 *
 * Data is stored as stringified JSON. Each connection is in the format:
 * {
 *     id: a random UUID
 *     server: the URL of the server
 *     sessionId: the token for the connection
 *     username: the username used to login
 * }
 *
 * Then, all connections are stored in the format:
 * {
 *     lastActiveConnection: id of the last opened connection. Automatically
 *                           tries to reconnect on refresh
 *     connections: array of the individual connections
 *     serverNames: array of servers which have been logged into. Displayed
 *                  in dropdown on home page
 * }
 */

export type Connection = {
    server: string;
    sessionId: string;
    username: string;
}

type StorageConnection = Connection & {
    id: string
}
type StoredConnections = {
    lastActiveConnection?: string
    serverNames: string[]
    connections: StorageConnection[]
}

export function saveLogin(toSave: Connection) {
    const state = load();
    const unchanged = state.connections.filter(c =>
        c.server !== toSave.server || c.username !== toSave.username);

    const matches = state.connections.filter(c =>
        c.server === toSave.server && c.username === toSave.username);
    const matching = matches.length > 0
        ? {
            ...matches[0],
            sessionId: toSave.sessionId
        } : {
            id: crypto.randomUUID(),
            server: toSave.server,
            sessionId: toSave.sessionId,
            username: toSave.username
        };
    const isNewServer = !state.serverNames.includes(toSave.server);
    const serverNames = isNewServer
        ? [...state.serverNames, toSave.server]
        : state.serverNames;

    const newState = {
        lastActiveConnection: matching.id,
        connections: [...unchanged, matching],
        serverNames
    };

    save(newState);
}

export function invalidateLogin(serverName: string, username: string) {
    const state = load();
    const newState = {
        ...state,
        connections: state.connections.filter(c =>
            c.server !== serverName || c.username !== username)
    }
    save(newState);
}

export function getLastLogin() {
    const state = load();
    const match = state.connections.find(v => v.id === state.lastActiveConnection);
    if (match === undefined) {
        save({
            ...state,
            lastActiveConnection: undefined
        });
        return undefined;
    } else {
        return {
            server: match.server,
            sessionId: match.sessionId,
            username: match.username,
        };
    }
}

export function getServerNames() {
    return load().serverNames;
}

function load() {
    const res = localStorage.getItem("icat-admin-connections");
    if (res === null) return {
        connections: [],
        serverNames: []
    };
    return JSON.parse(res) as StoredConnections;
}

function save(state: StoredConnections) {
    localStorage.setItem("icat-admin-connections", JSON.stringify(state));
}
