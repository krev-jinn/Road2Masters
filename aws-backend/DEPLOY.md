# Road2Masters Deployment Walkthrough (100% Free Plan & Credits Safe)

Follow these phases sequentially. Check the **"You should see"** criteria before moving to the next phase.

---

## Phase 0 — Account Safety & Zero-Cost Guardrails ($0)

1. **Sign in to AWS Console**:
   - Region: Select **Mumbai (`ap-south-1`)** or **Europe (Stockholm `eu-north-1`)** from the top-right navigation bar. Keep this region consistent throughout.
2. **Account Integrity**:
   - Do **NOT** enable AWS Organizations or IAM Identity Center (keeps Free Plan intact).
3. **MFA & Root User Protection**:
   - Go to **IAM > Users**.
   - Create an admin user (e.g., `r2m-admin`) with `AdministratorAccess` and enable Authenticator app MFA.
4. **Billing Alerts ($0 Protection)**:
   - Search **Billing and Cost Management** > **Budgets** (in left sidebar).
   - Click **Create budget** > choose **Zero spend budget** or set a monthly budget of **$1.00**.
   - Enter your email address to receive alert notifications if forecast spend reaches $1.00.
5. **Cost Anomaly Detection**:
   - In Billing Console, click **Cost Anomaly Detection** > **Monitors** > **Create monitor**.
   - Monitor type: **AWS services (recommended)** > Alert frequency: **Immediate (Daily summary)**.
   - Enter your email. (Evaluation is 100% free forever).

> **You should see**: Both your $1.00 Budget and Cost Anomaly Monitor listed with status *Active* or *OK*.

---

## Phase 1 — Host the Website ($0 on S3 + CloudFront)

1. **Create S3 Bucket**:
   - Go to **S3** > Click **Create bucket**.
   - Bucket name: `road2masters-site-` followed by 6 random numbers (e.g. `road2masters-site-938214`).
   - Region: Same region as Phase 0 (e.g. `ap-south-1` or `eu-north-1`).
   - Object Ownership: **ACLs disabled (recommended)**.
   - **Block Public Access**: Keep **Block *all* public access ON** (CloudFront will access it securely via OAC).
   - Click **Create bucket**.
2. **Upload Website Contents**:
   - Open your bucket > Click **Upload**.
   - Add the following files and folders:
     - `index.html`
     - `style.css`
     - `script.js`
     - `aws-bridge.js`
     - `aws.js`
     - `aws-config.js`
     - Folder: `assets/` (containing `images/` and `videos/bg.mp4`).
   - Click **Upload**.
3. **Create CloudFront Distribution (Global HTTPS CDN)**:
   - Go to **CloudFront** > Click **Create distribution**.
   - **Origin domain**: Click the dropdown and select your S3 bucket.
   - **Origin access**: Select **Origin access control settings (recommended)** > Click **Create new OAC** > Click **Create**.
   - **Viewer protocol policy**: Select **Redirect HTTP to HTTPS**.
   - **Allowed HTTP methods**: Select **GET, HEAD**.
   - **Price class**: Select **Use only North America and Europe** or **Use all edge locations** (both are covered by the 1 TB/mo Free Tier).
   - **Default root object**: Enter `index.html`.
   - Click **Create distribution**.
4. **Update S3 Bucket Policy**:
   - A yellow banner will appear at the top of the CloudFront page stating: *"The S3 bucket policy needs to be updated"*.
   - Click **Copy policy**.
   - Go to your S3 bucket > **Permissions** tab > **Bucket policy** > Click **Edit** > Paste the policy > Click **Save changes**.

> **You should see**: In 2–3 minutes, your distribution status shows *Enabled*. Visit `https://xxxxxx.cloudfront.net` in your browser. The Road2Masters website, video background, and dark theme will load fast over global HTTPS!

---

## Phase 2 — Serverless Backend Deployment (~2 Minutes, $0)

The backend is fully defined in [`template.yaml`](file:///C:/Users/HP/.gemini/antigravity/scratch/Road2Masters/aws-backend/template.yaml). No AWS CLI or coding required.

1. **Deploy via CloudFormation Console**:
   - In AWS Console, search for **CloudFormation**.
   - Ensure the region matches your Phase 0 region (top-right dropdown).
   - Click **Create stack** > **With new resources (standard)**.
   - Under *Prerequisite - Prepare template*, select **Template is ready**.
   - Under *Specify template*, select **Upload a template file** > Click **Choose file** > select `aws-backend/template.yaml`.
   - Click **Next**.
2. **Specify Stack Details**:
   - Stack name: `road2masters-backend`
   - `MentorEmail`: Enter your email address to receive doubt alerts (or leave blank).
   - Click **Next**.
   - Keep default Options > Click **Next**.
   - At the bottom of the Review page, check the acknowledgment box:
     `[x] I acknowledge that AWS CloudFormation might create IAM resources.`
   - Click **Submit**.
3. **Confirm SNS Mentor Subscription**:
   - If you entered an email, check your inbox for an email from *"AWS Notifications"* with subject *"AWS Notification - Subscription Confirmation"*.
   - Click the link inside: **Confirm subscription**.
4. **Link Website to AWS**:
   - Once the stack status reaches **CREATE_COMPLETE** (~2 minutes), click the **Outputs** tab.
   - Copy the value of **`ApiBaseUrl`** (e.g. `https://xxxxxx.execute-api.ap-south-1.amazonaws.com`).
   - Open your website folder, open `aws-config.js`, and paste the URL into `apiBase`:
     ```javascript
     export const AWS_CONFIG = {
       region: "ap-south-1", // your region
       apiBase: "https://xxxxxx.execute-api.ap-south-1.amazonaws.com",
       userPoolClientId: ""
     };
     ```
   - Re-upload `aws-config.js` to your S3 bucket.

> **You should see**:
> 1. In DynamoDB Console: Tables `R2M_Users` and `R2M_Doubts` created.
> 2. Open `https://xxxxxx.cloudfront.net`, fill in your name, email, and phone, and click **Access Dashboard**. Check DynamoDB `R2M_Users` — your profile item will be saved with an ISO timestamp!
> 3. Click **Ask Doubt**, enter a question, and click **Submit Doubt**. Check DynamoDB `R2M_Doubts` and your mentor email inbox — you will receive an instant email notification!

---

## Phase 3 — Optional Low-Cost Extras (Cents from Credits)

- **Amazon Bedrock AI Mentor**:
  - Open **Amazon Bedrock** in console > **Model access** > Request access to **Amazon Titan Text Express** or **Anthropic Claude 3.5 Haiku**.
  - A background Lambda can be wired to generate an AI draft hint for student doubts (each query costs ~$0.0005, funded from your $100 credit).
- **Amazon Translate**:
  - Free for 2,000,000 characters/month for 12 months. Can translate doubt text or roadmap phases into Tamil, Hindi, or Telugu.

---

## Phase 4 — Teardown & Clean-up (Guaranteed $0 Remaining Balance)

Follow this exact sequence when your demo is complete to remove 100% of AWS resources:

1. **Delete Backend Stack**:
   - Go to **CloudFormation** > Select `road2masters-backend` > Click **Delete** > Confirm **Delete**.
   - This automatically deletes API Gateway, both Lambda functions, both DynamoDB tables, the SNS topic, and IAM roles in ~2 minutes.
2. **Empty & Delete S3 Bucket**:
   - Go to **S3** > Click bucket `road2masters-site-...` > Click **Empty** > Type `permanently delete`.
   - Click **Delete bucket** > Confirm.
3. **Disable & Delete CloudFront**:
   - Go to **CloudFront** > Select your distribution > Click **Disable**.
   - Wait ~2 minutes until status shows *Disabled*, then click **Delete**.
4. **Verify Billing**:
   - Go to **Billing and Cost Management** > **Bills**.
   - Confirm active running services show $0.00.
