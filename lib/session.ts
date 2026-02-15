export async function getCurrentUser() {
  return {
    id: "demo-user-id",
    name: "Demo Kullanıcı",
    email: "demo@example.com",
    image: null,
  }
}

export async function requireAuth() {
  return getCurrentUser()
}
