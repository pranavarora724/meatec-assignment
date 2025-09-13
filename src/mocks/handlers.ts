import { http, HttpResponse } from "msw";

import { TaskStore } from "@/stores/TaskStore";
import { type Task } from "@/types";


const fakeToken = "fake-jwt-token-123";

function isAuthorized(request: Request) {
  const authHeader = request.headers.get("Authorization");
  return authHeader === `Bearer ${fakeToken}`;
}

type LoginBody = {
  username: string;
  password: string;
};

export const handlers = [

    http.post("/login", async ({ request }) => {
    const body = await request.json() as LoginBody;

    if (body?.username === "test" && body?.password === "test123") {
      return HttpResponse.json({ token: fakeToken }, { status: 200 });
    }
    return HttpResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }),

  http.get("/tasks", async ({request}) => {
    
    if (!isAuthorized(request)) {
      return HttpResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const tasks = TaskStore.getState().tasks;
    // let tasks ;
    return HttpResponse.json({ tasks: tasks }, { status: 200 });
    
	}),


  http.post("/tasks", async ({request}) => {
    
    if (!isAuthorized(request)) {
      return HttpResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = (await request.json())as Task;
    TaskStore.getState().addTask(body); 
    return HttpResponse.json(body, { status: 200 });
	}),

  
  http.put("/tasks/:id", async ({ params, request }) => {
    const { id } = params;
    const updates = (await request.json()) as Partial<Task>;

    TaskStore.getState().updateTask(id as string, updates);
    const updated = TaskStore.getState().tasks.find(t => t.id === id);
    return HttpResponse.json(updated , { status: 200 });
  }),

  
  http.delete("/tasks/:id", ({ params }) => {
    const { id } = params;
    TaskStore.getState().removeTask(id as string);
    return HttpResponse.json({ success: true } , {status:200});
  })
]
