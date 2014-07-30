/*
	JSON Config (JSON Configuration Management Tools)

	The MIT License (MIT)

	(c) 2013 Sam Caldwell.  Public Domain
	
	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
	
	
	JSON-config.js extends the JSON object to provide tools for validating, managing and interacting
	with JSON-based configuration files.  This utility may be loaded as follows--
	
	require('JSON-config.js')();
	
	If the above line appears more than once, no harm will occur.  A simple notice will appear in 
	console.log if the showWarning property is set.	

	======
	TO DO:
	--------------
		*Make this utility capable of handling Arrays better, looking at the syntax of the
		 elements contained within an array.  We need to handle the nested objects or arrays
		 within the array.

 */

module.exports=function(){

	require('./JSON-commented.js')();
	
 	JSON.showWarnings=false;
 	if(typeof(JSON.showWarnings)!='boolean') throw new Error('JSON.showWarnings must be a boolean value');
 	
 	if(typeof(root.JSON.config)=='undefined'){
 	
	 	JSON.config={};
	 	/*
	 		JSON.config.load()
	 	 */
	 	JSON.config.load=function(oname){
	 		o=JSON.commented.load(oname);/*Configuration File*/
			
			if(JSON.showWarnings) console.log("preparing to test config syntax");
			if(typeof(o)!='object') throw new Error('configuration file did not load JSON object');
			
			if(JSON.showWarnings){
				 console.log('configuration files loaded JSON objects.');
				console.log(
					Array(70).join('=')+
					'\no: '+JSON.stringify(o)+'\n'
					+Array(70).join('=')
				);
			}
			return o
		}/*end of loadValidJSON()*/
	}else if((typeof(JSON.showWarnings)=='boolean') && JSON.showWarnings)
		console.log('     JSON.config was already defined.  Not reloading.');
}
