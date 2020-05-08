import React, { Component } from "react";
import { render } from "react-dom";
import {LineChart, BarChart} from "./other.js";
import "./index.css";


/*
const months =
["Jan", "Feb", "Mar", "Apr", "May", "Jun",
"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
*/


//Component with header
class Title extends Component{
  render(){
    return(
      <div>
        <div className="separate2"></div>
        <div className="header0">
          <div className="insideH"> DENISON </div>
        </div>
        <div className="header">
          <div className="headertext">Welcome to the Denison Sustainability Dashboard!</div>
           </div>
        <div className="header1">
          <a href="https://www.denison.edu/green"target="_blank">
            Visit our site to learn more about sustainability at Denison.
          </a>
        </div>
      </div>
    );
  }
}

//Component with footer text
class Footer extends Component{
  render(){
    return(
      <div>
        <div className="footer1">
        This site was created by students
        in Dr. Bressoud's Software Engineering Class at Denison University.
        We partnered with The Office of Sustainability to
        create a dashboard for interested parties to explore
        energy use on campus. Spring 2020.
        </div>
      </div>
    )
  }
}


//Component with Bar Chart
class Bar extends Component {
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
        //only get results for desired year
        //date formatted as yyyy-mmm
        data = data.filter(x=>{
          return(x.date.slice(0,4)==this.state.year);
        })

        //map estimated cost values
        //use real values or query database
        data = data.map(x=>{
          return{date:x.date.slice(5), water:x.water*10.9, gas:x.gas*6, elec:x.elec*0.08};
        })

        this.setState(() => {
          return {
            data:data,
            loaded: true
          };
        });
      });
  }

//update graph if year changes
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

        //filter desired year
        data = data.filter(x=>{
          return(x.date.slice(0,4)==this.state.year);
        })

        //map estimated cost values
        data = data.map(x=>{
          return{date:x.date.slice(5), water:x.water*10.9, gas:x.gas*6, elec:x.elec*0.08};
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

      <div className="dashboard">
      <BarChart
          data={this.state.data.map(entry=>{
            return({
              gas: entry.gas,
              water:entry.water,
              elec:entry.elec,
              title: entry.date
              });
          })}
          label="$"
          title={"Energy Cost ".concat(this.state.year)}
          color="#C8032B"
        />
        </div>

        <div className="buttonDiv">
        {/*buttons for years */}

        <button className="button" onClick={()=>{
          this.setState(()=>{
            return {
              year:"2008"
            };
          });
        }}>2008</button>

        <button className="button" onClick={()=>{
          this.setState(()=>{
            return {
              year:"2009"
            };
          });
        }}>2009</button>

        <button className="button" onClick={()=>{
          this.setState(()=>{
            return {
              year:"2010"
            };
          });
        }}>2010</button>

        <button className="button" onClick={()=>{
          this.setState(()=>{
            return {
              year:"2011"
            };
          });
        }}>2011</button>

        <button className="button" onClick={()=>{
          this.setState(()=>{
            return {
              year:"2012"
            };
          });
        }}>2012</button>

        <button className="button" onClick={()=>{
          this.setState(()=>{
            return {
              year:"2013"
            };
          });
        }}>2013</button>

        <button className="button" onClick={()=>{
          this.setState(()=>{
            return {
              year:"2014"
            };
          });
        }}>2014</button>

        <button className="button" onClick={()=>{
          this.setState(()=>{
            return {
              year:"2015"
            };
          });
        }}>2015</button>

        <button className="button" onClick={()=>{
          this.setState(()=>{
            return {
              year:"2016"
            };
          });
        }}>2016</button>

        <button className="button" onClick={()=>{
          this.setState(()=>{
            return {
              year:"2017"
            };
          });
        }}>2017</button>

        <button className="button" onClick={()=>{
          this.setState(()=>{
            return {
              year:"2018"
            };
          });
        }}>2018</button>

        <button className="button" onClick={()=>{
          this.setState(()=>{
            return {
              year:"2019"
            };
          });
        }}>2019</button>

        </div>
        <div className="separate"></div>
        </div>
    );
  }
}


//Line graph class
class Line extends Component {
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
    fetch("api/getdata/")
      .then(response => {
        if (response.status > 400) {
          return this.setState(() => {
            return { placeholder: "Something went wrong!" };
          });
        }
        return response.json();
      })
      .then(data => {
        //filter desired year
        //date format yyyy-mmm
        data = data.filter(x=>{
          return(x.date.slice(0,4)==this.state.year);
        })

        /*
        //sort by date, not used since data is in order but could be necessary
        data = data.sort((a,b)=>{
          return(months.indexOf(a.date)-months.indexOf(b.date));
        })
        */

        //filter by desired utility
        data = data.map(x=>{
          if (this.state.util=="Water")
            return {
              date:x.date,
              meas:x.water
            };
          else if (this.state.util=="Electric")
            return {
              date:x.date,
              meas:x.elec
            };
          else {
            return {
              date:x.date,
              meas:x.gas
            };
          }
        })

        this.setState(() => {
          return {
            data:data,
            loaded: true
          };
        });
      });
  }

//update graph if utility or year changes
  componentDidUpdate(p, p2) {
    if ((this.state.util != p2.util) || (this.state.year != p2.year)) {
    fetch("api/getdata/")
      .then(response => {
        if (response.status > 400) {
          return this.setState(() => {
            return { placeholder: "Something went wrong!" };
          });
        }
        return response.json();
      })
      .then(data => {

        //filter by desired year
        data = data.filter(x=>{
          return(x.date.slice(0,4)==this.state.year);
        })

        /*
        //sorting, not necessary rn
        data = data.sort((a,b)=>{
          return(months.indexOf(a.date)-months.indexOf(b.date));
        })
        */
        data = data.map(x=>{
          if (this.state.util=="Water")
            return {
              date:x.date,
              meas:x.water
            };
          else if (this.state.util=="Electric")
            return {
              date:x.date,
              meas:x.elec
            };
          else {
            return {
              date:x.date,
              meas:x.gas
            };
          }})

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
      <div className="graph">

      <div className="separate2"></div>
      <div className="buttonDiv">

      {/*buttons for utilities*/}
      <button className="button" onClick={()=>{
        this.setState(()=>{
          return {
            util:"Water",
            utilM:"1000 Gallons"
          };
        });
      }}>Water</button>

      <button className="button" onClick={()=>{
        this.setState(()=>{
          return{
            util:"Gas",
            utilM:"CCF"
          };
        });
      }}>Gas</button>

      <button className="button" onClick={()=>{
        this.setState(()=>{
          return{
            util:"Electric",
            utilM:"KWH"
          };
        });
      }}>Electric</button>

      </div>

      <div className="dashboard">
      <LineChart
          data={this.state.data.map(entry=>{
              return {
                title:entry.date.slice(5),
                value:entry.meas
              }
          })}
          title={"Energy Use By Utility: ".concat(this.state.util, ", ", this.state.year)}
          label={this.state.util}
          xaxis="Month"
          yaxis={this.state.utilM}
          color="#C8032B"
        />

        </div>
        <div className="buttonDiv">


        <button className="button" onClick={()=>{
          this.setState(()=>{
            return {
              year:"2008"
            };
          });
        }}>2008</button>

        <button className="button" onClick={()=>{
          this.setState(()=>{
            return {
              year:"2009"
            };
          });
        }}>2009</button>

        <button className="button" onClick={()=>{
          this.setState(()=>{
            return {
              year:"2010"
            };
          });
        }}>2010</button>

        <button className="button" onClick={()=>{
          this.setState(()=>{
            return {
              year:"2011"
            };
          });
        }}>2011</button>

        <button className="button" onClick={()=>{
          this.setState(()=>{
            return {
              year:"2012"
            };
          });
        }}>2012</button>

        <button className="button" onClick={()=>{
          this.setState(()=>{
            return {
              year:"2013"
            };
          });
        }}>2013</button>

        <button className="button" onClick={()=>{
          this.setState(()=>{
            return {
              year:"2014"
            };
          });
        }}>2014</button>

        <button className="button" onClick={()=>{
          this.setState(()=>{
            return {
              year:"2015"
            };
          });
        }}>2015</button>

        <button className="button" onClick={()=>{
          this.setState(()=>{
            return {
              year:"2016"
            };
          });
        }}>2016</button>

        <button className="button" onClick={()=>{
          this.setState(()=>{
            return {
              year:"2017"
            };
          });
        }}>2017</button>

        <button className="button" onClick={()=>{
          this.setState(()=>{
            return {
              year:"2018"
            };
          });
        }}>2018</button>

        <button className="button" onClick={()=>{
          this.setState(()=>{
            return {
              year:"2019"
            };
          });
        }}>2019</button>


        </div>
        <div className="separate2"></div>
        </div>
        <div className="separate"></div>
        </div>
    );
  }
}

export {Bar, Line, Title, Footer};

//render in index.html
const cont = document.getElementById("title");
render(<Title />, cont);

const container = document.getElementById("app");
render(<Bar />, container);

const container2 = document.getElementById("app2");
render(<Line />, container2);

const container3 = document.getElementById("foot");
render(<Footer/>, container3);
