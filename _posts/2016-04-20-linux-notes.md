---
layout: post
title: Linux notes
my_tags: [linux]
tags: [linux]
comments: true
---


### ld_libarary_path vs library_path

<cite>
LIBRARY_PATH is used by gcc before compilation to search for directories containing libraries that need to be linked to your program.
</cite>

<cite>
LD_LIBRARY_PATH is used by your program to search for directories containing the libraries after it has been successfully compiled and linked.
</cite>
[see here](http://stackoverflow.com/questions/4250624/ld-library-path-vs-library-path)

### How to use etags to process all the files under a folder

    find . -name "*.cpp" -print -or -name "*.hpp" -print | xargs etags 
    


