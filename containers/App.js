import { bindActionCreators } from 'redux'
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import NavBar from '../components/NavBar'
import Landing from '../components/Landing'
import * as MapActions from '../actions/map'
import * as FundActions from '../actions/funds'
import * as LoginActions from '../actions/login'
import * as SettingsActions from '../actions/settings'
import { updatePath } from 'redux-simple-router'
import { CLIENT_ID, NAMESPACE } from '../constants/auth'
import { getFunds } from '../utility/api'
import mui from 'material-ui'

const { 
  Styles,
  Mixins
 } = mui
const {StylePropable, StyleResizable} = Mixins
const {Typography} = Styles
const ThemeManager = Styles.ThemeManager
const DefaultRawTheme = Styles.LightRawTheme
const DarkRawTheme = Styles.DarkRawTheme

function mapStateToProps(state) {
  return {
  	map: state.map,
  	funds: state.funds,
  	login: state.login,
    settings: state.settings
  }
}

function mapDispatchToProps(dispatch) {
	return {
		mapActions: bindActionCreators(MapActions, dispatch),
		fundActions: bindActionCreators(FundActions, dispatch),
		loginActions: bindActionCreators(LoginActions, dispatch),
    settingsActions: bindActionCreators(SettingsActions, dispatch),
		updatePath: bindActionCreators(updatePath, dispatch) 
	}
}

const App = React.createClass({
  mixins: [StylePropable, StyleResizable],

  contextTypes : {
    muiTheme: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getStyles() {
    let canvasColor = this.state.muiTheme.rawTheme.palette.canvasColor;
    let borderColor = this.state.muiTheme.rawTheme.palette.borderColor;
    let styles = {
      group: {
        float: 'left',
        width: '100%',
        marginTop: '16px',
        padding: '0 50px',
        boxSizing: 'border-box',
      },
      groupSlider: {
        marginTop: '0px',
        width: '100%',
      },
      container: {
        marginBottom: '16px',
        minHeight: '24px',
        textAlign: 'left',
      },
      containerCentered: {
        textAlign: 'center',
      },
      paper: {
        height: '100px',
        width: '100px',
        margin: '0 auto',
        marginBottom: '64px',
      },
      textfield: {
        width: '100%',
      },
      slider: {
        marginTop: '0px',
        marginBottom: '0px',
      },
      codeExample: {
        backgroundColor: canvasColor,
        marginBottom: '32px',
      },
      app: {
        backgroundColor: canvasColor,
        height: '100%'
      },
      title: {
        fontSize: '20px',
        lineHeight: '28px',
        paddingTop: '19px',
        marginBottom: '13px',
        letterSpacing: '0',
        fontWeight: Typography.fontWeightMedium,
        color: Typography.textDarkBlack,
      },
      liveExamplePaper: {
        backgroundColor: canvasColor,
        marginBottom: 32,
        overflow: 'hidden',
      },
      liveExampleBlock: {
        borderRadius: '0 0 2px 0',
        padding: this.state.muiTheme.rawTheme.spacing.desktopGutter,
        margin: 0,
      },
      headline: {
        fontSize: '24px',
        lineHeight: '32px',
        paddingTop: '16px',
        marginBottom: '12px',
        letterSpacing: '0',
        fontWeight: Typography.fontWeightNormal,
        color: Typography.textDarkBlack,
      },
      bottomBorderWrapper: {
        borderBottom: 'solid 1px ' + borderColor,
        paddingBottom: '10px',
      },
      inlineCode: {
        backgroundColor: '#F8F8F8',
      },
    };

    if (this.isDeviceSize(StyleResizable.statics.Sizes.MEDIUM)) {
      styles.group.width = '33%';
    }

    styles.containerCentered = this.mergeStyles(styles.container, styles.containerCentered);
    styles.groupSlider = this.mergeStyles(styles.group, styles.groupSlider);

    return styles;
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  getInitialState() {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DarkRawTheme),
      isThemeDark: false,
    };
  },

  componentWillReceiveProps(nextProps) {
    let newMuiTheme = nextProps.settings.isLight ? ThemeManager.getMuiTheme(DefaultRawTheme) : ThemeManager.getMuiTheme(DarkRawTheme)
    this.setState({muiTheme: newMuiTheme});
  },

	componentWillMount() {
		this.createLock()
		let idToken = this.getIdToken()
    const that = this
		if (idToken) {
      this.lock.getProfile(idToken, function(err, profile){
        if(err) {
          console.log(`Error ${err}`)
        }
        console.log(profile)
        const token = profile.email.replace(/\./g, '')
        getFunds(that.props.fundActions, token)
        that.props.loginActions.login({
          idToken: token
        })
      })
		}
	},

	createLock() {
		this.lock = new Auth0Lock(CLIENT_ID, NAMESPACE)
	},

	getIdToken() {
    var idToken = localStorage.getItem('userToken');
    var authHash = this.lock.parseHash(window.location.hash)
    if (!idToken && authHash) {
      if (authHash.id_token) {
        idToken = authHash.id_token
        localStorage.setItem('userToken', authHash.id_token)
      }
      if (authHash.error) {
        console.log("Error signing in", authHash)
        return null
      }		
		}
		return idToken
	},

	render() {
		const { 
      login, 
      updatePath, 
      loginActions 
    } = this.props

		let app = null
    let styles = this.getStyles()
		if(login.loggedIn) {
			app = (
				<div> 
					<NavBar updatePath={updatePath} loginActions={loginActions} />
					<div className="app">
						{this.props.children && React.cloneElement(this.props.children, 
							{...this.props})}
					</div>
				</div>				
			)
		} else {
			app = (
        <Landing
          lock={this.lock}
          loginActions={loginActions} />	
			)
		}

		return (
			<div style={styles.app}>
				{app}
			</div>		
		)
	}
})

App.propTypes = {
	map: PropTypes.object.isRequired,
	mapActions: PropTypes.object.isRequired, 
	fundActions: PropTypes.object.isRequired,
  settingsActions: PropTypes.object.isRequired,
	updatePath: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
