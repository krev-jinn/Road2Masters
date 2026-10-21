"""
Register User Lambda Function — Road2Masters
Saves student profile (name, email, phone) to DynamoDB R2M_Users.
"""
import json
import os
import re
from datetime import datetime, timezone
import boto3

dynamodb = boto3.resource('dynamodb')
table_name = os.environ.get('USERS_TABLE', 'R2M_Users')
table = dynamodb.Table(table_name)

def handler(event, context):
    cors_headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization"
    }

    # Handle OPTIONS preflight
    if event.get("requestContext", {}).get("http", {}).get("method") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": "{}"}

    try:
        body = json.loads(event.get('body') or '{}')
        name = (body.get('name') or '').strip()
        email = (body.get('email') or '').strip().lower()
        phone = (body.get('phone') or '').strip()

        # Validation
        if len(name) < 3:
            return {
                "statusCode": 400,
                "headers": cors_headers,
                "body": json.dumps({"error": "Name must be at least 3 characters."})
            }
        if not re.match(r"^[^@]+@[^@]+\.[^@]+$", email):
            return {
                "statusCode": 400,
                "headers": cors_headers,
                "body": json.dumps({"error": "Invalid email address format."})
            }
        if not re.match(r"^\d{10}$", phone):
            return {
                "statusCode": 400,
                "headers": cors_headers,
                "body": json.dumps({"error": "Phone number must be exactly 10 digits."})
            }

        now_iso = datetime.now(timezone.utc).isoformat()
        item = {
            "email": email,
            "name": name,
            "phone": phone,
            "joinedAt": now_iso
        }
        table.put_item(Item=item)

        return {
            "statusCode": 200,
            "headers": cors_headers,
            "body": json.dumps({
                "success": True,
                "message": "User profile successfully recorded in DynamoDB.",
                "data": {"name": name, "email": email}
            })
        }
    except Exception as e:
        print(f"Error registering user: {str(e)}")
        return {
            "statusCode": 500,
            "headers": cors_headers,
            "body": json.dumps({"error": "Internal server error."})
        }
