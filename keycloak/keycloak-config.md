# Keycloak Configuration

## Realm: security-realm

### Clients

1. **security-frontend** (Public Client)

   - Client ID: security-frontend
   - Valid Redirect URIs: http://localhost:3000/\*
   - Web Origins: http://localhost:3000
   - Access Type: public

2. **security-backend** (Confidential Client)
   - Client ID: security-backend
   - Access Type: confidential
   - Service Accounts Enabled: true
   - Client Secret: [zapisz tutaj secret z Keycloak]

### Roles

- admin: Administrator role
- user: Standard user role

### Test Users

1. **Admin User**

   - Username: admin
   - Password: admin123
   - Email: admin@example.com
   - Roles: admin

2. **Regular User**
   - Username: user
   - Password: user123
   - Email: user@example.com
   - Roles: user

### URLs

- Keycloak Admin: http://localhost:8080
- Realm: http://localhost:8080/realms/security-realm
- OpenID Connect Config: http://localhost:8080/realms/security-realm/.well-known/openid_configuration
