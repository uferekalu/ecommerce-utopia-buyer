import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import { getCart, removeItem, addItemsShippingCart } from '~/store/cart/action';
import ProductOnCart from '~/components/elements/products/ProductOnCart';
import {formatCurrency} from '~/utilities/product-helper';

class MiniCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: "",
            currentCartItems: []
        }
        this.handleCheckBoxClick=this.handleCheckBoxClick.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(getCart());
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.cart.cartItems !== this.props.cart.cartItems) {
            this.setShippingItems();
        }
      }


    setShippingItems() {
        const { cart: { cartItems } } = this.props;
        if (cartItems.length > 0) {
            var totalAmount = 0;
            const filteredResult = cartItems.map((item) => {
                totalAmount = totalAmount + (item.p2v_promo_price * item.quantity)
                return {
                    ...item,
                    isChecked: true
                };
            });
            if(filteredResult){
                this.setState({
                    currentCartItems: filteredResult,
                    amount: totalAmount,
                });
                this.props.dispatch(addItemsShippingCart({
                    CartItems: filteredResult,
                    amount: totalAmount
                }));
            }
        }
    }

    handleCheckBoxClick(event, product) {
        const { checked } = event.target;
        const { currentCartItems, amount } = this.state;
        var newAmount = amount;
        const filteredResult = currentCartItems.map((item) => {
            if (item.id_product == product.id_product) {
                item.isChecked = checked;
                newAmount = checked ? newAmount + (item.p2v_promo_price * item.quantity) : newAmount - (item.p2v_promo_price * item.quantity)
            }
            return item;
        });
        this.setState({
            currentCartItems: filteredResult,
            amount: newAmount
        });
        const shippingItems = filteredResult.filter(item => item.isChecked);
        this.props.dispatch(addItemsShippingCart({
            CartItems: shippingItems,
            amount: newAmount
        }));
    }


    render() {
        const { cart: { cartTotal, cartItems}, setting: {currency} } = this.props;
        const {currentCartItems, amount} =  this.state;
        // views
        let cartItemsView;
        if (currentCartItems && currentCartItems.length > 0) {
            const productItems = currentCartItems.map((item) => {
                return (
                    <ProductOnCart
                    handleCheckBoxClick= {this.handleCheckBoxClick}
                        product={item}
                        currency={currency ?? {text: 'AUD', symbol: '$'}}
                        key={item.id_product_m2m_vendor}
                    />
                );
            });
            cartItemsView = (
                <div className="ps-cart__content">
                    <div className="ps-cart__items">{productItems}</div>
                    <div className="ps-cart__footer">
                        <h3>
                            Sub Total:
                            <strong>{currency?.symbol ?? '$'}{amount ? formatCurrency(amount, currency) : 0}</strong>
                        </h3>
                        <figure>
                            <Link href="/account/shopping-cart">
                                <a className="ps-btn">View Cart</a>
                            </Link>
                            {amount === 0
                                ?<a className="ps-btn">Checkout</a>
                                :<Link href='/account/checkout'>
                                <a className="ps-btn">Checkout</a>
                            </Link>}
                        </figure>
                    </div>
                </div>
            );
        } else {
            cartItemsView = (
                <div className="ps-cart__content">
                    <div className="ps-cart__items">
                        <span>No products in cart</span>
                    </div>
                </div>
            );
        }

        return (
            <div className="ps-cart--mini">
                <a className="header__extra" href="#">
                    <i className="icon-cart"></i>
                    <span>
                        <i>{cartTotal ? cartTotal : 0}</i>
                    </span>
                </a>
                {cartItemsView}
            </div>
        );
    }
}

export default connect((state) => ({cart: state.cart, setting: state.setting}))(MiniCart);
