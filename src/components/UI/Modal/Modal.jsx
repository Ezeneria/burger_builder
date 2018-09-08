import React from 'react';
import classes from './Modal.css'
import Backdrop from '../Backdrop/Backdrop'
import Auxe from '../../../hoc/Auxe'

const modal = (props) => (
    <Auxe>
        <Backdrop clicked={props.modalClosed} show = {props.show}/>
        <div className={classes.Modal}
             style={{
                 transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                 opacity: props.show ? '1' : '0'
             }}
        >
            {props.children}
        </div>
    </Auxe>
)

export default modal;