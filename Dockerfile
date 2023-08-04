FROM node:14.15.4-slim

# para checar o UID a ser colocado nesta linha - echo $UID
USER node

WORKDIR /home/node/app

# tail é como se fosse o cat - lê arquivos, o -f para ler de forma indefinida.
# /dev/null para ele não ler nada e ficar segurando a aplicação em pé
CMD [ "sh", "-c", "npm install && tail -f /dev/null"]