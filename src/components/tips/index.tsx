import SuccessIndicator from '../success-indicator';

const Tips = () => (
    <div class="page">
        <h2>Tips</h2>
        <ul>
            <li>Right click an entry to get links to related entities. Selecting one will open a new entity tab.</li>
            <li>Alt-Shift-O opens a modal which can be used to open new entity tabs by typing the name of the entity.
            After starting to type, scroll through the list of suggestions with the arrow keys or page up/down.</li>
            <li>Middle click an entity tab to close it.</li>
            <li>Middle click a connection tab in the top bar to logout and close it.</li>
            <li>Drag and drop entity tabs to change their order.</li>
            <li>The most recently opened tab will be restored on next visit, if the session from it is still valid.</li>
            <li>If an update fails, this marker will be displayed:
                <SuccessIndicator
                    saveState={{
                        failed: true, clear: () => ({}),
                        error: new Error("Error reason will be displayed here")
                    }}
                />. Hover over it to see the error message.
            </li>
        </ul>
    </div>);

export default Tips;
