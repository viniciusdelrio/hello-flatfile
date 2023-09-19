# Hello FlatFile
The purpose of this repo is testing [FlatFile](https://flatfile.com/).

## How to execute
1. Clone and open the repository
2. Follow the next steps below.

## Create an account on FlatFile
1. Create an account on [FlatFile](https://flatfile.com/);
2. Logged with your created account;
3. At your dashboard, on the left side menu, choose Env: development;
4. Copy your 'secret key'.

## Start creating a Workbook
1. In your cmd run the following command (Change "PASTE_SECRET_KEY_HERE" with your pasted secret key):
```bash
curl --request POST \
  --url https://platform.flatfile.com/api/v1/workbooks \
  --header 'Authorization: Bearer PASTE_SECRET_KEY_HERE' \
  --header 'Content-Type: application/json' \
  --data '{
  "name": "My First Workbook",
  "labels": ["simple-demo"],
  "sheets": [
    {
      "name": "Contacts",
      "slug": "contacts",
      "fields": [
        {
          "key": "firstName",
          "type": "string",
          "label": "First Name"
        },
        {
          "key": "lastName",
          "type": "string",
          "label": "Last Name"
        },
        {
          "key": "email",
          "type": "string",
          "label": "Email"
        }
      ]
    }
  ],
  "actions": [
    {
      "operation": "submitActionFg",
      "mode": "foreground",
      "label": "Submit",
      "description": "Submit data to webhook.site",
      "primary": true
    }
  ]
}'
```

## Run the App
1. Enter int '/src/' and rename the '.env.example' to '.env';
2. Apply these changes:
    - Paste your 'secret key' into 'FLATFILE_API_KEY' value;
    - Paste your 'environment id' into 'FLATFILE_ENVIRONMENT_ID' value.
3. In terminal, run the following commands:
    - cd src
    - npm install
    - npx flatfile develop index.ts

## Testing events manually
To start testing events manually, you should log in into your FlatFile account and access your space 'My First Workbook'. Then, following these steps:
1. On the left menu, click on "Contacts";
2. Click on button "Manually enter data";
3. With your app running (previous step: 'Run the App'), try insert manually data into your FlatFile Workbook's page;
4. See the events logged into your running app.

## File Import
To start importing files, you should log in into your FlatFile account and access your space 'My First Workbook'. Then, following these steps:
1. On the left menu, click on "Files";
2. Click on "Add file" button and select the "getting-started.csv" file (This file is inside '/src/getting-started.csv');
3. If your file has been imported and is not showing on the Files page, refresh the page (F5);
4. Click on "Import" button;
5. Select the "Contacts" sheet and click on "Continue";
6. You will see the map fields, but for now you could just click "Continue" because all the maps are correctly;
7. Your file has been imported and you should see the events logged on your app.

## How to deploy on FlatFile
The deploy proccess could be in two ways:
(1) Deploy on your cloud solution
(2) Deploy on FlatFile
You can learn more [here](https://flatfile.com/docs/developer-tools/deploying).

In this section, we'll make deploy on FlatFile.

To do it, just need to execute this command in a terminal:
```bash
npx flatfile@latest deploy index.ts
```

