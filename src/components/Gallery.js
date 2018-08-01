import React, { Fragment, Component } from 'react'
import Lightbox from 'react-image-lightbox'
import './Gallery.css'
import _ from 'lodash'
import PropTypes from 'prop-types'

import { getI18nAttr } from '../lib/i18n'
import normalizeString from '../lib/normalizeString'

import { connect } from 'react-redux'

/**
 * Data fetching with cache
 *
 * we use memory caching here, which should be enough, considering
 * additional caching layer in browser for the fetching as such
 */

import fetchJsonData from '../lib/fetchJsonData'
import FetchWithCache from '../lib/FetchWithCache'

const fetcher = async () => fetchJsonData('/data/gallery.json')
const TTL = 3600000 // 1 hour Time to Live
const fetchWithCache = FetchWithCache(fetcher, TTL)

/**
 * Displays image collection in a lightBox
 */
class Gallery extends Component {
  state = {
    isOpen: false,
    photoIndex: -1
  }

  // share images between all instances
  static images = []

  async loadData() {
    Gallery.images = (await fetchWithCache()).value

    // update photoIndex too:
    // find the start index by its name
    const photoIndex = _startIndex(
      this.props.name,
      Gallery.images,
      this.props.tag
    )

    // go re-render
    this.setState({ photoIndex })
  }

  componentDidMount() {
    this.loadData().catch(console.error)
  }

  render() {
    const { locale, className, tag, children } = this.props

    const { photoIndex, isOpen } = this.state

    const images = _imagesWithTag(Gallery.images || [], tag)

    const count = images.length

    // indexes
    const idx = photoIndex

    // idxNext and idxPrev will be NaN if count === 0,
    // but it doesn't matter, as we're not going
    // to render that part in such a case
    const idxNext = (idx + 1) % count
    const idxPrev = (idx + count - 1) % count

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
            imageCaption={getI18nAttr(images[idx], locale, 'caption')}
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
  locale: state.locale
})

export default connect(mapsStateToProps)(Gallery)

/*
 * helper functions
 */

/**
 * Get array of all the images with specified tag,
 * or just all of them if no tag is given
 *
 * @param {Object[]} images - array of all image objects.
 *      Each object should have following attributes:
 *      {
 *        name {string},
 *        order: {number},
 *        src: {string} - same as in <img src=... />,
 *        tags: {string} - comma separated values, e.g. "vacation,hot",
 *        caption: {string} - text that will go beneath the picture
 *      }
 * @param {string} tag - if present, the collection will be filtered by it
 * @return {Object[]} - a filtered array of image objects
 */
function _imagesWithTag(images, tag) {
  images || (images = [])
  return _.chain(images)
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
 * which means the show will start from the very first image.
 *
 * @return {Number} - the index of the first image to be displayed
 */
function _startIndex(name, images, tag) {
  if (!name) return 0 // by default start from the first image

  images = _imagesWithTag(images, tag)

  const index = images.findIndex(
    x => normalizeString(x.name) === normalizeString(name)
  )

  return index === -1 ? 0 : index
}
