import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import grey from '@material-ui/core/colors/grey';

type TermCon = {
  remove: Function
  term: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      overflow: 'hidden',
      padding: theme.spacing(0, 3),
      maxWidth:300,
      minWidth:300
    },
    icon:{
      position:'absolute',
      top:0,
      right:0,
      padding:'0'
    },
    paper: {
      position:'relative',
      //maxWidth: 400,
      margin: `${theme.spacing(1)}px auto`,
      padding: '10px',//theme.spacing(2),
      backgroundColor:grey[600],
      color:'#FFFFFF'
    },
  }),
);

const UserSearch = ({remove,term}:TermCon) =>{
  const styles = useStyles();
  return(
    <Grid item >
    <div className={styles.root}>
      <Paper className={styles.paper}>
        <Tooltip title="Delete" arrow>
          <IconButton onClick={()=>remove(term)} aria-label={`delete-${term}`} className={styles.icon}>
            <DeleteIcon fontSize="small"/>
          </IconButton>
        </Tooltip>

          <Typography style={{padding:'10px'}}>{term}</Typography>

      </Paper>

    </div>
    </Grid>
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
