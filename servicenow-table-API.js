module.exports = function(RED) {

// Configuration Node ServiceNowNode

    function ServiceNowNode(n) {
        RED.nodes.createNode(this,n);
        var request = require("request");
        var node = this;
        this.instance= n.instance;
        this.username= n.username;
        this.password= n.password;
        this.auth = 'Basic ' + Buffer.from(this.username + ':' + this.password).toString('base64');

        this.doRequest = function(options, callback) {
            request(options, callback);
            }
    }

// Node Retrieve Records

    
    function RetrieveRecords(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        var server = RED.nodes.getNode(config.server);

        // Initial sysparm with defaults values
        var sysparm = {
            query: '' ,
            display_value: false ,
            exclude_reference_link: false,
            suppress_pagination_header: false,
            fields: '',
            limit: 10,
            view: '',
            query_category: '',
            query_no_domain: false,
            no_count: false
        };

        this.prepareRequest = function(table,sysparm,callback) {
            var options = {
                baseUrl: server.instance,
                //uri: 'api/now/table/'+table+'?sysparm_query='+sysparm.query+'sysparm_fields='+sysparm.fields+'&sysparm_limit='+sysparm.limit,
                uri: 'api/now/table/'+table+
                        '?sysparm_query='+sysparm.query+
                        '&sysparm_display_value='+sysparm.display_value+
                        '&sysparm_exclude_reference_link='+sysparm.exclude_reference_link+
                        '&sysparm_suppress_pagination_header='+sysparm.suppress_pagination_header+
                        '&sysparm_fields='+sysparm.fields+
                        '&sysparm_limit='+sysparm.limit+
                        '&sysparm_view='+sysparm.view+
                        '&sysparm_query_category='+sysparm.query_category+
                        '&sysparm_query_no_domain='+sysparm.query_no_domain+
                        '&sysparm_sysparm_no_count='+sysparm.sysparm_no_count,
                body: null,
                method: 'GET',
                json: true,
                headers: {
                 'Content-Type': 'application/json',
                 'Authorization': server.auth
                }
            };
                server.doRequest(options, callback);

        }

        this.on('input', function(msg) {
            var table = msg.topic;

            // Replace sysparm with node properties
            if (msg.sysparm_query){
                sysparm.query=msg.sysparm_query
            }
            if (msg.sysparm_display_value){
                sysparm.display_value=msg.sysparm_display_value
            }
            if (msg.sysparm_exclude_reference_link){
                sysparm.exclude_reference_link=msg.sysparm_exclude_reference_link
            }
            if (msg.sysparm_suppress_pagination_header){
                sysparm.suppress_pagination_header=msg.sysparm_suppress_pagination_header
            }
            if (msg.sysparm_fields){
                sysparm.fields=msg.sysparm_fields
            }
            if (msg.sysparm_limit){
                sysparm.limit=msg.sysparm_limit
            }
            if (msg.sysparm_view){
                sysparm.view=msg.sysparm_view
            }
            if (msg.sysparm_query_category){
                sysparm.query_category=msg.sysparm_query_category
            }
            if (msg.sysparm_query_no_domain){
                sysparm.query_no_domain=msg.sysparm_query_no_domain
            }
            if (msg.sysparm_no_count){
                sysparm.no_count=msg.sysparm_no_count
            }

            if (!table) {
                node.status({
                    fill: "red",
                    shape: "dot",
                    text: "Invalid message received"
                });
            }
            var callback = function(err, res, body) {


                if (res.statusCode === 200) {
                    node.status({});
                    msg.payload=res;
                    node.send(msg);
                } else {
                    node.status({
                        fill: "red",
                        shape: "dot",
                        text: "Request failed"
                    });
                    node.error("Error Retrieving records (" + res.statusCode + "): " + JSON.stringify(err) + " " + JSON.stringify(body));
                }

            };
            node.status({
                fill: "blue",
                shape: "dot",
                text: "Requesting..."
            });
            this.prepareRequest(table,sysparm,callback);
        });
    
    }


// Node Retrieve a Record

    
    function RetrieveRecord(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        var server = RED.nodes.getNode(config.server);

        // Initial sysparm with defaults values
        var sysparm = {
            sys_id: '' ,
            display_value: false ,
            exclude_reference_link: false,
            fields: '',
            view: '',
            query_no_domain: false
        };

        this.prepareRequest = function(table,sysparm,callback) {
            var options = {
                baseUrl: server.instance,
                uri: 'api/now/table/'+table+
                        '/'+sysparm.sys_id+
                        '?sysparm_display_value='+sysparm.display_value+
                        '&sysparm_exclude_reference_link='+sysparm.exclude_reference_link+
                        '&sysparm_fields='+sysparm.fields+
                        '&sysparm_view='+sysparm.view+
                        '&sysparm_query_no_domain='+sysparm.query_no_domain,
                body: null,
                method: 'GET',
                json: true,
                headers: {
                 'Content-Type': 'application/json',
                 'Authorization': server.auth
                }
            };
                server.doRequest(options, callback);

        }

        this.on('input', function(msg) {
            var table = msg.topic;

            // Replace sysparm with node properties
            if (msg.sys_id){
                sysparm.sys_id=msg.sys_id
            }
            if (msg.sysparm_display_value){
                sysparm.display_value=msg.sysparm_display_value
            }
            if (msg.sysparm_exclude_reference_link){
                sysparm.exclude_reference_link=msg.sysparm_exclude_reference_link
            }
            if (msg.sysparm_fields){
                sysparm.fields=msg.sysparm_fields
            }
            if (msg.sysparm_view){
                sysparm.view=msg.sysparm_view
            }
            if (msg.sysparm_query_no_domain){
                sysparm.query_no_domain=msg.sysparm_query_no_domain
            }

            if (!table || !sysparm.sys_id) {
                node.status({
                    fill: "red",
                    shape: "dot",
                    text: "Invalid message received"
                });
            }
            var callback = function(err, res, body) {


                if (res.statusCode === 200) {
                    node.status({});
                    msg.payload=res;
                    node.send(msg);
                } else {
                    node.status({
                        fill: "red",
                        shape: "dot",
                        text: "Request failed"
                    });
                    node.error("Error Retrieving record: "+ sysparm.sys_id + "(" + res.statusCode + "): " + JSON.stringify(err) + " " + JSON.stringify(body));
                }

            };
            node.status({
                fill: "blue",
                shape: "dot",
                text: "Requesting..."
            });
            this.prepareRequest(table,sysparm,callback);
        });
    
    }

// Node Modify a Record

    
    function ModifyRecord(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        var server = RED.nodes.getNode(config.server);
       
        // Initial sysparm with defaults values
        var sysparm = {
            sys_id: '' ,
            display_value: false ,
            exclude_reference_link: false,
            fields: '',
            input_display_value: false,
            suppress_auto_sys_field: false,
            view: '',
            query_no_domain: false
        };

        this.prepareRequest = function(table,sysparm,requestBody,callback) {
            var options = {
                baseUrl: server.instance,
                uri: 'api/now/table/'+table+'/'+sysparm.sys_id,
                body: requestBody,
                method: 'PUT',
                json: true,
                headers: {
                 'Content-Type': 'application/json',
                 'Authorization': server.auth
                }
            };
                server.doRequest(options, callback);

        }

        this.on('input', function(msg) {
            var table = msg.topic;
            var requestBody = msg.payload;

            // Replace sysparm with node properties
            if (msg.sys_id){
                sysparm.sys_id=msg.sys_id
            }
            if (msg.sysparm_display_value){
                sysparm.display_value=msg.sysparm_display_value
            }
            if (msg.sysparm_exclude_reference_link){
                sysparm.exclude_reference_link=msg.sysparm_exclude_reference_link
            }
            if (msg.sysparm_fields){
                sysparm.fields=msg.sysparm_fields
            }
            if (msg.sysparm_input_display_value){
                sysparm.input_display_value=msg.sysparm_input_display_value
            }
            if (msg.sysparm_suppress_auto_sys_field){
                sysparm.suppress_auto_sys_field=msg.sysparm_suppress_auto_sys_field
            }
            if (msg.sysparm_view){
                sysparm.view=msg.sysparm_view
            }
            if (msg.sysparm_query_no_domain){
                sysparm.query_no_domain=msg.sysparm_query_no_domain
            }

            if (!table || !sysparm.sys_id || !requestBody) {
                node.status({
                    fill: "red",
                    shape: "dot",
                    text: "Invalid message received"
                });
            }
            var callback = function(err, res, body) {


                if (res.statusCode === 200) {
                    node.status({});
                    msg.payload=res;
                    node.send(msg);
                } else {
                    node.status({
                        fill: "red",
                        shape: "dot",
                        text: "Request failed"
                    });
                    node.error("Error Retrieving record: "+ sysparm.sys_id + "(" + res.statusCode + "): " + JSON.stringify(err) + " " + JSON.stringify(body));
                }

            };
            node.status({
                fill: "blue",
                shape: "dot",
                text: "Requesting..."
            });
            this.prepareRequest(table,sysparm,requestBody,callback);
        });
    
    }

// Node Patch a Record

    
    function PatchRecord(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        var server = RED.nodes.getNode(config.server);
        
        // Initial sysparm with defaults values
        var sysparm = {
            sys_id: '' ,
            display_value: false ,
            exclude_reference_link: false,
            fields: '',
            input_display_value: false,
            suppress_auto_sys_field: false,
            view: '',
            query_no_domain: false
        };
        

        this.prepareRequest = function(table,sysparm,requestBody,callback) {
            var options = {
                baseUrl: server.instance,
                uri: 'api/now/table/'+table+'/'+sysparm.sys_id,
                body: requestBody,
                method: 'PUT',
                json: true,
                headers: {
                 'Content-Type': 'application/json',
                 'Authorization': server.auth
                }
            };
                server.doRequest(options, callback);

        }

        this.on('input', function(msg) {
            var table = msg.topic;
            var requestBody = msg.payload;

            // Replace sysparm with node properties
            if (msg.sys_id){
                sysparm.sys_id=msg.sys_id
            }
            if (msg.sysparm_display_value){
                sysparm.display_value=msg.sysparm_display_value
            }
            if (msg.sysparm_exclude_reference_link){
                sysparm.exclude_reference_link=msg.sysparm_exclude_reference_link
            }
            if (msg.sysparm_fields){
                sysparm.fields=msg.sysparm_fields
            }
            if (msg.sysparm_input_display_value){
                sysparm.input_display_value=msg.sysparm_input_display_value
            }
            if (msg.sysparm_suppress_auto_sys_field){
                sysparm.suppress_auto_sys_field=msg.sysparm_suppress_auto_sys_field
            }
            if (msg.sysparm_view){
                sysparm.view=msg.sysparm_view
            }
            if (msg.sysparm_query_no_domain){
                sysparm.query_no_domain=msg.sysparm_query_no_domain
            }

            if (!table || !sysparm.sys_id || !requestBody) {
                node.status({
                    fill: "red",
                    shape: "dot",
                    text: "Invalid message received"
                });
            }
            var callback = function(err, res, body) {


                if (res.statusCode === 200) {
                    node.status({});
                    msg.payload=res;
                    node.send(msg);
                } else {
                    node.status({
                        fill: "red",
                        shape: "dot",
                        text: "Request failed"
                    });
                    node.error("Error Patching record: "+ sysparm.sys_id + "(" + res.statusCode + "): " + JSON.stringify(err) + " " + JSON.stringify(body));
                }

            };
            node.status({
                fill: "blue",
                shape: "dot",
                text: "Requesting..."
            });
            this.prepareRequest(table,sysparm,requestBody,callback);
        });
    
    }

// Node Delete a Record

    
    function DeleteRecord(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        var server = RED.nodes.getNode(config.server);


        // Initial sysparm with defaults values
        var sysparm = {
            sys_id: '' ,
            query_no_domain: false
        };
        

        this.prepareRequest = function(table,sysparm,callback) {
            var options = {
                baseUrl: server.instance,
                uri: 'api/now/table/'+table+'/'+sysparm.sys_id,
                body: null,
                method: 'DELETE',
                json: true,
                headers: {
                 'Content-Type': 'application/json',
                 'Authorization': server.auth
                }
            };
                server.doRequest(options, callback);

        }

        this.on('input', function(msg) {
            var table = msg.topic;
            

            // Replace sysparm with node properties
            if (msg.sys_id){
                sysparm.sys_id=msg.sys_id
            }
            if (msg.sysparm_query_no_domain){
                sysparm.query_no_domain=msg.sysparm_query_no_domain
            }

            if (!table || !sysparm.sys_id) {
                node.status({
                    fill: "red",
                    shape: "dot",
                    text: "Invalid message received"
                });
            }
            var callback = function(err, res, body) {


                if (res.statusCode === 204) {
                    node.status({});
                    msg.payload=res;
                    node.send(msg);
                } else {
                    node.status({
                        fill: "red",
                        shape: "dot",
                        text: "Request failed"
                    });
                    node.error("Error Deleting record: "+ sysparm.sys_id + "(" + res.statusCode + "): " + JSON.stringify(err) + " " + JSON.stringify(body));
                }

            };
            node.status({
                fill: "blue",
                shape: "dot",
                text: "Requesting..."
            });
            this.prepareRequest(table,sysparm,callback);
        });
    
    }



// Node Create Record

    function CreateRecord(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        var server = RED.nodes.getNode(config.server);
       
        // Initial sysparm with defaults values
        var sysparm = {
            display_value: false ,
            exclude_reference_link: false,
            fields: '',
            input_display_value: false,
            suppress_auto_sys_field: false,
            view: ''
        };

        this.prepareRequest = function(table,sysparm,requestBody,callback) {
            var options = {
                baseUrl: server.instance,
                uri: 'api/now/table/'+table,
                body: requestBody,
                method: 'POST',
                json: true,
                headers: {
                 'Content-Type': 'application/json',
                 'Authorization': server.auth
                }
            };

                server.doRequest(options, callback);

        }

        this.on('input', function(msg) {
            var table = msg.topic;
            var requestBody = msg.payload;

            // Replace sysparm with node properties

            if (msg.sysparm_display_value){
                sysparm.display_value=msg.sysparm_display_value
            }
            if (msg.sysparm_exclude_reference_link){
                sysparm.exclude_reference_link=msg.sysparm_exclude_reference_link
            }
            if (msg.sysparm_fields){
                sysparm.fields=msg.sysparm_fields
            }
            if (msg.sysparm_input_display_value){
                sysparm.input_display_value=msg.sysparm_input_display_value
            }
            if (msg.sysparm_suppress_auto_sys_field){
                sysparm.suppress_auto_sys_field=msg.sysparm_suppress_auto_sys_field
            }
            if (msg.sysparm_view){
                sysparm.view=msg.sysparm_view
            }

            if (!table || !requestBody) {
                node.status({
                    fill: "red",
                    shape: "dot",
                    text: "Invalid message received"
                });
            }
            var callback = function(err, res, body) {


                if (res.statusCode === 201) {
                    node.status({});
                    msg.payload=res;
                    node.send(msg);
                } else {
                    node.status({
                        fill: "red",
                        shape: "dot",
                        text: "Create failed"
                    });
                    node.error("Error Create Record (" + res.statusCode + "): " + JSON.stringify(err) + " " + JSON.stringify(body));
                }

            };
            node.status({
                fill: "blue",
                shape: "dot",
                text: "Requesting..."
            });
            this.prepareRequest(table,sysparm,requestBody,callback);
        });
    
    }

    RED.nodes.registerType("patch record",PatchRecord);
    RED.nodes.registerType("modify record",ModifyRecord);
    RED.nodes.registerType("delete record",DeleteRecord);
    RED.nodes.registerType("create record",CreateRecord);
    RED.nodes.registerType("retrieve records",RetrieveRecords);
    RED.nodes.registerType("retrieve record",RetrieveRecord);
    RED.nodes.registerType("servicenow-config",ServiceNowNode);
}