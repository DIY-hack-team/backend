#!/usr/bin/env bash
curDir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
. ${curDir}/.env

npm run prebuild
npm run build

rm -rf build
mkdir build
tar cfz build/backend.tar.gz dist node_modules

ssh ${DEPLOY_USER}@${DEPLOY_HOST} "rm -rf /opt/backend; mkdir /opt/backend"
scp -r ${curDir}/build/backend.tar.gz ${DEPLOY_USER}@${DEPLOY_HOST}:/opt/backend/backend.tar.gz
scp .env.prod.env ${DEPLOY_USER}@${DEPLOY_HOST}:/opt/backend/.env
scp etc/backend.service ${DEPLOY_USER}@${DEPLOY_HOST}:/etc/systemd/system
ssh ${DEPLOY_USER}@${DEPLOY_HOST} "cd /opt/backend && tar xf backend.tar.gz"
ssh ${DEPLOY_USER}@${DEPLOY_HOST} "systemctl enable -f backend; service backend restart"
