import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';


type TermCon = {
  remove: Function
  term: string
}

const useStyles = makeStyles({
  root: {
    minWidth: 75,
    flex:'1 0 21%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 14,
    width:'100%'

    //wordWrap:'break-word',
    //display:'inline'
  },
});

const UserSearch = ({remove,term}:TermCon) =>{
  const styles = useStyles();
  return(
    <Grid item xs={6} lg={3} zeroMinWidth>
      <Card className={styles.root}>
        <div style={{overflow:"hidden"}}>
          <CardContent>
            <Typography className={styles.title} noWrap>
              {term}
            </Typography>
          </CardContent>
        </div>
        <CardActions>
          <Button size="small" onClick={()=>remove(term)}><DeleteIcon/></Button>
        </CardActions>
      </Card>

    </Grid>
  )
};

export default UserSearch;
