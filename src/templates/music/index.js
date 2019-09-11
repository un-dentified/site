import React, { Component } from "react"
import PageWrapper from "../../components/PageWrapper"
import AudioPreview from "../../components/AudioPreview"
import styles from "./style.module.scss"

export default class MusicPage extends Component {
  state = {
    playing: "",
  }

  setPlaying = (trackId = "") => {
    this.setState({ playing: trackId })
  }

  render() {
    const { props } = this

    return (
      <PageWrapper
        {...props}
        currentPage={"music"}
        menuAccess={true}
        invertLinkColor
        menuOpen={true}
        defaultLinks={["", "about", "shop", "shows"]}
      >
        <div>/</div>
      </PageWrapper>
    )
  }
}
