HOSTNAME=$1
openssl genrsa -out $HOSTNAME-key.pem 2048
sed -i '' "s/localhost/$HOSTNAME/g" https.conf
openssl req -new -key $HOSTNAME-key.pem -out $HOSTNAME-csr.pem -extensions req_ext -config https.conf -subj "/emailAddress=example@mail.com/CN=${HOSTNAME}/O=Example/C=US/L=Los Angeles/OU=Example"
openssl x509 -req -in $HOSTNAME-csr.pem -days 3650 -signkey $HOSTNAME-key.pem -out $HOSTNAME-cert.pem -extensions req_ext -extfile https.conf
sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain $HOSTNAME-cert.pem
sed -i '' "s/$HOSTNAME/localhost/g" https.conf
