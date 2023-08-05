import React, { Component } from 'react';
import { connect } from 'react-redux';
import withAuth from '~/components/hoc/RouteAuth';
import { AccessLevel } from '~/utilities/constant-class';
import Link from 'next/link';
import { Radio, Select } from 'antd';
import ModulePaymentOrderSummary from '~/components/partials/account/modules/ModulePaymentOrderSummary';
import PayPal from './Paypal-exp';
import Razorpay from './razorPay';

const { Option } = Select;
import ShippingInfo from '~/components/shared/ShippingInfo';
class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            method: 1,
            id_user: props.id_user,
        };
    }

    handleChangePaymentMethod = (e) => {
        this.setState({ method: e.target.value });
    };

    render() {
        let month = [],
            year = [];
        for (let i = 1; i <= 12; i++) {
            month.push(i);
        }
        for (let i = 2019; i <= 2050; i++) {
            year.push(i);
        }
        return (
            <div className="ps-checkout ps-section--shopping">
                <div className="container">
                    <div className="ps-section__header">
                        <h1>Payment</h1>
                    </div>
                    <div className="ps-section__content">
                        <div className="row">
                            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                                <div className="ps-block--shipping">
                                    <ShippingInfo
                                        id_user={this.state.id_user}
                                    />

                                    <h4>Payment Methods</h4>
                                    <div className="ps-block--payment-method">
                                        <div className="ps-block__header">
                                            <Radio.Group
                                                onChange={(e) =>
                                                    this.handleChangePaymentMethod(
                                                        e
                                                    )
                                                }
                                                value={this.state.method}>
                                                {/* <Radio value={1}>
                                                    Visa / Master Card
                                                </Radio> */}
                                                <Radio value={1}>Paypal</Radio>
                                                <Radio value={2}>
                                                    Razorpay
                                                </Radio>
                                                <Radio value={3}>Other</Radio>
                                            </Radio.Group>
                                        </div>
                                        <div className="ps-block__content">
                                            {(this.state.method === 1 && (
                                                <PayPal />
                                            )) ||
                                                (this.state.method === 2 && (
                                                    <Razorpay />
                                                )) || (
                                                    <div className="ps-block__tab">
                                                        <div className="ps-block__tab">
                                                            <div className="form-group">
                                                                <label>
                                                                    Card Number
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                            <div className="form-group">
                                                                <label>
                                                                    Card Holders
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                />
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-8">
                                                                    <div className="form-group">
                                                                        <label>
                                                                            Expiration
                                                                            Date
                                                                        </label>
                                                                        <div className="row">
                                                                            <div className="col-6">
                                                                                <Select
                                                                                    defaultValue={
                                                                                        1
                                                                                    }>
                                                                                    {month.map(
                                                                                        (
                                                                                            item
                                                                                        ) => (
                                                                                            <Option
                                                                                                value={
                                                                                                    item
                                                                                                }
                                                                                                key={
                                                                                                    item
                                                                                                }>
                                                                                                {
                                                                                                    item
                                                                                                }
                                                                                            </Option>
                                                                                        )
                                                                                    )}
                                                                                </Select>
                                                                            </div>
                                                                            <div className="col-6">
                                                                                <Select
                                                                                    defaultValue={
                                                                                        2020
                                                                                    }>
                                                                                    {year.map(
                                                                                        (
                                                                                            item
                                                                                        ) => (
                                                                                            <Option
                                                                                                value={
                                                                                                    item
                                                                                                }
                                                                                                key={
                                                                                                    item
                                                                                                }>
                                                                                                {
                                                                                                    item
                                                                                                }
                                                                                            </Option>
                                                                                        )
                                                                                    )}
                                                                                </Select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-4">
                                                                    <div className="form-group">
                                                                        <label>
                                                                            CVV
                                                                        </label>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <button className="ps-btn ps-btn--fullwidth">
                                                                    Submit
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                    <div className="ps-block__footer">
                                        <Link href="/account/shipping">
                                            <a>
                                                <i className="icon-arrow-left mr-2"></i>
                                                Return to shipping
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 ">
                                <div className="ps-form__orders">
                                    <ModulePaymentOrderSummary />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// export default connect()(Payment);

const mapStateToProps = (state) => {
    return state.auth;
};

export default connect(mapStateToProps)(
    withAuth(Payment, AccessLevel.USER_ACCESS_LEVEL)
);
