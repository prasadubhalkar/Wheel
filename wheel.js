var wheel = null;
var groups = [];
var data = [];

/**
 * Listen to document ready event
 * and start binding events
 * @returns {undefined}
 */
$(document).ready( function( (argument) {
	/**
	 * Listen to click event for spin and trigger
	 * wheel spinning
	 * @returns {undefined}
	 */
	$("#startspin").click( function() {
		resetWheel();

		checkErrorMessage();

		if(groups.length > 1) {
			setTimeout( function() {
				spin();
			}, 500);	
		}
	});

	/**
	 * Listen to checkbox event and add and remove
	 * graph data accordingly
	 * @returns {undefined}
	 */
	$("input[type='checkbox']").click( function(e) {
		var $target = $(e.target);
		var $value = $target.val();

		resetWheel();

		$target.is(':checked') ? addCandidate($value) : removeCandidate($value);
	});

	/**
	 * Create the Wheel element
	 * @returns {undefined}
	 */
	wheel = c3.generate({
		bindto: "#wheel",
	    data: {	        
	        columns: [],
	        type : "donut"
	    },
	    legend: {
	    	show: false
	    },
	    donut: {
        	label: {
	            format: function (value, ratio, id) {
	                return id;
	            }
	        }
    	}
	});

	/**
	 * removeCandidate will remove candidate
	 * from the wheel
	 * @param  {string} $value
	 * @returns {undefined}
	 */
	function removeCandidate($value) {
		groups.splice(groups.indexOf($value), 1);

		data.forEach( function(element, index) {
			if(element[0] === $value) {
				data.splice(index, 1);
			}
		});

		wheel.unload({
	        ids: $value
	    });
	}

	/**
	 * addCandidate will add candidates name
	 * to the wheel
	 * @param {string} $value
	 * @returns {undefined}
	 */
	function addCandidate($value) {
		groups.push($value);
		
		checkErrorMessage();
		
		data.push([$value, 1]);
		
		wheel.load({
			columns: data
		});	
	}

	/**
	 * resetWheel will reset the wheel
	 * selection
	 * @returns {undefined}
	 */
	function resetWheel() {
		var parent = $(".c3-chart-arcs");
		
		$('path', parent).d3MouseOut();
	}

	/**
	 * checkErrorMessage will show error
	 * message to the user
	 * @returns {undefined}
	 */
	function checkErrorMessage() {
		var message = (groups.length > 1) ? "" : "Please select atleast couple of fortunate people";
		$("#message").html(message);
	}

	/**
	 * startSpinning will start the spinning
	 * process of the wheel
	 * @returns {object} handler for interval
	 */
	function startSpinning() {
		var i = 0;
		var parent = $(".c3-chart-arcs");
		var classId = ".c3-arcs-";

		return setInterval( function() {
			$(classId + groups[i] + " > path", parent).d3MouseOver();
			if(i > groups.length -1) {
				i = 1;
				$(classId + groups[0] + " > path", parent).d3MouseOver();
			}
			else{
				i = i + 1;	
			}
		}, 100);
	}

	/**
	 * spin will initiate the wheel spinning
	 * @returns {undefined}
	 */
	function spin() {
		var spinInterval = Math.floor(Math.random() * 5000) + 1;

		var spinnerEvent = startSpinning();

		setTimeout( function() {
			clearInterval(spinnerEvent);
		}, spinInterval);
	}
});
