Cloud Resume on AWS - Full Architecture and Deployment Guide

✨ Introduction  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This project demonstrates how to build and deploy a cloud-hosted resume website using modern serverless architecture on Amazon Web Services (AWS).
The goal is to understand real-world cloud concepts like static hosting, CDN, APIs, serverless functions, and databases.
By completing this project, you will learn how production-grade web applications are deployed in the cloud.

✨ Services Used

🌨️ Amazon S3 (Static Website Hosting)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Amazon S3 is used to host your frontend files:  
  	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;index.html  
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;index.css  
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;index.js  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;It acts as a static file server.  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔ Stores files  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;✔ Serves website content

🌨️ CloudFront (CDN)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CloudFront is a Content Delivery Network (CDN).

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Purpose:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ✔ Speeds up website globally  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ✔ Caches static content  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ✔ Reduces latency  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Instead of loading from one region, users get content from nearest edge location.  

🌨️ API Gateway  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;API Gateway acts as a bridge between frontend and backend.  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ✔ Exposes HTTP endpoint (/visits)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ✔ Routes requests to Lambda  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ✔ Handles request/response formatting  

🌨️ AWS Lambda  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Lambda is a serverless backend compute.  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ✔ Runs code only when triggered  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ✔ Handles visitor count logic  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ✔ Connects to DynamoDB  

🌨️ DynamoDB  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DynamoDB is a NoSQL database used here to store : Visitor count  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ✔ Example item:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id: "visits"  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count: 120  

✨ Architecture Diagram  

<img width="1234" height="459" alt="Screenshot 2026-05-25 185619" src="https://github.com/user-attachments/assets/450029c3-96bd-4787-8edf-f24ed81c9fe4" />

✨ Frontend Flow  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;User opens website  
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↓  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;JavaScript executes  
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↓  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Calls API Gateway (/visit)  
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↓  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Receives visitor count  
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↓  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Displays on UI  

✨ Backend Flow (Lambda)  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;API Gateway receives request  
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↓  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Triggers AWS Lambda  
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↓  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Lambda reads DynamoDB  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↓  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Increments visitor count  
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↓  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Returns updated count  

✨ Step-by-Step Deployment Guide  

Step 1: Upload Website to S3  

Create S3 bucket   
Allow public access for website files:  

<img width="1899" height="871" alt="Screenshot 2026-05-25 163305" src="https://github.com/user-attachments/assets/afc08003-4e8d-49c5-8832-45ded67292fb" />  

Removing Amazon S3 Block Public Access is generally not recommended. It should only be done if your specific use case explicitly requires making files or buckets available to the public over the internet  
Enable static website hosting  

<img width="1904" height="870" alt="Screenshot 2026-05-25 164121" src="https://github.com/user-attachments/assets/6812322c-b1df-40bf-87ec-ce822f68e3b5" />  

Upload:  
index.html  
index.css  
index.js  

<img width="1919" height="866" alt="Screenshot 2026-05-25 164326" src="https://github.com/user-attachments/assets/1c95c30b-1c46-4b11-8716-9b431d1bacac" />  

Step 2: Configure Bucket Policy  

Allow public access for website files:  
Enable public read access  
Add bucket policy for s3:GetObject  

<img width="1903" height="869" alt="Screenshot 2026-05-25 164621" src="https://github.com/user-attachments/assets/eb4b2644-fe94-4abf-b409-dd2aefb359df" />  

Resource is your bucket ARN and it should end with /* which allows access to the objects inside your bucket  
Principal contains * signifies that anyone can access the bucket  

Step 3: Setup CloudFront CDN  

Create CloudFront distribution  
Set S3 bucket as origin  

<img width="1906" height="865" alt="Screenshot 2026-05-25 165816" src="https://github.com/user-attachments/assets/94e2b30c-e496-4677-93f1-c688edd7eefe" />  

Enable caching  

<img width="1906" height="874" alt="Screenshot 2026-05-25 165907" src="https://github.com/user-attachments/assets/b5cf6937-fb5c-4a10-b877-e96efb5d1233" />  

Step 4: Create DynamoDB Table  

Table name: VisitorCounter  
Partition key: id  
Add Attribute count   
Create an item { id:visits , count:0 }  

<img width="1904" height="826" alt="Screenshot 2026-05-25 170239" src="https://github.com/user-attachments/assets/92c0433a-60d1-4a85-ac25-68dc1a4c9624" />  

Step 5: Create Lambda Function  

Runtime: Node.js  
Logic:  
Get visitor count  
Increment count  
Return response  

<img width="1903" height="873" alt="Screenshot 2026-05-25 171255" src="https://github.com/user-attachments/assets/ebe71cd3-782d-4b9c-86ea-ad27a49db741" />  

Deploy the code in the lambda function  
The Lambda function fails because it does not have the permissions to modify the dynamo db  
Assign permission by going through lambda function -> configuration -> role name ( Gets you to IAM ) -> Attach the policy ( AmazonDynamoDBFullAccess)  

<img width="1902" height="867" alt="Screenshot 2026-05-25 171839" src="https://github.com/user-attachments/assets/06c6621a-8163-4c66-9df6-9ebef9fff780" />

If you test the code the dynamodb table's count attribute's value will increment by one whenever the lambda function is executed  

Step 6: Setup API Gateway  

Create HTTP API  
Route: /visit  

<img width="1919" height="823" alt="Screenshot 2026-05-25 172308" src="https://github.com/user-attachments/assets/cc2fc065-5afd-489f-b378-13f650b3c623" />  

Connect to Lambda  
Integrations -> Managed Integrations -> create  

<img width="1906" height="869" alt="Screenshot 2026-05-25 172507" src="https://github.com/user-attachments/assets/87762f37-0e83-499f-9e47-364d8c6d5fef" />  

Routes -> Attach Integrations to Route -> Choose the created integration  

<img width="1905" height="866" alt="Screenshot 2026-05-25 172832" src="https://github.com/user-attachments/assets/ec8e2083-08dc-4d0d-9262-7fc18d7a6013" />

Step 7: Connect Frontend to Backend  

In JavaScript:  
fetch("https://your-api-endpoint/visit")  

<img width="822" height="275" alt="Screenshot 2026-05-25 173136" src="https://github.com/user-attachments/assets/52546736-6956-4fb9-950b-24d1d30b0fca" />  

After modifying the index.js reupload it to your s3 bucket  

The website is completely linked with the Api   

<img width="1903" height="904" alt="Screenshot 2026-05-25 173640" src="https://github.com/user-attachments/assets/531f9cd9-d267-46f1-8e5d-37ff97f05d32" />  

The index.js calls the api whenever the page reloads or a new request arrives, which further triggers the lambda function that increments the value by 1 in the dynamodb  
The response is sent back to the index.js file and the no.of visitors is updated  

✨ Future Improvements  

🌨️ Route 53 (DNS)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Amazon Route 53 allows custom domain names  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Example: www.myresume.com  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Instead of: s3-website-region.amazonaws.com  

🌨️ AWS Certificate Manager (ACM)    
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Used to enable HTTPS  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ✔ Secure connection (https://)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ✔ Free SSL certificates 

🌨️ CI/CD Pipeline  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Using GitHub Actions:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ✔ Auto deploy to S3  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ✔ Auto invalidate CloudFront cache  

🌨️ AWS Cognito  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For Authentication systems:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ✔ Login system  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ✔ User tracking  

🌨️ Terraform / Infrastructure as Code  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Instead of manual setup:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Define AWS infrastructure in code  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Reproducible deployments  

✨ Conclusion  

This project demonstrates a complete serverless cloud architecture using AWS services. It is an excellent beginner-to-intermediate project for understanding real-world deployment and backend integration.  

👨‍💻 Author  
Shailesh AG  
Computer Science Student | Cloud Engineer 








