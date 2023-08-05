import React from 'react';
import Link from 'next/link';
import MenuDropdown from '~/components/elements/menu/MenuDropdown';
import MegaMenu from '~/components/elements/menu/MegaMenu';

const Menu = ({ source, className }) => { 
    // Views
    let menuView;
    if (source) {
        menuView = source.map((item, index) => {
            


            if (item.subMenu) { 
                return <MenuDropdown source={item} key={index} />;
            } else if (item.megaContent) {
                return <MegaMenu source={item} key={index} />;
            } else {
                return (
                    <li  key={index}>
                        <Link href={item.url}>
                            <a >
                                {item.icon && <i className={item.icon}></i>}
                                {item.text}   
                            </a>
                        </Link>
                        
                    </li>
                );
            }
        });
    } else {
        menuView = (
            <li>
                <a href="#" onClick={(e) => e.preventDefault()}>
                    No menu item.
                </a>
            </li>
        );
    }
    return <ul className={className}>{menuView}</ul>;
};

export default Menu;
