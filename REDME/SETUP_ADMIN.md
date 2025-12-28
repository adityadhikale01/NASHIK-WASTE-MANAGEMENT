# Quick Setup - Admin Dashboard

## Step 1: Create Database Tables (Run Once)

Copy and paste this into your MySQL client or phpMyAdmin:

```sql
CREATE TABLE IF NOT EXISTS complaints (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    description LONGTEXT,
    status VARCHAR(50) DEFAULT 'Pending',
    notes LONGTEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS scheduled_pickups (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    item VARCHAR(255) NOT NULL,
    day VARCHAR(50) NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending',
    notes LONGTEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Step 2: Verify Server is Running

```bash
# In your project directory
node index.js
# or with auto-reload
npx nodemon index.js
```

You should see: `Connected to MySQL database`

## Step 3: Access Admin Dashboard

Open your browser and go to:
```
http://localhost:3000/admin
```

## Step 4: Test the System

1. **Submit a complaint**: Go to `http://localhost:3000/complaints`
2. **Schedule a pickup**: Go to `http://localhost:3000/schedule_pickup`
3. **Manage in admin**: Go back to `/admin` to see submitted data

## Files Modified/Created

✅ Updated: `index.js` - Added routes and API endpoints
✅ Updated: `views/admin.ejs` - Created admin dashboard
✅ Created: `database_schema.sql` - Database table definitions
✅ Created: `ADMIN_DASHBOARD_README.md` - Full documentation

## Quick Reference

| URL | Purpose |
|-----|---------|
| `/admin` | Admin dashboard |
| `/complaints` | User complaint form |
| `/schedule_pickup` | Pickup scheduling form |
| `/api/complaints` | Complaints API endpoint |
| `/api/pickups` | Pickups API endpoint |

## Test API with curl

```bash
# Get all complaints
curl http://localhost:3000/api/complaints

# Get all pickups
curl http://localhost:3000/api/pickups

# Create a complaint
curl -X POST http://localhost:3000/api/complaints \
  -H "Content-Type: application/json" \
  -d '{
    "name":"John Doe",
    "email":"john@example.com",
    "location":"Sector 21",
    "type":"Overflowing Waste Bins",
    "description":"Bins are overflowing"
  }'

# Create a pickup
curl -X POST http://localhost:3000/api/pickups \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Jane Smith",
    "address":"123 Main St",
    "item":"Old Sofa",
    "day":"Saturday"
  }'
```

## Admin Dashboard Features

### Complaints Tab
- View all complaints with real-time stats
- Filter by name, email, or location
- Filter by status (Pending, In Progress, Resolved)
- View detailed complaint information
- Update status and add admin notes
- Delete complaints

### Pickups Tab
- View all scheduled pickups with real-time stats
- Filter by name or address
- Filter by status (Pending, In Progress, Completed)
- View detailed pickup information
- Update status and add driver notes
- Delete pickups

## Styling Features

✨ Modern gradient design
✨ Responsive layout (mobile friendly)
✨ Color-coded status badges
✨ Interactive modals for detailed views
✨ Real-time statistics cards
✨ Smooth animations and transitions
✨ Bootstrap integration for components

## Next Steps

After setup, consider:
1. ✅ Create database tables
2. ✅ Start the server
3. ✅ Test complaint submission
4. ✅ Test pickup scheduling
5. ✅ Access admin dashboard
6. ✅ Try managing complaints and pickups
7. 📝 Add authentication (optional but recommended)
8. 📧 Set up email notifications (optional)

---
For detailed documentation, see `ADMIN_DASHBOARD_README.md`
