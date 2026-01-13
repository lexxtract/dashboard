
# const db_url = "https://maincloud.spacetimedb.com"
# const body = document.body;

# const DBNAME = "lexxtract"

# let access_token = null;

# async function setup(){
#   await fetch(`${db_url}/v1/identity`, {
#     method: 'POST',
#     headers: {'Content-Type': 'application/json'},
#   }).then(res=>res.json()).then(text=>access_token = text.token)

# }

# setup()

# function add_data(prompt: string, schema: string, response: string, provider: string, model: string){
#   const ajv = new Ajv();
#   const validate = ajv.compile(JSON.parse(schema));
#   const valid = validate(JSON.parse(response));
#   if (!valid) {
#     console.error("ERROR posting to database: ", validate.errors);  
#     throw new Error(validate.errors ? validate.errors.map(e=>e.message).join(', ') : 'Invalid response');
#   }

#   fetch(`${db_url}/v1/database/${DBNAME}/call/add_call`, {
#     method: 'POST',
#     headers: {
#       'Content-Type': 'application/json',
#       'Authorization': `Bearer ${access_token}`
#     },
#     body: JSON.stringify({prompt, schema, response, provider, model})
#   })

#   .then(res=>res.text()).then(text=>{
#     console.log(text)
#   })
# }

# function query_data(sql: string){
#   return fetch(`${db_url}/v1/database/${DBNAME}/sql`, {
#     method: 'POST',
#     headers: {
#       'Content-Type': 'application/json',
#       'Authorization': `Bearer ${access_token}`
#     },
#     body: sql
#   })
  
#   .then(res=>{console.log(res); return res.json()}).then(data=>{
#     if (data.length > 1) console.warn("multiple rows returned, TODO: handle this")
#     let {schema, rows} = data[0]
#     return {names: schema.elements.map(e=>e.name.some),rows}
#   })
#   .catch(e=>{console.error(e);
#     popup(p(e.message))
#     return {names: ["error"], rows: [e.message]}})
# }

import requests

import asyncio


async def setup():
  response = requests.post("https://maincloud.spacetimedb.com/v1/identity", json={})
  data = response.json()["token"]
  print(data)


if __name__ == "__main__":
  asyncio.run(setup())