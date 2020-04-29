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
      category: "all",
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



        this.setState(() => {
          return {
            data:dataApp1,
            loaded: true
          };
        });
      });
  }

componentDidUpdate(prevP, prevS){
  if (this.state.category != prevS.category){
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
        data=data.sort((a,b)=>{return(a.year-b.year);});
        if (this.state.category != "all"){
          data = data.filter(q=>{return(builds[this.state.category].includes(q.building));});
        }
        let dataApp1 = data.filter(z=>{return (z.util=="Water");});
        dataApp1 = dataApp1.map(x => {
          let c = data.find(y=>{return(y.year==x.year && y.building==x.building && y.util=="Gas")});
            return {year:x.year, building:x.building, gas:c.meas, water:x.meas};
        });



        this.setState(() => {
          return {
            data:dataApp1,
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

    if (this.state.util != p2.util) {
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
      <LineChart
          data={this.state.data.map(entry=>{
              return({value: entry.meas, title: entry.year});

          }) }
          title="Energy Use By Utility"
          color="#C8032B"

        />
        </div>
        <div className="buttonDiv">
        <button className="button" onClick={()=>{
          console.log(this.state.util);
          this.setState(()=>{return{util:"Water"};});
          console.log(this.state.util);

        }}>Water</button>
        <button className="button" onClick={()=>{
          console.log(this.state.util);
          this.setState(()=>{return{util:"Gas"};});
          console.log(this.state.util);

        }}>Gas</button>
        <button className="button">Electric</button>
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
