import React from "react"

import FilePreviewImage from "./filePreviewImage"
import FilePreviewFallback from "./filePreviewFallback"
import FilePreviewVideo from "../../extensions/etherna/components/filePreviewVideo/filePreviewVideo"

type ExtensionProps = {
  downloadUrl: string
}

type FilePreviewProps = ExtensionProps & {
  contentType: string
}

function FilePreview({ contentType, downloadUrl }: FilePreviewProps) {
  const extensionsTypes = Object.keys(FilePreview.extension)
  const extensionType = extensionsTypes.find(type => contentType.includes(type))

  if (extensionType) {
    const ExtensionComponent = FilePreview.extension[extensionType] as React.FC<ExtensionProps>

    return <ExtensionComponent downloadUrl={downloadUrl} />
  }

  if (contentType.includes("image")) {
    return <FilePreviewImage downloadUrl={downloadUrl} />
  }

  return <FilePreviewFallback />
}

// Extensions ------
type ExtensionsMap = {
  [type: string]: React.Component<ExtensionProps> | React.FC<ExtensionProps>
}

FilePreview.extension = {
  "video/mp4": FilePreviewVideo
} as ExtensionsMap
// -----------------

export default FilePreview