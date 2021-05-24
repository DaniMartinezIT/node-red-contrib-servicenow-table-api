node-red-contrib-servicenow-table-api
========================

A [Node-RED](https://www.nodered.org/) nodes to use Service Now Table API [Table API doc](https://developer.servicenow.com/dev.do#!/reference/api/quebec/rest/c_TableAPI).

Install
-------

Run command on Node-RED installation directory.

	npm install node-red-contrib-servicenow-table-api

or run command for global installation.

	npm install -g node-red-contrib-servicenow-table-api

Nodes
-----

* Retrieve Records: Retrieves multiple records for the specified table (GET)
* Retrieve Record: Retrieves the record identified by the specified sys_id from the specified table (GET)
* Modify Record: Updates the specified record with the request body. (PUT)
* Update Record: Updates the specified record with the name-value pairs included in the request body (PATCH)
* Create Record: Inserts one record in the specified table. Multiple record insertion is not supported by this method (POST)
* Delete Record: Deletes the specified record from the specified table. (DELETE)

Config Nodes
-----

* Servicenow-config: Configure instance, user and password (basic auth)

Message parameters
------------------

* Retrieve Records Properties

| __**Property**__                       | __**Use**__                               |
|----------------------------------------|-------------------------------------------|
| msg.topic                              | mandatory tableName                       |
| msg.sys_parm_query                     | Optional Query Parameters (default '')    |
| msg.sysparm_display_value              | Optional Query Parameters (default false) |
| msg.sysparm_exclude_reference_link)    | Optional Query Parameters (default false) |
| msg.sysparm_suppress_pagination_header | Optional Query Parameters (default false) |
| msg.sysparm_fields                     | Optional Query Parameters (default 10)    |
| msg.sysparm_limit                      | Optional Query Parameters (default '')    |
| msg.sysparm_view                       | Optional Query Parameters (default '')    |
| msg.sysparm_query_category             | Optional Query Parameters (default '')    |
| msg.sysparm_query_no_domain            | Optional Query Parameters (default false) |
| msg.sysparm_no_count                   | Optional Query Parameters (default false) |


(In progress)
