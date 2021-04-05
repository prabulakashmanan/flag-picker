import { render, screen } from '@testing-library/react';
import StepsComponent from './components/StepsComponent';
let continents = require("./Data/continents.json");

test('render selected continent', () => {
    render(<StepsComponent />);
    let list = "";
    let listElement = "";
    list = screen.getByTestId("continent__id").children;
    if(list.length > 0){
        screen.getByTestId("continent__id").children[0].onclick();
        setTimeout(function(){
            listElement = screen.getByTestId("selectedCont");
            expect(continents[0].continent).toBe(listElement);
        },1000);
    }
});

