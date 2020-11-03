import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

//urql
import { useQuery } from "urql";

//state-pool
import { useGlobalState } from "state-pool";

//messages ui
import {ChatFeed} from 'react-chat-ui'

//chakra
import {useColorMode} from '@chakra-ui/core'
import Navbar from "./Navbar";

interface ChatProps {}

const allMessagesQuery = `
query {
  allMessages {
    messages {
      id
      message
      senderName
    }
  }
}
`;

const Chat: React.FC<ChatProps> = () => {
  //get messages query
  const [{ data }]: any = useQuery({ query: allMessagesQuery });

  //store messages
  const [messages, setMessages] = useState<String[]>([]);

  //get global user
  const [user] = useGlobalState("user");

  //router
  let history = useHistory();
  useEffect(() => {
    //check if user is logged in
    if (user.username.length < 3) {
      history.push("/");
    }

    //set messages
    setMessages(data?.allMessages?.messages);
  }, [setMessages, data, history, user]);
  return (
    <>
      <Navbar />
      <Messages messages={messages} />
    </>
    );
};

const Messages = (props: any) => {
  //colormode
  const { colorMode } = useColorMode();

  const { messages } = props;

  let textBubble = colorMode === 'light' ? 'gray.50' : 'gray.800'
  let textColor = colorMode === 'light' ? 'black' : 'white'
  //check if messages are loaded
  if (messages === undefined) {
    return (
      <>
        <div>Loading...</div>
      </>
    );
  }
  return (
    <>
      <ChatFeed
        messages={messages}
        hasInputField={false}
        showSenderName
        bubbleStyles={{
          text: {
            fontSize: 15,
            color: textColor,
          },
          chatbubble: {
            border: "none",
            padding: 10,
            backgroundColor: textBubble,
          },
        }}
      />
    </>
  );
};

export default Chat;
