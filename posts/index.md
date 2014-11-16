---
layout: post
title: All post
---

* auto-gen TOC:
{:toc}

Here is 

[How to write make file]({{ site.baseurl }}/posts/how-to-write-makefile.html)

[How to write make file]({{ site.baseurl }}/posts/linux-common-command.html)


<div id="home">
  <h1>Blog Posts</h1>
  <ul class="posts">
    {% for post in site.posts %}
      <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ post.url }}">{{ post.title }}</a></li>
    {% endfor %}
  </ul>
</div>
  
