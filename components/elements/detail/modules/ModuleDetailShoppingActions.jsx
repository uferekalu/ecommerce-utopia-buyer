import React, { useCallback, useState } from 'react';
import { addItem } from '~/store/cart/action';
import { addItemToCompare } from '~/store/compare/action';
import { addItemToWishlist, removeWishlistItem } from '~/store/wishlist/action';
import { connect, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { checkIfShippingAvailableForLocation } from '~/utilities/product-helper';

const ModuleDetailShoppingActions = ({
    product,
    extended = false,
    wishlist = [],
    country,
    auth,
    ...props
}) => {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const Router = useRouter();

    const handleAddItemToCart = (e) => {
        e.preventDefault();

        if (auth.isLoggedIn && Boolean(auth.isLoggedIn) === true) {
            let tmp = product;
            tmp.quantity = quantity;
            dispatch(addItem(tmp));
        } else {
            Router.push('/account/login');
        }
    };

    const handleBuynow = (e) => {
        e.preventDefault();
        if (auth.isLoggedIn && Boolean(auth.isLoggedIn) === true) {
        let tmp = product;
        if (tmp) {
            tmp.quantity = quantity;
            dispatch(addItem(tmp));
            setTimeout(function () {
                Router.push('/account/checkout');
            }, 1000);
        }
    }else{
        Router.push('/account/login');
    }
    };

    const handleAddItemToCompare = (e) => {
        e.preventDefault();
        dispatch(addItemToCompare(product));
    };

    const handleAddItemToWishlist = (e) => {
        e.preventDefault();

        if (wishlist.includes(product.id_product)) {
            return;
        } else {
            wishlist.push(product.id_product);
            dispatch(addItemToWishlist(product.product_title));
        }
    };

    const handleIncreaseItemQty = (e) => {
        e.preventDefault();
        setQuantity(quantity + 1);
    };

    const handleDecreaseItemQty = (e) => {
        e.preventDefault();
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    if (!checkIfShippingAvailableForLocation(product)) {
        return null;
    }

    if (!extended) {
        return (
            
            <div className="ps-product__shopping">
                
                <figure>
                    <figcaption>Quantity</figcaption>
                    <div className="form-group--number">
                        <button
                            className="up"
                            onClick={(e) => handleIncreaseItemQty(e)}>
                            <i className="fa fa-plus"></i>
                        </button>
                        <button
                            className="down"
                            onClick={(e) => handleDecreaseItemQty(e)}>
                            <i className="fa fa-minus"></i>
                        </button>
                        <input
                            className="form-control"
                            type="text"
                            placeholder={quantity}
                            disabled
                        />
                    </div>
                </figure>
                <a
                    className="ps-btn ps-btn--black"
                    href="#"
                    onClick={(e) => handleAddItemToCart(e)}>
                    Add to cart
                </a>
                <a className="ps-btn" href="#" onClick={(e) => handleBuynow(e)}>
                    Buy Now
                </a>
                <div className="ps-product__actions">
                    <a
                        href="#"
                        className={
                            'wish ' +
                            (wishlist.includes(product.id_product)
                                ? 'success'
                                : 'pending')
                        }
                        onClick={(e) => handleAddItemToWishlist(e)}>
                        <i className="icon-heart"></i>
                    </a>
                    <a
                        hidden
                        href="#"
                        onClick={(e) => handleAddItemToCompare(e)}>
                        <i className="icon-chart-bars"></i>
                    </a>
                </div>
            </div>
        );
    } else {
        return (
            <div className="ps-product__shopping extend">
                
                <div className="ps-product__btn-group">
                    <figure>
                        <figcaption>Quantity</figcaption>
                        <div className="form-group--number">
                            <button
                                className="up"
                                onClick={(e) => handleIncreaseItemQty(e)}>
                                <i className="fa fa-plus"></i>
                            </button>
                            <button
                                className="down"
                                onClick={(e) => handleDecreaseItemQty(e)}>
                                <i className="fa fa-minus"></i>
                            </button>
                            <input
                                className="form-control"
                                type="text"
                                placeholder={quantity}
                                disabled
                            />
                        </div>
                    </figure>
                    {/* <a
                        className="ps-btn ps-btn--black"
                        href="#"
                        onClick={(e) => handleAddItemToCart(e)}>
                        Add to cart
                    </a> */}
                    <div className="ps-product__actions">
                        <a
                            href="#"
                            className={
                                'wish ' +
                                (wishlist.find(
                                    (w) => w.id_product === product.id_product
                                )
                                    ? 'success'
                                    : 'pending')
                            }
                            onClick={(e) => handleAddItemToWishlist(e)}>
                            <i className="icon-heart"></i>
                        </a>
                        <a href="#" onClick={(e) => handleAddItemToCompare(e)}>
                            <i className="icon-chart-bars"></i>
                        </a>
                    </div>
                </div>
                <a className="ps-btn" href="#" onClick={(e) => handleBuynow(e)}>
                    Buy Now
                </a>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        wishlist: state.wishlist.wishlistItems,
        country: state.setting.country,
        auth: state.auth

    };
};

export default connect(mapStateToProps)(ModuleDetailShoppingActions);
