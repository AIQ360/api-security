// SECURITY ISSUE: Credentials in source code
export const db = {
  host: "production-db.example.com",
  user: "admin_user",
  password: "super_secret_password_123!",
  database: "users_production",

  async query(sql: string) {
    // Mock implementation
    console.log(`Executing query: ${sql}`)
    return [
      {
        id: 1,
        username: "user1",
        email: "user@example.com",
        password_hash: "$2a$10$XQq3PZFbCSLKBf4nHZUJL.C8de6Ym1Uy9",
      },
    ]
  },
}
