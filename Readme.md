node-red-contrib-servicenow-table-api
========================

A [Node-RED](https://www.nodered.org/) nodes to use Service Now Table API. [Table API doc](https://developer.servicenow.com/dev.do#!/reference/api/quebec/rest/c_TableAPI).

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

### Retrieve Records Properties

| __**Property**__                       | __**Use**__                               |
|----------------------------------------|-------------------------------------------|
| msg.topic                              | mandatory tableName                       |
| msg.sys_parm_query                     | Optional Query Parameters (default '')    |
| msg.sysparm_display_value              | Optional Query Parameters (default false) |
| msg.sysparm_exclude_reference_link     | Optional Query Parameters (default false) |
| msg.sysparm_suppress_pagination_header | Optional Query Parameters (default false) |
| msg.sysparm_fields                     | Optional Query Parameters (default 10)    |
| msg.sysparm_limit                      | Optional Query Parameters (default '')    |
| msg.sysparm_view                       | Optional Query Parameters (default '')    |
| msg.sysparm_query_category             | Optional Query Parameters (default '')    |
| msg.sysparm_query_no_domain            | Optional Query Parameters (default false) |
| msg.sysparm_no_count                   | Optional Query Parameters (default false) |

### Retrieve Record Properties

| __**Property**__                       | __**Use**__                               |
|----------------------------------------|-------------------------------------------|
| msg.topic                              | mandatory tableName                       |
| msg.sys_id                             | mandatory sys_id identifier               |
| msg.sysparm_display_value              | Optional Query Parameters (default false) |
| msg.sysparm_exclude_reference_link     | Optional Query Parameters (default false) |
| msg.sysparm_fields                     | Optional Query Parameters (default 10)    |
| msg.sysparm_view                       | Optional Query Parameters (default '')    |
| msg.sysparm_query_no_domain            | Optional Query Parameters (default false) |

### Modify Record Properties

| __**Property**__                       | __**Use**__                               |
|----------------------------------------|-------------------------------------------|
| msg.topic                              | mandatory tableName                       |
| msg.sys_id                             | mandatory sys_id identifier               |
| msg.sysparm_display_value              | Optional Query Parameters (default false) |
| msg.sysparm_exclude_reference_link     | Optional Query Parameters (default false) |
| msg.sysparm_fields                     | Optional Query Parameters (default 10)    |
| msg.sysparm_view                       | Optional Query Parameters (default '')    |
| msg.sysparm_input_display_value        | Optional Query Parameters (default false) |
| msg.sysparm_suppress_auto_sys_field    | Optional Query Parameters (default false) |
| msg.sysparm_query_no_domain            | Optional Query Parameters (default false) |

### Update Record

| __**Property**__                       | __**Use**__                               |
|----------------------------------------|-------------------------------------------|
| msg.topic                              | mandatory tableName                       |
| msg.sys_id                             | mandatory sys_id identifier               |
| msg.sysparm_display_value              | Optional Query Parameters (default false) |
| msg.sysparm_exclude_reference_link     | Optional Query Parameters (default false) |
| msg.sysparm_fields                     | Optional Query Parameters (default 10)    |
| msg.sysparm_view                       | Optional Query Parameters (default '')    |
| msg.sysparm_input_display_value        | Optional Query Parameters (default false) |
| msg.sysparm_suppress_auto_sys_field    | Optional Query Parameters (default false) |
| msg.sysparm_query_no_domain            | Optional Query Parameters (default false) |

### Create Record

| __**Property**__                       | __**Use**__                               |
|----------------------------------------|-------------------------------------------|
| msg.topic                              | mandatory tableName                       |
| msg.sys_id                             | mandatory sys_id identifier               |
| msg.sysparm_display_value              | Optional Query Parameters (default false) |
| msg.sysparm_exclude_reference_link     | Optional Query Parameters (default false) |
| msg.sysparm_fields                     | Optional Query Parameters (default 10)    |
| msg.sysparm_input_display_value        | Optional Query Parameters (default false) |
| msg.sysparm_suppress_auto_sys_field    | Optional Query Parameters (default false) |
| msg.sysparm_view                       | Optional Query Parameters (default '')    |

### Delete Record


| __**Property**__                       | __**Use**__                               |
|----------------------------------------|-------------------------------------------|
| msg.topic                              | mandatory tableName                       |
| msg.sys_id                             | mandatory sys_id identifier               |
| msg.sysparm_query_no_domain            | Optional Query Parameters (default false) |

Flow Example
---
Copy and import in your node-red

```
[{"id":"421fdc9c.1f8134","type":"tab","label":"Flow 1","disabled":false,"info":""},{"id":"b3866e5.796909","type":"debug","z":"421fdc9c.1f8134","name":"Show response","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":580,"y":260,"wires":[]},{"id":"19cab4c4.6cc5f3","type":"modify record","z":"421fdc9c.1f8134","name":"","server":"","x":340,"y":420,"wires":[["b3866e5.796909"]]},{"id":"7dc62c36.8083ac","type":"inject","z":"421fdc9c.1f8134","name":"Set","props":[{"p":"topic","vt":"str"},{"p":"sys_id","v":"b8736e31871030107aa7cbb9cebb354e","vt":"str"},{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"incident","payload":"{\"short_description\":\"Modify Record Node\"}","payloadType":"json","x":150,"y":420,"wires":[["19cab4c4.6cc5f3"]]},{"id":"1fc4e6ea.8ab849","type":"delete record","z":"421fdc9c.1f8134","name":"","server":"","x":330,"y":500,"wires":[["b3866e5.796909"]]},{"id":"1180f57d.8defb3","type":"inject","z":"421fdc9c.1f8134","name":"Set","props":[{"p":"topic","vt":"str"},{"p":"sys_id","v":"e0650148871070107aa7cbb9cebb35cb","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"incident","x":150,"y":500,"wires":[["1fc4e6ea.8ab849"]]},{"id":"c3f5775a.df0978","type":"patch record","z":"421fdc9c.1f8134","name":"","server":"","x":330,"y":460,"wires":[["b3866e5.796909"]]},{"id":"6a58d6f5.b710a8","type":"inject","z":"421fdc9c.1f8134","name":"Set","props":[{"p":"topic","vt":"str"},{"p":"sys_id","v":"e0650148871070107aa7cbb9cebb35cb","vt":"str"},{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"incident","payload":"{\"short_description\":\"patch Record Node\"}","payloadType":"json","x":150,"y":460,"wires":[["c3f5775a.df0978"]]},{"id":"fb46a6ec.4b376","type":"retrieve records","z":"421fdc9c.1f8134","name":"","server":"","x":340,"y":260,"wires":[["b3866e5.796909"]]},{"id":"bd788f44.140e9","type":"inject","z":"421fdc9c.1f8134","name":"Set","props":[{"p":"topic","vt":"str"},{"p":"sysparm_query","v":"","vt":"str"},{"p":"sysparm_limit","v":"10","vt":"str"},{"p":"display_value","v":"false","vt":"jsonata"},{"p":"msg.sysparm_exclude_reference_link","v":"false","vt":"jsonata"},{"p":"sysparm_fields","v":"","vt":"str"},{"p":"sysparm_view","v":"view","vt":"str"},{"p":"sysparm_query_category","v":"category","vt":"str"},{"p":"sysparm_query_no_domain","v":"false","vt":"jsonata"},{"p":"sysparm_no_count","v":"false","vt":"jsonata"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"incident","payloadType":"str","x":140,"y":260,"wires":[["fb46a6ec.4b376"]]},{"id":"66469ea0.544bc8","type":"inject","z":"421fdc9c.1f8134","name":"Set","props":[{"p":"topic","vt":"str"},{"p":"sysparm_limit","v":"40","vt":"num"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"incident","payloadType":"str","x":140,"y":300,"wires":[["fb46a6ec.4b376"]]},{"id":"fb91ffdc.266a9","type":"comment","z":"421fdc9c.1f8134","name":"Nodes for ServiceNow Table API","info":"","x":190,"y":220,"wires":[]},{"id":"1221d549.6b2b63","type":"retrieve record","z":"421fdc9c.1f8134","name":"","server":"","x":340,"y":340,"wires":[["b3866e5.796909"]]},{"id":"7c99af4c.a240c8","type":"inject","z":"421fdc9c.1f8134","name":"Set","props":[{"p":"topic","vt":"str"},{"p":"sys_id","v":"4c806e31871030107aa7cbb9cebb35dd","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"incident","x":150,"y":340,"wires":[["1221d549.6b2b63"]]},{"id":"fdbcd7c1.5f5af8","type":"create record","z":"421fdc9c.1f8134","name":"","server":"","x":330,"y":380,"wires":[["b3866e5.796909"]]},{"id":"574b92d4.99624c","type":"inject","z":"421fdc9c.1f8134","name":"Set","props":[{"p":"topic","vt":"str"},{"p":"payload"},{"p":"display_value","v":"true","vt":"jsonata"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"incident","payload":"{\"short_description\":\"Create Record Node\"}","payloadType":"json","x":150,"y":380,"wires":[["fdbcd7c1.5f5af8"]]},{"id":"56253416.c9be7c","type":"create record","z":"421fdc9c.1f8134","name":"","server":"","x":680,"y":660,"wires":[[]]}]´´
´´´
