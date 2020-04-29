import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
//import { Container, Header, List } from "semantic-ui-react";
//import * as serviceWorker from './serviceWorker';
import Chart from "chart.js";
//import Example from "./Example";





function Title(){
  return (
    <div>
    <div className="footer"></div>
    <div className="header0"> DENISON </div>
    <div className="header"> Welcome to the Denison Sustainability Dashboard! </div>
    </div>
  );
}
function getRandomArray(numItems) {
  // Create random array of objects
  let names = ['water', 'electric', 'gas', 'solar'];
  let data = [];
  for(var i = 0; i < numItems; i++) {
    data.push({
      label: names[i],
      value: Math.round(20 + 80 * Math.random())
    });
  }
  return data;
}

function getRandomDateArray(numItems) {
  // Create random array of objects (with date)
  let data = [];
  let baseTime = new Date('2018-05-01T00:00:00').getTime();
  let dayMs = 24 * 60 * 60 * 1000;
  for(var i = 0; i < numItems; i++) {
    data.push({
      time: new Date(baseTime + i * dayMs),
      value: Math.round(20 + 80 * Math.random())
    });
  }
  return data;
}
function getData() {
  let data = [];

  data.push({
    title: 'Visits',
    data: getRandomDateArray(150)
  });

  data.push({
    title: 'Categories',
    data: getRandomArray(4)
  });

  data.push({
    title: 'Categories',
    data: getRandomArray(4)
  });

  data.push({
    title: 'Data 4',
    data: getRandomArray(4)
  });

  return data;
}

function getFeeds() {
  let feeds = [];

  feeds.push({
    title: 'Visits',
    data: getRandomDateArray(150)
  });

  feeds.push({
    title: 'Categories',
    data: getRandomArray(4)
  });

  feeds.push({
    title: 'Categories',
    data: getRandomArray(4)
  });

  feeds.push({
    title: 'Data 4',
    data: getRandomArray(4)
  });

  return feeds;
}

class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }

  componentDidMount() {
  this.myChart = new Chart(this.chartRef.current, {
    type: 'bar',
    options: {
      scales:{
        yAxes:[
          {ticks:{
            min:0,
          }}
        ]
      },
      title:{display:true,
      text:this.props.title,
    fontSize:24,
  fontFamily:"Lora",}
    },
    /*data: {
      labels: this.props.data.map(d => d.title),
      datasets: [{
        label: this.props.title,
        data: this.props.data.map(d => d.value),
        backgroundColor: this.props.color
      }]
  }*/
  data:{
    labels: this.props.data.map(d=>d.title),
    datasets: [
      {
        label: "Gas",
        data: this.props.data.map(d=>d.gas),
        backgroundColor: "#405362",
      },
      {
        label: "Water",
        data: this.props.data.map(d=>d.water),
        backgroundColor: "#C8032B",
      }
    ]
  }
});

}

componentDidUpdate(){
  this.myChart.data.labels = this.props.data.map(d => d.title);
  this.myChart.data.datasets[0].data = this.props.data.map(d => d.gas);
  this.myChart.data.datasets[1].data = this.props.data.map(d => d.water);
  this.myChart.update();
}
render(){
  return (
    <canvas ref={this.chartRef}/>
  );
}

}

class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }

  componentDidUpdate() {
    this.myChart.data.labels = this.props.data.map(d => d.title);
    this.myChart.data.datasets[0].data = this.props.data.map(d => d.value);
    this.myChart.update();
  }

  componentDidMount() {
    this.myChart = new Chart(this.chartRef.current, {
      type: 'line',
      options: {
        scales: {

          yAxes: [
            {
              ticks: {
                min: 0
              }
            }
          ]
        },
        title:{display:true,
        text:this.props.title,
        fontSize:24,
      fontFamily:"Lora",}
      },
      data: {
        labels: this.props.data.map(d => d.value),
        datasets: [{
          label: this.props.title,
          data: this.props.data.map(d => d.value),
          fill: 'none',
          backgroundColor: this.props.color,
          pointRadius: 2,
          borderColor: this.props.color,
          borderWidth: 1,
          lineTension: 0
        }]
      }
    });
  }
  render() {
    return <canvas ref={this.chartRef} />;
  }
}
/*
class DropdownM extends React.Component{
  render() {
    return (
      <Dropdown
      placeholder="Select Building"
      fluid
      search
      selection
      options={countryOptions}
      />
    )
  }
}*/



class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feeds : getFeeds()
    };
  }

  componentDidMount() {
    window.setInterval(() => {
      this.setState({
        feeds: getFeeds()
      })
    }, 5000)
  }

  render() {
    return (
      <div className="dashboard" >
      <LineChart className="part"
          data={this.state.feeds[0].data}
          title={this.state.feeds[0].title}
          color="#C8032B"
        />
      <BarChart className="part"
      data = {this.state.feeds[1].data}
      title = {this.state.feeds[1].title}
      color="#C8032B"
      />
      </div>
    );
  }
}

class Graph extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      months : 12,
      water : true,
      electric : false,
      solar : false,

    };
  };
  render() {
    return(
      <div className="body2">{[1,2,3]} </div>
    );
  }
}

function Footer() {
  return (
    <div className="footer"> For more information visit www.denison.edu/sustainability </div>
  );
}


export { BarChart, LineChart};
/*
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

class Page extends React.Component{

  render(){
    return(
      <div>
      <Title/>
      <div className="menus">
        <Example  name="hii"/>
      </div>
      <Dashboard className="body2"/>
      <Footer/>
      </div>
    );
  }
}

ReactDOM.render(<Page />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();*/
