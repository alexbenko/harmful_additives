import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';

type TermCon = {
  remove: Function
  term: string
}

const useStyles = makeStyles({
  root: {
    minWidth: 75,
    flex:'1 0 21%'
  },
  container: {
    padding:'10px',//just so their is space in between each search

  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const UserSearch = ({remove,term}:TermCon) =>{
  const styles = useStyles();
  return(
    <Grid item xs={3}>

      <Card className={styles.root}>
        <CardContent>
          <Typography className={styles.title} color="inherit" gutterBottom noWrap>
            {term}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={()=>remove(term)}><DeleteIcon/></Button>
        </CardActions>
      </Card>

    </Grid>
  )
};

export default UserSearch;
