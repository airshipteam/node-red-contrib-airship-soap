module.exports = function (RED) {

    const airshipsoap = require('../libs/airshipsoap');

    function SoapCall(n) {

        RED.nodes.createNode(this, n);
        
		this.wsdl    = 'https://secure.airship.co.uk/SOAP/V3/Contact.wsdl';
		this.method  = n.method;
		this.payload = n.payload;
        this.status({});


        this.getWSDL = () => {

        	switch(this.method) {
			  case 'createContact':
			  case 'updateContact':
			  case 'getContact':
			  case 'getContactEmail':
			  case 'lookupContactByLastname':
			  case 'lookupContactByUDF':
			  case 'unsubscribeContactGroup':
			  case 'getUDFValue':
			  case 'setUDFValue':
			  case 'getInteractionsInMonitoredGroup':
			  case 'getUpdatedContacts':
			  case 'setContactSocial':
			  case 'getContactSocial':
			  case 'addContactNote':
			  case 'getContactNotes':
			  case 'setContactPhoto':
			  case 'getContactPhoto':
			  case 'unsubscribeContactUnits':
			  case 'getCreatedContacts':
			  case 'getPreferredMethods':
			  case 'updatePreferredMethods':
			  case 'getContactStatus':
			  case 'getContactsCreatedUpdated':
			  case 'getContactsCreatedUpdatedTime':
			  case 'contactValidation':
			  case 'getContactConsent':
			  case 'updateContactConsent':
			  case 'getContactByUID':
			  case 'getContactConfig':
			    return 'https://secure.airship.co.uk/SOAP/V3/Contact.wsdl';
			    break;
			  case 'createBooking':
			  case 'updateBooking':
			  case 'getBooking':
			  case 'getBookings':
			  case 'getBookingsCount':
			  case 'getBookingNotes':
			  case 'getBookingTypes':
			  case 'getBookingSources':
			  case 'createBookingEnquiry':
			    return 'https://secure.airship.co.uk/SOAP/V3/Bookings.wsdl';
			    break;
			}

        },


        /**
		 * Shows a status visual on the node
		 * @param  {[string]} colour [colour of status (green, yellow, red)]
		 * @param  {[string]} shape [shape of symbol]
		 * @param  {[text]} text [text to show]
		 */
        this.showstatus = (colour, shape, text) => {
			this.status({fill:colour,shape:shape,text:text});
        };

        /**
		 * Logs an error message
		 * @param  {[string]} msg [error message]
		 */
        this.showerror = (payload) => {
        	this.send([null,{payload:payload}]);
        };


        /**
		 * Logs an error message
		 * @param  {[string]} msg [error message]
		 */
        this.showsuccess = (payload) => {
        	this.send([{payload:payload},null]);
        };


        /**
		 * Shows a status visual on the node
		 * @param  {[string]} colour [colour of status (green, yellow, red)]
		 * @param  {[string]} shape [shape of symbol]
		 * @param  {[text]} text [text to show]
		 */
        this.showstatus = (colour, shape, text) => {
			this.status({fill:colour,shape:shape,text:text});
        };



        this.on('input',  (msg) => {

        	this.showstatus("yellow","dot","Making call");

        	const wsdl = this.getWSDL();
        	const method = msg.method ? msg.method : this.method;

	        let res = airshipsoap.call(wsdl, this.method, msg.payload, msg.options);
	        res.then((res)=>{
	        	this.showstatus("green","dot","Success");
	         	this.showsuccess(res);
	     	}).catch((err)=>{
	        	this.showstatus("red","dot","Error");
	     		this.showerror(err);
	     	}).finally(()=>{
	     	});

	    });

     
    }
    RED.nodes.registerType("Airship SOAP", SoapCall);
};
