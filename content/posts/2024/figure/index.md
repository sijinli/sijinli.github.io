---
title: "Figure 01"
date: 2024-03-14T12:28:00+08:00
categories: ["Embodied AI"]
draft: false
---


![Overview](/posts/2024/figure/pic01.jpeg)


这个架构有点"Think Fast and slow"意味，最上层的多模态模型，处理与外界交互，
生成任务，然后通过一个policy，把任务拆解成为子任务，
然后这些子任务再确保精确的执行。
每一个层级的频率是不一样的，上层执行的慢，需要算力大。越往下层，执行的任务越简单，也需要越即时的反馈。
按这种执行频率递减的方式是经济的，有些事情下层的模块就能够完成，没有必要调用上层模块的资源。比如保持机器人身体的平衡，这个在任何任务下都是需要确保的，跟上层任务无关。
另一方面，为了配合上层模块的执行，下层模块的执行频率就必须更高，从而确保任务正确的完成。


|模型|输入|输出|Hz|
|:-|:-:|:-|:-|
| OpenAI Model               |text,image  |text/command|10|
| Neural network policy      |image       |24 DOF actions |200|
|Whole body control|actions  |24 DOF actions,...  |joint torques|1000|




