---
layout: post
title: "router with integrated vpn support"
---

## {{ page.title }}

###### {{ page.date | date_to_string }}

I needed a way to provide VPN coverage transparently to a local network...

- ISP router (TpLink WR820N on this case)
- TpLink ER605 Switch (only available vpn switch/router around) - no wifi
- TpLink WR820N (low cost wifi router)
- [Wireguard](https://www.wireguard.com/) (because of its performance and low resource usage)
- VPN provider https://surfshark.com (provide required technical details)

## ISP router (TpLink WR820N on this case)

Reconfigure LAN to use 10.9.8.1 so it doesn't conflict with default networking settings in the following section.

## TpLink ER605 firmware upgrade to ER605(UN)_V2_2.2.2 Build 20231017

In order to use Wireguard a firware upgrade is required (only OpenVPN by default). Download and unzip https://static.tp-link.com/upload/firmware/2023/202310/20231018/ER605(UN)_v2_2.2.2%20Build%2020231017.zip

Go to http://192.168.0.1/webpages/index.html and then to **Firmware Upgrade**

Upload: **ER605v2_un_2.2.2_20231017-rel68869_up_2023-10-17_19.23.22.bin**

## Configure Wireguard

After reboot / upgrade go to **VPN -> Wireguard**:

    Name: surfshark
    MTU: 1420
    Listen Port: 51820
    Private Key: will be generated automatically
    Public Key: will be generated automatically #copy this somewhere
    Local IP Address: 10.14.0.2 #this field will be edited later
    Status: Enabled

Save changes.

Go to https://my.surfshark.com/vpn/manual-setup/router/wireguard/own-key:

    Name: er605
    Public Key: input the key generated from the above step

Go to the **Locations** submenu and select the desired area, on this case I choose USA/Boston:

**![](/assets/img/surfshark-wireguard.png)**

Download the Wireguard configuration file

Go to http://192.168.0.1/webpages/index.html and then to **VPN -> Wireguard -> Peers**:

    Interface: Select surfshark
    Public Key: Copy the string from the Server public key field from previous step
    Endpoint: Copy the Server Ip from previous step
    Endpoint Port: 51820
    Allowed Address: 0.0.0.0/0
    Preshared Key: leave empty
    Persistent Keepalive: 25
    Comment: leave empty
    Status: Enabled

Save changes.

Go back to **VPN -> Wireguard** and modify the `Local IP Address: 10.14.0.2` field with the value extracted from the Wireguard configuration file:

    [Interface]
    Address = 10.14.0.2/16
    ...

Save changes.

## Wifi router

Go to http://192.168.1.1/ and configure Wifi settings.

## Final comments

As the date of this entry the following vendors doesn't support enough technical information to complete this setup:

- https://www.ipvanish.com/

Happy tunneling &#128523;
