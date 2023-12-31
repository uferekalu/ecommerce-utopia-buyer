import React from 'react';
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/core';

import * as enums from '../../../util/enums.js';
import { HeartOutlined } from '@ant-design/icons';
import { reactionContainerStyle, reactionEmojiStyle } from './style';

import heartIcon from './resources/heart.png';

class CometChatLiveReactions extends React.PureComponent {
    constructor(props) {
        super(props);

        this.parentElement = React.createRef();

        this.counter = 0;
        this.verticalSpeed = 5;
        this.horizontalSpeed = 2;
        this.items = [];

        this.before = Date.now();

        const reaction = props.reaction
            ? enums.CONSTANTS['LIVE_REACTIONS'][props.reaction]
            : enums.CONSTANTS['LIVE_REACTIONS']['Heart'];
        const reactionImg = <HeartOutlined />;
        this.emojis = Array(6).fill(reactionImg);
    }

    componentDidMount() {
        this.setItems();
        this.requestAnimation();
    }

    componentWillUnmount() {
        this.timer = null;
    }

    setItems = () => {
        const width = this.parentElement.offsetWidth;
        const height = this.parentElement.offsetHeight;

        const elements = this.parentElement.querySelectorAll('.emoji');

        for (let i = 0; i < elements.length; i++) {
            const element = elements[i],
                elementWidth = element.offsetWidth,
                elementHeight = element.offsetHeight;

            const item = {
                element: element,
                elementHeight: elementHeight,
                elementWidth: elementWidth,
                ySpeed: -this.verticalSpeed,
                omega: (2 * Math.PI * this.horizontalSpeed) / (width * 60), //omega= 2Pi*frequency
                random: (Math.random() / 2 + 0.5) * i * 10000, //random time offset
                x: function (time) {
                    return (
                        ((Math.sin(this.omega * (time + this.random)) + 1) /
                            2) *
                        (width - elementWidth)
                    );
                },
                y: height + (Math.random() + 1) * i * elementHeight,
            };

            this.items.push(item);
        }
    };

    requestAnimation = () => {
        this.timer = setTimeout(this.animate, 1000 / 60);
    };

    animate = () => {
        if (!this.parentElement) {
            return false;
        }

        const height = this.parentElement.offsetHeight;
        const time = +new Date(); //little trick, gives unix time in ms

        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];

            const transformString =
                'translate3d(' + item.x(time) + 'px, ' + item.y + 'px, 0px)';
            item.element.style.transform = transformString;

            item.element.style.visibility = 'visible';

            if (item.y <= height) {
                item.element.classList.add('fade');
            }

            item.y += item.ySpeed;
        }

        this.requestAnimation();
    };

    render() {
        const emojis = this.emojis.map((emoji, index) => (
            <span className="emoji" css={reactionEmojiStyle()} key={index}>
                {emoji}
            </span>
        ));
        return (
            <div
                ref={(el) => (this.parentElement = el)}
                css={reactionContainerStyle()}>
                {emojis}
            </div>
        );
    }
}

export { CometChatLiveReactions };
