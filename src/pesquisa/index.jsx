import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import './styled.css';

export default function BasicTextFields({ onSearch }) {
  const [searchText, setSearchText] = React.useState('');

  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <div className="caixapesquisa">
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '35ch' },
          textAlign: 'left',
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Países"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <SearchIcon
                sx={{ color: 'gray', pointerEvents: 'none' }}
                aria-label="Ícone de pesquisa"
              />
            ),
          }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          shrink={searchText.length > 0 ? 'true' : 'false'} // Corrigindo o valor da propriedade shrink
        />
      </Box>
      <Button
        variant="contained"
        sx={{ backgroundColor: '#197acf', color: 'white' }}
        onClick={handleSearch}
      >
        Pesquisar
      </Button>
    </div>
  );
}