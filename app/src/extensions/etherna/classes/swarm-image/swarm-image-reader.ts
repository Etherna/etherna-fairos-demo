import DriverBase from "../driver/driver-base"
import { SwarmImageRaw } from "./types"

/**
 * Load an image object and handles responsive images
 */
export default class SwarmImageReader {
  private driver: DriverBase

  isResponsive: boolean
  responsiveSizes: number[]

  imageRaw?: SwarmImageRaw
  blurredBase64?: string
  originalSource: string
  originalReference?: string
  originalImageSize?: [number, number]
  responsiveSources?: { [size: string]: string }
  filePreview?: string

  constructor(image: SwarmImageRaw | undefined, driver: DriverBase) {
    this.driver = driver
    this.originalSource = ""

    if (image) {
      this.imageRaw = image
      this.isResponsive = image["@type"] === "responsiveImage"
      this.blurredBase64 = image.blurredBase64
      this.originalReference = image.value
      this.originalSource = this.driver.getFileUrl(image.value)
      this.originalImageSize = image.originalSize

      const responsiveUrls =
        this.isResponsive && image.sources
          ? Object.keys(image.sources).reduce(
            (obj, size) => ({
              ...obj,
              [size]: this.driver.getFileUrl(image.sources![size]),
            }),
            {}
          )
          : undefined
      this.responsiveSources = responsiveUrls
    }
  }

  // Props
  get responsivePaths(): string[] {
    return Object.keys(this.responsiveSources ?? [])
  }

  get srcset(): string | undefined {
    if (!this.responsiveSources) return undefined

    const responsiveSources = this.responsiveSources
    const resposiveSizes = Object.keys(responsiveSources)

    return resposiveSizes.reduce(
      (srcset, size) => `${srcset ? srcset + "," : ""} ${size} ${responsiveSources[size]}`, ""
    )
  }
}
