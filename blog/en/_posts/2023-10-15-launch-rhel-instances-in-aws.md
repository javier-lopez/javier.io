---
layout: post
title: "launch and suscribe RHEL 8/9 instances in AWS"
---

## {{ page.title }}

###### {{ page.date | date_to_string }}

## Simple, no RedHat Cloud integration

Go to EC2 and launch either RHEL8 or RHEL9 instances:

**RHEL8**: [AWS Marketplace: Red Hat Enterprise Linux 8](https://aws.amazon.com/marketplace/pp/prodview-kv5mi3ksb2mma)

Ami Id: **ami-0b324207d4bcaec61**

**RHEL9**: [AWS Marketplace: Red Hat Enterprise Linux 9](https://aws.amazon.com/marketplace/pp/prodview-b5psjqk4f5f3k)

Ami Id: **ami-026ebd4cfe2c043b2**

Ensure the AWS instance includes a RHEL suscription 

    $ curl http://169.254.169.254/latest/dynamic/instance-identity/document 2>/dev/null | grep billingProducts
    "billingProducts" : [ "bp-6fa54006" ] #ID will change depending the RHEL version and must be != NULL

If the above command success, execute:

    $ sudo vi  /etc/yum/pluginconf.d/subscription-manager.conf
    enabled=0

### Enable additional repositories

**RHEL8**

    $ sudo yum repolist all
    $ sudo dnf config-manager --set-enabled codeready-builder-for-rhel-8-rhui-rpms rhel-8-supplementary-rhui-rpms 

**RHEL9**

    $ sudo yum repolist all
    $ sudo dnf config-manager --set-enabled codeready-builder-for-rhel-9-rhui-rpms rhel-9-supplementary-rhui-rpms

Profit!

## With Redhat Cloud and Insights integration

### RedHat

- [Create a RHEL account](https://www.redhat.com/wapps/ugc/register.html?_flowId=register-flow&_flowExecutionKey=e1s1)
- [Request a RHEL trial](https://www.redhat.com/en/technologies/linux-platforms/enterprise-linux/try-it?intcmp=701f20000012m1qAAA), this step could be removed in the future, however for new accounts as Oct 12th 2023, it’s a requirement for registering RHEL aws instances.
- Go to Red Hat and Enable the Simple Content Access Enablement (should be on by default for new accounts)
![rhel-simple-content-access](https://github.com/javier-lopez/javier.io/assets/75626/abc8f9bc-9fce-496e-9cec-ca5d865cf943)

### AWS

Go to EC2 and launch either RHEL8 or RHEL9 instances:

**RHEL8**: [AWS Marketplace: Red Hat Enterprise Linux 8](https://aws.amazon.com/marketplace/pp/prodview-kv5mi3ksb2mma)

Ami Id: **ami-0b324207d4bcaec61**

**RHEL9**: [AWS Marketplace: Red Hat Enterprise Linux 9](https://aws.amazon.com/marketplace/pp/prodview-b5psjqk4f5f3k)

Ami Id: **ami-026ebd4cfe2c043b2**

Once setup, login and suscribe using the RedHat Credentials

    $ sudo subscription-manager register --username <username>
    $ sudo insights-client

### Enable additional repositories

**RHEL8**

    $ sudo yum repolist all
    $ sudo dnf config-manager --set-enabled codeready-builder-for-rhel-8-rhui-rpms rhel-8-supplementary-rhui-rpms 

**RHEL9**

    $ sudo yum repolist all
    $ sudo dnf config-manager --set-enabled codeready-builder-for-rhel-9-rhui-rpms rhel-9-supplementary-rhui-rpms

Profit!

**References**

- [How to register a Red Hat Enterprise Linux system running on AWS to](https://access.redhat.com/articles/6538061)
- [Troubleshoot errors that are thrown when you use yum on an EC2 instance with RHEL](https://repost.aws/knowledge-center/ec2-yum-rhel-errors)
