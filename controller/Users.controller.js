sap.ui.define([
    "iba/practice/controller/BaseController"
], function(Controller, MessageToast) {
"use strict";

return Controller.extend("iba.practice.controller.Users", {
    onInit : function() {
        this.oModel = this.getOwnerComponent().getModel();
        this.dialog = sap.ui.xmlfragment("iba.practice.fragments.addDialog", this);
        var oNote = {
            Email: "",
            Firstname: "",
            Lastname: "",
            Address: ""
        }
        var oModelNote = new sap.ui.model.json.JSONModel(oNote);
        this.dialog.setModel(oModelNote, "noteModel");
       
    },
    
    addUser : function(){
		if(!this.dialog)
			//this.dialog = sap.ui.xmlfragment("iba.practice.fragments.addDialog", this);
        this.dialog.setTitle('Add User');
		this.dialog.open();
    },
    addNote : function(){
       var oModelNote = this.dialog.getModel('noteModel').getData()     
       //console.log(this.dialog.getModel('noteModel'))
        if (oModelNote.Email == "" || oModelNote.Firstname == "" || oModelNote.Lastname == "" || oModelNote.Address == "")
                sap.m.MessageToast.show("Заполнены не все поля");
        else{
            var title = this.dialog.getTitle();
        	if (title == 'Add User'){
                    var oModel = this.getModel()
                    console.log(oModel)
        		    oModel.create('/Users', oModelNote, {
                    success: function(oData, oResponse) { 
                        sap.m.MessageToast.show("Запись добавлена");
                    },
                     error: function(oError) {
                         sap.m.MessageToast.show("Ошибка");
                        } 
                    }
                );
                this.dialog.close();
                //console.log(oModel.oData)
        	}
        	else{
                //console.log(this.dialog.getModel('noteModel'))
                console.log('Update')
                var oModel = this.getModel()
        		oModel.update("/Users('"+encodeURIComponent(oModelNote.Email)+"')", oModelNote, {
                    success: function(oData, oResponse) { 
                        sap.m.MessageToast.show("Запись обновлена");
                        console.log(oModelNote)
                    },
                     error: function(oError) {
                         sap.m.MessageToast.show("Ошибка");
                        } 
                    }
                );
        		this.dialog.close();
            }
        }                  
    },

    EditUser: function() {
        this.dialog.setTitle("Edit User")
        //console.log(this.dialog)
        console.log(this.dialog.getModel('noteModel'))
        //this.dialog = sap.ui.xmlfragment("iba.practice.fragments.addDialog", this);
		var contexts = this.getView().byId("idUsersTable").getSelectedContexts();
		if(contexts == ""){
			 sap.m.MessageToast.show("Выберите строку для изменения");
		 }
		 else {
			 if(!this.dialog) 
             this.dialog.setTitle('Изменить запись');
             var addBtn = sap.ui.getCore().byId("addBtn");
             addBtn.setText("Save")
             var oSelectedItemData = this.getView().byId("idUsersTable").getSelectedItem().getBindingContext().getObject()
             console.log(oSelectedItemData)
            //oNote = oSelectedItemData
            var oModelNote = this.dialog.getModel('noteModel')
            oModelNote.setData(oSelectedItemData)
            console.log(oModelNote)

			 this.dialog.open();
		 }
	},
    
    DelUser: function(){
        var oTable = this.getView().byId("idUsersTable");
        var aSelectedItems = oTable.getSelectedItems();
        if (aSelectedItems.length == 0) 
        sap.m.MessageToast.show("Не выбраны элементы для удаления")
        else{
            for(var i=0; i<aSelectedItems.length; i++){
                oTable.removeItem(aSelectedItems[i])
             }
        }
        
    },
    closeDialog: function() {
		this.dialog.close();
    },
    
    
    onFilter: function(oEvent) {
		var aFilters = [];
		var sQuery = oEvent.getSource().getValue();
		if(sQuery && sQuery.length > 0){
			var contains = sap.ui.model.FilterOperator.Contains;
            var columns = ['Email', 'Firstname', 'Lastname', 'Address'];
            var filters = new sap.ui.model.Filter(columns.map(function(colName) {
            return new sap.ui.model.Filter(colName, contains, sQuery); }),false);
			aFilters.push(filters);
		}
		var list = this.getView().byId("idUsersTable")
		var binding = list.getBinding("items");
		binding.filter(aFilters, "Application");
    },

    formatText: function(Firstname, Lastname, id) {
        return Firstname +' '+ Lastname + ' ' + id
      },

    onSelectChange: function(){
        var value = this.getView().byId("idSelect").getSelectedKey()
        var oModel = this.getModel()
        console.log(value)
        console.log(oModel)
    }

});

});