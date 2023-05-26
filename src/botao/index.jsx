import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import './styled.css';
import handleSearch from '../pesquisa';
//importado a biblioteca do botão
export default function ColorButtons() {
  return (
    <div className="caixapesquisa">
    <Stack direction="row" spacing={2}>     
    {/* <Button variant="contained" sx={{ backgroundColor: '#197acf', color: 'white' }} onClick={handleSearch}>
        Pesquisar
      </Button> */}

      {/* <Button color="secondary">Secondary</Button>
      <Button variant="outlined" color="error">
        Error
      </Button> */}

    </Stack>
    </div>
  );
}