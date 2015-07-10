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
### Delete many files under some folder

    find FOLDER_PATH -name "*.png" -print0 | xargs -0 rm

	find FOLDER_PATH -name "*.png" -delete
	
	
### How to find the functions in .so file

If the file is in elf format

	readelf -Ws /usr/local/cuda/lib64/libcudart.so | grep Device

or (because You only should extract those that are defined in this .so file, not in the libraries referenced by it. Seventh column should contain a number in this case [Here](http://stackoverflow.com/questions/34732/how-do-i-list-the-symbols-in-a-so-file))
	
	readelf -Ws /usr/local/cuda/lib64/libcudart.so | awk '{print $8} | grep Device'

For C++ functions
	
	nm -gC libname.so
	
## Media

### How to convert videos in Ubuntu

Use avconv

	avconv -i input.avi -s WxH  output.mov


## Text

### How to select multiple rows?

row index from 1

1. use awk (row 1-2)

    awk 'NR >= 1 && NR <= 2 { print }' /opt/visal/tmp/for_sijin/tmp/test.txt
	
2. use tail (from 100-end)

    tail -n +100 largefile
	
3. use head

	head -n +10 largefile
