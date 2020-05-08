# sustainable-scrum
Our team has a diverse background in multiple fields including Computer Science, Data Analytics, Remote Data Collection, User Experience, Environmental Philosophy, Mathematics, and Physics. Our team consists of mainly seniors completing their Bachelor of Science in Computer Science and includes a physics major, two math minors, and two philosophy minors. We provide years of experience working with not only data analysis, but particularly environmental data and sustainability analysis. 

Our plan has three parts. The first is to develop a simple to understand, interactive dashboard to provide easily accessible sustainability analysis. The second is to create a database backend for centralized sustainability and consumption data for the various resources. The third is to create remote data monitoring systems using Raspberry Pis (a low energy, low cost computer) to provide a cost effective way to collect the data at utility meters around Denison. Our team has the capability and drive to complete this project. 

Each of our fields includes the study of resource efficiency and sustainability practices, especially physics and philosophy. We believe that our particular skill sets and qualifications make us the optimal choice for a project involving data analysis and representation of Denison’s resource usage and sustainability. If given this project, we will be equipped to utilize our experiences with sustainability analysis, remote data collection, and software design to create an elegant and interactive dashboard for Denison’s resource usage. We look forward to working with Denison to create a more sustainable Denison.


[Past Data](https://drive.google.com/open?id=1tjeOltkqWsxanUpeFyfXnU2SGYZioxik)

# Dashboard Components
## App 
* state
    * data: data for graph
    * loaded: boolean indicating if data loaded
    * placeholder: text for error testing
    * year: year for graph
        * 2008-2019
        
* componentDidMount
    * fetch data
    * filter by year
    * map estimated cost (should query appropriately if used)
    * set data and loaded to true

* componentDidUpdate
    * only run if year changes
    * fetch data
    * map estimated cost (should query appropriately if used)
    * set data and loaded to true

* render
    * BarChart
         * data: mapped data with calculated values
         * label: \\ (y axis)
         * title: Energy Cost 
         * color: Denison Red
    * Buttons
         * onClick: sets state for desired year to filter data
         
## App2
* state
    * data: data for graph
    * loaded: boolean indicating if data loaded
    * placeholder: text for error testing
    * util: utility to show on graph
        * Water
        * Gas
        * Electric
    * utilM: measurement for utility 
        * Water: 1000 Gallons
        * Gas: CCF
        * Electric: KWH
    * year: year for graph
        * 2008-2019
        
 * componentDidMount
     * fetch data
     * filter by year
     * map data based on desired utility
         * date, meas
     * set data and loaded to true
     
 * componentDidUpdate
     * only run if year or utility changes
     * fetch data
     * map data based on desired utility
         * date, meas
     * set data and loaded to true
 * render
     * Utility Buttons
         * onClick set util and utilM states
     * LineChart
         * data: mapped data, only month of date field
         * title: Energy Use By Utility \<util> \<year> 
         * label: util (legend)
         * xaxis: "Month" (label)
         * yaxis: utilM (label)
         * color: Denison red
      * Year Buttons
          * onClick set year
    
## LineChart
* state
    * chartRef: React reference
* componentDidMount
    * set graph elements
    * [chart.js documentation](https://www.chartjs.org/docs/latest/)
* componentDidUpdate
    * update graph when data changes
        * title
        * yaxis label
        * data labels
        * data
        * data labels for legend
        
## BarChart
* state 
    * chartRef: React reference
* componentDidMount
    * set graph elements
    * [chart.js documentation](https://www.chartjs.org/docs/latest/)
* componentDidUpdate
    * update graph when data changes 
        * data labels
        * title
        * data
        
## Title
* Header and Title text

## Footer
* Footer text


# Django Model
* All
    * date: CharField
    * elec: IntegerField
    * water: IntegerField
    * gas: IntegerField


