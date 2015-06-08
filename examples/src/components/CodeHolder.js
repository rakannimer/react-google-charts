var React = require('react');

var $ = require('jquery');

var CodeHolder = React.createClass({
	getDefaultProps: function() {
		return {
			codeUrl:'',
			language : 'javascript',
			code :''
		};
	},
	getInitialState: function() {
		return {
			// Dependent on codeUrl if props.code is empty
			code: ''
		};
	},
	componentDidMount: function(prevProps, prevState) {
		if (this.props.codeUrl !== '') {
			console.log(this.props.codeUrl);
			var self = this;
			var options = {
		    	url: this.props.codeUrl,
		    	dataType: 'text',
		    	//To be able to call *this* and access the CodeHolder object
		    	context: this
		  	};
		  	$.ajax(options).done(
		  		function(data){
		    		this.setState({code:data})		
		    }).fail(function(err){
		    		console.log("Error loading script : ",err);
		    });

		}
	},
	render: function() {
		var code = (this.props.code === '')?this.state.code:this.props.code;
		console.log(this.state.code);
		return (
			<div className="CodeHolder">
				<pre>
					<code className = {"language-"+this.props.language}>
						{code}				
					</code>
				</pre>
			</div>
		);
	}
});

module.exports = CodeHolder;