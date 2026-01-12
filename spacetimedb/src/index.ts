import { schema, table, t} from 'spacetimedb/server';


const LLM_Results = table(
  {
    name: 'llm_result',
    public: true
  },
  {
    id: t.u128().autoInc().primaryKey(),
    prompt: t.string(),
    schema: t.string(),
    response: t.string(),
    provider: t.string(),
    model: t.string(),
  }
)

function validateSchema(content: string, schema: string){
  return true;
}

export const spacetimedb = schema(LLM_Results)




spacetimedb.reducer('add_call', {
  prompt: t.string(),
  schema: t.string(),
  response: t.string(),
  provider: t.string(),
  model: t.string(),
}, (ctx, { prompt, schema, response, provider, model }) => {


  if (!validateSchema(prompt, schema)) {
    throw new Error('Invalid schema');
  }

  ctx.db.llmResult.insert({id: 0n, prompt, schema, response, provider, model });


});
