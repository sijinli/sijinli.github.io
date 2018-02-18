"""

"""
import pylab as pl
import numpy as np
def process():
    pi = np.pi
    t = np.linspace(-pi,pi, 350)
    X = t * np.sin( pi * 0.872*np.sin(t)/t)
    Y = -np.abs(t) * np.cos(pi * np.sin(t)/t);
    # X = np.abs(X * 10)
    pl.plot(X,Y)
    pl.show()

def main():
    process()

if __name__ == '__main__':
    main()
