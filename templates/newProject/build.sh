CURR_DIR=$(PWD)
DATE=`date '+%Y-%m-%d-%H:%M:%S'`


rm -rf node_modules temp/deploy-src build
cd ..
cp -R $CURR_DIR ./temp/deploy-src
mv ./temp/deploy-src $CURR_DIR/temp/deploy-src
cd $CURR_DIR
npm install
npm run clean:assets
npm run build:prod
cp -R ./assets/dist ./tempDist
npm run babel:build
rm -rf ./temp/deploy-src
cp -R ./package.json ./build/package.json
cp -R ./app.json ./build/app.json
cp -R ./views ./build/views
cp -R ./openssl ./build/openssl
cp -R ./bootstrap ./build/bootstrap
cp -R ./assets/img ./build/assets/img
rm -rf ./build/assets/dist
cp -R ./tempDist ./build/assets/dist
cp -R ./assets/manifest.json ./build/assets/manifest.json
cd $CURR_DIR/build
rm -rf *.zip
zip -r build-$DATE.zip .
mv build-$DATE.zip ..
cd $CURR_DIR
rm -rf ./build ./tempDist
