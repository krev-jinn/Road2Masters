"""
Submit Doubt Lambda Function — Road2Masters
Saves student doubt question to DynamoDB R2M_Doubts and sends an instant email via Amazon SNS.
"""
import json
import os
import uuid
from datetime import datetime, timezone
import boto3

dynamodb = boto3.resource('dynamodb')
sns = boto3.client('sns')

table_name = os.environ.get('DOUBTS_TABLE', 'R2M_Doubts')
table = dynamodb.Table(table_name)
topic_arn = os.environ.get('SNS_TOPIC_ARN')

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
        name = (body.get('name') or '').strip() or 'Anonymous'
        topic = (body.get('topic') or '').strip() or 'General'
        question = (body.get('question') or '').strip()

        if not question:
            return {
                "statusCode": 400,
                "headers": cors_headers,
                "body": json.dumps({"error": "Question content cannot be empty."})
            }

        now_iso = datetime.now(timezone.utc).isoformat()
        doubt_id = str(uuid.uuid4())

        item = {
            "doubtId": doubt_id,
            "submittedAt": now_iso,
            "name": name,
            "topic": topic,
            "question": question,
            "answered": False
        }
        table.put_item(Item=item)

        # Notify mentor via SNS email if configured
        if topic_arn:
            alert_message = (
                f"Road2Masters — New Student Doubt Alert!\n\n"
                f"Student: {name}\n"
                f"Topic:   {topic}\n"
                f"Time:    {now_iso}\n\n"
                f"Question:\n"
                f"-----------------------------------------\n"
                f"{question}\n"
                f"-----------------------------------------\n\n"
                f"— Powered by AWS Serverless (API Gateway + Lambda + DynamoDB + SNS)"
            )
            try:
                sns.publish(
                    TopicArn=topic_arn,
                    Subject=f"Doubt Alert: {topic} from {name}",
                    Message=alert_message
                )
            except Exception as sns_err:
                print(f"SNS Publish Warning: {str(sns_err)}")

        return {
            "statusCode": 200,
            "headers": cors_headers,
            "body": json.dumps({
                "success": True,
                "message": "Doubt submitted successfully and mentor notified.",
                "doubtId": doubt_id
            })
        }
    except Exception as e:
        print(f"Error submitting doubt: {str(e)}")
        return {
            "statusCode": 500,
            "headers": cors_headers,
            "body": json.dumps({"error": "Internal server error."})
        }
