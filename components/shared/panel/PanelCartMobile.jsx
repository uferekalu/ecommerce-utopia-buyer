import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCart, removeItem } from '../../../store/cart/action';
import Link from 'next/link';
import { baseUrl } from '../../../repositories/Repository';

class PanelCartMobile extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(getCart());
    }

    handleRemoveCartItem = (product) => {
        this.props.dispatch(removeItem(product));
    };

    render() {
        const { amount, cartItems } = this.props;
        return (
            <div className="ps-cart--mobile">
                <div className="ps-cart__content">
                    {cartItems && cartItems.length > 0 ? (
                        cartItems.map((product) => (
                            <div
                                className="ps-product--cart-mobile"
                                key={product.id}>
                                <div className="ps-product__thumbnail">
                                    <Link
                                        href="/product/[pid]"
                                        as={`/product/${product.id}`}>
                                        <a>
                                            <img
                                                src={`${baseUrl}${product.thumbnail.url}`}
                                                alt="martfury"
                                            />
                                        </a>
                                    </Link>
                                </div>
                                <div className="ps-product__content">
                                    <a
                                        className="ps-product__remove"
                                        onClick={this.handleRemoveCartItem.bind(
                                            this,
                                            product
                                        )}>
                                        <i className="icon-cross"></i>
                                    </a>
                                    <Link
                                        href="/product/[pid]"
                                        as={`/product/${product.id}`}>
                                        <a className="ps-product__title">
                                            {product.product_title}
                                        </a>
                                    </Link>
                                    <p>
                                        <strong>Sold by:</strong>{' '}
                                        {product.vendor}
                                    </p>
                                    <small>
                                        {product.quantity} x ${product.price}
                                    </small>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="ps-cart__items">
                            <span>No products in cart</span>
                        </div>
                    )}
                </div>
                {cartItems && cartItems.length > 0 ? (
                    <div className="ps-cart__footer">
                        <h3>
                            Sub Total:<strong>${amount}</strong>
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
                ) : (
                    <div className="ps-cart__footer">
                        <Link href="/shop">
                            <a className="ps-btn ps-btn--fullwidth">Shop now</a>
                        </Link>
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state.cart;
};
export default connect(mapStateToProps)(PanelCartMobile);
