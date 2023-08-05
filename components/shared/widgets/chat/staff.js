import dynamic from 'next/dynamic';

import { useEffect } from 'react';
import { connect } from 'react-redux';

const CometChatNoSSR = dynamic(() => import('../../../partials/chat/index'), {
    ssr: false,
});

const Chatapp = ({ isLoggedIn }) => {
    useEffect(() => {
        if (isLoggedIn)
            window.CometChat = require('@cometchat-pro/chat').CometChat;
    });
    if (isLoggedIn)
        return <CometChatNoSSR />;

    return null
};

export default connect(state => state.auth)(Chatapp);
