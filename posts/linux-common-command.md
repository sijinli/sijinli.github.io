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
	
## General

### How to find the functions in .so file

If the file is in elf format

	readelf -Ws /usr/local/cuda/lib64/libcudart.so | grep Device

For C++ functions
	
	nm -gC libname.so


## Text

### How to select multiple rows?

row index from 1

1. use awk (row 1-2)

    awk 'NR >= 1 && NR <= 2 { print }' /opt/visal/tmp/for_sijin/tmp/test.txt
	
2. use tail (from 100-end)

    tail -n +100 largefile
	
3. use head

	head -n +10 largefile
