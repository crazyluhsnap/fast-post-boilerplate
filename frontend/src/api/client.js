const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

export async function apifetch(path, options={}){
    const response = await fetch(`${API_BASE_URL}${path}`,{
        headers:{
            "Content-Type": "application/json",
            ...(options.headers || {}),
        },
        ...options
    });

    if(!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Something went wrong");
    }
    return response.json();
}