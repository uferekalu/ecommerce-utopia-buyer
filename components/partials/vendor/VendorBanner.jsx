import React from 'react';
import Link from 'next/link';
const VendorBanner = () => (
    <div
        className="ps-vendor-banner bg--cover"
        style={{ backgroundImage: "url('/static/img/bg/vendor.jpg')" }}
    >
        <div className="ps-vendor-banner">
            <div className="container">
                <h2>
                   Our Shoppers Can’t Wait To See What You Have In
                    Store
                </h2>
                <Link href="/vendor/vendor_register">
                    <a className="ps-btn ps-btn--lg" href="#">
                        Start Selling
                    </a>
                </Link>
            </div>
        </div>
    </div>
);

export default VendorBanner;
