import React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { ScrollContext } from 'react-router-scroll-4';
import configureStore from '../store/configureStore';
import App from '../features/app';

export const store = configureStore();

export default class Smigrator extends React.PureComponent {

  render() {
    return (
      <Provider store={store} >
        <BrowserRouter>
          <ScrollContext>
            <Route path='/' component={App} />
          </ScrollContext>
        </BrowserRouter>
      </Provider>
    );
  }

}
