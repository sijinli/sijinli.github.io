---
layout: post
title: CVPR 2016 Interesting papers
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


# Pose estimation

## Personalizing Human Video Pose Estimation James

It is an iterative refinement process. 

* Firstly, a few examples are detected with generic body part detector, which has high  precision and low recall.
* Do the spatial matching.
   1. Train random forests for body part detection and find the candidates from un-annotated frames
   2. Generate the matches 
   3. Siftflow to correct the matching
* Temporal propagation with optical flow
* Evaluation
* fine-tuning the generic pose estimation network
 


