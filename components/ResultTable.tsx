import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';

const generateSearchQuery = async (word:string):Promise<string> =>{
  let output = ''
  let term = word.split(' ');

  term.map((word)=> output = output + '+' + word)
  return output
};

const goToSearch = async (search:string = 'agave nectar') =>{
  let query = await generateSearchQuery(search)

  window.open(`https://google.com/search?q=${query}`)
};

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);

const useStyles = makeStyles({
  table: {
   // minWidth: 700,
  },
});

const ResultTable = ({ header , results})=>{
  const styles = useStyles();
  return (
    results.length !== 0 && //card only gets rendered when valid data is passed in
      <>
        <h3 style={{textAlign:'center'}}>{header}</h3>
        <TableContainer component={Paper}>
          <Table className={styles.table} aria-label="table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Ingredient Name</StyledTableCell>
                  <StyledTableCell align="right">Why</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {results.map((row:{why:string,title:string})=>(
                  <StyledTableRow key={row.title}>
                    <StyledTableCell component="th" scope="row" onClick={()=> goToSearch(row.title)}>
                      {row.title}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.why}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
        </TableContainer>
      </>

  )

}

export default ResultTable
