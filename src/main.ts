
import { button, div, h2, input, p, padding, popup, style, table, td, textarea, th, tr } from "./html"

import { Ajv } from "ajv";

// Route	Description

// POST /v1/identity	Generate a new identity and token.
// POST /v1/identity/websocket-token	Generate a short-lived access token for use in untrusted contexts.
// GET /v1/identity/public-key	Get the public key used for verifying tokens.
// GET /v1/identity/:identity/databases	List databases owned by an identity.
// GET /v1/identity/:identity/verify	Verify an identity and token.

// POST /v1/database	Publish a new database given its module code.
// POST /v1/database/:name_or_identity	Publish to a database given its module code.
// GET /v1/database/:name_or_identity	Get a JSON description of a database.
// DELETE /v1/database/:name_or_identity	Delete a database.
// GET /v1/database/:name_or_identity/names	Get the names this database can be identified by.
// POST /v1/database/:name_or_identity/names	Add a new name for this database.
// PUT /v1/database/:name_or_identity/names	Set the list of names for this database.
// GET /v1/database/:name_or_identity/identity	Get the identity of a database.
// GET /v1/database/:name_or_identity/subscribe	Begin a WebSocket connection.
// POST /v1/database/:name_or_identity/call/:reducer	Invoke a reducer in a database.
// GET /v1/database/:name_or_identity/schema	Get the schema for a database.
// GET /v1/database/:name_or_identity/logs	Retrieve logs from a database.
// POST /v1/database/:name_or_identity/sql	Run a SQL query against a database.

// const db_url = 'http://localhost:3000/v1/database/lexxtract'

const db_url = "https://maincloud.spacetimedb.com"
const body = document.body;

const DBNAME = "lexxtract"

let access_token = null;

async function setup(){
  await fetch(`${db_url}/v1/identity`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
  }).then(res=>res.json()).then(text=>access_token = text.token)

}

setup()

function add_data(prompt: string, schema: string, response: string, provider: string, model: string){
  const ajv = new Ajv();
  const validate = ajv.compile(JSON.parse(schema));
  const valid = validate(JSON.parse(response));
  if (!valid) {
    console.error("ERROR posting to database: ", validate.errors);  
    throw new Error(validate.errors ? validate.errors.map(e=>e.message).join(', ') : 'Invalid response');
  }

  fetch(`${db_url}/v1/database/${DBNAME}/call/add_call`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`
    },
    body: JSON.stringify({prompt, schema, response, provider, model})
  })

  .then(res=>res.text()).then(text=>{
    console.log(text)
  })
}

function query_data(sql: string){
  return fetch(`${db_url}/v1/database/${DBNAME}/sql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`
    },
    body: sql
  })
  
  .then(res=>{console.log(res); return res.json()}).then(data=>{
    if (data.length > 1) console.warn("multiple rows returned, TODO: handle this")
    let {schema, rows} = data[0]
    return {names: schema.elements.map(e=>e.name.some),rows}
  })
  .catch(e=>{console.error(e);
    popup(p(e.message))
    return {names: ["error"], rows: [e.message]}})
}


let bubble = style(
  {
    padding: "1.5em",
    margin: ".5em",
    borderRadius: "1em",
    background: "var(--background-color)",
    color: "var(--color)",
    border: "1px solid #ccc",
  }
)


body.appendChild(h2(
  "LEXXTRACT DATABASE DASHBOARD"
))



{

  let userinput = textarea(
    style({fontFamily: "monospace", padding: ".5em"}),
    "select * from llm_result limit 100"
  )

  userinput.rows = 2;
  userinput.cols = 100;

  let result = div()
  body.append(
    div(

      bubble,
      p("SQL console:"),
      userinput,

      button("run", {onclick: ()=>{
        result.innerHTML = ""
        result.append(p("running..."))
        query_data(userinput.value).then(data=>{
          result.innerHTML = ""
          result.append(table(
            bubble,
            tr(
              ...data.names.map(name=>th(style({border: "1px solid #ccc", padding: ".5em"}), name)),
            ),
            ...data.rows.map(row=>tr(
              style({cursor: "pointer"}),
              {onclick: ()=>{
                popup(
                  table(
                    data.names.map((name, index)=>
                      tr(
                        td(name, style({border: "1px solid #ccc", padding: ".5em"})),
                        td(row[index], style({border: "1px solid #ccc", padding: ".5em"})),
                      )
                    ),
                    style({borderCollapse: "collapse"})
                  )
                )
              }},
              ...row.map(cell=>td(style({border: "1px solid #ccc", padding: ".5em"}), cell))
            )),
            style({borderCollapse: "collapse"})
          ))
        })
      }}),

      result
    )
  )
}


{

  let schemafield = textarea(

`{
  "type": "object",
  "properties": {
    "id": { "type": "string" }
  },
  "required": ["id"],
  "additionalProperties": false
}`
  )

  let responsefield = textarea(
`{"id": "some text"}`
  )


  schemafield.rows = 10;
  responsefield.rows = 10;

  schemafield.cols = 100;
  responsefield.cols = 100; 

  schemafield.oninput = ()=>{
    console.log(schemafield.value)
  }

  responsefield.oninput = ()=>{
    console.log(responsefield.value)
  }

  let inputs = [
    input("generate text", { placeholder: "prompt"}),

    schemafield,
    responsefield,

  ]

  document.body.appendChild(div(
    bubble,
    p("add call data:"),

    table(
      tr(td("prompt"), td(inputs[0])),
      tr(td("schema"), td(inputs[1])),
      tr(td("response"), td(inputs[2])),
      tr(td("provider"), "dashboard_test"),
      tr(td("model"), "dashboard_test"),
    ),
    button("push", {onclick: ()=>{
      add_data(inputs[0].value, inputs[1].value, inputs[2].value, "dashboard_test", "dashboard_test")
    }}),
  ))
}
