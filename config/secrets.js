// SECURITY ISSUE: Secrets in source code that should be environment variables
export const config = {
  apiKeys: {
    stripe:
      "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",
    sendgrid: "SG.pKvc3DQyQGyEjNvU_1ow2A.vBSZpxGjPb8L8K0QX",
    aws: "AKIAIOSFODNN7EXAMPLE:wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
  },
  jwt: {
    secret: "this_is_a_very_long_secret_that_should_be_kept_private_12345",
    expiresIn: "7d",
  },
  database: {
    connectionString: "postgres://username:password@production-db.example.com:5432/mydb",
  },
}
