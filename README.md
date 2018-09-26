# Events

Let's you look for and buy tickets to events happening around you.

### Prerequisites

Your must have a compatible version of node and preferably\* yarn installed in your machine.

\* npm must work just as good, but this project was not developed or tested using npm.

### Running in your local machine

To put it to work right away:

1. install all project dependencies with `yarn install`
2. start the development server with `yarn dev`

### Building to production

Follow the steps bellow to produce a production ready bundle:

1. install all project dependencies with `yarn install`
2. generate the production ready bundle with `yarn build`
3. serve the bundle with `yarn start`

### Heroku support

All configuration needed for deploying it to heroku is already made. So all you need to do to deploy to heroku is:

1. clone the git repository to your machine `git clone https://github.com/IgorCRD/events.git`
2. change from current directory to repository directory `cd events`
3. create a heroku app where your app is going to live `heroku create [appName]`
4. push the current version to heroku which will start the deploy pipeline `git push heroku master`
5. go to `http://[appName].herokuapp.com`
6. "It's alive!"

PS.: The above steps assume you have the Heroku CLI installed and logged on your machine

### Análise da solução

#### Características positivas da solução proposta

1. Os containers que fazem o fetch de dados foram implementados de forma a isolar a camada de dados. O restante do front não conhece ou assume o uso de qualquer tecnologia. Dessa forma é possível mudar o graphql client ou até mesmo passar a usar endpoints rest apenas mudando o código do container. Eles também são implementados usando render props para desacoplar ainda mais a camada de dados dos components de apresentação;
2. Os componentes que fazem fetch de dados tem seu render method debounced de forma que rapidas mudanças de props ou state não geram excesso de requisições para o backend;
3. Maior parte dos components não faz utilização de state ou de lifecicle methods o que facilita muito a manutenibilidade dos components.

#### Potenciais melhorias

1. Por conta do rush final para alcançar a deadline alguns presentational components acabaram misturando styles e state. Isso fere o princípio de single responsability, o que prejudica a manutenibilidade do código e um refactory é necessário nesses componenetes;
2. Escrever mais testes e adotar um abordagem mais orientada a teste. Isso iria melhorar a qualidade do código, da aplicação e das APIs criadas para cada componente;
3. Criar query string na rota da aplicação para mostrar a ultima busca feita na barra. A intenção é permitir o compartilhamento de resultados de buscas a partir do compartilhamento da URL. Assim como já é feito com o modal de compra de ingressos;
4. Pequenos detalhes de estilo espalhados por toda a aplicação;
5. Criação de um tema para melhor padronização de estilos como fonts, cores, font-sizes e etc.
