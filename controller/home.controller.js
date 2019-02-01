sap.ui.define([
		"iba/practice/controller/BaseController",
		"sap/m/MessageToast"
], function(Controller, MessageToast) {
	"use strict";

	return Controller.extend("iba.practice.controller.home", {
		
		onInit: function () {
		},
		 
		//объявили метод, который будет вызываться, при отправке события из компонента
		onGetDate: function (channel, event, item) {
			console.log("TEST eBus " + item);
		},
		
	});

});