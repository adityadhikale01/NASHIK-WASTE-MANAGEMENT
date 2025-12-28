-- Database schema for NWM (Waste Management System)

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

-- Create index for faster queries
CREATE INDEX idx_complaint_status ON complaints(status);
CREATE INDEX idx_complaint_created ON complaints(created_at);
CREATE INDEX idx_pickup_status ON scheduled_pickups(status);
CREATE INDEX idx_pickup_created ON scheduled_pickups(created_at);
