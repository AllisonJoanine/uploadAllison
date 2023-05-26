import './App.css';
import React from 'react';
import CountryList from './rest';
import BasicTextFields from './pesquisa';
import ColorButtons from './botao';
import TablePaginationActions from './TablePaginationActionsProps';

function App() {
  return (
    <div className="App">
      <div class='infobox'>
      <BasicTextFields /*Caixa de pesquisa*/ />
      <ColorButtons /*Botão Submit*/ />
      
      <TablePaginationActions /*Tabela com os países*//>
      </div>
    </div>
  );
}

export default App;
