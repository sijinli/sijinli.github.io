---
title: "DeepSeek"
date: 2025-01-31T22:17:53+08:00
categories: ["ai"]
draft: false
math: true
---

从deepseek v3开始，试用了几次之后就开始持续使用了。
最开始自然是使用ChatGPT, 后面因为使用API被禁了账号就一怒之下开始用Claude。
Claude前面的几个版本中文几乎就不能用的状态，之后更新完与ChatGPT就没有区别的。

deepseek算是很低调了，v3效果的确不错，日常使用下来，也感觉不出与ChatGPT/Claude有明显的差别。
初略读了下v3的论文，感觉工程方面，做的很不错，是做量化的团队能够做出来的事情。
Dylan Patel 的[___DeepSeek Debates: Chinese Leadership On Cost, True Training Cost, Closed Model Margin Impacts___][1] 的这篇总结已经比较全面了，就不再展开了。
年前跟朋友聊天，讨论中国优秀的公司，感觉DJI与DeepSeek在某种程度上很类似，一群有理想的人，在极限的条件下做出极致的产品。
当年大疆的飞控用极低的成本，实现了昂贵设备才能达到的效果，以及当时在无人机上，用极少的算力部署AI的模型。
DeepSeek在模型结构、模型训练以及部署方面的优化，极大了降低了各个环节的成本和门槛。

从OpenAI推出ChatGPT的时候，当时就觉得大模型会是一场关乎Infra的游戏或者说是MLsys的游戏 --- GPT到GPT3.5，模型结构上并没有大的变化，主要的变化在于模型规模、数据以及训练。由于尝试的成本不断攀升（从ChatGPT第一个版本出来，惊讶于其效果的同时，人们对于其的上限充满着期待），使其像一个黑盒，门槛高而充满神秘。
DeepSeek带来的一个很重要的贡献在于，让这个黑盒不再神秘。
训练大模型，虽然仍然很贵（未来应该还有下降的空间），不再是遥不可及。
同时，也不是所有公司都需要从预训练开始做，直接做微调或者RL的部分来做也是可以的。
从这个角度来看，可预见的将来，可以看到大模型的繁荣以及各种端侧硬件的部署。

R1推理的部分比较有意思，我们先看一下R1的整个训练流程，
+ 生成Cold Start数据
  + few-shot with long CoT
  + prompting models to generate with reflection
  + DeepSeek-R1-Zero results and refine with human annotator
+ 使用Cold Start数据fine tune DeepSeekV3
+ RL训练上一步的模型，由于CoT 导致language mixing的问题，加入language consistency loss
+ 使用上一步生成的模型Generate SFT data 
  + Reasoning data(600K)
  + Non-Reasoning (200K)
+ Fine tune DeepSeek-V3 with 800K SFT data generated in the previous Step  
+ RL训练
  + Reasoning的数据，使用DeepSeek-Zero的训练方法，使用rule-based reward
  + 通用的数据，使用人类的preference 来reward
  
我们再看一下DeepSeek-R1训练的模版。

>A conversation between User and Assistant. The user asks a question, and the Assistant solves it.The assistant first thinks about the reasoning process in the mind and then provides the user with the answer. The reasoning process and answer are enclosed within <think> </think> and <answer> </answer> tags, respectively, i.e., <think> reasoning process here </think> <answer> answer here </answer>. User: $\textcolor{red}{prompt}$. Assistant:

模版里面，并没有什么神奇的地方，单独的使用这个prompt并不能使模型变强。
训练过程中，分阶段的生成优质的数据，以及针对不同场景的优化函数，使得模型在推理任务上面有更好的表现。




[1]:https://semianalysis.com/2025/01/31/deepseek-debates/


