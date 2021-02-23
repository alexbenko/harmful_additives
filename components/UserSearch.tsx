import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ClearIcon from '@material-ui/icons/Clear';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';



type TermCon = {
  remove: Function
  term: string
}

/*const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    //flex:'1 0 21%',
    display: 'flex',
    flexDirection: 'row',
    //justifyContent: 'space-between',
  },
  title: {
    fontSize: 14,
  },
  content:{
    overflow:'hidden'
  }
});
*/
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      //flexGrow: 1,
      overflow: 'hidden',
      padding: theme.spacing(0, 3),
      maxWidth:300
    },
    icon:{
      position:'absolute',
      top:0,
      right:0,
      padding:'0'
    },
    paper: {
      position:'relative',
      maxWidth: 400,
      margin: `${theme.spacing(1)}px auto`,
      padding: '10px'//theme.spacing(2),
    },
  }),
);

const UserSearch = ({remove,term}:TermCon) =>{
  const styles = useStyles();
  return(
    <div className={styles.root}>
      <Paper className={styles.paper}>
        <Tooltip title="Delete From Search" arrow>
          <IconButton onClick={()=>remove(term)} aria-label={`delete-${term}`} className={styles.icon}>
            <ClearIcon fontSize="small"/>
          </IconButton>
        </Tooltip>
        <Grid item >
          <Typography style={{padding:'10px'}}>{term}</Typography>
        </Grid>
      </Paper>

    </div>
  )
  /*
  return(
    <Grid item xs={6} lg={3}>
      <Card className={styles.root}>
        <CardContent className={styles.content}>
          <Typography className={styles.title} noWrap>
            {term}
          </Typography>
        </CardContent>

        <CardActions>
          <Button size="small" onClick={()=>remove(term)}><DeleteIcon/></Button>
        </CardActions>

      </Card>
    </Grid>
  )
  */
};

export default UserSearch;
