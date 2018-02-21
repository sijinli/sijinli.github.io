---
layout: post
title: How to install tensorflow on centos
my_tags: [machine-learning]
tags: [machine-learning]
---


### glibc version not found

    mkdir glibc
    cd $!
    wget http://launchpadlibrarian.net/137699828/libc6_2.17-0ubuntu5_amd64.deb
    wget http://launchpadlibrarian.net/137699829/libc6-dev_2.17-0ubuntu5_amd64.deb
    ar p libc6_2.17-0ubuntu5_amd64.deb data.tar.gz | tar zx
    ar p libc6-dev_2.17-0ubuntu5_amd64.deb data.tar.gz | tar zx
    libcroot=/path/to/glibc/lib/x86_64-linux-gnu
    LD_LIBRARY_PATH=$libcroot:$LD_LIBRARY_PATH $libcroot/ld-2.17.so $(which python)

[link](https://github.com/tensorflow/tensorflow/issues/10)


