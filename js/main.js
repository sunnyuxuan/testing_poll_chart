jQuery(document).ready(function($){

	/*    Tabletop code
	 *	  Load content from Google Spreadsheet
	 */

	var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1zebMHnAg70aV108IHhBhW3EQy2VC6H5wcyJkTAl8y7s/pubhtml?gid=822481562&single=true';

	function init() {
	Tabletop.init( { key: publicSpreadsheetUrl,
	                 callback: processInfo,
	                 simpleSheet: true } )
	}



	function chartRender(labelsArray, dataArray) {
		// render the chart
		var ctx = document.getElementById("myChart");
		var myChart = new Chart(ctx, {
		    type: 'horizontalBar',
		    data: {
		        labels: labelsArray,
		        datasets: [{
		            label: '# of Votes',
		            data: dataArray,
		            backgroundColor: [
		                'rgba(255, 99, 132, 0.5)',
		                'rgba(54, 162, 235, 0.5)',
		                'rgba(255, 206, 86, 0.5)',
		                'rgba(75, 192, 192, 0.5)',
		                'rgba(153, 102, 255, 0.5)',
		                'rgba(255, 159, 64, 0.5)'
		            ],
		            // borderColor: [
		            //     'rgba(255,99,132,1)',
		            //     'rgba(54, 162, 235, 1)',
		            //     'rgba(255, 206, 86, 1)',
		            //     'rgba(75, 192, 192, 1)',
		            //     'rgba(153, 102, 255, 1)',
		            //     'rgba(255, 159, 64, 1)'
		            // ],
		            // borderWidth: 1
		        }]
		    },
		    options: {
		        scales: {
                    xAxes:[{
                    ticks: {
                        min:1
                    }
                    }],
		            yAxes: [{
                        stacked: true,
		                ticks: {
		                    beginAtZero:true
		                }
		            }]
		        }
		    }
		});
	}

	function processInfo(data, tabletop) {
	 	// uncomment to view your data in the console!
		var results = tabletop.sheets('Form_Results');
	    console.log('results:');
	    console.log(results);

	    var labels = [];
	    var data = [];
		
		// iterate through spreadsheet rows to build our arrays 
		results.elements.forEach( function(result) {
		    console.log('element:')
		    console.log(result)
	    	labels.push(result.question);
	    	data.push(result.result);
	    });

		// render the chart and send it data
	    chartRender(labels, data);
	}



	window.addEventListener('DOMContentLoaded', init);

	setInterval(function(){ init(); }, 10000);


});