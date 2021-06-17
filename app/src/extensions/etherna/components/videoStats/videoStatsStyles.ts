import { makeStyles, createStyles } from "@material-ui/styles"

const useStyles = makeStyles(() =>
  createStyles({
    videoStats: {
      display: 'flex',
      alignItems: 'center',
      margin: '12px 0',
      fontSize: '1.5rem'
    },
    videoVotes: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: 'auto',
    },
    vote: {
      marginLeft: '4px'
    },
    thumbDown: {
      transform: 'rotate(180deg)',
      marginLeft: '12px',
    }
  })
)

export default useStyles
