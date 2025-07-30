import React, { useEffect } from 'react';

const CozeChat = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sf-cdn.coze.com/obj/unpkg-va/flow-platform/chat-app-sdk/1.2.0-beta.6/libs/oversea/index.js';
    script.async = true;
    script.onload = () => {
      new window.CozeWebSDK.WebChatClient({
        config: {
          bot_id: '7532062026341089298',
        },
        componentProps: {
          title: 'Coze',
        },
        auth: {
          type: 'token',
          token: 'pat_3UR4MNaznm6y2cmH5dqknLAYi1tad7y00Wj1irVKY5rSzDeok2MgiHisDyU3FuFY',
          onRefreshToken: function () {
            return 'pat_3UR4MNaznm6y2cmH5dqknLAYi1tad7y00Wj1irVKY5rSzDeok2MgiHisDyU3FuFY';
          }
        } 
      });
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; // hoặc <div id="coze-container" />
};

export default CozeChat;
