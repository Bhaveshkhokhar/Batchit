export async function checkAuthStatus(signal) {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/status`, {
    method: "GET",
    credentials: "include",
    signal,
  });

  const result = await response.json(); // 🔥 Debug log

  if (!response.ok) {
    const error = new Error(result?.message || "Unauthorized");
    error.status = response.status;
    throw error;
  }

  return result;
}
