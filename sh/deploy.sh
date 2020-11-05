#!/bin/bash

mathdrill_now=`date +%Y-%m-%d--%H-%M-%S`

if [ -d '/var/www/mathdrill.app/public' ] 
then
  mkdir -p /var/www/mathdrill.app/archive/$mathdrill_now
  mv /var/www/mathdrill.app/public/* /var/www/mathdrill.app/archive/$mathdrill_now
fi

cp /var/lib/jenkins/workspace/MathDrill/public/* /var/www/mathdrill.app/public
chgrp buildusers /var/www/mathdrill.app/public
unset mathdrill_now
