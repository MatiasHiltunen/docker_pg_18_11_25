import { client } from "services/hono_client"
import type { Route } from "./+types/todos"

export async function loader({}:Route.LoaderArgs) {
  
  const response = await client.todos.$get({})

  const todos = await response.json()

  return {todos}

}

async function action() {
    
}


export default function Todos({loaderData}: Route.ComponentProps) {


    return <>   
        {JSON.stringify(loaderData.todos)}
    </>
}