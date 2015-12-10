import React, { Component, PropTypes } from "react"
import {
  App,
  Footer,
  Hero,
  HorizontalSplit,
  Navbar,
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
          </Navbar>
          <Hero
            backgroundImage="https://static.pexels.com/photos/21014/pexels-photo.jpg"
            className="text-center">
            <h1 className="display-1"> Google Maps Fundraiser App </h1>
            <p> A Visual Fundtracking App </p>
            <p>
              <a onClick={this.showLock.bind(this)} className="btn btn-white">
                Get Started
              </a>
            </p>
          </Hero>

          <Section>
            <HorizontalSplit padding="md">
              <div>
                <p className="lead">Responsive</p>
                <p className="text-justify">
                  This app is built using the UI library <a href="https://facebook.github.io/react/" target="_blank">React</a>, 
                  and Facebook's <a href="https://facebook.github.io/flux/" target="_blank">Flux architecture</a>. Our app also follows the design principles of 
                  Google's <a href="https://www.google.com/design/spec/material-design/introduction.html" target="_blank">Material Design</a>. 
                  The map data from the app comes from the <a href="https://developers.google.com/maps/" target="_blank">Google Maps API</a>.
                </p>
              </div>
              <div>
                <p className="lead">Welcome</p>
                  <p className="text-justify">
				  We believe that a fundraiser is a journey and should feel like one. See your movements towards your goal on an interactive Google Map and
				  get the feeling of making the journey together with your friends and family. Much better than an Excel spreadsheet!
                  </p>
              </div>
              <div>
                <p className="lead">About Us</p>
                <p className="text-justify">
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
