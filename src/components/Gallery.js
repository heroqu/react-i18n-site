import React, { Fragment, Component } from 'react'
import Lightbox from 'react-image-lightbox'
import './Gallery.css'
import _ from 'lodash'
import PropTypes from 'prop-types'

import { getI18nAttr } from '../utils/i18n'
import normalizeString from '../utils/normalizeString'

import { connect } from 'react-redux'

/**
 * Displays image collection in a lightBox
 */
class Gallery extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
      images: [],
      photoIndex: -1
    }
  }

  async loadData() {
    const response = await fetch('/data/gallery.json', {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    })

    const images = (await response.json()) || []

    if (!Array.isArray(images)) {
      // not empty and not an array
      throw new Error('Gallery data is not loaded properly')
    }

    // find the start index by its name
    const { name, tag } = this.props
    const photoIndex = _startIndex(name, images, tag)

    this.setState({ images, photoIndex })
  }

  componentDidMount() {
    this.loadData().catch(console.error)
  }

  render() {
    const { locale, className, tag, children } = this.props

    const { photoIndex, isOpen } = this.state
    let { images } = this.state

    images = _imagesWithTag(images || [], tag)

    const count = images.length

    // indexes
    const idx = photoIndex

    // idxNext and idxPrev will be NaN if count === 0,
    // but it doesn't matter, as we're not going
    // to render that part in such a case
    const idxNext = (idx + 1) % count
    const idxPrev = (idx + count - 1) % count || idx

    // Additional attributes for the <a>:
    const aAttrs = className ? { className } : {}

    return (
      <Fragment>
        <a {...aAttrs} onClick={() => this.setState({ isOpen: true })}>
          {children}
        </a>
        {!isOpen || count === 0 ? null : (
          <Lightbox
            // a localized version of caption
            imageCaption={getI18nAttr(images[photoIndex], 'caption', locale)}
            mainSrc={images[idx].src}
            nextSrc={images[idxNext].src}
            prevSrc={images[idxPrev].src}
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() => this.setState({ photoIndex: idxPrev })}
            onMoveNextRequest={() => this.setState({ photoIndex: idxNext })}
          />
        )}
      </Fragment>
    )
  }
}

Gallery.propTypes = {
  name: PropTypes.string,
  tag: PropTypes.string
}

const mapsStateToProps = state => ({
  locale: state.i18n.locale
})

export default connect(mapsStateToProps)(Gallery)

/*
 * helper functions
 */

/**
 * Get array of all the images with specified tag,
 * or just all of them if no tag is given
 *
 * @param {array} images - array of all image objects.
 *      Each object should nave following attributes:
 *      {
 *        name {string},
 *        order: {number},
 *        src: {string} - same as in <img src=... />,
 *        tags: {string} - comma separated values, e.g. "vacation,hot",
 *        caption: {string} - text that will go beneath the picture
 *      }
 * @param {string} tag - if present the collection will be filtered by it
 * @return {array} - a filtered array of image objects
 */
function _imagesWithTag(images, tag) {
  images || (images = [])
  return _
    .chain(images)
    .filter(_makeTagFilter(tag))
    .sortBy('order')
    .value()
}

function _makeTagFilter(tag) {
  if (!tag) {
    // no filtering: show all images
    return () => true
  }
  return ({ tags }) =>
    ('' + tags)
      .split(',')
      .map(normalizeString)
      .indexOf(normalizeString(tag)) !== -1
}

/**
 * One can specify name of an image that current subcollection
 * should start the show from, e.g.:
 *    <Gallery name='pic_1' tag='graphics'>picture 1</Gallery>
 * - which reads as: "open `graphics` subcollection
 * and start show from the image with the name='pic_1'"
 *
 * This function finds index of the image with that name
 * inside current subcollection, or returns zero, if it's not found,
 * which means the show will start from very first image.
 *
 * @return {integer} - the index of the first image to be displayed
 */
function _startIndex(name, images, tag) {
  if (!name) return 0 // by default start from the first image

  images = _imagesWithTag(images, tag)

  const index = images.findIndex(
    x => normalizeString(x.name) === normalizeString(name)
  )

  return index === -1 ? 0 : index
}
