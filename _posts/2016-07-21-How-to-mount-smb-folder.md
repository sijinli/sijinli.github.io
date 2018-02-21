---
layout: post
title: How to mount the smb folder
comments: true
my_tags: [linux]
tags: [linux]
---

# How to mount the smb folder 

    sudo mount -t cifs -o username=smbusr,password=smbpwd SMB_IP LOCAL_FOLDER
