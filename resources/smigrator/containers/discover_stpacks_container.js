import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  changeSearchStpacks,
  clearSearchStpacks,
} from '../actions/search_stpacks';
import DiscoverStpacks from '../components/discover_stpacks';

const mapStateToProps = state => ({
  value: state.getIn(['search_stpacks', 'value']),
  submitted: state.getIn(['search_stpacks', 'submitted']),
});

const mapDispatchToProps = dispatch => ({

  onChange(value) {
    dispatch(changeSearchStpacks(value));
  },

  onClear() {
    dispatch(clearSearchStpacks());
  },

});

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps,
)(DiscoverStpacks));
