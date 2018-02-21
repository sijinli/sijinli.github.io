---
layout: post
title: How to write Makefile
comments: true
my_tags: [linux]
tags: [linux]
---

## Meaning for special parameters
------


    $*            a string containing all the arguments to the
              shell, starting at $1.

    $@            same as above, except when quoted.

[check here for shell](http://unixhelp.ed.ac.uk/scrpt/scrpt2.2.2.html)
 

    $@            The file name of the target of the rule. If the target is an archive member, then ‘$@’ is the name of the archive file. In a pattern rule that has multiple targets (see Introduction to Pattern Rules), ‘$@’ is the name of whichever target caused the rule’s recipe to be run.
 
     $<           The name of the first prerequisite. If the target got its recipe from an implicit rule, this will be the first prerequisite added by the implicit rule (see Implicit Rules).    
 
 
[check here for makefile](https://www.gnu.org/software/make/manual/html_node/Automatic-Variables.html)
