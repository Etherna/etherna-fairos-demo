import React, { useEffect, useState } from "react"

import useStyles from "./filePreviewVideoStyles"
import { ReactComponent as Spinner } from "../../../../media/UI/spinner-2.svg"
import { ReactComponent as Play } from "../../../../media/UI/play.svg"
import { ReactComponent as Logo } from "./logo.svg"
import { InfoIcon } from "../../../../components/icons/icons"

import SwarmImg from "../swarmImg"
import VideoStats from "../videoStats/videoStats"
import SwarmImageReader from "../../classes/swarm-image/swarm-image-reader"
import VideoResolver from "../../classes/video-resolver/video-resolver"
import { Video } from "../../classes/video-resolver/types"

type FilePreviewVideoProps = {
  downloadUrl: string
}

const FilePreviewVideo: React.FC<FilePreviewVideoProps> = ({ downloadUrl }) => {
  const [title, setTitle] = useState<string>()
  const [externalLink, setExternalLink] = useState<string>()
  const [image, setImage] = useState<SwarmImageReader>()
  const [video, setVideo] = useState<Video>()
  const [isLoading, setIsLoading] = useState(false)
  const classes = useStyles()

  useEffect(() => {
    loadVideo()
  }, [])

  const loadVideo = async () => {
    setIsLoading(true)

    const indexApiPath = process.env.REACT_APP_ETHERNA_INDEX_API_PATH
    const beeHost = process.env.REACT_APP_BEE_HOST
    const videoResolver = new VideoResolver(indexApiPath, beeHost)
    const video = await videoResolver.resolveVideoWithPath(downloadUrl)

    if (video && video.meta) {
      setTitle(video.meta.title)
      setImage(new SwarmImageReader(video.meta.thumbnail))
    }

    if (video) {
      setVideo(video)
      setExternalLink(`${process.env.REACT_APP_ETHERNA_HOST}/watch?v=${video.manifestHash}`)
    }

    setIsLoading(false)
  }

  return (
    <div className={classes.videoPreview}>
      <div className={classes.thumbnail}>
        {isLoading && (
          <Spinner width={20} height={20} />
        )}

        {!isLoading && video && (
          <>
            <SwarmImg
              image={image}
              fallback="data:image/gif;base64,R0lGODlhAQABAPAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
            />
            <a className={classes.play} href={externalLink} target="_blank">
              <Play width={80} height={80} />
            </a>
          </>
        )}

        {!isLoading && !video && (
          <InfoIcon className={classes.errorIcon} />
        )}
      </div>

      {video && (
        <VideoStats video={video} />
      )}

      {title && (
        <div className={classes.title}>{title}</div>
      )}

      {externalLink && (
        <a className={classes.ethernaBtn} href={externalLink} target="_blank">
          <Logo height={24} />
          <span>Watch on Etherna</span>
        </a>
      )}
    </div>
  )
}

export default FilePreviewVideo