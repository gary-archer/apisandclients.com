#!/bin/bash

#################################################################
# A script to run the blog with a release build of static content
#################################################################

cd "$(dirname "${BASH_SOURCE[0]}")"
WEB_ORIGIN='http://localhost:3001'

#
# Get the platform
#
case "$(uname -s)" in

  Darwin)
    PLATFORM="MACOS"
 	;;

  MINGW64*)
    PLATFORM="WINDOWS"
	;;

  Linux)
    PLATFORM="LINUX"
	;;
esac

#
# Install dependencies if required
#
if [ ! -d 'node_modules' ]; then
  
  npm install
  if [ $? -ne 0 ]; then
    exit 1
  fi
fi

#
# Build the blog to static content
#
rm -rf dist 2>/dev/null
npm run buildRelease
if [ $? -ne 0 ]; then
  exit 1
fi

#
# Delete files I do not want to deploy to the web host
#
rm dist/posts/*.mdx
rm dist/index.html

#
# Run Express in a child terminal
#
if [ "$PLATFORM" == 'MACOS' ]; then

  open -a Terminal ./webhost/run.sh

elif [ "$PLATFORM" == 'WINDOWS' ]; then
  
  GIT_BASH="C:\Program Files\Git\git-bash.exe"
  "$GIT_BASH" -c ./webhost/run.sh &

elif [ "$PLATFORM" == 'LINUX' ]; then

  gnome-terminal -- ./webhost/run.sh
fi

#
# Wait for the blog static content to become available
#
echo 'Waiting for Web Host to become available ...'
while [ "$(curl -k -s -o /dev/null -w ''%{http_code}'' "$WEB_ORIGIN/posts/home")" != '200' ]; do
  sleep 2
done

#
# Open the system browser
#
if [ "$PLATFORM" == 'MACOS' ]; then

  open $WEB_ORIGIN

elif [ "$PLATFORM" == 'WINDOWS' ]; then

  start $WEB_ORIGIN

elif [ "$PLATFORM" == 'LINUX' ]; then

  xdg-open $WEB_ORIGIN

fi
