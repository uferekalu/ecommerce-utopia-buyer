import React, { useState } from 'react';
import { addItem } from '~/store/cart/action';
import { addItemToCompare } from '~/store/compare/action';
import { addItemToWishlist } from '~/store/wishlist/action';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

const ModuleDetailShoppingActionsSidebar = ({ product, ...props }) => {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const Router = useRouter();
    
    const { auth } = props;
    

    const handleAddItemToCart = (e) => {
        e.preventDefault();
        
        if(auth.isLoggedIn && Boolean(auth.isLoggedIn) === true){
            let tmp = product;
            tmp.quantity = quantity;
            dispatch(addItem(tmp));
        }else{
            Router.push('/account/login');
        }
        
    }
    
    const handleAddItemToCompare = (e) => {
        e.preventDefault();
        dispatch(addItemToCompare(product));
    };

    const handleAddItemToWishlist = (e) => {
        e.preventDefault();
        dispatch(addItemToWishlist(product.product_title));
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
            <a
                className="ps-btn"
                href="#"
                onClick={(e) => handleAddItemToCart(e)}>
                Buy Now
            </a>
            <div className="ps-product__actions">
                <a href="#" onClick={(e) => handleAddItemToWishlist(e)}>
                    <i className="icon-heart mr-1"></i>
                    Add to wishlist
                </a>
                <a href="#" onClick={(e) => handleAddItemToCompare(e)}>
                    <i className="icon-chart-bars mr-1"></i>
                    Compare
                </a>
            </div>
        </div>
    );
};

export default ModuleDetailShoppingActionsSidebar;
