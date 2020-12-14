import {connect} from 'react-redux';
import Chat from '../../components/Chat/chat.component';
import {chatAction,loadChatAction} from '../../redux/actions/Chat/chatActions';
const mapStateToProps = (state) => {
  return {
    chatReducers: state.chatReducers,
    loadChatReducers:state.loadChatReducers
  };
};
const mapDispatchToProps = (dispatch) => {
 
  return {
    onchatAction: (token) => {
       dispatch(chatAction(token));
    },
    onLoadChatAction: (token) => {
      dispatch(loadChatAction(token));
    }
  };
};
const ChatScreen = connect(mapStateToProps, mapDispatchToProps)(Chat);
export default ChatScreen;
