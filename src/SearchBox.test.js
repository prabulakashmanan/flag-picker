import { render, screen } from '@testing-library/react';
import SearchBox from './components/SearchBox';
let continents = require("./Data/continents.json");

test('render continents', () => {
  render(<SearchBox step="1" continents={continents}/>);
  let listElement = "";
  continents.forEach((val,index)=>{
    listElement = screen.getByText(val.continent);
    expect(listElement).toBeInTheDocument();
  })
});


test('render countries', () => {
  render(<SearchBox step="2" countries={continents[0].countries}/>);
  let listElement = "";
  continents.length > 0 && continents[0].countries.forEach((val)=>{
    listElement = screen.getByText(val.name);
    expect(listElement).toBeInTheDocument();
  })
  });
