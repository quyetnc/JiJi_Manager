import { connect } from 'react-redux';
import { loadFloorAction, loadOrderAction,loadTotalMoneyByTableAction } from '../../redux/actions/Home/homeActions';
import Home from '../../components/Home/home.component';
const mapStateToProps = (state) => {
  return {
    loadFloorReducers: state.loadFloorReducers,
    loadOrderReducers: state.loadOrderReducers,
    loadTotalMoneyByTableReducers: state.loadTotalMoneyByTableReducers,
  };
};
const mapDispatchToProps = (dispatch) => {

  return {
    onLoadFloorAction: (token) => {
      dispatch(loadFloorAction(token));
    },
    onLoadOrderAction: (token) => {
      dispatch(loadOrderAction(token));
    },
    onLoadTotalMoneyByTableAction: (token) => {
      dispatch(loadTotalMoneyByTableAction(token));
    },
  };
};
const HomeScreen = connect(mapStateToProps, mapDispatchToProps)(Home);
export default HomeScreen;
