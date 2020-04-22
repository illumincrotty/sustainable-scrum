import React from 'react';
import {Dropdown} from 'semantic-ui-react';


const countryOptions = [
  { key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' },
  { key: 'ax', value: 'ax', flag: 'ax', text: 'Aland Islands' },
  { key: 'al', value: 'al', flag: 'al', text: 'Albania' },
  { key: 'dz', value: 'dz', flag: 'dz', text: 'Algeria' },
  { key: 'as', value: 'as', flag: 'as', text: 'American Samoa' },
  { key: 'ad', value: 'ad', flag: 'ad', text: 'Andorra' },
  { key: 'ao', value: 'ao', flag: 'ao', text: 'Angola' },
  { key: 'ai', value: 'ai', flag: 'ai', text: 'Anguilla' },
  { key: 'ag', value: 'ag', flag: 'ag', text: 'Antigua' },
  { key: 'ar', value: 'ar', flag: 'ar', text: 'Argentina' },
  { key: 'am', value: 'am', flag: 'am', text: 'Armenia' },
  { key: 'aw', value: 'aw', flag: 'aw', text: 'Aruba' },
  { key: 'au', value: 'au', flag: 'au', text: 'Australia' },
  { key: 'at', value: 'at', flag: 'at', text: 'Austria' },
  { key: 'az', value: 'az', flag: 'az', text: 'Azerbaijan' },
  { key: 'bs', value: 'bs', flag: 'bs', text: 'Bahamas' },
  { key: 'bh', value: 'bh', flag: 'bh', text: 'Bahrain' },
  { key: 'bd', value: 'bd', flag: 'bd', text: 'Bangladesh' },
  { key: 'bb', value: 'bb', flag: 'bb', text: 'Barbados' },
  { key: 'by', value: 'by', flag: 'by', text: 'Belarus' },
  { key: 'be', value: 'be', flag: 'be', text: 'Belgium' },
  { key: 'bz', value: 'bz', flag: 'bz', text: 'Belize' },
  { key: 'bj', value: 'bj', flag: 'bj', text: 'Benin' },
]

const buildingOptions = [
  {key:'sl',value:'Slayter', text: 'Slayter'},
  {key:'cu',value:'Curtis', text: 'Curtis'},
  {key:'hu',value:'Huffman', text: 'Huffman'},
]
const utilOptions = [
  {key:'Water', value:'Water', text:'Water'},
  {key:'Electric', value:'Electric', text:'Electric'},
  {key:'Solar', value:'Solar', text:'Solar'},
  {key:'Gas', value:'Gas', text:'Gas'}
]
const years = [
  {key:'2010' , value: '2010', text: '2010'},
  {key:'2011' , value: '2011', text: '2011'},
  {key:'2012' , value: '2012', text: '2012'},
  {key:'2013' , value: '2013', text: '2013'},
  {key:'2014' , value: '2014', text: '2014'},
  {key:'2015' , value: '2015', text: '2015'},
  {key:'2016' , value: '2016', text: '2016'},
  {key:'2017' , value: '2017', text: '2017'},
  {key:'2018' , value: '2018', text: '2018'},
  {key:'2019' , value: '2019', text: '2019'},
  {key:'2020' , value: '2020', text: '2020'}
]

class DropdownM extends React.Component {
  constructor(props){
    super(props);
    this.state={
      value:'k'
    };
  }
  handleDropdownChange(e,data){
    return(<div>{ data.value[0]}</div>);
  }
  render(){
    return(
      <div>
      <div className="menu">
      <Dropdown placeholder='Select Buildings'
      onChange={this.handleDropdownChange}
        selection
        multiple
        search
      options={buildingOptions}
      /></div>
      <div className="menu">
      <Dropdown placeholder='Select Utilities'
        onChange={this.handleDropdownChange}
        selection
        multiple
      options={utilOptions}
      /></div>
      <div className="menu">
      <Dropdown  placeholder='From Year'
      onChange={this.handleDropdownChange}
      selection
    options={years}
    />
    </div>
    <div className="menu">
    <Dropdown  placeholder='To Year (Optional)'
    onChange={this.handleDropdownChange}
    selection
  options={years}
  />
  </div>
  <div className="generate"> <button > Generate </button> </div>
      </div>
    );
  }
}


export default DropdownM
