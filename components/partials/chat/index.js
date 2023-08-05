import { connect } from 'react-redux';

import React from 'react';

import { Spin } from 'antd';
import { Component } from 'react';
import axios from 'axios';

import { chat } from '../../../store/setting/action';
import { CometChat } from '@cometchat-pro/chat';
import { CometChatUI } from './controller/components/index';
const authkey = process.env.chatAuthkey;
const apiKey = process.env.chatapikey;
const id = process.env.chatAppId;
import { notification } from 'antd';
import { length } from 'file-loader';

class CometChatNoSSR extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: undefined,
        };
    }

    openNotification = () => {
        const args = {
            message: 'Somethings Went Wrong',
            description: 'Reloading Chat!',
            duration: 3,
        };
        notification.open(args);
    };
    loginUser = async () => {
        CometChat.getLoggedinUser().then(
            (user) => {
                if (!user) {
                    CometChat.login(`${this.props.auth.id_user}`, authkey).then(
                        (user) => {
                            console.log('Login Successful:', { user });
                        },
                        (error) => {
                            this.openNotification();
                            // console.log('Login failed with exception:', {
                            //     error,
                            // });
                        }
                    );
                } else {
                    // User already logged in
                }
            },
            (error) => {
                // this.openNotification();
                // console.log('getLoggedinUser failed with exception:', {
                //     error,
                // });
            }
        );
    };

    logoutUser() {
        CometChat.logout();
    }

    createUser = async () => {
        const url = 'https://api-eu.cometchat.io/v3.0/users';

        await axios({
            method: 'post',
            url: url,
            headers: {
                Accept: 'application/json',
                appId: id,
                apiKey: apiKey,
                'Content-Type': 'application/json',
            },
            params: {
                uid: `${this.props.auth.id_user}`,
                name: `${this.props.auth.user_first_name}`,
            },
        })
            .then((res) => {
                this.loginUser();
            })
            .catch((err) => {
                // this.openNotification();
            });
    };

    checkUserExist = async () => {
        const url = `https://api-eu.cometchat.io/v3.0/users/${this.props.auth.id_user}`;
        const options = {
            method: 'GET',
            url: url,
            headers: {
                Accept: 'application/json',
                appId: id,
                apiKey: apiKey,
                'Content-Type': 'application/json',
            },
        };
        await axios(options)
            .then((user) => {
                this.loginUser();
            })
            .catch((error) => {
                this.createUser();
            });
    };

    componentDidMount() {
        let appSetting = new CometChat.AppSettingsBuilder()
            .subscribePresenceForAllUsers()
            .setRegion('eu')
            .build();
        CometChat.init(id, appSetting)
            .then(() => {
                this.checkUserExist();
            })
            .catch(() => {
                this.openNotification();
            });
    }

    componentDidUpdate(props, state) {
        if (props.setting.chatHide === false) {
            this.logoutUser();
        } else {
            this.checkUserExist();
        }
    }

    render() {
        return (
            <div
                className={`${
                    this.props.setting.chatHide
                        ? 'ps-chatbot-hidden'
                        : 'ps-chatbot-show'
                } ps-chat ps-chatbot-screen`}>
                <div className={'ps-chatbot-header'}>
                    <span>Arivanna Chat/Customers care</span>
                    <div>
                        <span>
                            <button onClick={this.props.handleToggelChat}>
                                -
                            </button>
                            <button onClick={this.props.handleToggelChat}>
                                X
                            </button>
                        </span>
                    </div>
                </div>
                <div
                    className="ps-chatbot-form-container"
                    style={{
                        width: '930px',
                        height: '400px',
                    }}>
                    <CometChatUI />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        setting: state.setting,
    };
};
const mapDispatchToProps = (dispatch) => ({
    handleToggelChat: () => dispatch(chat()),
});
export default connect(mapStateToProps, mapDispatchToProps)(CometChatNoSSR);
