NAME=$1
openssl genrsa -out $NAME-key.pem 2048
openssl req -new -key $NAME-key.pem -out $NAME-csr.pem -extensions req_ext -config https.conf -subj '/emailAddress=example@mail.com/CN=www.example.com/O=Example/C=US/L=Los Angeles/OU=Example'
openssl x509 -req -in $NAME-csr.pem -days 3650 -signkey $NAME-key.pem -out $NAME-cert.pem -extensions req_ext -extfile https.conf
sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain $NAME-cert.pem
