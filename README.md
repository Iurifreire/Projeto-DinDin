![](https://i.imgur.com/xG74tOh.png)

# Projeto-DinDin - Aplicação integrada Frontend/Backend w/React

<p align="center">
<img src="http://img.shields.io/static/v1?label=STATUS&message=%20CONCLUIDO&color=GREEN&style=for-the-badge"/>
</p>


# Descrição do Projeto :

A aplicação consiste em simular transações financeiras, utilizando os controladores e endpoints fornecidos pela API para permitir
ao usuário corretamente logado registrar transações financeiras, bem como manipulá-las utilizando as rotas fornecidas.



# Componentes do Projeto :

O projeto é composto por três Pages (RegisterUser / SignIn / Main), cada qual com suas funcionalidades:


![](https://imgur.com/m4vfUfO.png)
`RegisterUser:` O usuário, utilizando a rota `post('usario')`, cadastra um objeto contendo nome, email e senha válidos.
As validações acontecem no middleware genérico presente na API.


![](https://imgur.com/VU1Aywo.png)
`SignIn:` Ao acessar a rota `post('login')` com usuário válido, é gerado um Token, guardado no localStorage, o qual 
permite acesso ao restante das aplicações.


![](https://imgur.com/I7Mh8aU.png)
`Main:`


![](https://imgur.com/X6c1i27.png)
`DeleteRegistryModal:`


![](https://imgur.com/iQuZFjf.png)
`ModalProfile:`








