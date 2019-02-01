sap.ui.define([
		'jquery.sap.global', 'sap/ui/Device', 'sap/ui/core/UIComponent', 'sap/ui/core/mvc/View', 'sap/ui/core/routing/History',
		'sap/ui/model/json/JSONModel', 'sap/ui/model/resource/ResourceModel', 'sap/m/InstanceManager', 'sap/m/routing/RouteMatchedHandler'
		
], function(jQuery, Device, UIComponent, View, History, JSONModel, ResourceModel, InstanceManager, RouteMatchedHandler) {
	"use strict";

	return UIComponent.extend("iba.practice.Component", {
		
		metadata : {
			manifest: "json",
			id: "componentId"
		},
		
		init : function() {
			UIComponent.prototype.init.apply(this, arguments);
			this.getRouter().initialize();
		},

		destroy : function() {
			UIComponent.prototype.destroy.apply(this, arguments);
		}
	});
}); 
