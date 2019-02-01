/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/base/ManagedObject'],function(M){"use strict";var P=M.extend("sap.ui.dt.Plugin",{metadata:{"abstract":true,library:"sap.ui.dt",properties:{designTime:{type:"sap.ui.dt.DesignTime",multiple:false},commandFactory:{type:"sap.ui.dt.command.CommandFactory",multiple:false}},associations:{},events:{elementModified:{command:{type:"sap.ui.dt.command.BaseCommand"}}}}});P.prototype.init=function(){};P.prototype.exit=function(){this.setDesignTime(null);};P.prototype.setDesignTime=function(d){var o=this.getDesignTime();if(o){this._deregisterOverlays(o);o.detachEvent("elementOverlayCreated",this._onElementOverlayCreated,this);}this.setProperty("designTime",d);if(d){this._registerOverlays(d);d.attachEvent("elementOverlayCreated",this._onElementOverlayCreated,this);}return this;};P.prototype._registerOverlays=function(d){if(this.registerElementOverlay||this.registerAggregationOverlay){var e=d.getElementOverlays();e.forEach(this._callElementOverlayRegistrationMethods.bind(this));}};P.prototype._deregisterOverlays=function(d){if(this.deregisterElementOverlay||this.deregisterAggregationOverlay){var o=d.getElementOverlays();o.forEach(this._callElementOverlayDeregestrationMethods.bind(this));}};P.prototype._callAggregationOverlayRegistrationMehods=function(e){if(this.registerAggregationOverlay){var a=e.getAggregationOverlays();a.forEach(this.registerAggregationOverlay.bind(this));}};P.prototype._callElementOverlayRegistrationMethods=function(e){if(this.registerElementOverlay){this.registerElementOverlay(e);}this._callAggregationOverlayRegistrationMehods(e);};P.prototype._callElementOverlayDeregestrationMethods=function(e){if(this.deregisterElementOverlay){this.deregisterElementOverlay(e);}if(this.deregisterAggregationOverlay){var a=e.getAggregationOverlays();a.forEach(this.deregisterAggregationOverlay.bind(this));}};P.prototype._onElementOverlayCreated=function(e){var o=e.getParameter("elementOverlay");this._callElementOverlayRegistrationMethods(o);};return P;},true);