import React, {Component} from 'react';
import * as DataManipulator from '../configuration/DataManipulator';
export default class SearchBox extends Component {
    constructor(props){
        super(props);
        this.continentsRef = React.createRef();
        this.onKeyPressEvent = this.onKeyPressEvent.bind(this);
    }
    componentDidMount() {
        if(this.props.step === "1"){
            this.continentsRef.current.focus();
        }
        window.addEventListener("keydown",this.onKeyPressEvent);
    }
    componentWillUnmount(){
        window.removeEventListener("keydown",this.onKeyPressEvent);
    }
    onKeyPressEvent(e){
        if(e.keyCode === 40){  //down
            if(e.target.className === "searchBox" ){
                let list = e.target.parentElement.nextElementSibling.children;
                list.length > 0 && list[0].focus();
            }
            if(e.target.className === "list" && e.target.nextElementSibling  && e.target.nextElementSibling.className === "list"){
                e.target.nextElementSibling.focus();
            }
        }else if(e.keyCode === 38){  //up
            if(e.target.className === "list" && e.target.previousElementSibling && e.target.previousElementSibling.className === "list"){
                e.target.previousElementSibling.focus();
            }else if(e.target.className === "list"){
                e.target.parentElement.previousElementSibling.children[0].focus();
            } 
        }
    }
    onSearch(e){
        if(this.props.step === "1"){
            this.props.onSearchContinent(DataManipulator.getContinents(e.target.value));
        }else{
            this.props.onSearchCountry(DataManipulator.getCountries(this.props.allCountries, e.target.value));
        }

    }
    onSelectContinent(continent){
        this.props.onSelectContinent(continent);
    }
    onSelectCountry(e,country){
        this.props.onSelectCountry(DataManipulator.getFlags(e.target.checked, country, this.props.flags,this.props.countries));
    }
    setCheckbox(current){
        let result =  DataManipulator.setCheckbox(current,this.props.flags);
        return result;
    }
    render(){
        let currentPlace = this.props.step === "1" ? "Enter continent here" : "Enter country here";
        let stepClass = this.props.step === "1" ? "step1" : "step2";
        return(
            <div className={"steps "+stepClass} >
                <div className="searchBoxWrap">
                    <input ref={this.continentsRef} tabIndex={this.props.step+"0"} className="searchBox" type="text" onChange={(e)=>this.onSearch(e)} placeholder={currentPlace}/>
                </div>
                {
                    this.props.step === "1" ?
                        <ul className="options" data-testid="continent__id">
                            {
                                this.props.continents.map((val,index) =>
                                    <li className="list" tabIndex={this.props.step+index} key={"continent"+index} onClick={()=>this.onSelectContinent(val)} onKeyPress={()=>this.onSelectContinent(val)}>
                                        {val.continent}
                                    </li>
                                )
                            }
                        </ul>
                    :   
                        <ul className="options">
                        {
                            this.props.countries.map((val,index) =>
                                <li className="list" key={"countries"+val.flag} tabIndex={this.props.step+index}>
                                    <input tabIndex={this.props.step+index} type="checkbox" id={"country"+val.flag} onChange={(e)=>this.onSelectCountry(e,val)} defaultChecked={this.setCheckbox(val)} />
                                    <label htmlFor={"country"+val.flag}>{val.name}</label>
                                </li>
                            )
                        }
                        </ul>
                }
            </div>
        )
    }

}