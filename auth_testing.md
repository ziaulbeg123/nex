# Auth Testing Playbook — Nexvora Labs

## Step 1: MongoDB Verification
```
mongosh
use test_database
db.users.find({role: "admin"}).pretty()
db.users.findOne({role: "admin"}, {password_hash: 1})
```
Verify: bcrypt hash starts with `$2b$`, unique index exists on users.email.

## Step 2: API Testing
```
API_URL=$(grep REACT_APP_BACKEND_URL /app/frontend/.env | cut -d '=' -f2)
curl -X POST "$API_URL/api/auth/login" -H "Content-Type: application/json" \
  -d '{"email":"admin@nexvoralabs.com","password":"nexvora123"}'
```
Login returns `{token, user}` and sets an `access_token` httpOnly cookie.

```
TOKEN=<token from login>
curl -X GET "$API_URL/api/auth/me" -H "Authorization: Bearer $TOKEN"
curl -X GET "$API_URL/api/leads" -H "Authorization: Bearer $TOKEN"
```
`/api/auth/me` returns the admin user. `/api/leads` returns the leads array (401 without token).

## Step 3: Lead capture (public)
```
curl -X POST "$API_URL/api/leads" -H "Content-Type: application/json" \
  -d '{"full_name":"Test Lead","email":"lead@example.com","phone":"+91 9000000000","interested_plan":"Plus","message":"Interested in the Plus plan"}'
```
Then verify the lead appears in `GET /api/leads` with the `interested_plan` field.
