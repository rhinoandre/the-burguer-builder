import React from 'react';

import Aux from '../../hoc/Auxi';

const layout = props => (
    <Aux>
        <div>Toolbar, SideDrawe, BackDrop</div>
        <main>
            {props.children}
        </main>
    </Aux>
);

export default layout;