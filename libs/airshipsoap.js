var soap = require('soap');



/**
 * Makes a soap call
 * @param  {[string]} wsdl    [location of wsdl]
 * @param  {[string]} method  [soap method to call]
 * @param  {[json]} payload [payload]
 * @return {[promise]}        
 */
function call(wsdl,method, payload, options){

    return new Promise((resolve, reject) => {
        try {
        
           soap.createClient(wsdl, options||{}, function (err, client) {

            	// catch WSDL error
                if (err) {
                    return reject("WSDL Config Error: " + err);
                }

                //method
                if(client.hasOwnProperty(method)){
                    client[method](payload, function (err, result) {
                        if (err) {
		                    return reject("Service Call Error: "+err);
                        }
	                    return resolve(result);
                    });
                } else {
                    return reject("Method doesn't exist");
                };
            });

        } catch (err) {
            return reject("Error : "+err);
        }
    });

}
module.exports.call = call;