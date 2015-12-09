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
            backgroundImage="https://static.pexels.com/photos/1188/city-landmark-lights-night.jpg"
            className="text-center">
            <h1 className="display-1"> Google Maps Fund App </h1>
            <p> App description </p>
            <p>
              <a href="https://github.com/dongy7/426" target="_blank" className="btn btn-white">
                View on Github
              </a>
            </p>
          </Hero>

          <Section>
            <HorizontalSplit padding="md">
              <div class="name">
                <p className="lead">Responsive</p>
                <p>
                  This app is built using the UI library <a href="https://facebook.github.io/react/" target="_blank">React</a>, 
                  and Facebook's <a href="https://facebook.github.io/flux/" target="_blank">Flux architecture</a>. Our app also follows the design principles of 
                  Google's <a href="https://www.google.com/design/spec/material-design/introduction.html" target="_blank">Material Design</a>. 
                  The map data from the app comes from the <a href="https://developers.google.com/maps/" target="_blank">Google Maps API</a>.
                </p>
              </div>
              <div class="info">
                <p className="lead">Ease of Use</p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor 
                    in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                    sunt in culpa qui officia deserunt mollit anim id est laborum. 
                  </p>
              </div>
              <div class="name>
                <p className="lead">Extensible</p>
                <p>
                  Nam doctus facilisi explicari eu. Ut sit petentium democritum, nihil habemus cum in, nam tantas referrentur ut. 
                  Ad ridens lobortis mel, mel fugit vulputate ullamcorper ea. Ut ius vero audiam percipit, his ne platonem elaboraret. 
                  Nec quot quas natum et, vis wisi ubique corpora an, eum mucius invenire assueverit cu.
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
