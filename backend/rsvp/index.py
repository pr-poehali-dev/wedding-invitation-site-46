import json
import os
import psycopg2
from typing import Dict, Any
from pydantic import BaseModel, Field, ValidationError

class RSVPRequest(BaseModel):
    name: str = Field(..., min_length=1)
    guests_count: int = Field(..., ge=1)
    attendance: str = Field(..., pattern='^(yes|no)$')
    dietary_restrictions: str = ""
    message: str = ""

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Save RSVP responses to database
    Args: event - dict with httpMethod, body
          context - object with request_id
    Returns: HTTP response dict
    '''
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    body_data = json.loads(event.get('body', '{}'))
    rsvp = RSVPRequest(**body_data)
    
    database_url = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(database_url)
    cursor = conn.cursor()
    
    cursor.execute(
        """
        INSERT INTO t_p408867_wedding_invitation_s.rsvp_responses 
        (name, guests_count, attendance, dietary_restrictions, message)
        VALUES (%s, %s, %s, %s, %s)
        RETURNING id
        """,
        (rsvp.name, rsvp.guests_count, rsvp.attendance, rsvp.dietary_restrictions, rsvp.message)
    )
    
    rsvp_id = cursor.fetchone()[0]
    conn.commit()
    cursor.close()
    conn.close()
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'isBase64Encoded': False,
        'body': json.dumps({
            'success': True,
            'id': rsvp_id,
            'message': 'RSVP saved successfully'
        })
    }
