#!/bin/bash

if [ -z "$1" ]; then
  echo "Usage: bump_version.sh x.y.z"
  exit 1
fi

sed -i '' "s/version: .*/version: $1/g" wercker-step.yml
git commit wercker-step.yml -m "Tag release v$1"
git tag -a "v$1" -m "v$1" -s

