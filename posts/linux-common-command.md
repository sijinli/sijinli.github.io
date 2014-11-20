---
layout: post
title: CentOS
---

## CentOS
------

[How to check whether some library have been installed](http://publib.boulder.ibm.com/infocenter/lnxpcomp/v101v121/index.jsp?topic=/com.ibm.xlcpp101.linux.doc/install/redhat_64-bit_naming_issue.html)

Or simply use 

    rpm -qa | sort | grep libname

Another way is to use 

    yum list installed | grep software-name