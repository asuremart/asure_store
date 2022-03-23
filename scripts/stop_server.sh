#!/bin/bash
forever stop $(sudo lsof -t -i:4000)
