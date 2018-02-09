import React from 'react';
import ImmtuablePropTypes from 'react-immutable-proptypes';
import ImmutablePureComponent from 'react-immutable-pure-component';
import querystring from 'querystring';

import LetterHead from '@/features/stpacks/components/letter_head';
import ProgressBar from '@/features/stpacks/components/progress_bar';
import StickerContainer from '@/containers/sticker_container';

import { UPLOADED } from '@/features/stpacks/util/constants';

export default class Stapck extends ImmutablePureComponent {

  static propTypes = {
    stpack: ImmtuablePropTypes.map,
  }

  handleDownload = e => {
    e.preventDefault();

    const url        = this.props.stpack.get('url');
    const short_name = this.props.stpack.get('short_name');

    setTimeout(() => {
      window.location = url;
    }, 200);

    window.location = `tg://addstickers?${querystring.encode({ set: short_name })}`;
  }

  render () {
    const { stpack } = this.props;

    if ( !stpack ) {
      return null;
    }

    return (
      <div className='stpack'>
        <LetterHead stpack={stpack} />
        { stpack.get('status') !== UPLOADED && <ProgressBar stpack={stpack} /> }

        <ul className='stpack__stickers'>
          {
            stpack.get('stickers').size && stpack.get('stickers').map(stickerId => (
              <li className='stpack__sticker' key={stickerId}>
                <StickerContainer stickerId={stickerId} />
              </li>
            ))
          }
        </ul>
      </div>
    );
  }

}
