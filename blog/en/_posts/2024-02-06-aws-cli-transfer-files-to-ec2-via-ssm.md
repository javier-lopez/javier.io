---
layout: post
title: "transfer files to ec2 instances via SSM and netcat"
---

## {{ page.title }}

###### {{ page.date | date_to_string }}

## Step 1. Run netcat on the target EC2 machine via SSM

    $ aws ssm start-session --target $INSTANCE_ID --document-name
    ssm $ nc -l -p 9999 > $FILE_NAME

## Step 2. In another shell open a port-forwarding session:

    $ aws ssm start-session --target $INSTANCE_ID --document-name AWS-StartPortForwardingSession --parameters '{"portNumber":["9999"],"localPortNumber":["9999"]}'

## Step 3. In a 3rd shell transfer the file via netcat:

    $ nc -w 3 127.0.0.1 9999 < $FILE_NAME

Profit!

References:

* https://gist.github.com/lukeplausin/4b412d83fb1246b0bed6507b5083b3a7
