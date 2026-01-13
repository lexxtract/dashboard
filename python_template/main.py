from dataclasses import dataclass
import requests
import asyncio
import json


db_url = "https://maincloud.spacetimedb.com"
dbname = "lexxtract"

token : str = None

async def db_request(path: str, method: str, body: str = None):
  global token
  if not token:
    token = requests.post(f"{db_url}/v1/identity", json={}).json()["token"] 
  
  headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {token}"
  }

  response = requests.request(method, f"{db_url}{path}", headers=headers, data=body)
  return response


@dataclass
class Table:
  names: list[str]
  rows: list[list[any]]
  def __repr__(self):
    cols = len(self.names)
    colw = 10
    res = f'TABLE[{cols}x{len(self.rows)}]\n' + '-' * ((colw + 1) * cols + 1) + '\n'
    for row in [self.names] + self.rows[:10]:
      res += '|' + '|'.join(map(lambda x: str(x).replace('\n', '')[:colw].ljust(colw), row)) + '|\n'
    return res

def query_data(sql: str):
  data = asyncio.run(db_request(f"/v1/database/{dbname}/sql", "POST", body = sql.encode("utf-8"))).json()
  names = list(map(lambda x: x['name']['some'], data[0]['schema']['elements']))
  rows = data[0]['rows']
  return Table(names, rows)


def insert_data(prompt: str, schema: str, response: str, provider: str, model:str):

  body = json.dumps({
    "prompt": prompt,
    "schema": schema,
    "response": response,
    "provider": provider,
    "model": model
  }).encode("utf-8")
  ret = asyncio.run(db_request(f"/v1/database/{dbname}/call/add_call", "POST", body = body))
  if ret.status_code != 200:
    print("ERROR:", ret.text)
    return
  else:
    print("data inserted")
    return


def query(prompt: str, schema: str, model = "python", provider = "python"):
  cached = query_data(f"select * from llm_result where prompt = '{prompt}' and schema = '{schema}' and model = '{model}' and provider = '{provider}'")
  if cached.rows:
    return cached.rows[0][3]
  else:
    response = '{"id": "some text"}'
    insert_data(prompt, schema, response, provider, model)
    return response

    

mini_schema = '''{
  "type": "object",
  "properties": {
    "id": { "type": "string" }
  },
  "required": ["id"],
  "additionalProperties": false
}'''

def main():

  # insert_data("prompt", schema, '{"id": "some text"}', "python_template", "python_template")

  # res =  query_data("select * from llm_result limit 100")

  res = query("heyy2", mini_schema, "python", "python")

  print(res)




if __name__ == "__main__":
  # asyncio.run(main())
  main()
