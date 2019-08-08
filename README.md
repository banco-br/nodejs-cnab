# nodejs-cnab

Finally a nodejs lib for CNAB and bank communication in brazil.

`npm i --save nodejs-cnab`

This project uses :

https://github.com/andersondanilo/cnab_yaml

Working test example for Bradesco, needs work on other banks (see issues)


Other references:

* https://github.com/s2way/cnab240-nodejs
* https://github.com/kivanio/brcobranca
* https://github.com/programadormarin/remessa-bradesco
* 
* https://github.com/andersondanilo/CnabPHP
* https://github.com/developers-vitta/nodenab
* https://github.com/andersondanilo/CnabPHP/wiki/Criando-um-arquivo-de-remessa
* https://github.com/developers-vitta/nodenab
* https://github.com/andersondanilo/cnab_yaml


# Contribute

```sh
npm i -g ts-node
npm i
npm start
```

## Tests

```
npm install mocha chai ts-node -g typings
typings install dt~mocha --global --save
npm run typings
```