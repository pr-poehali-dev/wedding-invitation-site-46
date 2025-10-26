import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Get all RSVP responses from database
    Args: event - dict with httpMethod
          context - object with request_id
    Returns: HTTP response dict with RSVP list
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    database_url = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(database_url)
    cursor = conn.cursor()
    
    cursor.execute(
        """
        SELECT id, name, guests_count, attendance, dietary_restrictions, message, created_at
        FROM t_p408867_wedding_invitation_s.rsvp_responses
        ORDER BY created_at DESC
        """
    )
    
    rows = cursor.fetchall()
    
    rsvp_list = []
    for row in rows:
        rsvp_list.append({
            'id': row[0],
            'name': row[1],
            'guests_count': row[2],
            'attendance': row[3],
            'dietary_restrictions': row[4],
            'message': row[5],
            'created_at': row[6].isoformat() if row[6] else None
        })
    
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
            'rsvps': rsvp_list,
            'total': len(rsvp_list)
        })
    }
