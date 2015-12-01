import React, { Component } from "react"
import { Link } from "react-router"
import {
  App,
  Code,
  CustomerQuote, CustomerQuotes,
  DropdownMenu, DropdownToggle,
  Footer, FooterAddress,
  Hero,
  HorizontalSplit,
  ImageList, ImageListItem,
  Navbar, NavItem,
  Page,
  PricingPlan, PricingTable,
  Section,
  SignupInline, SignupModal,
  Stripe,
  Team,
  TeamMember,
} from "neal-react"

const brandName = "426 App"
const brand = <span>{brandName}</span>

export default class Landing extends Component {
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
          

          <Footer brandName={brandName}
            githubUrl="https://github.com/dongy7/426">
          </Footer>
        </Page>
      </App>      
    )
  }
}