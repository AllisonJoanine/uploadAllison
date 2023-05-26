import React from 'react';
import { useEffect, useState } from 'react';

function CountryList() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/region/americas')// é utilizado para realizar uma chamada de API e obter os dados dos países da região das Américas
      .then(response => response.json())//A resposta é convertida em formato JSON
      .then(data => setCountries(data))//os dados são armazenados no estado countries por meio da função set
      .catch(error => console.log(error));//Aqui será exibido caso algo não bata 
  }, []);

  return (
    <div>
      <ul>
        {countries.map(country => (
          <li key={country.name.common}>{country.name.common}</li>
        //O atributo key é necessário para ajudar o React a identificar de forma única 
        //cada elemento da lista e otimizar as operações de atualização.
        ))}
      </ul>
    </div>
  );
}

export default CountryList;