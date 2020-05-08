import React from 'react';
import ReactDOM from 'react-dom';
import Chart from "chart.js";



class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }

  componentDidMount() {
    this.myChart = new Chart(this.chartRef.current, {
      type: 'bar',
      options: {
        scales: {
          yAxes: [{
            scaleLabel:{
              display:true,
              labelString:this.props.label,
            }
          }],
          xAxes:[{
            scaleLabel:{
              display:true,
              labelString:"Month"
            }
          }]
        },
        title:{
          display:true,
          text:this.props.title,
          fontSize:24,
          fontFamily:"Lora",
        }
      },
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
          },
          {
            label: "Electric",
            data: this.props.data.map(d=>d.elec),
            backgroundColor: "#EEA900",
          }
        ]
      }
    });

}

  componentDidUpdate(){
    //update data labels
    this.myChart.data.labels = this.props.data.map(d => d.title);
    //update title
    this.myChart.options.title.text = this.props.title;
    //update data
    this.myChart.data.datasets[0].data = this.props.data.map(d => d.gas);
    this.myChart.data.datasets[1].data = this.props.data.map(d => d.water);
    this.myChart.data.datasets[2].data = this.props.data.map(d => d.elec);
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

  componentDidMount() {
    this.myChart = new Chart(this.chartRef.current, {
      type: 'line',
      options: {
        scales: {
          yAxes: [{
            scaleLabel:{
              display:true,
              labelString:this.props.yaxis,
            }
          }],
          xAxes:[{
            scaleLabel:{
              display:true,
              labelString:this.props.xaxis
            }
          }]
        },
        title:{
          display:true,
          text:this.props.title,
          fontSize:24,
          fontFamily:"Lora",
        }
      },
      data: {
        labels: this.props.data.map(d => d.title),
        datasets: [{
          label: this.props.label,
          data: this.props.data.map(d => d.value),
          fill: 'none',
          backgroundColor: this.props.color,
          pointRadius: 3,
          borderColor: this.props.color,
          borderWidth: 2,
          lineTension: 0
        }]
      }
    });
  }

  componentDidUpdate() {
    //update title
    this.myChart.options.title.text = this.props.title;
    //update label according to utility
    this.myChart.options.scales.yAxes[0].scaleLabel.labelString = this.props.yaxis;
    //update data labels
    this.myChart.data.labels = this.props.data.map(d => d.title);
    //update data
    this.myChart.data.datasets[0].data = this.props.data.map(d => d.value);
    //update label for legend
    this.myChart.data.datasets[0].label = this.props.label;
    this.myChart.update();
  }


  render() {
    return <canvas ref={this.chartRef} />;
  }
}

export { BarChart, LineChart};
