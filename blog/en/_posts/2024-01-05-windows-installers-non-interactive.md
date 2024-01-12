---
layout: post
title: "windows installers non interactive"
---

## {{ page.title }}

###### {{ page.date | date_to_string }}

## IIS 8.5 / Windows Server 2012

    pshell> import-module servermanager
    pshell> add-windowsfeature Web-Server, Web-WebServer, Web-Security, Web-Filtering, Web-Cert-Auth, Web-IP-Security, Web-Url-Auth, Web-Windows-Auth, Web-Basic-Auth, Web-Client-Auth, Web-Digest-Auth, Web-CertProvider, Web-Common-Http, Web-Http-Errors, Web-Dir-Browsing, Web-Static-Content, Web-Default-Doc, Web-Http-Redirect, Web-DAV-Publishing, Web-Performance, Web-Stat-Compression, Web-Dyn-Compression, Web-Health, Web-Http-Logging, Web-ODBC-Logging, Web-Log-Libraries, Web-Custom-Logging, Web-Request-Monitor, Web-Http-Tracing, Web-App-Dev, Web-Net-Ext45, Web-ASP, Web-Asp-Net45, Web-CGI, Web-ISAPI-Ext, Web-ISAPI-Filter, Web-WebSockets, Web-AppInit, Web-Includes, Web-Ftp-Server, Web-Ftp-Service, Web-Ftp-Ext, Web-Mgmt-Tools, Web-Mgmt-Console, Web-Mgmt-Compat, Web-Metabase, Web-WMI, Web-Lgcy-Mgmt-Console, Web-Lgcy-Scripting, Web-Scripting-Tools, Web-Mgmt-Service –IncludeManagementTools

## IIS 10.0 / Windows Server 2016

    pshell> Install-WindowsFeature -name Web-Server -IncludeManagementTools

Confirm version installed:

    pshell> get-itemproperty HKLM:\SOFTWARE\Microsoft\InetStp\ | select setupstring,versionstring #show iis version

## ISS urlrewrite module

    pshell> choco install -y urlrewrite

## Chocolatey

    pshell> Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
    pshell> choco install wget -y

## MongoDB

    pshell> mkdir C:\bin
    pshell> wget.exe https://downloads.mongodb.org/win32/mongodb-win32-x86_64-2008plus-ssl-3.4.24-signed.msi
    pshell> msiexec.exe /quiet /i mongodb-win32-x86_64-2008plus-ssl-3.4.24-signed.msi INSTALLLOCATION="C:\bin\mongodb-win32-x86_64-2008plus-ssl-3.4.24\" ADDLOCAL="all"
    pshell> While(Get-Process msiexec -ea si|?{$_.SI -ne 0}){} #wait until msiexec completes
    pshell> mkdir D:\mongodb
    pshell> C:\bin\mongodb-win32-x86_64-2008plus-ssl-3.4.24\bin\mongod --dbpath=D:\mongodb --logpath=D:\mongodb\log.txt --install --serviceName MongoDB
    pshell> net start MongoDB

## NodeJS

    pshell> wget.exe --no-check-certificate https://nodejs.org/dist/v8.5.0/node-v8.5.0-x64.msi
    pshell> msiexec.exe /quiet /i node-v8.5.0-x64.msi INSTALLDIR="C:\bin\nodejs-v8.5.0\" ADDLOCAL="all"
    pshell> While(Get-Process msiexec -ea si|?{$_.SI -ne 0}){} #wait until msiexec completes

## IISNode

    pshell> wget.exe https://github.com/Azure/iisnode/releases/download/v0.2.26/iisnode-full-v0.2.26-x64.msi
    pshell> #installs to C:\Program Files\iisnode
    pshell> msiexec.exe /quiet /i iisnode-full-v0.2.26-x64.msi #do not allow to custom TARGETDIR="C:\bin\iisnode-full-v0.2.26\"
    pshell> While(Get-Process msiexec -ea si|?{$_.SI -ne 0}){} #wait until msiexec completes

## Python

    pshell> wget.exe --no-check-certificate https://www.python.org/ftp/python/3.6.5/python-3.6.5-amd64.exe
    pshell> .\python-3.6.5-amd64.exe /quiet /i InstallAllUsers=0 TargetDir="C:\bin\python-3.6.5\"
    pshell> While(Get-Process msiexec -ea si|?{$_.SI -ne 0}){} #wait until msiexec completes

## Robo3t

    pshell> wget.exe https://github.com/Studio3T/robomongo/releases/download/v1.1.1/robo3t-1.1.1-windows-x86_64-c93c6b0.exe
    pshell> .\robo3t-1.1.1-windows-x86_64-c93c6b0.exe /S /D=C:\bin\robo3t-1.1.1\
    pshell> While(Get-Process robo3t -ea si|?{$_.SI -ne 0}){} #wait until msiexec completes

Profit!
