import {connect} from 'react-redux';
import {loginAction, resetLoginAction,loadInformationUser} from '../../redux/actions/Login/loginActions';
import Login from '../../components/Login/login.component';
const mapStateToProps = (state) => {
  return {
    loginReducers: state.loginReducers,
    loadInformationUserReducers:state.loadInformationUserReducers,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onLoginAction: (username, password) => {
      dispatch(loginAction(username, password));
    },
    onResetLoginAction: () => {
      dispatch(resetLoginAction());
    },
    onLoadInformationUser:(token)=>{
      dispatch(loadInformationUser(token));
    },
  };
};
const LoginScreen = connect(mapStateToProps, mapDispatchToProps)(Login);
export default LoginScreen;
