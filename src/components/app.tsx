import {useLayoutEffect, useReducer} from 'preact/hooks';

import IcatClient, {isValidSession} from '../icat';
import About from './about';
import Tips from './tips';
import Header from './header';
import LoginForm from './login-form';
import {
    Connection,
    getLastLogin,
    invalidateLogin,
    saveLogin
} from '../connectioncache';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {appStateReducer, Page} from "../state/app";
import ServerConnection from "./server-connection";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchInterval: false,
            refetchOnWindowFocus: false,
        }
    }
});

const App = () => {
    const [state, dispatch] = useReducer(
        appStateReducer,
        {
            activePage: undefined, connections: []
        });

    const createConnection = (login: Connection) => {
        saveLogin(login);
        dispatch({
            type: "create_connection",
            connectionInfo: login
        })
    };

    const setActivePage = (p: Page) =>
        dispatch({
            type: "change_page",
            page: p
        });

    const removeConnection = (i: number) => {
        const c = state.connections[i].connectionInfo;

        invalidateLogin(c.server, c.username);
        new IcatClient(c.server, c.sessionId).logout();
        dispatch({
            type: "close_connection",
            idx: i
        });
    }

    // If on the login page, and no servers are currently active, try to
    // login to the last active server.
    useLayoutEffect(() => {
        if (state.activePage !== undefined) return;
        if (state.connections.length > 0) return;
        const login = getLastLogin();
        if (login === null || login.sessionId == undefined) return;
        isValidSession(login)
            .then(res => {if (res) createConnection(login)});
    });

    // es pattern matching when?
    const activePage = state.activePage === undefined
        ? <LoginForm createConnection={createConnection}/>
        : state.activePage == "tips"
            ? <Tips/>
            : state.activePage == "about"
                ? <About/>
                : <ServerConnection
                    connection={state.connections[state.activePage]}
                    dispatch={a => dispatch({
                        ...a, connectionIdx: state.activePage as number
                    })}
                />

    return (
        <QueryClientProvider client={queryClient}>
            <Header
                connections={state.connections.map(c => c.connectionInfo)}
                closeConnection={removeConnection}
                setActivePage={setActivePage}
                activePage={state.activePage}/>
            {activePage}
        </QueryClientProvider>
    );
}

export default App;
