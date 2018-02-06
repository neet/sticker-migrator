import React from 'react';
import PropTypes from 'prop-types';
import ImmtuablePropTypes from 'react-immutable-proptypes';
import ImmutablePureComponent from 'react-immutable-pure-component';
import { Link } from 'react-router-dom';
import querystring from 'querystring';
import { FormattedMessage, FormattedDate, defineMessages } from 'react-intl';

import Dropdown from '../containers/dropdown_container';
import LoadingIndicator from '../components/loading_indicator';
import StickerContainer from '../containers/sticker_container';

const messages = defineMessages({
  visit_original: { id: 'stpack.visit_original', defualtMessage: 'Visit original' },
  share_line: { id: 'stpack.share_line', defualtMessage: 'Share with LINE' },
  share_telegram: { id: 'stpack.share_telegram', defualtMessage: 'Share with Telegram' },
});

export default class Stapck extends ImmutablePureComponent {

  static propTypes = {
    intl: PropTypes.object.isRequired,
    stpack: ImmtuablePropTypes.map,
  }

  handleDownload = e => {
    e.preventDefault();

    const url        = this.props.stpack.get('url');
    const short_name = this.props.stpack.get('short_name');

    setTimeout(() => {
      window.location = url;
    }, 100);

    window.location = `tg://addstickers?${querystring.encode({ set: short_name })}`;
  }

  render () {
    const { intl, stpack } = this.props;

    if (!stpack) {
      return (
        <article className='stpack'>
          <LoadingIndicator />
        </article>
      );
    }

    const items = [
      { text: intl.formatMessage(messages.visit_original), href: stpack.get('original_url') },
      { text: intl.formatMessage(messages.share_line),     href: `https://lineit.line.me/share/ui?url=${ window.location.href }` },
      { text: intl.formatMessage(messages.share_telegram), href: `https://t.me/share/url?url=${ window.location.href }` },
    ];

    return (
      <article className='stpack module'>
        <div className='stpack__letter-head'>
          <div className='stpack__thumbnail'>
            <img src={stpack.get('thumbnail_url')} alt={stpack.get('name')} />
          </div>

          <div className='stpack__meta'>
            <time className='stpack__time' timestamp={stpack.get('created_at')}>
              <i className='fa fa-clock-o' aria-hidden />

              <FormattedDate
                value={new Date(stpack.get('created_at'))}
                hour12={false}
                year='numeric'
                month='short'
                day='2-digit'
                hour='2-digit'
                minute='2-digit'
              />
            </time>

            <h2 className='stpack__title'>
              <Link to={`/stpacks/${stpack.get('id_str')}`}>
                { stpack.get('name') }
              </Link>
            </h2>

            <div className='stpack__buttons-wrapper'>
              <div className='stpack__download-button'>
                <a className='rich-button' href={stpack.get('url')} target='_blank' onClick={this.handleDownload}>
                  <i className='fa fa-plus' />
                  <FormattedMessage id='stpack.add' defaultMessage='Add on Telegram' />
                </a>
              </div>

              <div className='stpack__dropdown-menu'>
                <Dropdown
                  icon='fa fa-ellipsis-v rich-button'
                  items={items}
                  title='Show more'
                />
              </div>
            </div>
          </div>
        </div>

        <ul className='stpack__stickers'>
          {
            stpack.get('stickers').size && stpack.get('stickers').map(stickerId => (
              <li className='stpack__sticker' key={stickerId}>
                <StickerContainer stickerId={stickerId} />
              </li>
            ))
          }
        </ul>
      </article>
    );
  }

}
