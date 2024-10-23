# Repro repo for a regression in nock 14 beta

Running either test on its own passes:

    yarn test test1
    yarn test test2

But running both tests together fails (most of the time):

    yarn test

I've tracked down the issue to the call to `nock.back.setMode` in `test/helpers.ts`. 
Removing this line fixes the issue. However I wouldn't expect test suites to influence 
each other like this. Jest goes to great lengths to run each test file in an isolated 
environment to prevent issues like this. Furthermore, it works in Nock v13.
