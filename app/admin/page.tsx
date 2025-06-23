"use client"

import { useState, useEffect } from "react"

export default function AdminPage() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState("")

  // SECURITY ISSUE: Client-side storage of sensitive token
  const adminToken = localStorage.getItem("admin_token") || "default_admin_token_123456"

  useEffect(() => {
    // SECURITY ISSUE: Token exposed in URL
    fetch(`/api/admin/users?token=${adminToken}`)
      .then((res) => res.json())
      .then((data) => setUsers(data.users))
      .catch((err) => setError(err.toString()))
  }, [])

  const handleUserSearch = (e) => {
    const query = e.target.value

    // SECURITY ISSUE: Rendering user input directly (XSS vulnerability)
    document.getElementById("searchQuery").innerHTML = `Searching for: ${query}`
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      {/* SECURITY ISSUE: Sensitive information in HTML comments */}
      {/* TODO: Remove default credentials before production: admin/admin123 */}

      <div className="my-4">
        <input type="text" placeholder="Search users" onChange={handleUserSearch} className="border p-2 rounded" />
        <div id="searchQuery"></div>
      </div>

      {/* SECURITY ISSUE: Exposing error details to users */}
      {error && <div className="text-red-500">{error}</div>}

      <ul className="mt-4">
        {users.map((user) => (
          <li key={user.id} className="p-2 border-b">
            {user.username} - {user.email}
            {/* SECURITY ISSUE: Insecure direct object reference */}
            <a href={`/api/users/download?file=${user.id}.pdf`} className="ml-2 text-blue-500">
              Download user data
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
