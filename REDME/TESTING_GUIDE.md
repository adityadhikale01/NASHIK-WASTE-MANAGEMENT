# Testing Guide - Admin Dashboard

## 🧪 Complete Testing Instructions

### Prerequisites
- Node.js installed
- MySQL running
- Project dependencies installed (`npm install`)
- Database tables created (from `database_schema.sql`)

---

## Part 1: Database Setup & Server Start

### Step 1.1: Create Database Tables
```sql
-- Option A: Copy and paste into MySQL console or phpMyAdmin

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

### Step 1.2: Start the Server
```bash
# Open terminal in project directory
node index.js

# Or with auto-reload (recommended for development)
npx nodemon index.js
```

Expected output:
```
Connected to MySQL database
Server is running on http://localhost:3000
```

✅ If you see this, database is connected and ready!

---

## Part 2: Test Complaint Submission

### Test 2.1: Submit a Complaint via Web Form
1. Open browser: `http://localhost:3000/complaints`
2. Fill in the form:
   - Name: "John Doe"
   - Email: "john@example.com"
   - Location: "Sector 21, Main Road"
   - Complaint Type: "Overflowing Waste Bins"
   - Description: "Bins are overflowing in my area"
3. Click "Submit Complaint"
4. Should see: ✅ Success message

### Test 2.2: Submit a Complaint via API (curl)
```bash
curl -X POST http://localhost:3000/api/complaints \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "location": "Downtown Center",
    "type": "Missed Collection",
    "description": "Waste was not collected on scheduled day"
  }'
```

Expected response:
```json
{"success": true, "id": 1}
```

### Test 2.3: Submit Multiple Complaints
Repeat Test 2.2 with different data:
```bash
# Complaint 3
curl -X POST http://localhost:3000/api/complaints \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ahmed Khan",
    "email": "ahmed@example.com",
    "location": "Park Avenue",
    "type": "Rodents/Insects",
    "description": "Rats and insects around trash area"
  }'

# Complaint 4
curl -X POST http://localhost:3000/api/complaints \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Sarah Wilson",
    "email": "sarah@example.com",
    "location": "Residential Area",
    "type": "Burning of Waste",
    "description": "Someone is burning waste illegally"
  }'

# Complaint 5
curl -X POST http://localhost:3000/api/complaints \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Michael Brown",
    "email": "michael@example.com",
    "location": "Industrial Zone",
    "type": "Other",
    "description": "General waste management issue"
  }'
```

---

## Part 3: Test Scheduled Pickups

### Test 3.1: Submit Pickup via Web Form
1. Open browser: `http://localhost:3000/schedule_pickup`
2. Fill in the form:
   - Name: "Robert Johnson"
   - Address: "123 Maple Street, Apt 5B"
   - Waste Item: "Old Sofa"
   - Preferred Day: "Saturday"
3. Click "Submit Request"
4. Should see: ✅ Confirmation message

### Test 3.2: Submit Pickup via API (curl)
```bash
curl -X POST http://localhost:3000/api/pickups \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Emma Davis",
    "address": "456 Oak Street, House 10",
    "item": "Refrigerator",
    "day": "Monday"
  }'
```

Expected response:
```json
{"success": true, "id": 1}
```

### Test 3.3: Submit Multiple Pickups
```bash
# Pickup 2
curl -X POST http://localhost:3000/api/pickups \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Lisa Anderson",
    "address": "789 Pine Road",
    "item": "Washing Machine",
    "day": "Wednesday"
  }'

# Pickup 3
curl -X POST http://localhost:3000/api/pickups \
  -H "Content-Type: application/json" \
  -d '{
    "name": "David Martinez",
    "address": "321 Elm Avenue",
    "item": "Bed Frame",
    "day": "Friday"
  }'

# Pickup 4
curl -X POST http://localhost:3000/api/pickups \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jessica Taylor",
    "address": "654 Cedar Lane",
    "item": "Office Desk",
    "day": "Saturday"
  }'
```

---

## Part 4: Test Admin Dashboard

### Test 4.1: Access Admin Dashboard
1. Open browser: `http://localhost:3000/admin`
2. You should see:
   - 📊 Statistics cards showing:
     - Total Complaints: 5
     - Pending Complaints: 5
     - In Progress: 0
     - Resolved: 0
     - Total Pickups: 4
     - Pending Pickups: 4
     - In Progress: 0
     - Completed: 0
   - Two tabs: "Complaints" and "Scheduled Pickups"

### Test 4.2: View Complaints Table
1. Stay on Complaints tab
2. You should see all 5 complaints listed with:
   - ID
   - Name
   - Email
   - Location
   - Complaint Type
   - Date
   - Status (Pending)
   - Action buttons (View, Update, Delete)

### Test 4.3: View Complaint Details
1. Click "View" button on any complaint
2. Modal popup appears with full details:
   - Name and email
   - Location
   - Complaint type
   - Date submitted
   - Status
   - Full description

### Test 4.4: Update Complaint Status
1. Click "Update" button on a complaint
2. Modal opens with:
   - Status dropdown (currently: Pending)
   - Notes textarea (empty)
3. Change status to "In Progress"
4. Add note: "Currently investigating this issue"
5. Click "Update"
6. ✅ Alert: "Complaint updated successfully!"
7. Table refreshes automatically
8. Status badge changes to "In Progress"
9. Statistics update: Pending now shows 4, In Progress shows 1

### Test 4.5: Update Multiple Complaints
Repeat Test 4.4 with different statuses:

Complaint 2:
- Status: "Resolved"
- Note: "Issue has been resolved, bins emptied"

Complaint 3:
- Status: "In Progress"
- Note: "Pest control team scheduled for inspection"

After updates:
- Pending: 2
- In Progress: 2
- Resolved: 1

### Test 4.6: Delete a Complaint
1. Click "Delete" on one complaint
2. Confirm deletion in alert dialog
3. ✅ Alert: "Complaint deleted successfully!"
4. Table refreshes
5. Statistics update accordingly

### Test 4.7: Search Complaints
1. In the Complaints tab, find search box
2. Type a name: "john"
3. Table filters to show only matching complaints
4. Try searching by email: "jane@"
5. Try searching by location: "sector"

### Test 4.8: Filter by Status
1. Click "All Status" dropdown
2. Select "Resolved"
3. Table shows only resolved complaints
4. Combine search + status filter:
   - Search: "john"
   - Status: "Pending"
5. Shows filtered results

### Test 4.9: View Pickups Table
1. Click "Scheduled Pickups" tab
2. You should see all 4 pickups listed with:
   - ID
   - Name
   - Address
   - Waste Item
   - Preferred Day
   - Date Requested
   - Status (Pending)
   - Action buttons

### Test 4.10: Manage Pickups (Same as Complaints)
- View pickup details
- Update pickup status
- Add driver notes
- Delete pickups
- Search by name/address
- Filter by status

---

## Part 5: API Testing with Postman/Curl

### Test 5.1: GET All Complaints
```bash
curl http://localhost:3000/api/complaints
```

Response: Array of all complaints

### Test 5.2: GET All Pickups
```bash
curl http://localhost:3000/api/pickups
```

Response: Array of all pickups

### Test 5.3: Update Complaint (Alternative Method)
```bash
curl -X PUT http://localhost:3000/api/complaints/1 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "Resolved",
    "notes": "Fixed via API"
  }'
```

Response: `{"success": true}`

### Test 5.4: Update Pickup (Alternative Method)
```bash
curl -X PUT http://localhost:3000/api/pickups/1 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "Completed",
    "notes": "Item picked up successfully"
  }'
```

Response: `{"success": true}`

### Test 5.5: Delete Complaint
```bash
curl -X DELETE http://localhost:3000/api/complaints/1
```

Response: `{"success": true}`

### Test 5.6: Delete Pickup
```bash
curl -X DELETE http://localhost:3000/api/pickups/1
```

Response: `{"success": true}`

---

## Part 6: Edge Cases & Error Testing

### Test 6.1: Submit Complaint Without Required Fields
```bash
curl -X POST http://localhost:3000/api/complaints \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User"
    # Missing email, location, type
  }'
```

Expected: `{"success": false, "error": "Required fields missing"}`

### Test 6.2: Update Non-existent Complaint
```bash
curl -X PUT http://localhost:3000/api/complaints/99999 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "Resolved",
    "notes": "Test"
  }'
```

Expected: No error, but record won't actually update (silently fails - optional: add error checking)

### Test 6.3: Delete Non-existent Record
```bash
curl -X DELETE http://localhost:3000/api/complaints/99999
```

Expected: No error, but no record deleted

---

## Part 7: Database Verification

### Check Data in Database
```bash
# Using MySQL client
mysql -u root -p nwm

# List all complaints
SELECT * FROM complaints;

# List all pickups
SELECT * FROM scheduled_pickups;

# Count records
SELECT COUNT(*) as total FROM complaints;
SELECT COUNT(*) as total FROM scheduled_pickups;

# Check specific complaint
SELECT * FROM complaints WHERE id = 1;

# Check status distribution
SELECT status, COUNT(*) FROM complaints GROUP BY status;
```

---

## Part 8: Performance Testing

### Test 8.1: Bulk Insert
Insert 100+ records to test performance:

```bash
for i in {1..100}; do
  curl -X POST http://localhost:3000/api/complaints \
    -H "Content-Type: application/json" \
    -d "{
      \"name\": \"User $i\",
      \"email\": \"user$i@example.com\",
      \"location\": \"Location $i\",
      \"type\": \"Type $((i % 5))\",
      \"description\": \"Description for complaint $i\"
    }"
done
```

Check if:
- Dashboard still loads quickly
- Statistics calculate correctly
- Search/filter responsive

### Test 8.2: Large Dataset Search
With 100+ records:
- Search performance
- Filter performance
- Table rendering speed

---

## Part 9: Browser Compatibility

Test on different browsers:
- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

Check:
- Responsive design
- Modal functionality
- Form interactions
- Table display

---

## Part 10: UI/UX Testing

### Test 10.1: Responsive Design
1. Resize browser window to mobile size (320px)
2. Check:
   - Layout stacks properly
   - Buttons are accessible
   - Text is readable
   - No horizontal scroll

### Test 10.2: Interactive Elements
1. Hover over buttons - should show visual feedback
2. Click buttons - should trigger actions
3. Modals - should open and close smoothly
4. Form inputs - should accept data

### Test 10.3: User Feedback
Check that user sees:
- Loading states (if applicable)
- Success messages after updates
- Error alerts for invalid data
- Confirmation dialogs before delete

---

## 📋 Testing Checklist

```
COMPLAINTS MANAGEMENT:
☐ Submit complaint via form
☐ Submit complaint via API
☐ View all complaints in dashboard
☐ View complaint details
☐ Update complaint status
☐ Add admin notes
☐ Delete complaint
☐ Search complaints by name
☐ Search complaints by email
☐ Search complaints by location
☐ Filter complaints by status
☐ Combined search + filter

PICKUPS MANAGEMENT:
☐ Submit pickup via form
☐ Submit pickup via API
☐ View all pickups in dashboard
☐ View pickup details
☐ Update pickup status
☐ Add driver notes
☐ Delete pickup
☐ Search pickups by name
☐ Search pickups by address
☐ Filter pickups by status
☐ Combined search + filter

STATISTICS:
☐ Complaints stats update correctly
☐ Pickups stats update correctly
☐ Stats reflect current data
☐ Stats update after changes

API ENDPOINTS:
☐ GET /api/complaints works
☐ POST /api/complaints works
☐ PUT /api/complaints/:id works
☐ DELETE /api/complaints/:id works
☐ GET /api/pickups works
☐ POST /api/pickups works
☐ PUT /api/pickups/:id works
☐ DELETE /api/pickups/:id works

ERROR HANDLING:
☐ Missing required fields error
☐ Database connection errors
☐ Invalid data handling
☐ Not found errors (404)

PERFORMANCE:
☐ Page loads quickly
☐ Search is responsive
☐ Filter works instantly
☐ Modals open smoothly
☐ Updates don't cause lag

RESPONSIVE DESIGN:
☐ Desktop (1920px) - OK
☐ Laptop (1366px) - OK
☐ Tablet (768px) - OK
☐ Mobile (320px) - OK
```

---

## 🎯 Success Criteria

After all tests pass, you'll have:
✅ Fully functional admin dashboard
✅ Complete complaint management system
✅ Complete pickup scheduling management
✅ Real-time statistics
✅ Search and filter functionality
✅ Mobile-responsive interface
✅ API endpoints for integration
✅ Database persistence

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Dashboard shows "No complaints" | Check database tables exist and have data |
| API returns error | Check required fields are provided |
| Database connection error | Verify `.env` credentials and MySQL is running |
| Styles not loading | Clear browser cache (Ctrl+Shift+R) |
| Modal won't close | Check browser console for JavaScript errors |
| Search not working | Verify data exists in database |

---

For detailed documentation, see `ADMIN_DASHBOARD_README.md` and `SETUP_ADMIN.md`
