#!/bin/bash
echo "Will create a demo app in the ../_demo-app folder"
cd ../
vulcan create _demo-app
cd _demo-app
npm i
echo "Create package zoo"
vulcan g package zoo
echo "Create modules gorilla, lion, zebra"
vulcan generate module zoo gorilla
vulcan g module zoo lion
vulcan g module zoo zebra
echo "Create module dog and delete it"
vulcan g module zoo dog
vulcan remove module zoo dog

echo "Create components"
vulcan g component zoo GorillaHome
vulcan g component zoo LionMane
vulcan g component zoo ZebraStrips

echo "Create route gorilla Home"
vulcan g route zoo gorilla-home /gorilla-home GorillaHome DefaultLayout
#echo "Create component ZebraFangs and delete it"
#vulcan g component zoo ZebraFrangs
#vulcan r components zoo ZebraFangs

echo "Create package poacher and delete it"
vulcan g package poacher
vulcan r package poacher

echo "Packages summary"
vulcan list packages