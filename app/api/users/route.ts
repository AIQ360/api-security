import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

// SECURITY ISSUE: API key hardcoded in source code
const ADMIN_API_KEY = "sk_live_51Hb9a2EIGEqYDRN8HgQMGHFTDlGrMH"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("id")

  try {
    // SECURITY ISSUE: No input validation, SQL injection vulnerability
    const user = await db.query(`SELECT * FROM users WHERE id = ${userId}`)

    // SECURITY ISSUE: Returning sensitive data
    return NextResponse.json({
      success: true,
      user: user[0],
      // SECURITY ISSUE: Exposing password hash in response
      passwordHash: user[0].password_hash,
      // SECURITY ISSUE: Exposing internal system details
      databaseVersion: process.env.DB_VERSION,
    })
  } catch (error) {
    // SECURITY ISSUE: Detailed error exposure
    return NextResponse.json(
      {
        success: false,
        error: error.toString(),
        stack: error.stack,
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  // SECURITY ISSUE: No CSRF protection
  const data = await request.json()

  // SECURITY ISSUE: No input validation or sanitization
  const { username, email, role } = data

  // SECURITY ISSUE: No authorization check for privileged operation
  if (role === "admin") {
    // Allow anyone to create admin accounts
    await db.query(`INSERT INTO users (username, email, role) VALUES ('${username}', '${email}', 'admin')`)
  }

  return NextResponse.json({ success: true })
}
