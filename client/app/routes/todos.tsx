import { client } from "services/hono_client"
import type { Route } from "./+types/todos"
import { Form, useActionData } from "react-router"

// Tätä me ei itse importoida, vaan React Router Framework hoitaa sen taustalla
export async function loader({ }: Route.LoaderArgs) {

  const response = await client.todos.$get()

  const todos = await response.json()

  return { todos }

}

export async function action({ request }: Route.ActionArgs) {

  try {

    
    const formData = await request.formData()
    
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    
    const response = await client.todos.$post({
      json: {
        title,
        description
      }
    })

    if(!response.ok) {
      return {error: "Failed to create todo item, status: " + response.status}
    }

    
  } catch (error: any) {
    console.error("Error in todo action:", error);  
    return { error: error.toString() };
  }



}

export default function Todos({ loaderData }: Route.ComponentProps) {

  const actionData = useActionData<typeof action>()

  const todos = loaderData.todos.map((t) => {

    return <li onClick={async ()=>{

      const response = await client.todos[":id"].$patch(
        {
          param: { id: t.id.toString() },
          json: {
            is_completed: !t.is_completed,
            title: t.title,
            description: t.description
          }
        }
      )

      const todo = await response.json()

      console.log(todo)


    }} key={t.id + "_todos"}>{t.title} {t.description} done: {t.is_completed.toString()}</li>
  })


  return <>

    { actionData?.error && <h1> {actionData.error} </h1>}

    <div>
      {todos}
    </div>
    <div>
      <Form action="/todos" method="post">
        <input name="title" type="text" />
        <input name="description" type="text" />
        <button type="submit">Add Todo</button>
      </Form>


    </div>

  </>
}