// Bootstrap for the 'explored' app. 
sap.ui.define(['iba/practice/service/mockServer', 'jquery.sap.global', 'sap/ui/core/ComponentContainer', 'sap/m/Shell'],
	function(mockServer, jQuery, ComponentContainer, Shell) {
	"use strict";

	jQuery("#busyIndicator").css({
		"margin-top": "8em", 
		"text-align": "center",
		color: "#555555"
	});

	return {
		run : function (sMode) {
			// set up test service for local testing
			mockServer.init();
			this._loadUi();
		},
		
		_loadUi : function () {
			var title = "IBA Practice";
			// this is required if we are going to embedd component into Fiori app, 
			//get Abs path to current dir in order to reference images and external resources correctly
			var sPath = jQuery.sap.getModulePath("iba.practice");
			
			var shell = new Shell("Shell", {
				title : title,
				showLogout : false,
				app : new ComponentContainer({
					name : 'iba.practice'
				}), 
				homeIcon : {
					'phone' : sPath + '/img/57_iPhone_Desktop_Launch.png',
					'phone@2' : sPath + '/img/114_iPhone-Retina_Web_Clip.png',
					'tablet' : sPath + '/img/72_iPad_Desktop_Launch.png',
					'tablet@2' : sPath + '/img/144_iPad_Retina_Web_Clip.png',
					'favicon' : sPath + '/img/favicon.ico',
					'precomposed': false
				}
			});
			// Title has effect in certain curcamstance
			shell.setTitle(title);
			shell.placeAt('content');
		}
	};

}, /* bExport= */ true);
