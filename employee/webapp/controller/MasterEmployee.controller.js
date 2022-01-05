sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller , Filter, FilterOperator) {
        "use strict";

        return Controller.extend("employee.controller.MasterEmployee", {
            onInit: function () {
               this._bus = sap.ui.getCore().getEventBus();

            },

            onValidate: function () {
                //obtenemos la referencia al campo de entrada
                var inputEmployee = this.byId("inputEmployee");
                var valueEmployee = inputEmployee.getValue();

                if (valueEmployee.length === 6) {
                    //inputEmployee.setDescription("OK");
                    this.byId("labelPaises").setVisible(true);
                    this.byId("slCountry").setVisible(true);

                } else {
                    //inputEmployee.setDescription("Not OK");
                    this.byId("labelPaises").setVisible(false);
                    this.byId("slCountry").setVisible(false);
                };

            },

            onFilter:  function(){
                var oJSON = this.getView().getModel("JsonCountries").getData();
                var filters = [];
                        if (oJSON.EmployeeId !== ""){
                        filters.push(new Filter("EmployeeID" , FilterOperator.EQ, oJSON.EmployeeId))
                        }     
                        
                        if (oJSON.CountryKey !== "" && oJSON.CountryKey !== "undefined" ){
                            filters.push(new Filter("Country" , FilterOperator.EQ, oJSON.CountryKey))
                            } 

                           
                            var oList = this.getView().byId("idEmployeeTable");
                            var oBinding = oList.getBinding("items");
                            oBinding.filter(filters);
                },

                showPostalCode:  function (oEvent){

                    var itemPressed = oEvent.getSource();
                    var oContext = itemPressed.getBindingContext("JsonEmpleados");
                    var objectContext = oContext.getObject();
                 
                      sap.m.MessageToast.show(objectContext.PostalCode); 
                 
                 },

                onClearFilter:  function(){
                    var oModel = this.getView().getModel("JsonCountries");
                    oModel.setProperty("/EmployeeId" , "");
                    oModel.setProperty("/CountryKey" , "");
                    
    
                                
                    },
               


                    onShowCity: function () {
                        var oJSONModelConfig = this.getView().getModel("jsonModelConfig");
                        oJSONModelConfig.setProperty("/visibleCity", true);
                        oJSONModelConfig.setProperty("/visibleBtnShowCity", false);
                        oJSONModelConfig.setProperty("/visibleBtnHideCity", true);
            
                    },
            
                    onHideCity: function (){
                        var oJSONModelConfig = this.getView().getModel("jsonModelConfig");
                        oJSONModelConfig.setProperty("/visibleCity", false);
                        oJSONModelConfig.setProperty("/visibleBtnShowCity", true);
                        oJSONModelConfig.setProperty("/visibleBtnHideCity", false);
                    },

                    showOrders: function (oEvent) {
                         //Get selected Controller
                            var iconPressed = oEvent.getSource();

                            //Context from the model
                            var oContext = iconPressed.getBindingContext("odataNorthwind");

                            if (!this._oDialogOrders) {
                                this._oDialogOrders = sap.ui.xmlfragment("employee.fragment.DialogOrders", this);
                                this.getView().addDependent(this._oDialogOrders);
                            };

                            //Dialog binding to the Context to have access to the data of selected item
                            this._oDialogOrders.bindElement("odataNorthwind>" + oContext.getPath());
                            this._oDialogOrders.open();
                    },

                    onCloseOrders:   function () {
                        this._oDialogOrders.close();
                    },

                    
                    showEmployee: function (oEvent) {
                        var path = oEvent.getSource().getBindingContext("odataNorthwind").getPath();
                        this._bus.publish("flexible", "showEmployee", path);
                    }
            
                });  
    });
