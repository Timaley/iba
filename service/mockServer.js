sap.ui.define([
		"sap/ui/core/util/MockServer"
	], function (MockServer) {
		"use strict";

		var _sAppModulePath = "iba/practice/",
		_sJsonFilesModulePath = _sAppModulePath + "service/data";
		
		return {

			/**
			 * Initializes the mock server.
			 * You can configure the delay with the URL parameter "serverDelay".
			 * The local mock data in this folder is returned instead of the real data for testing.
			 * @public
			 */
			init : function () {
				var sJsonFilesUrl = jQuery.sap.getModulePath(_sJsonFilesModulePath),
				sManifestUrl = jQuery.sap.getModulePath(_sAppModulePath + "manifest", ".json"),
				oManifest = jQuery.sap.syncGetJSON(sManifestUrl).data,
				oMainDataSource = oManifest["sap.app"].dataSources.mainService,
				sMetadataUrl = jQuery.sap.getModulePath(_sAppModulePath + oMainDataSource.settings.localUri.replace(".xml", ""), ".xml"),
				// ensure there is a trailing slash
				sMockServerUrl = "/";
				
				var oMockServer = new MockServer({
					rootUri : sMockServerUrl
				});

				// load local mock data
				oMockServer.simulate(sMetadataUrl, {
					sMockdataBaseUrl : sJsonFilesUrl,
					bGenerateMissingMockData : true
				});

				oMockServer.start();
			},

			/**
			 * @public returns the mockserver of the app, should be used in integration tests
			 * @returns {sap.ui.core.util.MockServer} the mockserver instance
			 */
			getMockServer : function () {
				return oMockServer;
			}
		};

	}
);