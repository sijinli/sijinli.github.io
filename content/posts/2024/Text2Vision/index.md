---
title: "小说、意境、文生图"
date: 2024-11-16T23:23:33+08:00
categories: ["AI","note"]
draft: false
math: true
---

小说，文字的集合。图片或者视频，像素的集合。

一千个读者有一千个哈姆雷特，每一个读者对于同一段文字的解读也是不一样的, 图片或者视频的信息相比于文本传递就更加的精准。
然而，我们读过小说之后，脑海里就会有相应的影像，或者我们称之为意境。

一个有趣的问题是，人类是怎样形成这种对应关系的呢？
或者说，不同的人对于同一段文字的不同理解又是来自于什么呢？
在回答这个问题之前，不妨先看看在机器学习领域，是如何解决的。
<!-- 文生图是一个有趣的架构。 -->
<!-- 同样的文字对应不同的图像，引入随机，是一个巧妙的设定。 -->
<!-- 文字只是condition, 用于引导diffussion process里面的denoising过程，从而让恢复出对应的图像。 -->

<!-- 因为denoising的输入是一个符合随机分布的向量，所以，也允许在生成的过程中，随意给定一个输入，从而在text的引导下，能够生成图像。 -->

<!-- SD, 人类的学习， -->
<!-- 不同人的观点，或许主要在于如何condition上面。 -->
<!-- 在autoencoder部分，或许大同小异。 -->
<!-- 即使不同，也没有太大的关系。 -->
<!-- 或者说，两者的不同，也导致了不同人的观点的不同。 -->


比如，我们现在一个数据集$D=\\{x_i, c_i\\}_{i=1}^N$, 我们希望构建一个映射 $\mathcal{M}: \mathcal{C} \rightarrow \mathcal{X}$。
从文本到意境的映射不是1对1的，如果我们要来构建这个映射，应该如何做呢？
作为一个机器学习的问题，我们总希望$\mathcal{M}$尽可能平滑，即对于 $c_i, c_j \in \mathcal{C}$, 如果$c_i, c_j$在$\mathcal{C}$里比较近，我们希望生成的$x_i, x_j$也会比较近。

$$ \forall \|c_i,c_j\| \le \epsilon, x_i=\mathcal{M}(c_i),x_j=\mathcal{M}(c_j), s.t.,  \|x_i, x_j\| \le \gamma $$

<!-- 既然小说在每一个人的意境里是不一样的，那其的价值在哪呢？ -->
<!-- 一方面受致于传播手段，这么多年间，也没有合适的方式来将信息完整的记录来下。 -->
<!-- 使用文字，每一个人也能够有自己的想像。 -->



不过这样的平滑约束，并不是很好直接进行建模。<!-- 这里简单回顾一下， diffusion 以及condition diffusion的一些技巧。 -->

之前[浅谈 Diffusion Model](https://sijinli.github.io/blog_arxiv_2023.github.io//blog/2022/09/04/note)里有提到,
diffusion使得我们可以对$z\sim \mathcal{N}(0, I)$的采样从而实现对于数据分布的采样$\text{dp}^{-1}(z)\rightarrow x\sim p(x)$。
然而，这样的生成是随机的，我们没有办法控制生成的图片。



[Diffusion Models Beat GANs on Image Synthesis][4] 提出了使用classifier来引导$\text{dp}^{-1}$, 将逆向的$p_{\theta}(x_t|x_{t+1})$
替换成为$p_{\theta,\phi}(x_t|x_{t+1}, c)$，s.t., 
 $$p_{\theta,\phi}(x_t|x_{t+1}, c)=Z{p_{\theta}}(x_t|x_{t+1})p_{\phi}(c|x_t)$$
$p_{\phi}(c|x_t)$ 使用泰勒展开，于是相当于每一步$x_{t+1}\rightarrow x_t$的时候，引入classifier对于$x_t$的梯度， $\nabla_{x_t}p_{\phi}(c|x_t)$，
$$
\mu, \Sigma \leftarrow \mu_{\theta}(x_t), \Sigma_\theta(x_t)
$$

$$
x_{t-1} \sim \mathcal{N}(\mu + s \Sigma\nabla_{x_t}log p_{\phi}(c|x_t), \Sigma)
$$
直观上也比较好理解，相当于每一步都往$c$的类别上推进，或者说每一步是综合了原有的denoise的操作以及classifier的牵引操作。
这是在训练之后的融合，那在训练过程是否可以做这样的融合呢，或者说让$\mu_{\theta}$既有denoise的功能，同时也能够根据$c$来牵引恢复数据。
[CLASSIFIER-FREE DIFFUSION GUIDANCE][3] 提出，在训练的过程中，随机将$c$置为空，这样训练出来的denoise network在有$c$的时候，可以利用$c$的信息的引导恢复，
在没有$c$的情况下，使用默认的方式来denoise.

总结一下，diffusion使用文字生成图像的方法在于，文字只是作为condition的类别存在，在denoise process 下，不同的$z\sim \mathcal{N}(0, I)$，
使得生成的图像不同。引入新的变量，从而解决非1vs1映射的问题。
回到人脑的思考上来，不同的脑部的神经元分布以及联接也都是不一样的，相当于$\mu_{\theta}$每一个人不一样。
我们理解认知的不同，可能是之前的经历、成长的环境产生的，也可能是当时的情绪（或许能够类比这里的$z$)。
不同的经历，不同的情境，使得人们对于一段文字的理解产生不一样的理解。
当然，人脑看到文字也不一定都要映射到图像上来，应该是某种文字或者图像所共用的表达方式。


<!-- 语言可能是人类对齐的一种方式。 -->


<!-- 在训练diffusion的时候，我们的数据集都是图像。 -->
<!-- 如果我们还有一些数据，对于每一个数据，我们都有一个标签，我们希望做的事情是，当我们生成图像的时候，能够根据标签来生成。 -->


<!-- 中间$$s\sum$$这种 $\sum_i \therefore$ -->

<!-- $$\sum$$ -->
<!-- 但这种采样是 -->

<!-- [Lora][1] -->

<!-- [Adding Conditional Control to Text-to-Image Diffusion Models][2] -->





[1]: https://arxiv.org/pdf/2106.09685
[2]: https://arxiv.org/pdf/2302.05543
[3]: https://arxiv.org/pdf/2207.12598
[4]: https://arxiv.org/pdf/2105.05233
