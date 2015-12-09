import React, { Component, PropTypes } from "react"
import {
  App,
  Footer,
  Hero,
  HorizontalSplit,
  Navbar, NavItem,
  Page,
  Section
} from "neal-react"

const brandName = "426 App"
const brand = <span>{brandName}</span>

class Landing extends Component {
  showLock() {
    this.props.lock.show()
  }
  

  render() {
    return (
	
      <App>
        <Page>
          <Navbar brand={brand}>
            <NavItem><a onClick={this.showLock.bind(this)}>Sign In</a></NavItem>
          </Navbar>
          <Hero
            backgroundImage="https://static.pexels.com/photos/21014/pexels-photo.jpg"
            className="text-center">
            <h1 className="display-1"> Google Maps Fund App </h1>
            <p>
              <a href="https://github.com/dongy7/426" target="_blank" className="btn btn-white">
                View on Github
              </a>
            </p>
          </Hero>

          <Section>
            <HorizontalSplit padding="md">
              <div className="info">
                <p className="lead">Responsive</p>
                <p>
                  This app is built using the UI library <a href="https://facebook.github.io/react/" target="_blank">React</a>, 
                  and Facebook's <a href="https://facebook.github.io/flux/" target="_blank">Flux architecture</a>. Our app also follows the design principles of 
                  Google's <a href="https://www.google.com/design/spec/material-design/introduction.html" target="_blank">Material Design</a>. 
                  The map data from the app comes from the <a href="https://developers.google.com/maps/" target="_blank">Google Maps API</a>.
                </p>
              </div>
              <div className="info">
                <p className="lead">Welcome</p>
                  <p>
                    Welcome to the Google Maps Fund App! This web application allows the user to create a fundraiser using google maps. Instead of your traditional theormeter that
					 keeps track of your donations you will use google maps. You will insert a two locations and set an amount of money you are trying to raise. Everytime you update 
					 your mapw with a donation, that donor name and the amount he/she donated will appear on the map as a marker. To get started just sign in with Facebook, Gmail, or
					 make a new account.
                  </p>
              </div>
              <div className="info">
                <p className="lead">About Us</p>
                <p>
                 This web application was created in collaboration with Dong Yeop Lee, Peter Jeong, Justin Baldwin, and Elliot Chen for their final project in COMP 426.
                </p>
              </div>
            </HorizontalSplit>
          </Section>

          <Footer brandName={brandName}
            githubUrl="https://github.com/dongy7/426">
          </Footer>
        </Page>
		
      </App>
    )
  }
}


Landing.propTypes = {
  lock: PropTypes.object.isRequired
}

export default Landing
