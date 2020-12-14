import {connect} from 'react-redux';
import {loadMenuAction} from '../../redux/actions/Menu/menuActions';
import {loadAllToppingAction} from '../../redux/actions/Menu/menuActions';
import {loadAllCategoryAction} from '../../redux/actions/Menu/menuActions';
import Menu from '../../components/Menu/menu.component';
const mapStateToProps = (state) => {
  // console.log('TOPIC 0------------',state.allToppingReducers);
  return {
    loadMenuReducers: state.loadMenuReducers,
    allToppingReducers: state.allToppingReducers,
    loadCategoryReducers: state.loadCategoryReducers,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onLoadMenuAction: (token) => {
      dispatch(loadMenuAction(token));
    },
    onLoadAllToppingAction: (token) => {
      dispatch(loadAllToppingAction(token));
    },
    onLoadCategoryAction: (token) => {
      dispatch(loadAllCategoryAction(token));
    }
  };
};
const MenuScreen = connect(mapStateToProps, mapDispatchToProps)(Menu);
export default MenuScreen;
