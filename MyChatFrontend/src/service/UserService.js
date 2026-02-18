async function getUserDetail(signal) {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/getuser`, {
    method: "GET",
    credentials: "include",
    signal: signal,
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data?.response?.message || "Unauthorized");
    error.status = response.status;
    throw error;
  }
  return data;
}
export default getUserDetail;
