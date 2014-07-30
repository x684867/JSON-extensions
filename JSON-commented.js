/*
	JSON Commented (JSON Object Extension)
	
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
	
	JSON-commented.js extends the JSON object to allow C-style comments in the JSON files.
	This extension creates JSON.commented as an object within JSON, preserving the original
	JSON.parse() functionality while also allowing calls to JSON.commented.parse() to return
	a JSON object cleaned of any embedded comments.  This extension also has a load() method
	which will load a JSON file, strip its comments and return the result.
	
	JSON.commented is only needed one time and should be required then executed as follows from
	any file in your project:
	
	require('JSON-commented.js')();
	
	If the above line appears more than once, no harm will occur.  A simple notice will appear in 
	console.log if the showWarning property is set.
	
	
 */
module.exports=function(){
 
 	JSON.showWarnings=false;
 	
 	if(typeof(root.JSON.commented)=='undefined'){
	 	JSON.commented={
		 	parse:function(jsonString){
	 			if(typeof(jsonString)=='string')
	 				return JSON.parse(jsonString.replace(/(\/\*([\s\S]*?)\*\/)|(!\:(\/\/(.*)$))/gm,'')));
	 			else
	 				throw new Error('jsonString is not a string as expected.');
	 		},
	 		load:function(jsonFile){
	 			var fs=require('fs');
	 			if(typeof(jsonFile)=='string')
	 				if(fs.lstatSync(jsonFile).isFile()){
	 					if((typeof(JSON.showWarnings)=='boolean') && JSON.showWarnings){
	 						console.log('jsonFile ['+jsonFile+'] exist!');
	 					}
	 					return JSON.commented.parse(
	 						fs.readFileSync( jsonFile, {"encoding":"utf8"} )
	 					);
	 				}else
	 					throw new Error('     jsonFile does not exist: '+jsonFile);
	 			else
	 				throw new Error('jsonFile is not a string (filename) as expected');
			}
		}
	}else{
		if((typeof(JSON.showWarnings)=='boolean') && JSON.showWarnings){
			console.log('     JSON.commented was already defined.  Not reloading.');
		}
	}
}