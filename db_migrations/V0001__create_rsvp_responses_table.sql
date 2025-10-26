CREATE TABLE IF NOT EXISTS t_p408867_wedding_invitation_s.rsvp_responses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    guests_count INTEGER NOT NULL,
    attendance VARCHAR(50) NOT NULL,
    dietary_restrictions TEXT,
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);