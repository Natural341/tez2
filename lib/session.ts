export async function getCurrentUser() {
  // Demo Modu: Her zaman bir kullanıcı dönüyoruz
  return {
    id: "demo-user-id",
    name: "Demo Kullanıcı",
    email: "demo@example.com",
    image: null,
  }
}

export async function requireAuth() {
  // Demo Modu: Her zaman yetki veriyoruz
  return getCurrentUser()
}
