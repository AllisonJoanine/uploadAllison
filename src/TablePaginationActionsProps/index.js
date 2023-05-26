import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import './CustomPaginationActionsTable.css';
import BasicTextFields from '../pesquisa';

// count: o número total de itens na tabela.
// page: a página atual.
// rowsPerPage: o número de itens exibidos por página.
// onPageChange: uma função para lidar com a alteração de página.

function TablePaginationActions(props) {//Está exibindo os botões para passar de pagina em pagina na tabela.
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {//valor 0, indica que deve ir para a primeira página
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {// - 1 indicando que deve voltar uma página
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => { //+ 1 indicando que deve avançar uma página 
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1)); // - 1 indicando que deve ir para a última página
  };

  return (
    //Dentro do return está sendo aplicado o componente Box do material UI

    //Dentro de cada IconButton, está sendo aplicado a função do const handle...
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}//Aqui é uma função de desabilitado, se não possui mais paginas ele fica inutilizavel
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0} //Aqui é uma função de desabilitado, se não possui mais paginas ele fica inutilizavel
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? (//Se a direção for da direita para a esquerda (rtl)
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? (//Se a direção for da direita para a esquerda (rtl)
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

// Count: um número que representa a quantidade total de itens que serão paginados.
// OnPageChange: uma função que será chamada quando houver uma mudança de página (receber um evento primeiro e o número da nova página como segundo)
// Page: um número que representa a página atual.
// RowsPerPage: um número que representa a quantidade de itens exibidos por página.
TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function CustomPaginationActionsTable() {//Tentativa de criar uma função de filtro
  const [page, setPage] = React.useState(0);//Inicializa com o valor 0 e é atualizado com o setPage, o page é o estado atual da tabela
  const [rowsPerPage, setRowsPerPage] = React.useState(5); //Aqui inicia com o valor de 5 (Número de linhas da tabela) e afunção set... para atualizar 
  const [countries, setCountries] = React.useState([]); //O countries armazena a lista de paises 
  const [filteredCountries, setFilteredCountries] = React.useState([]);//Aqui armazena a lista de países filtrada de acordo com o termo de pesquisa

  const emptyRows =//Calcula a quantidade de linhas vazias necessárias para preencher a última página da tabela
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredCountries.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);//Essa função recebe a função do clique e o número da nova página (newPage) e atualiza o estado page.
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);//Essa função recebe o evento de alteração e atualiza o estado rowsPerPage com o novo valor convertido para um número inteiro
  };

  const handleSearch = (searchText) => {
    const filtered = countries.filter((country) =>
      typeof country.name === 'string' &&
      country.name.toLowerCase().includes(searchText.toLowerCase())
    );//Filtra a lista de países de acordo com o nome do país e armazena o resultado filtrado no estado
    setFilteredCountries(filtered);
    setPage(0);// redefine o estado page para 0, para exibir a primeira página dos resultados filtrados
  };

  React.useEffect(() => {//Ele recebe uma função de callback como primeiro argumento e um array de dependências como segundo argumento
    fetch('https://restcountries.com/v3.1/region/americas?subregion=south%20america')//Importa os dados dos países da API
      .then((response) => response.json())//Converte a resposta em formato JSON
      .then((data) => {//Armazena os dados convertido dentro do Countries
        setCountries(data);
        setFilteredCountries(data);
      })
      .catch((error) => console.log(error));//Exibe o erro no console (F12)
  }, []);//efeito será executado apenas uma vez, no momento em que o componente é montado

  const createData = (name) => {//Mapeia os países da lista filteredCountries e criar um novo array de objetos
    return { name };
  };

  const rows = filteredCountries.map((country) =>//O .map adicona os países da lista filteredCountries
    createData(country.name.common)
  );

  return (//Renderiza dentro da pagina componentes de uma forma simplificada com as alterações feitas
    <React.Fragment>
      <BasicTextFields onSearch={handleSearch} />
      <TableContainer component={Paper} className="custom-table-container">
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableBody>
          {/* Aqui, o conteúdo da tabela é renderizado. É feito um mapeamento do array rows,
           que contém os objetos com os nomes dos países, para renderizar uma linha para cada país.
            A função map() é usada para percorrer o array e retornar uma representação JSX para cada objeto */}
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={1} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={1}
                count={filteredCountries.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}