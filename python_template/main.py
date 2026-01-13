from dataclasses import dataclass
import requests
import asyncio


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
  return response.json()


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

async def query_data(sql: str):
  data = await db_request(f"/v1/database/{dbname}/sql", "POST", body = sql.encode("utf-8"))
  names = list(map(lambda x: x['name']['some'], data[0]['schema']['elements']))
  rows = data[0]['rows']
  return Table(names, rows)

def main():
  worker = query_data("select * from llm_result limit 100")

  res = asyncio.run(worker)
  print(res)

if __name__ == "__main__":
  main()
