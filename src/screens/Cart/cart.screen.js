import {connect} from 'react-redux';
import {loadCartAction} from '../../redux/actions/Cart/cartActions';
import Cart from '../../components/Cart/cart.component';
const mapStateToProps = (state) => {
  return {
    loadCartReducers: state.loadCartReducers,
  };
};
const mapDispatchToProps = (dispatch) => {
 
  return {
    onLoadCartAction: (token) => {
       dispatch(loadCartAction(token));
    },
  };
};
const CartScreen = connect(mapStateToProps, mapDispatchToProps)(Cart);
export default CartScreen;
