let continents = require("../Data/continents.json");
export const getContinents = function (keyword) {
    let results = [];
    if(keyword){
        results = continents.filter((val,key)=>{
            if(val.continent.toLowerCase().includes(keyword.toLowerCase())){
                return val;
            }
            return false;
        });
        return results;
    }else{
        return continents;
    }
}
export const getCountries = function (countries, keyword) {
    let results = [];
    if(keyword){
        results = countries.filter((val,key)=>{
            if(val.name.toLowerCase().includes(keyword.toLowerCase())){
                return val;
            }
            return false;
        });
        return results;
    }else{
        return countries;
    }
}
export const getFlags = function (isChecked, country, flags, countries) {
    let removeIndex = -1;
    if(isChecked){
        flags = [...flags, country];
    }else{
        flags.forEach((val,key)=>{
            if(val.flag === country.flag){
                removeIndex = key;
            }
        })
        flags.splice(removeIndex,1);
    }

    //reorder
    // return flagsReorder(flags, countries);
    return flags;

}
export const setCheckbox = function (current, flags) {
    let isChecked = false;
    flags && flags.forEach((val)=>{
        if(current.flag === val.flag){
            isChecked = true;
        }
    });
    return isChecked;
}


export const flagsReorder = function (flags, countries) {
    let result = [];
    let singleFlags = flags.map((val,key)=>{
        return val.flag;
    })
    countries.forEach((val,key)=>{
        if(singleFlags.indexOf(val.flag) !== -1){
            result.push(val);
            flags.splice(singleFlags.indexOf(val.flag));
        }
    });
    result = [...result,...flags,];
    return result;
}