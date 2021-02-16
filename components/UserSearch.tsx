import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

type TermCon = {
  remove: Function
  term: string
}

const useStyles = makeStyles({
  root: {
    minWidth: 100,
  },
  container: {
    padding:'10px'
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const Term = ({remove,term}:TermCon) =>{
  const styles = useStyles();
  return(
    <div className={styles.container}>
      <Card className={styles.root}>
        <CardContent>
          <Typography className={styles.title} color="textSecondary" gutterBottom>
            {term}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={()=>remove(term)}>&#128465;</Button>
        </CardActions>
      </Card>
    </div>
  )
};

export default Term

/*
    <div className={`${term}-container`} style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly'}}>
      <p>{term}</p>
      <span style={{cursor:'pointer'}} onClick={()=>remove(term)}>&#128465;</span>
    </div>
    */