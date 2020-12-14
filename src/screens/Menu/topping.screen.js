import {connect} from 'react-redux';
import {loadAllToppingAction} from '../../redux/actions/Menu/menuActions';
import ToppingModal from '../../components/core/topping.modal.core';
const mapStateToProps = (state) => {
  return {
    allToppingReducers: state.allToppingReducers,
  };
};
const mapDispatchToProps = (dispatch) => {
 
  return {
    onLoadAllToppingAction: (token) => {
       dispatch(loadAllToppingAction(token));
    }
  };
};
const ToppingScreen = connect(mapStateToProps, mapDispatchToProps)(ToppingModal);
export default ToppingScreen;
