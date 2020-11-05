#!/bin/bash

mathdrill_now=`date +%Y-%m-%d--%H-%M-%S`
public_path='/var/www/mathdrill.app/public'

if [ -d $public_path ] 
then
  mkdir -p /var/www/mathdrill.app/archive/$mathdrill_now
  mv /var/www/mathdrill.app/public/* /var/www/mathdrill.app/archive/$mathdrill_now
else
  mkdir -p $public_path
fi

cp /var/lib/jenkins/workspace/MathDrill/public/* $public_path
chgrp buildusers $public_path

unset mathdrill_now
unset public_path
