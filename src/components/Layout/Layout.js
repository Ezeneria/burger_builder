import React from 'react';
import Auxe from '../../hoc/Auxe';
import classes from './Layout.css';

const layout = ( props ) => (
    <Auxe>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Auxe>
);

export default layout;