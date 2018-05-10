import React, { Component } from 'react'
import Lightbox from 'react-image-lightbox'
import _ from 'lodash'

import Debug from './Debug'
import { FormattedMessage } from 'react-intl'
import { sanitize, getI18nAttr } from '../i18n/utils'

import { connect } from 'react-redux'

class Gallery extends Component {
  constructor(props) {
    super(props)

    this.state = {
      photoIndex: this.startIndexFromProps(),
      isOpen: false
    }
  }

  /**
   * get current subcollection of images that correspond
   * to the current tag
   * @return {array} - array of image objects. See underlying
   * function _getCurrentImages for details.
   */
  getCurrentImages() {
    return _getCurrentImages(this.props.galleryData, this.props.tag)
  }

  /**
   * One can specify a 'name' prop with a name of an image
   * in current subcollection to start the show from.
   * This function tries to find index by that name.
   * If it fails, the show will start from very first image
   * in current subcollection.
   *
   * @return {integer} - the index of the first image to be displayed
   */
  startIndexFromProps() {
    const { name } = this.props
    if (!name) {
      // by default start with the first image of subcollection
      return 0
    }
    const index = this.getCurrentImages().findIndex(
      x => sanitize(x.name) === sanitize(name)
    )
    return index === -1 ? 0 : index
  }

  render() {
    const { photoIndex, isOpen } = this.state

    const images = this.getCurrentImages()
    const subcollectionIsNotEmpty = images.length !== 0

    console.log(`subcollectionIsNotEmpty: `, subcollectionIsNotEmpty)

    // a localized version of caption attribute
    const caption = getI18nAttr(images[photoIndex], 'caption', this.props.locale)

    const className = this.props.className || ""

    return (
      <span>
        <a className={className} onClick={() => this.setState({ isOpen: true })}>
          {this.props.children}
        </a>

        {isOpen &&
          subcollectionIsNotEmpty && (
            <Lightbox
              imageCaption={caption}
              mainSrc={images[photoIndex].src}
              nextSrc={images[(photoIndex + 1) % images.length].src}
              prevSrc={
                images[(photoIndex + images.length - 1) % images.length].src
              }
              onCloseRequest={() => this.setState({ isOpen: false })}
              onMovePrevRequest={() =>
                this.setState({
                  photoIndex: (photoIndex + images.length - 1) % images.length
                })
              }
              onMoveNextRequest={() =>
                this.setState({
                  photoIndex: (photoIndex + 1) % images.length
                })
              }
            />
          )}
      </span>
    )
  }
}

// export default Gallery

const mapsStateToProps = state => ({
  galleryData: state.galleryData,
  locale: state.i18n.locale
})

export default connect(mapsStateToProps)(Gallery)

/*
 * helper functions
 */

/**
 * filters the full set of images to only those
 * having specfied tag. If no tag is given then
 * no filtering occurs.
 *
 * @param {array} items - array of all image objects.
 *      Each object should nave following attributes:
 *      {
 *        name {string},
 *        order: {number},
 *        src: {string} - same as in <img src=... />,
 *        tags: {string} - e.g. "vacation,hot",
 *        caption: {string} - text that will go beneath the picture
 *      }
 * @param {string} tag - if present the collection will be filtered by it
 * @return {array} - a filtered array of image objects
 */
function _getCurrentImages(items, tag) {
  return _.chain(items)
    .filter(tagFilter(tag))
    .sortBy('order')
    .value()
}

function tagFilter(tag) {
  if (!tag) {
    // no filtering: show all images
    return () => true
  }
  return ({ tags }) =>
    ('' + tags)
      .split(',')
      .map(sanitize)
      .indexOf(sanitize(tag)) !== -1
}
