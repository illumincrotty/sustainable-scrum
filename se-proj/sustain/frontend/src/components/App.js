import React, { Component } from "react";
import { render } from "react-dom";
import {LineChart, BarChart} from "./other.js";
import "./index.css";

const builds = {
  "residential":["Shorney", "Huffman"],
  "dining":["Curtis"],
  "academic":["Slayter"],
  "athletic":["Mitchell"],
}

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

class Title extends Component{
  render(){
    return(
      <div>
      <div className="header0"><div className="insideH"> DENISON </div></div>
      <div className="header"> <div className="headertext">Welcome to the Denison Sustainability Dashboard!</div> </div>
      </div>
    );
  }
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      placeholder: "Loading",
      year: "2019",
    };
  }

  componentDidMount() {
    fetch("api/getdata")
      .then(response => {
        if (response.status > 400) {
          return this.setState(() => {
            return { placeholder: "Something went wrong!" };
          });
        }
        return response.json();
      })
      .then(data => {
        /*
        data=data.sort((a,b)=>{return(a.year-b.year);});
        let dataApp1 = data.filter(z=>{return (z.util=="Water");});
        console.log(dataApp1);
        dataApp1 = dataApp1.map(x => {
          let c = data.find(y=>{return(y.year==x.year && y.building==x.building && y.util=="Gas")});
           console.log(c);
            return {year:x.year, building:x.building, gas:c.meas, water:x.meas};
        });
        console.log("HIIIIIIIIIIIII");
        console.log(dataApp1);


*/
        this.setState(() => {
          return {
            data:data,
            loaded: true
          };
        });
      });
  }

componentDidUpdate(prevP, prevS){
  if (this.state.year != prevS.year){
    fetch("api/getdata")
      .then(response => {
        if (response.status > 400) {
          return this.setState(() => {
            return { placeholder: "Something went wrong!" };
          });
        }
        return response.json();
      })
      .then(data => {
        /*
        data=data.sort((a,b)=>{return(a.year-b.year);});
        if (this.state.category != "all"){
          data = data.filter(q=>{return(builds[this.state.category].includes(q.building));});
        }
        let dataApp1 = data.filter(z=>{return (z.util=="Water");});
        dataApp1 = dataApp1.map(x => {
          let c = data.find(y=>{return(y.year==x.year && y.building==x.building && y.util=="Gas")});
            return {year:x.year, building:x.building, gas:c.meas, water:x.meas};
        });
*/


        this.setState(() => {
          return {
            data:data,
            loaded: true
          };
        });
      });
  }
}



  render() {
    return (
      <div>

      <div className="dashboard">
      <BarChart
          data={this.state.data.map(entry=>{let s = entry.building.concat("-",entry.year.toString());
;            return({gas: entry.gas, water:entry.water, title: s}); }) }
          title="Energy Use Throughout Campus"
          color="#C8032B"
        />
        </div>
        <div className="buttonDiv">
        <button className="button" onClick={()=>{
          this.setState(()=>{return{category:"residential"};});
        }}>
          Residential </button>
        <button className="button" onClick={()=>{
          this.setState(()=>{return{category:"dining"};});
        }}>Dining </button>
        <button className="button" onClick={()=>{
          this.setState(()=>{return{category:"academic"};});
        }}>Academic</button>
        <button className="button" onClick={()=>{
          this.setState(()=>{return{category:"athletic"};});
        }}>Athletic</button>
        <button className="button" onClick={()=>{
          this.setState(()=>{return{category:"all"};});
        }}>All Campus</button>
        </div>
        <div className="separate"></div>
        </div>
      /*<ul>
        {this.state.data.map(entry => {
          if (entry.util == "Water"){
          return (
            <li key={entry.id} >
            {entry.building} - {entry.year}
            </li>
          );
        }if
      }
      )}
      </ul>*/
    );
  }
}

class App2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      placeholder: "Loading",
      util: "Water",
      utilM:"1000 Gallons",
      year: "2019",
    };
  }

  componentDidMount() {
    console.log("api/getdata/".concat(this.state.util));
    fetch("api/getdata/".concat(this.state.util))
      .then(response => {
        if (response.status > 400) {
          return this.setState(() => {
            return { placeholder: "Something went wrong!" };
          });
        }
        return response.json();
      })
      .then(data => {
        console.log("trying to load just water");
        console.log(data);







        data = data.filter(x=>{
          return(x.date.slice(0,4)==this.state.year);
        })
        data = data.map(x=>{
          return{date:x.date.slice(5), util:x.util, meas:x.meas};
        })
        data = data.sort((a,b)=>{
          return(months.indexOf(a.date)-months.indexOf(b.date));
        })
        //data=data.sort((a,b)=>{return(a.year-b.year);});
      //  let data2 = data.filter(x=>{
        //    return (x.util==this.state.util);
      //  })
      //  console.log(data2);
        this.setState(() => {
          return {
            data:data,
            loaded: true
          };
        });
      });
  }

  componentDidUpdate(p, p2) {

    if ((this.state.util != p2.util) || (this.state.year != p2.year)) {
    fetch("api/getdata/".concat(this.state.util))
      .then(response => {
        if (response.status > 400) {
          return this.setState(() => {
            return { placeholder: "Something went wrong!" };
          });
        }
        return response.json();
      })
      .then(data => {
        data = data.filter(x=>{
          return(x.date.slice(0,4)==this.state.year);
        })
        data = data.map(x=>{
          return{date:x.date.slice(5), util:x.util, meas:x.meas};
        })
        data = data.sort((a,b)=>{
          return(months.indexOf(a.date)-months.indexOf(b.date));
        })
        this.setState(() => {
          return {
            data:data,
            loaded: true
          };
        });
      });
    }
  }

  render() {
    return (
      <div>
      <div className="separate"></div>
      <div className="buttonDiv">
      <button className="button" onClick={()=>{
        this.setState(()=>{return{year:"2008"};});

      }}>2008</button>
      <button className="button" onClick={()=>{
        this.setState(()=>{return{year:"2009"};});
      }}>2009</button>
      <button className="button" onClick={()=>{
        this.setState(()=>{return{year:"2010"};});
      }}>2010</button>
      <button className="button" onClick={()=>{
        this.setState(()=>{return{year:"2011"};});
      }}>2011</button>
      <button className="button" onClick={()=>{
        this.setState(()=>{return{year:"2012"};});
      }}>2012</button>
      <button className="button" onClick={()=>{
        this.setState(()=>{return{year:"2013"};});
      }}>2013</button>
      <button className="button" onClick={()=>{
        this.setState(()=>{return{year:"2014"};});
      }}>2014</button>
      <button className="button" onClick={()=>{
        this.setState(()=>{return{year:"2015"};});
      }}>2015</button>
      <button className="button" onClick={()=>{
        this.setState(()=>{return{year:"2016"};});
      }}>2016</button>
      <button className="button" onClick={()=>{
        this.setState(()=>{return{year:"2017"};});
      }}>2017</button>
      <button className="button" onClick={()=>{
        this.setState(()=>{return{year:"2018"};});
      }}>2018</button>
      <button className="button" onClick={()=>{
        this.setState(()=>{return{year:"2019"};});
      }}>2019</button>
      <button className="button" onClick={()=>{
        this.setState(()=>{return{year:"2020"};});
      }}>2020</button>

      </div>
      <div className="dashboard">
      <LineChart
          data={this.state.data.map(entry=>{
              return({value: entry.meas, title: entry.date});

          }) }
          title={"Energy Use By Utility: ".concat(this.state.util, ", ", this.state.year)}
          label={this.state.util}
          xaxis="Month"
          yaxis={this.state.utilM}
          color="#C8032B"

        />
        </div>
        <div className="buttonDiv">
        <button className="button" onClick={()=>{
          console.log(this.state.util);
          this.setState(()=>{return{util:"Water",utilM:"1000 Gallons"};});
          console.log(this.state.util);

        }}>Water</button>
        <button className="button" onClick={()=>{
          console.log(this.state.util);
          this.setState(()=>{return{util:"Gas", utilM:"CCF"};});
          console.log(this.state.util);

        }}>Gas</button>
        <button className="button" onClick={()=>{
          console.log(this.state.util);
          this.setState(()=>{return{util:"Electric",utilM:"KWH"};});
          console.log(this.state.util);

        }}>Electric</button>
        </div>
        <div className="separate"></div>
        </div>
      /*<ul>
        {this.state.data.map(entry => {
          if (entry.util == "Water"){
          return (
            <li key={entry.id} >
            {entry.building} - {entry.year}
            </li>
          );
        }if
      }
      )}
      </ul>*/
    );
  }
}

export {App,App2, Title};

const cont = document.getElementById("title");
render(<Title />, cont);

const container = document.getElementById("app");
render(<App />, container);

const container2 = document.getElementById("app2");
render(<App2 />, container2);
