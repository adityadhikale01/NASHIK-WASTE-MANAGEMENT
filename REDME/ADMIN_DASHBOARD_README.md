# Admin Dashboard - Setup Guide

## Overview
The Admin Dashboard is a comprehensive management system for handling user complaints and scheduled garbage truck pickups in the NWM (Waste Management) system.

## Features

### Complaints Management
- **View all complaints** submitted by users
- **Filter complaints** by search term (name, email, location), status, or both
- **View detailed complaint information** including:
  - User name and email
  - Location and complaint type
  - Submission date and time
  - Full description and any admin notes
- **Update complaint status** (Pending → In Progress → Resolved)
- **Add admin notes** to track actions taken
- **Delete complaints** when resolved or unnecessary
- **Real-time statistics** showing:
  - Total complaints
  - Pending complaints
  - In-progress complaints
  - Resolved complaints

### Scheduled Pickups Management
- **View all scheduled pickups** requested by users
- **Filter pickups** by search term (name, address), status, or both
- **View detailed pickup information** including:
  - Customer name and address
  - Type of waste item
  - Preferred pickup day
  - Request date and time
  - Driver notes
- **Update pickup status** (Pending → In Progress → Completed)
- **Add driver notes** to track completion details
- **Delete pickups** when completed or cancelled
- **Real-time statistics** showing:
  - Total pickups
  - Pending pickups
  - In-progress pickups
  - Completed pickups

## Database Setup

### 1. Create Required Tables
Run the following SQL commands in your MySQL database:

```sql
-- Create complaints table
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

-- Create scheduled_pickups table
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

Or use the provided `database_schema.sql` file:
```bash
mysql -u your_user -p your_database < database_schema.sql
```

### 2. Verify Database Connection
Ensure your `.env` file has the correct database credentials:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=YourPassword
DB_NAME=nwm
PORT=3000
```

## Accessing the Admin Dashboard

### URL
Navigate to: `http://localhost:3000/admin`

### Navigation
- The dashboard is accessible from the main navigation menu
- Admin link in the header/footer takes you to the dashboard

## API Endpoints

### Complaints API

#### Get all complaints
```
GET /api/complaints
Response: Array of complaint objects
```

#### Create a complaint
```
POST /api/complaints
Body: {
  "name": "string",
  "email": "string",
  "location": "string",
  "type": "string",
  "description": "string" (optional)
}
Response: { success: true, id: number }
```

#### Update a complaint
```
PUT /api/complaints/:id
Body: {
  "status": "Pending|In Progress|Resolved",
  "notes": "string" (optional)
}
Response: { success: true }
```

#### Delete a complaint
```
DELETE /api/complaints/:id
Response: { success: true }
```

### Pickups API

#### Get all pickups
```
GET /api/pickups
Response: Array of pickup objects
```

#### Create a pickup request
```
POST /api/pickups
Body: {
  "name": "string",
  "address": "string",
  "item": "string",
  "day": "Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday"
}
Response: { success: true, id: number }
```

#### Update a pickup
```
PUT /api/pickups/:id
Body: {
  "status": "Pending|In Progress|Completed",
  "notes": "string" (optional)
}
Response: { success: true }
```

#### Delete a pickup
```
DELETE /api/pickups/:id
Response: { success: true }
```

## Frontend Integration

### Complaints Form
To submit complaints, users visit the `/complaints` page which contains a form that:
1. Collects user details (name, email)
2. Captures location and complaint type
3. Accepts geotagged photos
4. Posts data to `/api/complaints` endpoint

### Scheduled Pickups Form
Users can schedule pickups via `/schedule_pickup` page which:
1. Displays weekly pickup schedule
2. Allows selection of preferred pickup day
3. Validates truck availability
4. Posts data to `/api/pickups` endpoint

## Key Features Explained

### Status Tracking
- **Pending**: Newly submitted complaint or pickup request
- **In Progress**: Being actively handled
- **Resolved/Completed**: Task has been finished

### Real-time Stats
Dashboard cards automatically update to show:
- Total requests received
- Breakdown by status
- Quick overview of workload

### Search & Filter
- Search by keywords (name, email, location, address)
- Filter by status
- Combine search and status filters for precise results

### Modal Views
- Click "View" to see complete details in a popup
- Click "Update" to modify status and add notes
- Changes save immediately without page refresh

## File Structure

```
NWM-P/
├── views/
│   ├── admin.ejs              # Admin dashboard page
│   ├── complaints.ejs          # Complaints submission form
│   ├── shedule_pickup.ejs      # Scheduled pickups form
│   └── ...other pages
├── public/
│   ├── app.css                # Main styles
│   ├── app.js                 # Main scripts
│   └── ...other static files
├── index.js                   # Express server with routes
├── package.json               # Dependencies
├── .env                       # Environment variables
└── database_schema.sql        # Database schema
```

## Server Routes Added

```javascript
GET  /admin                     # Admin dashboard page
GET  /complaints               # Complaints submission page
GET  /schedule_pickup          # Pickups scheduling page
GET  /api/complaints           # Get all complaints
POST /api/complaints           # Submit new complaint
PUT  /api/complaints/:id       # Update complaint
DELETE /api/complaints/:id     # Delete complaint
GET  /api/pickups             # Get all pickups
POST /api/pickups             # Submit new pickup
PUT  /api/pickups/:id         # Update pickup
DELETE /api/pickups/:id       # Delete pickup
```

## Best Practices

### For Admins
1. **Regular Updates**: Update complaint/pickup status regularly to keep users informed
2. **Add Notes**: Include notes explaining actions taken
3. **Review Data**: Regularly check unresolved complaints
4. **Monitor Trends**: Use the dashboard to identify common issues

### For Maintenance
1. **Backup Database**: Regularly backup your database
2. **Monitor Performance**: Delete old resolved records periodically
3. **Update Status**: Archive completed requests monthly
4. **Security**: Consider adding authentication to the admin panel

## Troubleshooting

### No Data Showing
1. Check if database tables exist
2. Verify database connection in `.env`
3. Check browser console for errors
4. Restart the Node.js server

### API Errors
1. Check server logs for error messages
2. Verify POST request format matches expected schema
3. Ensure all required fields are provided
4. Check database has sufficient storage

### Page Not Found
1. Ensure route is added in `index.js`
2. Verify EJS file exists in `views/` folder
3. Check for typos in route paths

## Future Enhancements

Suggested improvements:
- Add user authentication to admin dashboard
- Implement email notifications for status updates
- Add photo viewing in complaint details
- Generate reports and statistics
- Bulk operations (update multiple records)
- Export data to CSV/Excel
- Assign pickups to specific drivers
- SMS notifications to users
- Mobile app for drivers

## Support

For issues or questions:
1. Check this documentation
2. Review error logs in server console
3. Verify database structure with `database_schema.sql`
4. Test API endpoints with curl or Postman
