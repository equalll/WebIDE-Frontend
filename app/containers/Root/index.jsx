/* @flow weak */
import React, { Component, PropTypes } from 'react'
import { Provider, connect } from 'react-redux'

import store from '../../store'
import IDE from '../IDE.jsx'
import WorkspaceList from '../../components/Workspace'
import ThemeProvider from '../../components/ThemeProvider'
import { initState } from './actions'

const getDefaultLanguage = () => [
  'language',
  'browserLanguage',
  'systemLanguage',
  'userLanguage']
.reduce((p, v) => p || window.navigator[v], '')

class Root extends Component {
  static proptypes = {
    dispatch: PropTypes.func
  }
  componentWillMount () {
    this.props.dispatch(initState())
  }
  render () {
    const { selectingWorkspace } = this.props
    if (window.isSpaceKeySet) return <IDE />
    if (selectingWorkspace) return <WorkspaceList />
    return <IDE />
  }
}

Root = connect(
  state => state.WorkspaceState
)(Root)

const defaultLanguage = getDefaultLanguage() || 'en_US'

export default () => {
  return (
    <Provider store={store}>
      <ThemeProvider language={defaultLanguage}>
        <Root id='root-container' />
      </ThemeProvider>
    </Provider>
  )
}
