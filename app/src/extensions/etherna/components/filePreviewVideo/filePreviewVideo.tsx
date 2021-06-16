import React, { useEffect, useState } from "react"

import useStyles from "./filePreviewVideoStyles"

type FilePreviewVideoProps = {
  downloadUrl: string
}

const FilePreviewVideo: React.FC<FilePreviewVideoProps> = ({ downloadUrl }) => {
  const [src, setSrc] = useState<string>()
  const classes = useStyles()

  useEffect(() => {
    loadImage()

    return () => unloadImage()
  }, [])

  const loadImage = async () => {
    // const imgSrc = window.URL.createObjectURL(
    //   await filePreview(downloadUrl)
    // );
    // setSrc(imgSrc)
  }

  const unloadImage = () => {
    URL.revokeObjectURL(src)
  }

  return (
    <div>
      Etherna
    </div>
  )
}

export default FilePreviewVideo