import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import Stpack from '../components/stpack';

const mapStateToProps = (state, { id }) => ({
  stpack: state.getIn(['stpacks', id], null),
});

export default injectIntl(connect(
  mapStateToProps,
)(Stpack));
