sap.ui.define([
		"iba/practice/controller/BaseController",
		"jquery.sap.global", 
		"sap/ui/core/Fragment", 
		"sap/ui/model/json/JSONModel", 
		"sap/m/Popover", 
		"sap/m/Button"
], function(Controller, jQuery, Fragment,  JSONModel, Popover, Button) {
	"use strict";

	return Controller.extend("iba.practice.controller.toolPage", {
		onInit : function() {
			var i18nModel = this.getResourceBundle();
			var model = new sap.ui.model.json.JSONModel();
			model.setData({
				navigation : [
					{
						title : i18nModel.getText("TOOLPAGE_ALPHABET"),
						icon : 'sap-icon://map-3',
						expanded : false,
						key : 'alphabet'
					},
					{
						title : i18nModel.getText("TOOLPAGE_USERS"),
						icon : 'sap-icon://group',
						expanded : false,
						key : 'Users'
					}
				],
				fixedNavigation : [
						{
							title : i18nModel.getText("TOOLPAGE_ACCOUNT"),
							icon : 'sap-icon://account',
							key : 'account'
						}, {
							title : i18nModel.getText("TOOLPAGE_SETTINGS"),
							icon : 'sap-icon://settings',
							key : 'settings'
						}
				]
			});
			this.getView().setModel(model, "toolPage");
		},

		onItemSelect : function(oEvent) {
			var item = oEvent.getParameter('item');
			this.getRouter().navTo(item.getKey());
			console.log(this.getModel().oData);
		},

		handleMenuButtonPress : function(event) {
			var toolPage = this.getView().byId("toolPage");
			toolPage.setSideExpanded(!toolPage.getSideExpanded());
		},
		handleHomeButtonPress : function(event) {
			this.getRouter().navTo("home");
		},

		handleCurrentUserButtonPress : function(event) {
			var i18nModel = this.getResourceBundle();
			var oRouter = this.getOwnerComponent().getRouter();

			var popover = new Popover({
				showHeader : false,
				contentMinWidth : "200px",
				placement : sap.m.PlacementType.Bottom,
				content : [
					new Button({
						text : i18nModel.getText("TOOLPAGE_ACCOUNT"),
						type : sap.m.ButtonType.Transparent,
						press : function() {
							this.getRouter().navTo("account");
						}.bind(this)
					}), new Button({
						text : i18nModel.getText("TOOLPAGE_SETTINGS"),
						type : sap.m.ButtonType.Transparent,
						press : function() {
							this.getRouter().navTo("settings");
						}.bind(this)
					})
				]
			}).addStyleClass('sapMOTAPopover sapTntToolHeaderPopover ');
			popover.openBy(event.getSource());
		}
	});

});