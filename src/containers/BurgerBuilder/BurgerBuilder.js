import React, {Component} from 'react';

import Auxe from '../../hoc/Auxe';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGRIDIENT_PROICES = {
    salad: 0.5,
    cheese: 0.6,
    meat: 2.5,
    bacon: 43
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchase: false
    }
    purchaseHandler = () => {
        this.setState({purchase: true});
    }
    updatePutrchaseState = () => {
        const ingredients = {
            ...this.state.ingredients
        }
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({purchasable: sum > 0});
    }

    //Добавляем ингридиент
    addIngredientHandler = (type) => {
        const newCount = this.state.ingredients[type] + 1;
        const updatedIngredients = this.state.ingredients;
        updatedIngredients[type] = newCount;
        const priceAddition = INGRIDIENT_PROICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePutrchaseState();
    }

    removeIngredientHandler = (type) => {
        if (this.state.ingredients[type] <= 0) {
            return
        }
        const newCount = this.state.ingredients[type] - 1;
        const updatedIngredients = this.state.ingredients;
        updatedIngredients[type] = newCount;
        const priceDeduction = INGRIDIENT_PROICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePutrchaseState();
    }
    modelCloseHandler = () => {
        this.setState({purchase: false})
    }

    purchaseContinueHandler = () => {
        alert('You continue!')
    }

    purchaseCanceledHandler = () => {
        this.setState({purchase: false})
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return (
            <Auxe>
                <Modal modalClosed={this.modelCloseHandler} show={this.state.purchase}>
                    <OrderSummary
                        price = {this.state.totalPrice}
                        continue={this.purchaseContinueHandler}
                        canceled = {this.purchaseCanceledHandler}
                        ingredients={this.state.ingredients}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    addIngredient={this.addIngredientHandler}
                    removeIngredient={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    ordered={this.purchaseHandler}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                />
            </Auxe>
        );
    }
}

export default BurgerBuilder;