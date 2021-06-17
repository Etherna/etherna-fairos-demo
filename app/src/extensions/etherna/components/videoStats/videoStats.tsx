import React from "react"

import useStyles from "./videoStatsStyles"
import { ReactComponent as Thumb } from "../../../../media/UI/thumb-up.svg"

import { Video } from "../../classes/video-resolver/types"

type VideoStatsProps = {
  video: Video
}

const VideoStats: React.FC<VideoStatsProps> = ({ video }) => {
  const classes = useStyles()

  return (
    <div className={classes.videoStats}>
      <span>{video.comments.length} comments</span>
      <span className={classes.videoVotes}>
        <Thumb className="" width={20} height={20} />
        <span className={classes.vote}>{video.totUpvotes}</span>
        <Thumb className={classes.thumbDown} width={20} height={20} />
        <span className={classes.vote}>{video.totDownvotes}</span>
      </span>
    </div>
  )
}

export default VideoStats