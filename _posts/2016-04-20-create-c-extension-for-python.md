---
layout: post
title: how to create a c extenstion for python
comments: true
category: note
my_tags: [c,note]
tags: [c,note]
---

### Script

    g++ -c -fPIC test_pyDictGet.cc -o test_pyDictGet.o -lpython
    g++ -shared  -o test_pyDictGet.so  test_pyDictGet.o  


