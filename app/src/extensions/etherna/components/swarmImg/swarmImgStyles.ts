import { makeStyles, createStyles } from "@material-ui/styles"

const useStyles = makeStyles(() =>
  createStyles({
    swarmImage: {
      position: 'relative',
      width: '100%',
      height: '100%',
    },
    swarmImagePreview: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      zIndex: -1
    },
    swarmImagePicture: {
      zIndex: -1
    },
    swarmImageObject: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center'
    }
  })
)

export default useStyles
