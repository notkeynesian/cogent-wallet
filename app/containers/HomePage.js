import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/Home';
import * as InfoActions from '../actions/info';

function mapStateToProps(state) {
  return {
    info: state.info
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(InfoActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
