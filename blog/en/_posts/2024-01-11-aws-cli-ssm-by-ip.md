---
layout: post
title: "aws-cli ssm by ip"
---

## {{ page.title }}

###### {{ page.date | date_to_string }}

## Configure SSM in AWS

Before you start, make sure that your Amazon EC2 instances are configured correctly. This involves setting up an IAM role `AmazonSSMManagedInstanceCore` for Systems Manager and attaching it to your instances. You also need to ensure that the Systems Manager Agent (SSM Agent) is installed on your nodes.

The SSM Agent is preinstalled by default on Amazon Linux base AMIs dated 2017.09 and later and on Amazon Linux 2, Windows Server 2008-2012 R2 AMIs, and others. If your distribution is not included use [userdata](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/user-data.html) to install it on first boot:

    #!/bin/bash
    curl "https://s3.amazonaws.com/session-manager-downloads/plugin/latest/ubuntu_64bit/session-manager-plugin.deb" -o "session-manager-plugin.deb"
    curl "https://s3.amazonaws.com/session-manager-downloads/plugin/latest/ubuntu_32bit/session-manager-plugin.deb" -o "session-manager-plugin.deb"
    curl "https://s3.amazonaws.com/session-manager-downloads/plugin/latest/ubuntu_arm64/session-manager-plugin.deb" -o "session-manager-plugin.deb"
    dpkg -i session-manager-plugin.deb

## Private VPC

If your EC2 instance is in a private network (without an Internet Gateway) you will need to set up 3 VPC Endpoints for AWS Systems Manager.

Go to **VPC** > **Endpoints** > **Create Endpoint** > **Service category** > **AWS services** > **Service Name**

* com.amazonaws.us-west-2.ssm (or the region where your vpc is hosted)
* com.amazonaws.us-west-2.ec2messages
* com.amazonaws.us-west-2.ssmmessages

In the **VPC** section, select the VPC of your EC2 instances. In the **Security Group** section, select a security group that allows HTTPS traffic (port 443) from and to your EC2 instances. In **Policy**, select **Full Access** if you want all instances in your VPC to be able to use SSM.

## Configure aws-cli using sso

Install [aws-cli](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) and the [windows plugin](https://docs.aws.amazon.com/systems-manager/latest/userguide/install-plugin-windows.html) if required.

    $ aws configure sso
    SSO session name (Recommended): org-name
    SSO start URL [None]: https://org-name.awsapps.com/start#/SSO
    region [None]: us-west-2
    SSO registration scopes [sso:account:access]:
    There are 10 AWS accounts available to you. #select one option
    Using the account ID 523868776147
    There are 4 roles available to you.
    Using the role name "PowerUserAccess"
    CLI default client Region [None]: us-west-2
    CLI profile name [PowerUserAccess-523868776147]: DevOps-PowerUser

    To use this profile, specify the profile name using --profile, as shown:

    aws s3 ls --profile DevOps-PowerUser

## Connect by instance-id

    $ aws sso login --sso-session org-name; aws ssm start-session --target <instance-id> --profile DevOps-PowerUser

## Connect by ip

    $ aws sso login --sso-session org-name; aws ssm start-session --target "$(aws ec2 describe-instances --filter Name=private-ip-address,Values=<private-ip> --query 'Reservations[].Instances[].InstanceId' --output text --region us-west-2 --profile DevOps-PowerUser)" --profile DevOps-PowerUser --region us-west-2

Profit!
