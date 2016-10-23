---
layout: post
title: how to create a c extenstion for python
comments: true
tags: [c,python]
---

### Script

    g++ -c -fPIC test_pyDictGet.cc -o test_pyDictGet.o -lpython
    g++ -shared  -o test_pyDictGet.so  test_pyDictGet.o  


