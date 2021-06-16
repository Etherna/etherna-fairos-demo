import React, { useEffect, useState } from "react"

import useStyles from "./filePreviewStyles"
import { filePreview } from "../../store/services/fairOS"

type FilePreviewImageProps = {
  downloadUrl: string
}

const FilePreviewImage: React.FC<FilePreviewImageProps> = ({ downloadUrl }) => {
  const [src, setSrc] = useState<string>()
  const classes = useStyles()

  useEffect(() => {
    loadImage()

    return () => unloadImage()
  }, [])

  const loadImage = async () => {
    const imgSrc = window.URL.createObjectURL(
      await filePreview(downloadUrl)
    );
    setSrc(imgSrc)
  }

  const unloadImage = () => {
    URL.revokeObjectURL(src)
  }

  if (!src) return null

  return (
    <img className={classes.imagePreview} src={src}></img>
  )
}

export default FilePreviewImage