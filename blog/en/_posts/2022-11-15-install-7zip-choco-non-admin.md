---
layout: post
title: "install 7zip with choco without admin permissions"
---

## {{ page.title }}

###### {{ page.date | date_to_string }}

Install choco, from a powershell:

    $ notepad choco-non-admin.ps1

Then paste the following instructions:

    # Set directory for installation - Chocolatey does not lock
    # down the directory if not the default
    $InstallDir='C:\ProgramData\chocoportable'
    $env:ChocolateyInstall="$InstallDir"

    # If your PowerShell Execution policy is restrictive, you may
    # not be able to get around that. Try setting your session to
    # Bypass.
    Set-ExecutionPolicy Bypass -Scope Process -Force;

    # All install options - offline, proxy, etc at
    # https://chocolatey.org/install
    iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

Execute the resulting script and install the portable 7zip version:

    $ ./choco-non-admin.ps1
    $ choco install 7zip.portable

Open **C:\ProgramData\chocoportable\lib\7zip.portable\tools\7zFM** to compress / uncompress stuff.

Happy hacking!
