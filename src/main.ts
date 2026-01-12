
import { button, div, h2, input, p, padding, popup, style, table, td, textarea, th, tr } from "./html"

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

// document.body.innerHTML = "<h1>hello lexxtract_server</h1>"

const db_url = 'http://localhost:3000/v1/database/lexxtract'

const body = document.body;

function add_call(prompt: string, schema: string, response: string, provider: string, model: string){
  fetch(`${db_url}/call/add_call`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({prompt, schema, response, provider, model})
  }).then(res=>res.text()).then(text=>{
    console.log(text)
  })
}

function run_sql(sql: string){
  return fetch(`${db_url}/sql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: sql
  }).then(res=>res.json()).then(data=>{
    if (data.length > 1) console.warn("multiple rows returned, TODO: handle this")
    let {schema, rows} = data[0]
    return {names: schema.elements.map(e=>e.name.some),rows}
  })
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

  let inputs = [
    input("generate text", { placeholder: "prompt"}),
    input("{'content': 'string'}", { placeholder: "schema"}),
    input("{'content': 'some text'}", { placeholder: "response"}),
    input("openrouter", { placeholder: "provider"}),
    input("gpt-4o", { placeholder: "model"}),
  ]

  document.body.appendChild(div(
    bubble,
    p("add call data:"),
    inputs,
    button("push", {onclick: ()=>{
      add_call(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value, inputs[4].value)
    }})
  ))
}


{

  let userinput = textarea(
    "select * from llm_result"
  )

  let result = div()
  body.append(
    div(

      bubble,
      p("SQL console:"),
      userinput,

      button("run", {onclick: ()=>{
        result.innerHTML = ""
        result.append(p("running..."))
        run_sql(userinput.value).then(data=>{
          result.innerHTML = ""
          result.append(table(
            bubble,
            tr(
              ...data.names.map(name=>th(name)),
            ),
            ...data.rows.map(row=>tr(
              style({cursor: "pointer",}),
              {onclick: ()=>{
                popup(

                  table(
                    data.names.map((name, index)=>
                      tr(
                        td(name),
                        td(row[index])
                      )
                    ),
                  )
                )
              }},
              ...row.map(cell=>td(cell))
            ))
          ))
        })
      }}),

      result
    )
  )
}

async function main(){

  fetch(`${db_url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res=>res.json()).then(text=>{
    console.log(text)
  })

  run_sql("select * from llm_result").then(data=>{
    console.log(data)
  })
  
}


main()

