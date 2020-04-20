import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Chart from "chart.js";

function Title(){
  return (
    <div className="header"> Welcome to Denison Sustainability Dashboard! </div>
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
            max:100
          }}
        ]
      }
    },
    data: {
      labels: this.props.data.map(d => d.label),
      datasets: [{
        label: this.props.title,
        data: this.props.data.map(d => d.value),
        backgroundColor: this.props.color
      }]
  }
});

}
componentDidUpdate(){
  this.myChart.data.labels = this.props.data.map(d => d.label);
  this.myChart.data.datasets[0].data = this.props.data.map(d => d.value);
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
    this.myChart.data.labels = this.props.data.map(d => d.time);
    this.myChart.data.datasets[0].data = this.props.data.map(d => d.value);
    this.myChart.update();
  }

  componentDidMount() {
    this.myChart = new Chart(this.chartRef.current, {
      type: 'line',
      options: {
        scales: {
          xAxes: [
            {
              type: 'time',
              time: {
                unit: 'week'
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                min: 0
              }
            }
          ]
        }
      },
      data: {
        labels: this.props.data.map(d => d.time),
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
      <div className="Dashboard">
      <LineChart
          data={this.state.feeds[0].data}
          title={this.state.feeds[0].title}
          color="#C8032B"
        />
      <BarChart className="Dashboard"
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

class Page extends React.Component{
  render(){
    return(
      <div>
      <Title/>
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
serviceWorker.unregister();
