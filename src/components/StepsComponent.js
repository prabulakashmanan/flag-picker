import React, {Component, Fragment} from 'react';
import SearchBox from './SearchBox';
let continents = require("../Data/continents.json");
export default class StepsComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            continents : continents,
            allCountries : [],
            continent : "",
            countries : [],
            flags : [],
            showCountries : false,
            step2Key : 2
        }
    }
    onSearchContinent(continents){
        this.setState({
            continents
        })
    }
    onSelectContinent(continent){
        if(continent.continent !== this.state.continent){
            this.setState({
                continent : continent.continent,
                countries : continent.countries,
                allCountries : continent.countries,
                flags : []
            });
        }
    }
    onSearchCountry(countries){
        this.setState({
            countries
        });
    }
    onSelectCountry(flags){
        this.setState({
            flags
        })
    }
    clearFlag(){
        this.setState({
            flags : [],
            step2Key : this.state.step2Key+1,
            countries : this.state.allCountries,
        });
    }
    render(){
        return(
            <div className="stepsWrapper">
                <div>
                    <h2>Step 1</h2>
                    <p>Select a continent.</p>
                    <SearchBox step="1" {...this.state} onSearchContinent={this.onSearchContinent.bind(this)} onSelectContinent={this.onSelectContinent.bind(this)}/>
                    {
                        this.state.continent ? 
                            <Fragment>
                            <p className="m-b-0">You selected</p>
                            <h2 data-testid="selectedCont" className="m-t-0">{this.state.continent}</h2>
                            </Fragment>
                        :
                            <noscript />
                    }
                </div>
                {
                    this.state.continent ? 
                        <Fragment>
                            <div>
                                <h2>Step 2</h2>
                                <p>Now, Select a country.</p>
                                <SearchBox key={this.state.step2Key} step="2" {...this.state} onSearchCountry={this.onSearchCountry.bind(this)} onSelectCountry={this.onSelectCountry.bind(this)} />
                            </div>
                            {
                                this.state.flags.length > 0 ?
                                    <div>
                                        <h2>Selected Flags:</h2>
                                        <ul className="flags">
                                            {
                                                this.state.flags.map((val,index) =>
                                                    <li key={"flag"+index}>
                                                        <img alt={val.flag} src={"assets/images/flags/"+val.flag+".PNG"} />
                                                    </li>
                                                )
                                            }
                                        </ul>
                                        <button className="clearBtn" type="button" onClick={()=>this.clearFlag()}>Clear Flags</button>
                                    </div>
                                :
                                    <div></div>
                            }
                        </Fragment>
                    :
                        <Fragment>
                            <div></div>
                            <div></div>
                        </Fragment>
                }
            </div>
        )
    }
}