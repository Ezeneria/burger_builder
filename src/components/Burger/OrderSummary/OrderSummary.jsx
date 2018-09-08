import React from 'react'
import Auxe from '../../../hoc/Auxe'
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients)
        .map(igKey=>{
            return <li key={'key-'+ igKey}><span style={{textTransform: 'capitalize'}}>{igKey}</span> : {props.ingredients[igKey]}</li>

        });
    return (
        <Auxe>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p><strong>Total price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout</p>
            <Button btnType='Danger' clicked={props.canceled}>Cancel</Button>
            <Button btnType='Success' clicked={props.continue}>Continue</Button>
        </Auxe>
    )
}

export default orderSummary;