#!/bin/bash

if [ -z "$1" ]; then
  echo "Usage: release.sh x.y.z"
  exit 1
fi

sed -i '' "s/\"version\":.*/\"version\": \"$1\",/g" package.json
git commit package.json -m "Tag release v$1"
git tag -a "v$1" -m "v$1" -s

