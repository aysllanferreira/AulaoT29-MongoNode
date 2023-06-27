folders=(controllers models services routes middlewares)

mkdir server && cd server/

npm init -y

npm install express cors dotenv mongoose jsonwebtoken bcryptjs --save
npm install nodemon eslint-config-trybe-backend --save-dev

echo "Dependencias Instaladas"

touch .env .gitignore .eslintrc.json

echo "Arquivos basicos criados"

echo "node_modules" >> .gitignore
echo ".env" >> .gitignore

echo "Variaveis de ambiente setadas"

echo "PORT=4000" >> .env

echo '{
  "extends": "trybe-backend"
}' >> .eslintrc.json

if ! command -v ntl &> /dev/null
then
  echo "NTL sendo instalado..."
  npm i -g ntl
fi

echo "NTL instalado!"

if ! command -v jq &> /dev/null
then
  echo "JQ sendo instalado..."
  brew install jq
  # sudo apt-get install jq
fi

echo "JQ instalado!"

jq '.scripts += {"start": "node src/index.js", "dev":"nodemon src/index.js"}' package.json > tmp.$$.json && mv tmp.$$.json package.json

echo "Scripts foram criados"

mkdir src && cd src/

touch index.js

for item in "${folders[@]}"
do
  mkdir $item && cd $item
  touch auth.$item.js
  cd ..
done

echo "Arquivos criados!"

if command -v openssl &> /dev/null
then
    echo "OpenSSL exists. Generating JWT_SECRET..."
    JWT_SECRET=$(openssl rand -base64 32)
    echo "JWT_SECRET=$JWT_SECRET" >> ../.env
    echo "JWT_SECRET added to .env"
else
    echo "OpenSSL not found. Please install it and run this script again."
    exit 1
fi

echo "Done! Happy coding!"