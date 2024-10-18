#!/bin/bash

###################################################
# A script to upload the blog static content to AWS
###################################################

cd "$(dirname "${BASH_SOURCE[0]}")"

WEB_ORIGIN='http://apisandclients.com'
BUCKET_NAME='apisandclients.com'

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
# Delete any existing files in the S3 bucket
#
aws s3 rm "s3://$BUCKET_NAME" --recursive
if [ $? -ne 0 ]; then
  exit 1
fi

#
# Upload all files
#
aws s3 cp dist "s3://$BUCKET_NAME" --recursive
if [ $? -ne 0 ]; then
  exit 1
fi

#
# Push content to all CloudFront locations
#
DISTRIBUTION_ID='E1YM2UP28R4CHP'
aws cloudfront create-invalidation --distribution-id=$DISTRIBUTION_ID --paths '/*'

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
