import LinearProgress, { LinearProgressProps } from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color:'#FFFFFF',
      flexDirection:'column'
    },
  }),
);

const ProgressBar = (props: LinearProgressProps & { value: number, action: string })=>{
  const styles = useStyles();
  return(
    <div>
      <Box display="flex" alignItems="center" className={styles.root}>
        <Box width="49%" mr={1}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box minWidth={35}>
          <Typography variant="body2" >{`${Math.round(props.value,)}%`}</Typography>
        </Box>
        {props.action}
      </Box>
    </div>
  )
}

export default ProgressBar;
