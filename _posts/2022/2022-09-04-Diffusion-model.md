---
layout: post
title: 浅谈 Diffusion Model
comments: true
tags: [note,machine-learning]
slug: note
category: ml,"machine learning"
---

<!-- Diffusion model的来源于物理学 -->
<!-- TODO: 补充具体解决什么问题。 -->

# 背景
最近Diffusion model 比较火，在此也简单总结一下diffusion model的概念和基本思路。
<!-- 全面的survey可以参考[^5]. 清晰简要的介绍可以参考 [^4]。 -->

Diffusion process 描述了一个如何将一个概率分布，逐渐变成Gaussion分布的过程。其做法就是不断的添加noise，逐渐使得数据的分布完全变成Gaussion distribution.

$$
x_0 \rightarrow x_1 \rightarrow x_2 \rightarrow ... x_n  
$$

其中

$$
q_{\phi}(x_t|x_{t-1}) := \mathcal{N}(x_t | \sqrt{1 - \beta_t}x_{t-1}, \beta_tI)  \tag{1.1}
$$

正向的过程是一个Markov chain，根据Gaussion distribution的特性，可以直接通过$$x_0$$ 计算任意时间的样本的分布，

$$
q_{\phi}(x_t|x_0) := \mathcal{N}(x_t; \sqrt{\bar{\alpha_t}}x_0, (1 - \bar{\alpha_t})I) \tag{1.2}
$$

其中$$\alpha_t = 1 - \beta_t,\bar{\alpha_t} = \prod_{i=1}^{t}\alpha_i$$。从这个公式也不难看出，当t越大，$$x_t$$的分布受$$x_0$$的影响越小，逐渐变成 $$\epsilon\sim \mathcal{N}(0, I)$$。
于是，如果我们能够将diffusion process逆转，那么我们将可以通过对$$\mathcal{N}(0, I)$$的采样从而实现对于数据集$$\mathcal{X}$$的采样。

$$
x_t \sim \mathcal{N}(0, I) \rightarrow x_0 \sim \text{dp}^{-1}(x_t) \tag{1.3}
$$


根据[^8], 当$$\beta$$足够小的时候，diffusion process的逆过程与正过程具备相同的函数表达。
即
$$
p_{\theta}(x_{t-1}|x_t):=\mathcal{N}(x_{t-1}| \mu_\theta{(x_t, t)}, \Sigma_\theta(x_t, t)) \tag{1.4}
$$,

其中$$\mu_\theta,\Sigma_\theta$$ 是关于参数 $$\theta$$的函数。


## 训练建模

对于给定一个数据集 $$\mathcal{X}$$，我们经常希望能够对于数据点进行建模，
比如给定 $$x \in \mathcal{X}$$, 我们可以估计$$p(x)$$ 并且能够从概率分布中进行采样
$$x'\sim p$$. 我们不知道p(x)的真实分布形式，但我们可以使用一些参数化的方法来逼近p(x)。
一种常见的方法就是引入隐变量以及一个方便采样的分布。



<!-- TODO: diffusion process 是否可控 <\!--  -\-> -->
 

这里我们先
回到diffusion process, 其正向的过程是一个Markov chain, 我们令正向过程所定义的概率分布为$$q_\phi$$, 令$$p^{*}(x)$$ 是 $$x_0$$的真实概率分布。
即，

$$
q_{\phi}(x_0, x_1, x_2, ..., x_T) = p^{*}(x_0) \prod_{t=1}^{T} q_{\phi}(x_t|x_{t-1}) 
$$

反向的过程定义的概率分布为$$p_\theta$$,

$$
p_\theta(x_0, x_1, x_2, ..., x_T) = p_{\theta}(x_T) \prod_{t=1}^{T} p_{\theta}(x_{t-1}|x_{t}) 
$$


我们希望通过优化$$\theta$$, 从而 $$p_\theta(x_0)=\int{p_\theta(x_0,x_1,...,x_T)dx_{1..t}}$$ 与 $$p^{*}(x)$$足够接近。

比如我们求解$$\theta$$来最小化 $$D_{KL}(p^{*}, p_\theta)$$
这等效于最大化
$$\mathop{\mathbb{E}}_{x \sim p^{*}}[\mathop{log} p_\theta(x)]$$。
因为
$$
\mathop{\mathbb{E}}_{x \sim p^{*}}[\mathop{log} p_\theta(x)] = -H(p^{*}) - D_{KL}(p^{*}(x)\| p_\theta(x))
$$

并且
$$H(p^{*})$$是常量。


$$
\begin{align}
log(p(x))&=\int log(p(x)) q_{\phi}(z|x) dz  \tag{2.1}\\ 
&= \int{log(\frac{p(x,z)}{p(z|x)}) q_{\phi}(z|x) dz} \\
&= \int{log(\frac{q_{\phi}(z|x)}{p(z|x)}\frac{p(x,z)}{q_{\phi}(z|x)}) q(z|x) dz} \\
&= \mathop{\mathbb{E}}_{q_{\phi}(z|x)}[log\frac{p(x,z)}{q_{\phi}(z|x)}] + D_{KL}(q_{\phi}(z|x) \|p(z|x)) \\
& \ge \mathop{\mathbb{E}}_{q_{\phi}(z|x)}[log\frac{p(x,z)}{q_{\phi}(z|x)}]
\end{align}
$$

<!-- 如果我们通过选取 $$z,q_\phi$$ -->
<!-- 使得 -->
<!-- $$ -->
<!-- q_\phi(z|x)=p(z|x)  -->
<!-- $$。 -->

<!-- 比如我们选取  -->
<!-- $$ -->
<!-- z=x_{1..t},q_\phi(z|x)=\prod_{i=1}^t p(x_i|x_{i-1}) -->
<!-- $$ -->


$$
\mathop{\mathbb{E}}_{q_{\phi}(z|x)}[log\frac{p(x,z)}{q_{\phi}(z|x)}]
$$, 
这个式子一般也称之为ELBO (Evidence Lower bound)。
我们可以通过最大化这个lower bound, 从而间接的最大化log(p(x))。

最大化ELBO的另一个可能“副"作用，会使得KL项 
$$
D_{KL}(q_{\phi}(z|x) \|p(z|x))
$$ 倾向于变小，从而使
$$
q_\phi(z|x)$$与$$p_\theta(z|x)
$$
更加接近。
<!-- 之所以是lower bound, 因为KL项是非负的，当p(z|x)不好进行采样的时候，通过引入分布$$q$$, 从而用于逼近$$p(x)$$。 -->


$$
\begin{align}
log(p(x))&=\int log(p(x)) q_{\phi}(z|x) dz  \\
& \ge \mathop{\mathbb{E}}_{q_{\phi}(z|x)}[log\frac{p(x,z)}{q_{\phi}(z|x)}]
\end{align}
$$

对于 特定的$$x$$,
$$
p_\theta(x,z)$$与$$q_\phi(z|x)
$$
都是关于z的函数。
## Lost拆解，使得概率计算能有简洁的表达
DDPM[^6]使用了一个比较巧妙的方法来拆解$$p(x,z)$$，从而与
$$
q_\phi(z|x)
$$ 
建立一一对应 的关系。
$$
q_\phi(x_{t-1}|x_t)
$$
没有close form的表达式，作者通过引入 $$x_0$$ 的方式，从而使得整个式子
$$
q_\phi(x_{t-1}|x_t,x_0)
$$
可以具有close form的表达，从而能够高效的计算。

$$
\begin{align}
p(x_{t-1}| x_{t},x_0) &= \frac{p(x_0,x_{t-1},x_t)}{ p(x_0,x_t)} \tag{2.2}\\
&=\frac{p(x_{t-1},x_t|x_0)}{p(x_t|x_0)} \\
&=\frac{p(x_{t}|x_{t-1},x_0)p(x_{t-1}|x_0)}{p(x_t|x_0)}
\end{align}
$$

对于$$q_\phi$$来说，其Markov的性质使得 
$$
q_\phi(x_t|x_{t-1},x_0)=q_\phi(x_t|x_{t-1})
$$, 

<!-- $$ -->
<!-- \begin{align} -->
<!-- p(x_{0...t})&=p(x_0,x_{1..t}) \\ -->
<!-- &=p(x_{1..t-1}|x_0,x_t)p(x_0,x_t) -->
<!-- \end{align} -->
<!-- $$ -->

定义$$L_t$$使得$$ELBO=\sum_{t=0}^T -L_t$$, 其中


$$
\begin{align}
L_0&=log(p_\theta(x_0|x_1)) \\
L_t &= -\mathop{\mathbb{E}}_{q_\phi(x_{t-1}|x_0)}[log(\frac{p_\theta(x_{t-1}|x_t)}{q_\phi(x_{t-1}|x_t,x_0)})] \quad \forall 1\lt i \lt T \\
&=D_{KL_{q_\phi}}(p_\theta(x_{t-1}|x_t)\|q_\phi(x_{t-1}|x_t,x_0)) \\
L_T &= -\mathop{\mathbb{E}}_{q_\phi(x_{T}|x_0)}[log(\frac{p_\theta(x_T)}{q_\phi(x_{T}|x_0)})] \\
&=D_{KL_{q_\phi(x_{T}|x_0)}}(p_\theta(x_{T})\|q_\phi(x_{T}|x_0))
\end{align}
$$

将 Equ2.2 代入$$L_t\quad \forall 1\lt t \lt T$$,以及对于
$$p_\theta(x_{t-1}|x_t)$$的参数化形式的选择，

$$
L_t\sim \mathop{\mathbb{E}}_{x_0,\epsilon}(\|\epsilon - \epsilon_\theta(\sqrt{\bar{\alpha_t}}x_0+\sqrt{1-\bar{\alpha_t}}\epsilon,t)\|)
$$

其中 
$$
\epsilon_\theta(x_t)
$$
是用于从$$x_t$$预测从$$x_{t-1}$$生成$$x_t$$过程中，隐含在$$x_t$$中的gaussion noise。
## 随机优化
另一个比较巧妙的设计是$$L_t$$的项写出来之后，作者将$$L_t$$的优化变成采样优化，
即每次sample一个t对于$$L_t$$来进行优化.



<!-- 在diffusion process的正过程中 Equ 1.1，只有$$\beta$$的参数是可学习的。序列的长度$$T$$作为超参。 -->
<!-- 在逆过程中，$$\mu_\theta, \Sigma_\theta$$的参数$$\theta$$是可学习的。 -->







[^1]: [Diffusion model by liliangweng](https://lilianweng.github.io/posts/2021-07-11-diffusion-models)
[^2]: https://www.assemblyai.com/blog/diffusion-models-for-machine-learning-introduction
[^3]: https://arxiv.org/pdf/2208.11970.pdf 
[^4]: [Diffusion models by m0nads](https://medium.com/@monadsblog/diffusion-models-4dbe58489a2f)
[^5]: [Diffusion Models: A Comprehensive Survey of Methods and Applications](https://arxiv.org/pdf/2209.00796.pdf)
[^6]: [DDPM](https://arxiv.org/pdf/2006.11239.pdf)
[^7]: [Deep unsupervised learning using nonequilibrium thermodynamics]()
[^8]: [On the theory of stochastic processes, with particular reference to applications.](https://projecteuclid.org/ebooks/berkeley-symposium-on-mathematical-statistics-and-probability/On-the-Theory-of-Stochastic-Processes-with-Particular-Reference-to/chapter/On-the-Theory-of-Stochastic-Processes-with-Particular-Reference-to/bsmsp/1166219215)
