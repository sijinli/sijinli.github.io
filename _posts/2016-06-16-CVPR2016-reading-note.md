---
layout: post
title: CVPR 2016 读书笔记
---


* auto-gen TOC:
{:toc}

# Detection

## You Only Look Once: Unified, Real-Time Object Detection

Use FC layer to generate bounding box coordinates and confidence scores for each grid box.
Therefore, the effective receptive field for each grid prediction node is the full image. 

Each grid will predict B bounding box (B=2).
During training, the object with highest IOU will be assigned to a specific predictor of a grid (say, the first predictor).

comments: I am really curious how B affect the performance.


## 


