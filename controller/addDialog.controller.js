sap.ui.define([
    "iba/practice/controller/BaseController"
], function(Controller, MessageToast) {
"use strict";

return Controller.extend("iba.practice.controller.addDialog", {
    onInit : function() {
    },
    addNote : function(){
		console.log('Add')
    },
    closeDialog: function() {
		this.dialog.close();
	}
});

});