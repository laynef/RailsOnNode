NAME=$1
SECURITY=2048
openssl genrsa -out $NAME.pem $SECURITY
