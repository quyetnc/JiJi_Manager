import {connect} from 'react-redux';
import {loadProfileAction} from '../../redux/actions/Profile/profileActions';
import Profile from '../../components/Profile/profile.component';
const mapStateToProps = (state) => {
  return {
    loadProfileReducers: state.loadProfileReducers,
  };
};
const mapDispatchToProps = (dispatch) => {
 
  return {
    onLoadProfileAction: (token) => {
       dispatch(loadProfileAction(token));
    },
  };
};
const ProfileScreen = connect(mapStateToProps, mapDispatchToProps)(Profile);
export default ProfileScreen;
